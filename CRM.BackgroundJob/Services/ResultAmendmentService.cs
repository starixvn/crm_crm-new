namespace CRM.BackgroundJob.Services
{
    using CRM.BackgroundJob.Criteria.ResultAmendment;
    using CRM.BackgroundJob.Models.ResultAmendment;
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

    public interface IResultAmendmentService
    {
        Task CreateFeedbackForResultAmendmentAsync(ResultAmendmentSetting resultAmendmentSetting);
    }
    public class ResultAmendmentService : IResultAmendmentService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly IWinLossTransactionService transactionService;

        //private readonly string descTemplateXml = "TODesctiptionTemplate.xml";
        //private readonly string solTemplateXml = "TOSolutionTemplate.xml";

#pragma warning disable S107 // Methods should not have too many parameters

        public ResultAmendmentService(
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
        public async Task CreateFeedbackForResultAmendmentAsync(ResultAmendmentSetting resultAmendmentSetting)
        {
            logService.LogInformation(string.Format("Start run result amendment serivce with last LastLogID: {0}!", resultAmendmentSetting.LastLogId));

            var settingJobStatus = new List<SystemSettingItem>
                {
                    new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                    new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                };

            await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_ResultAmendment);

            logService.LogInformation("After Edit job Result Amendment!");

            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);

            IEnumerable<CusReachAmendmentNotification> custAmendmentNotifications = await customerService.GetListResultAmendmentNotificationAsync(resultAmendmentSetting);
            try
            {
                CommandResult commandResultAmendment = await transactionService.InserAmendmentNotiAutoFeedback(custAmendmentNotifications);
                if (commandResultAmendment.IsSuccessful) {
                    logService.LogInformation("Insert Amendment Notification Auto FeedBack Successfull!");
                    var maxTicketID = custAmendmentNotifications.Any() ? custAmendmentNotifications.Max(x => x.TicketId) : resultAmendmentSetting.LastLogId;
                    await commonFeedback.EditAmendmentFeedbackSystemSettingAsync(maxTicketID, Constants.ServiceName_ResultAmendment);
                }
                else {
                    logService.LogInformation("Insert Amendment Notification Auto FeedBack Fail!");
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }

            IEnumerable<AmendmentAutoFeedbackInfor> amendmentAutoFeedbackInfors = await transactionService.GetAmendmentNotiAutoFeedbackInfor(resultAmendmentSetting.BatchSize);
            if (!amendmentAutoFeedbackInfors.Any())
            {
                logService.LogInformation(string.Format("Import Amendment Auto Feedback Infor doesn't have any data with custId: {0} TicketId: {1}!",
                    string.Join(",", custAmendmentNotifications.Select(x => x.CustId)), string.Join(",", custAmendmentNotifications.Select(x => x.TicketId))));
                return;
            }

            foreach (AmendmentAutoFeedbackInfor amendment in amendmentAutoFeedbackInfors)
            {
                var isVipHeadline = amendment.Site == "789y" && amendment.IsVip;
                await CreateResultAmendmentFeedbackCreditAsync(
                        amendment,
                        isVipHeadline,
                        settings,
                        settingMappings);
            }
        }

        protected internal virtual async Task CreateResultAmendmentFeedbackCreditAsync(
            AmendmentAutoFeedbackInfor amendment,
            bool isVipHeadline,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation(string.Format("Start create amendment feedback logId: {0} , headlineName: {1} productId: {2}!"
                , amendment.LogId, amendment.HeadlineName, amendment.ProductId));
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Closed, StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(DefaultValue.Neutral, StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);
            var bettypeSplits = amendment.Listbettype.Split(",");
            var betTypeMappings = new List<string>();
            foreach (var betType in bettypeSplits.Distinct().ToList())
            {
                var betTypeName = commonFeedback.GetBettypeName(betType, Language.en_US);
                betTypeMappings.Add(betTypeName);
            }
            var category = GetCategorySubCategoryCWL(settings, DefaultValue.ResultAmended);
            logService.LogInformation("Begin create result amendment criteria!!!");
            var criteria = new CreateMutipleFeedbackCommand
            {
                FeedbackDate = feedbackDate.Subtract(timeSpan),
                ResolutionDate = feedbackDate.AddMinutes(1).Subtract(timeSpan),
                CreatorId = appSettings.CreatorId,
                UserId = appSettings.CreatorId,
                IsCheckedDefaultComm = true,
                StationId = station != null ? station.SettingId.ToString() : string.Empty,
                StatusId = status != null ? status.SettingId : 0,
                CategoryXml = category.Item3,
                CategoryIds = category.Item1.ToString(),
                SubCategoryIds = category.Item2.ToString(),
                ResponseId = response != null ? response.SettingId : 0,
                UserRole = Constants.UserRole,
                Subject = DefaultValue.Special_Notification,
                AutoField2 = string.Format(DefaultValue.DateTimeTool, feedbackDate.ToString("yyyyMMdd"), feedbackDate.ToString("hh:mmtt")),
                AutoField = string.Empty,
                AutoField1 = string.Empty,
                AutoField3 = $"{Environment.NewLine}System ID: ",
                CustomerXml = string.Format(DefaultValue.CustomerXml, amendment.HeadlineId, amendment.HeadlineName),
                ProductXml = GetAmendmentProductXml(amendment.Sporttype, amendment.ProductId, betTypeMappings, settings, settingMappings),
               //Solution = GetTOSolution(ToInfor),
                RelatedCustomerXml = GetAmendmentRelatedCustomerXml(amendment),
                ListOrigCustIds = amendment.affectedId,
                AmendmentLogID = amendment.LogId,
               //Description = GetTODescription(ToInfor)
            };
            logService.LogInformation("end create result amendment criteria!!!");
            await CheckValidAmendmentParamsAndInsertFeedbackAsync(amendment, criteria);
        }

        protected internal virtual async Task CheckValidAmendmentParamsAndInsertFeedbackAsync(
            AmendmentAutoFeedbackInfor amendment,
            CreateMutipleFeedbackCommand criteria)
        {
            logService.LogInformation("Begin CheckValidTOParamsAndInsertFeedbackAsync!!!");

            var checkValidParamBeforeInsert = commonFeedback.CheckFeedbackValidParams(criteria);
            if (!checkValidParamBeforeInsert.Item1)
            {
                var messageInvalid = "Invalid Params: " + checkValidParamBeforeInsert.Item2;
                logService.LogInformation(string.Format("Invalid Params. @Categorystr: {0} @Category: {1} @Product: {2} @StatusID: {3} @SubCategorystr:{4} @ResponseID:{5} @StationID:{6}",
                        criteria.CategoryIds, criteria.CategoryXml, criteria.ProductXml, criteria.StatusId, criteria.SubCategoryIds, criteria.ResponseId, criteria.StationId));
                await transactionService.EditAmendmentNotiAutoFeedback(amendment.LogId, CreateFeedbackJobStatus.Fail, messageInvalid);
                return;
            }
            try
            {
                logService.LogInformation(string.Format("Begin insert amendment feedback : HeadlineId {0} HeadlineName:{1} CustName: {2} CustId: {3}",
                    amendment.HeadlineId, amendment.HeadlineName, amendment.affectedName, amendment.affectedId));

                CommandResult commandResult = await baseService.ExecuteNonQueryAsync(criteria);
                if (commandResult.IsSuccessful)
                {
                    logService.LogInformation(string.Format("Create amendment feedback successfully HeadlineId {0} HeadlineName:{1}",
                    amendment.HeadlineId, amendment.HeadlineName));
                }
                else
                {
                    logService.LogInformation(string.Format("Create amendment feedback Faild HeadlineId {0} HeadlineName:{1}",
                    amendment.HeadlineId, amendment.HeadlineName));

                    await transactionService.EditAmendmentNotiAutoFeedback(amendment.LogId, CreateFeedbackJobStatus.Fail, commandResult.Message);
                    await logService.ErrorAsync(commandResult, criteria);
                }
            }
            catch (Exception ex)
            {
                await transactionService.EditAmendmentNotiAutoFeedback(amendment.LogId, CreateFeedbackJobStatus.Fail, ex.Message);
                await logService.ErrorAsync(ex);
            }
            logService.LogInformation("End CheckValidTOParamsAndInsertFeedbackAsync!!!");
        }

        protected internal virtual string GetAmendmentProductXml(
            int sportTypeId,
            int productId,
            List<string> betTypeMappings,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {

            IList<SettingItem> subProducts = GetAmendmentSubProduct(productId, sportTypeId, settings, settingMappings);
            SettingItem product = GetAmenmentProduct(settings, settingMappings, productId);
            IList<SystemSettingMapping> tempBettypes = GetAmendmentBettype(betTypeMappings, settingMappings);


            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            foreach (SettingItem subProduct in subProducts)
            {
                if (tempBettypes.Any())
                {
                    logService.LogInformation("begin mapping bettype");
                    foreach (SystemSettingMapping bettype in tempBettypes)
                    {
                        stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, subProduct.SettingId, bettype.SettingId);
                    }
                    logService.LogInformation("end mapping bettype");
                }
                else
                {
                    logService.LogInformation("mapping N/A bettype");
                    stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, subProduct.SettingId, Constants.BettypeNA);
                }
            }
            logService.LogInformation("end mapping product, sub-product, bet type.");
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual SettingItem GetAmenmentProduct(
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings,
            int productId)
        {
            var productName = commonFeedback.GetProductName(productId.ToString(), Language.en_US);
            SystemSettingMapping productMapping = settingMappings.FirstOrDefault(p => p.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(p.SettingSource)
                && p.SettingSource.Equals(productName, StringComparison.OrdinalIgnoreCase));

            var product = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && productMapping != null
                && x.SettingId == productMapping.SettingId);

            return product ?? new SettingItem { SettingId = Constants.ProductNA };
        }

        protected internal virtual IList<SettingItem> GetAmendmentSubProduct(
            int productId,
            int sportTypeId,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            var sportName = commonFeedback.GetSportName(sportTypeId.ToString(), Language.en_US);
            List<SystemSettingMapping> mappings = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && mapping.SettingSource.Equals(sportName, StringComparison.OrdinalIgnoreCase)).ToList();
            List<SettingItem> subProducts = settings.Where(sub => sub.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && sub.ParentIds.Any(parent => parent == productId)
                && mappings != null
                && mappings.Any(mapping => mapping.SettingId == sub.SettingId)).ToList();

            return subProducts.Any()
                ? subProducts.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SettingItem>
                {
                    new SettingItem { SettingId = Constants.SubProductNA, ParentIds = new List<int> { Constants.ProductNA } }
                };
        }

        protected internal virtual IList<SystemSettingMapping> GetAmendmentBettype(
            List<string> betTypeMappings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            IList<SystemSettingMapping> bettypes = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && betTypeMappings.Any(name => name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();

            return bettypes != null && bettypes.Any()
                ? bettypes.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = Constants.BettypeNA }
                };
        }

        protected internal virtual Tuple<int, int, string> GetCategorySubCategoryCWL(IEnumerable<SettingItem> settings, string settingValueName)
        {
            var category = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.MainCategory, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(settingValueName, StringComparison.OrdinalIgnoreCase));
            var subCategoryId = 0;

            if (category != null)
            {
                var subCategory = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.SubCategory, StringComparison.OrdinalIgnoreCase)
                    && x.SettingId == 4029);
                subCategoryId = subCategory != null ? subCategory.SettingId : 0;
            }

            return new Tuple<int, int, string>(
                category != null ? category.SettingId : 0, subCategoryId,
                string.Format(DefaultValue.CategoryXml,
                    category != null ? category.SettingId : 0,
                    subCategoryId));
        }

        protected internal virtual string GetAmendmentRelatedCustomerXml(AmendmentAutoFeedbackInfor amendment)
        {
            var relateCustIds = amendment.affectedId.Split(",");
            var userNames = amendment.affectedName.Split(",");
            const string XmlTemplate = DefaultValue.RelatedCustomerXml;
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            for(int i = 0; i < relateCustIds.Count(); i++)
            {
                stringBuilder.AppendFormat(XmlTemplate, amendment.HeadlineId, relateCustIds[i], userNames[i]);
            }
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

    }
}
