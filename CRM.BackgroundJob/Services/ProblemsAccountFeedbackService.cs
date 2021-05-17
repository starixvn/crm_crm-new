
namespace CRM.BackgroundJob.Services
{
    using CRM.BackgroundJob.Models.ProblemsAccount;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    public interface IProblemsAccountFeedbackService
    {
        Task CreateFeedbackForProblemsAccountAsync(ProblemsAccountSetting problemsAccountSetting, bool isUAT,
            DateTime LastRuntimeEnv, string LastRuntimeNameEnv, string JobStatusNameEnv, string Environment
        );
    }
    public class ProblemsAccountFeedbackService : IProblemsAccountFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly IWinLossTransactionService transactionService;

        private readonly string templateXml = "ProblemsSolutionTemplate.xml";
        private readonly int maxUserNameInOneFb = 250;

#pragma warning disable S107 // Methods should not have too many parameters
        public ProblemsAccountFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback,
            IWinLossTransactionService transactionService
            )
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.systemSettingService = systemSettingService;
            this.customerService = customerService;
            this.logService = logService;
            this.commonFeedback = commonFeedback;
            this.transactionService = transactionService;
        }

        public async Task CreateFeedbackForProblemsAccountAsync(ProblemsAccountSetting problemsAccountSetting, bool isUAT,
            DateTime LastRuntimeEnv,  string LastRuntimeNameEnv, 
            string JobStatusNameEnv, string Environment)
        {
            logService.LogInformation(string.Format("Start run problems account serivce with last LastLogID: {0} isUAT: {1}!", problemsAccountSetting.LastLogId, isUAT));

            await EditSystemSettingAsync(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Running);
            var custCategory = await customerService.GetCustCategoryInfor(problemsAccountSetting, isUAT);
            var custIds = custCategory.Select(x => x.CustID).Distinct();
            var headlines = await customerService.GetGroupHeadlineAsync(custIds);
            var problemsAccountInfor = await transactionService.ImportProblemsAccountFeedbackInfoAsync(headlines, custCategory, Environment);
            if(!problemsAccountInfor.Any())
            {
                logService.LogInformation(string.Format("Import problems account doesn't have any data with custId: {0} headlineName: {1}!",
                   string.Join(",", headlines.Select(x => x.HeadlineId)), string.Join(",", headlines.Select(x => x.HeadlineName))));
                await EditSystemSettingAsync(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Completed);
                return;
            }
            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);
            var groupProblemsAccountByHeadlineId = problemsAccountInfor.GroupBy(x => x.HeadlineID);
            var cateKey = "";
            foreach (IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts in groupProblemsAccountByHeadlineId)
            {
                var groupCategoryProblemsAccount = problemsAccounts.GroupBy(x => x.CategoryID);
                foreach (var categoryProblemAccount in groupCategoryProblemsAccount)
                {
                    var distinctUserName = categoryProblemAccount.GroupBy(x => x.UserName).Select(group => group.First()).ToList();
                    if (distinctUserName.Count > maxUserNameInOneFb)
                    {
                        cateKey = categoryProblemAccount.Key.ToString();
                        await CreateProblemsAccountFeedbackByBatchAsync(categoryProblemAccount, settings, settingMappings);
                    }
                }
                if(!string.IsNullOrEmpty(cateKey))
                {
                    var problemsAccountsRemain = problemsAccounts.Where(x => x.CategoryID.ToString() != cateKey);
                    if(problemsAccountsRemain.Any())
                    {
                        await CreateProblemsAccountFeedbackCreditAsync(
                              problemsAccountsRemain,
                              settings,
                              settingMappings
                              );
                    }    
                }
                else
                {
                    await CreateProblemsAccountFeedbackCreditAsync(
                       problemsAccounts,
                       settings,
                       settingMappings
                    );
                }    
            }
            var lastLogIdName = isUAT ? "LastLogIdUAT" : "LastLogID";
            var maxLastLogId = custCategory.Max(x => x.LogID);

            await EditSystemSettingUpdateLastLogIdAsync(JobStatusNameEnv, LastRuntimeNameEnv, lastLogIdName, maxLastLogId);
            logService.LogInformation(string.Format("end service problems account serivce with max last LastLogID: {0}!", maxLastLogId));
        }

        protected internal virtual async Task CreateProblemsAccountFeedbackByBatchAsync(
           IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts,
           IEnumerable<SettingItem> settings,
           IEnumerable<SystemSettingMapping> settingMappings
           )
        {
            var countProblemsAccount = problemsAccounts.ToList().Count;
            var batchCreateFbPerUSer = (int)Math.Ceiling((double)countProblemsAccount / maxUserNameInOneFb);
            var startRange = 0;
            for (int i = 0; i < batchCreateFbPerUSer; i++)
            {
                if (i == batchCreateFbPerUSer - 1)
                {
                    await CreateProblemsAccountFeedbackCreditAsync(
                        problemsAccounts.Skip(maxUserNameInOneFb * (batchCreateFbPerUSer - 1)),
                        settings,
                        settingMappings
                    );
                }
                else
                {
                    await CreateProblemsAccountFeedbackCreditAsync(
                          problemsAccounts.ToList().GetRange(startRange, maxUserNameInOneFb),
                          settings,
                          settingMappings
                       );
                    startRange += maxUserNameInOneFb;
                }    
            }
        }

        protected internal virtual async Task CreateProblemsAccountFeedbackCreditAsync(
           IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts,
           IEnumerable<SettingItem> settings,
           IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation("Start create problems account feedback");
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Closed, StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(DefaultValue.Neutral, StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);
            var category = commonFeedback.GetCategorySubCategoryCWL(settings, DefaultValue.AbnormalBets);

            var criteria = new CreateMutipleFeedbackCommand
            {
                CreatorId = appSettings.CreatorId,
                UserId = appSettings.CreatorId,
                FeedbackDate = feedbackDate.Subtract(timeSpan),
                ResolutionDate = feedbackDate.AddMinutes(1).Subtract(timeSpan),
                IsCheckedDefaultComm = true,
                StationId = station != null ? station.SettingId.ToString() : string.Empty,
                StatusId = status != null ? status.SettingId : 0,
                ResponseId = response != null ? response.SettingId : 0,
                UserRole = Constants.UserRole,
                CategoryXml = category.Item3,
                CategoryIds = category.Item1.ToString(),
                SubCategoryIds = category.Item2.ToString(),
                Subject = DefaultValue.Special_Notification,
                AutoField = string.Empty,
                AutoField1 = string.Empty,
                AutoField2 = string.Format(DefaultValue.DateTimeTool, feedbackDate.ToString("yyyyMMdd"), feedbackDate.ToString("hh:mmtt")),
                AutoField3 = $"{Environment.NewLine}System ID: ",
                PALogID = string.Join(",", problemsAccounts.Select(x=>x.LogID)),
                CustomerXml = GetCustomerXml(problemsAccounts),
                ProductXml = GetProductXml(settings),
                Solution = GetSolution(problemsAccounts),
                RelatedCustomerXml = GetRelatedCustomerXml(problemsAccounts),
                ListOrigCustIds = string.Join(",", problemsAccounts.Select(x=>x.CustID)),
                Description = GetDescription()
            };
            await CheckValidParamsAndInsertFeedbackAsync(problemsAccounts, criteria);
        }

        protected internal virtual async Task CheckValidParamsAndInsertFeedbackAsync(
            IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts,
            CreateMutipleFeedbackCommand criteria)
        {
            var checkValidParamBeforeInsert = commonFeedback.CheckFeedbackValidParams(criteria);
            if (!checkValidParamBeforeInsert.Item1)
            {
                var messageInvalid = "Invalid Params: " + checkValidParamBeforeInsert.Item2;
                logService.LogInformation(string.Format("Invalid Params. @Categorystr: {0} @Category: {1} @Product: {2} @StatusID: {3} @SubCategorystr:{4} @ResponseID:{5} @StationID:{6}",
                        criteria.CategoryIds, criteria.CategoryXml, criteria.ProductXml, criteria.StatusId, criteria.SubCategoryIds, criteria.ResponseId, criteria.StationId));
                await transactionService.EditProblemsAccountFeedbackInfoAsync(string.Join(",", problemsAccounts.Select(x=>x.LogID)), CreateFeedbackJobStatus.Fail, messageInvalid);
                return;
            }
            try
            {

                CommandResult commandResult = await baseService.ExecuteNonQueryAsync(criteria);
                if (commandResult.IsSuccessful)
                {
                    logService.LogInformation(string.Format("Insert feedback problems account successfully. HeadlineId: {0} logID:{1}",
                        string.Join(",", problemsAccounts.Select(x => x.HeadlineID)), string.Join(",", problemsAccounts.Select(x => x.LogID))));
                }
                else
                {
                    logService.LogInformation(string.Format("Insert feedback failed problems account. HeadlineId: {0} logID:{1}",
                        string.Join(",", problemsAccounts.Select(x => x.HeadlineID)), string.Join(",", problemsAccounts.Select(x => x.LogID))));

                    await transactionService.EditProblemsAccountFeedbackInfoAsync(string.Join(",", problemsAccounts.Select(x => x.LogID)), CreateFeedbackJobStatus.Fail, commandResult.Message);
                    await logService.ErrorAsync(commandResult, criteria);
                }
            }
            catch (Exception ex)
            {
                await transactionService.EditProblemsAccountFeedbackInfoAsync(string.Join(",", problemsAccounts.Select(x => x.LogID)), CreateFeedbackJobStatus.Fail, ex.Message);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual string GetProductXml(
            IEnumerable<SettingItem> settings
            )
        {
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            var product = GetProblemsSportsbookProduct(settings);
            stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, Constants.SubProductNA, Constants.BettypeNA);
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual string GetRelatedCustomerXml(IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts)
        {
            const string XmlTemplate = DefaultValue.RelatedCustomerXml;
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            var distinctRelatedAndUserName = problemsAccounts.GroupBy(x => new { x.HeadlineID, x.RelatedCustID, x.UserName }).Select(group => group.First()).ToList();
            foreach (var problemsAccount in distinctRelatedAndUserName)
            {
                stringBuilder.AppendFormat(XmlTemplate, problemsAccount.HeadlineID, problemsAccount.RelatedCustID, problemsAccount.UserName);
            }
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual string GetCustomerXml(IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts)
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat(DefaultValue.CustomerXml, problemsAccounts.FirstOrDefault().HeadlineID, problemsAccounts.FirstOrDefault().HeadlineName);
            return stringBuilder.ToString();
        }

        protected internal virtual SettingItem GetProblemsSportsbookProduct(IEnumerable<SettingItem> settings)
        {
            var product = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Sportsbook, StringComparison.OrdinalIgnoreCase));
            return product ?? new SettingItem { SettingId = Constants.ProductNA };
        }

        protected internal virtual string GetSolution(IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts)
        {
            var stringBuilder = new StringBuilder();
            var stringBuilderContent = new StringBuilder();
            const string templateContent = "- {0}/{1}: {2}.";
            var languageContent = problemsAccounts.FirstOrDefault().IsVip ? Language.vi_VN : Language.zh_CN;
            var template = commonFeedback.GetFeedbackTemplates<SolutionTemplate>(templateXml);
            var templateYNSC = problemsAccounts.FirstOrDefault().IsVip ? template.SolutionENYN : template.SolutionENSC;
            var groupCategoryProblemsAccount = problemsAccounts.GroupBy(x => x.CategoryID);
            foreach (var categoryProblemAccount in groupCategoryProblemsAccount)
            {
                var categoryNameEN = commonFeedback.GetCategogyName(categoryProblemAccount.Key.ToString(), Language.en_US);
                var categoryNameYNSC = commonFeedback.GetCategogyName(categoryProblemAccount.Key.ToString(), languageContent);
                var distinctUserName = categoryProblemAccount.GroupBy(x => x.UserName).Select(group => group.First()).ToList();
                var listUserNames = string.Join(", ", distinctUserName.Select(x => x.UserName));
                stringBuilderContent.AppendFormat(templateContent, categoryNameEN, categoryNameYNSC, listUserNames);
                stringBuilderContent.Append(Constants.Break);
            }
            stringBuilder.AppendFormat(templateYNSC, stringBuilderContent, Constants.LineBreak);
            return stringBuilder.ToString();
        }

        protected internal virtual string GetDescription()
        { 
            var stringBuilder = new StringBuilder(DefaultValue.autoGenerated);
            stringBuilder.Append(Constants.Break);
            stringBuilder.Append("Announcement sent to Headline and informed our related department marked their member as problem account.");
            stringBuilder.Append(Constants.LineBreak);
            return stringBuilder.ToString();
        }

        protected internal virtual async Task<CommandResult> EditSystemSettingAsync(string JobStatusNameEnv, 
            string LastRuntimeNameEnv, string JobStatusValue)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = JobStatusNameEnv, Value = JobStatusValue},
                new SystemSettingItem { SettingName = LastRuntimeNameEnv, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
            };
            return await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_ProblemsAccount);
        }

        protected internal virtual async Task<CommandResult> EditSystemSettingUpdateLastLogIdAsync(string JobStatusNameEnv, string LastRuntimeNameEnv,
            string lastLogIdName, int maxLastLogId)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = JobStatusNameEnv, Value = JobStatus.Completed },
                new SystemSettingItem { SettingName = LastRuntimeNameEnv, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                new SystemSettingItem { SettingName = lastLogIdName, Value = maxLastLogId.ToString() },
            };
            return await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_ProblemsAccount);
        }
    }
}
