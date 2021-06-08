namespace CRM.BackgroundJob.Services
{
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
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;

    public interface IResultAmendmentService
    {
        Task CreateFeedbackForResultAmendmentAsync(ResultAmendmentSetting resultAmendmentSetting, bool isUAT,
            DateTime LastRuntimeEnv, string LastRuntimeNameEnv,
            string JobStatusNameEnv, string Environment);
    }

    public class ResultAmendmentService : IResultAmendmentService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly IFeedbackTransactionService transactionService;

        private readonly string descTemplateXml = "AmendmentDescriptionTemplate.xml";
        private readonly string solTemplateXml = "AmendmentSolutionTemplate.xml";
        private readonly int SportType180 = 180;
        private readonly int SportType186 = 186;
        private readonly int EventType2 = 2;
        private readonly int EventType9 = 9;

        public ResultAmendmentService(
           IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ICustomerService customerService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback,
            IFeedbackTransactionService transactionService
            )
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.customerService = customerService;
            this.logService = logService;
            this.commonFeedback = commonFeedback;
            this.transactionService = transactionService;
        }

        public async Task CreateFeedbackForResultAmendmentAsync(ResultAmendmentSetting resultAmendmentSetting, bool isUAT,
            DateTime LastRuntimeEnv, string LastRuntimeNameEnv,
            string JobStatusNameEnv, string Environment)
        {
            await commonFeedback.EditSystemSettingAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Running, Constants.ServiceName_ResultAmendment);

            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);

            IEnumerable<CusReachAmendmentNotification> custAmendmentNotifications = await customerService.GetListResultAmendmentNotificationAsync(resultAmendmentSetting);
            var isAnyNotCompeleteStatus = custAmendmentNotifications.Any(x => x.Status != "Completed");
            if (isAnyNotCompeleteStatus)
            {
                logService.LogInformation("Data has some status not completed");
                await commonFeedback.EditSystemSettingAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Completed, Constants.ServiceName_ResultAmendment);
                return;
            }
            try
            {
                CommandResult commandResultAmendment = await transactionService.InserAmendmentNotiAutoFeedback(custAmendmentNotifications, Environment);
                if (commandResultAmendment.IsSuccessful)
                {
                    var lastLogIdName = isUAT ? "LastTicketIDUAT" : "LastTicketID";
                    var LastTicketIdSetting = isUAT ? resultAmendmentSetting .LastLogIdUAT: resultAmendmentSetting.LastTicketID;
                    logService.LogInformation("Insert Amendment Notification Auto FeedBack Successfull!");
                    var maxTicketID = custAmendmentNotifications.Any() ? custAmendmentNotifications.Max(x => x.TicketId) : LastTicketIdSetting;
                    await commonFeedback.EditSystemSettingUpdateLastLogIdAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, lastLogIdName, maxTicketID, Constants.ServiceName_ResultAmendment);
                }
                else
                {
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
                await commonFeedback.EditSystemSettingAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Completed, Constants.ServiceName_ResultAmendment);
                return;
            }

            foreach (AmendmentAutoFeedbackInfor amendment in amendmentAutoFeedbackInfors)
            {
                await CreateResultAmendmentFeedbackCreditAsync(
                        amendment,
                        settings,
                        settingMappings);
            }

            await commonFeedback.EditSystemSettingAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Completed, Constants.ServiceName_ResultAmendment);
            logService.LogInformation("end service result amendment serivce!");
        }

        protected internal virtual async Task CreateResultAmendmentFeedbackCreditAsync(
            AmendmentAutoFeedbackInfor amendment,
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
            var category = GetCategorySubCategoryResultAmendment(settings, DefaultValue.ResultAmended);

            var messageContent = await transactionService.GetMessageContentInfoAsync(amendment.MessageId);
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
                Solution = GetAmenmendSolution(amendment, messageContent),
                RelatedCustomerXml = GetAmendmentRelatedCustomerXml(amendment),
                ListOrigCustIds = amendment.affectedId,
                AmendmentLogID = amendment.LogId,
                Description = GetAmendmentDescription(amendment)
            };
            logService.LogInformation("end create result amendment criteria!!!");
            await CheckValidAmendmentParamsAndInsertFeedbackAsync(amendment, criteria);
        }

        protected internal virtual async Task CheckValidAmendmentParamsAndInsertFeedbackAsync(
            AmendmentAutoFeedbackInfor amendment,
            CreateMutipleFeedbackCommand criteria)
        {
            logService.LogInformation("Begin CheckValidAmendmentParamsAndInsertFeedbackAsync!!!");

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
            logService.LogInformation("End CheckValidAmendmentParamsAndInsertFeedbackAsync!!!");
        }

        protected internal virtual string GetAmendmentProductXml(
            int sportTypeId,
            int productId,
            List<string> betTypeMappings,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            SettingItem product = GetAmenmentProduct(settings, settingMappings, productId);
            IList<SettingItem> subProducts = GetAmendmentSubProduct(product.SettingId, sportTypeId, settings, settingMappings);
            IList<SystemSettingMapping> tempBettypes = GetAmendmentBettype(betTypeMappings, settingMappings);
            logService.LogInformation("Begin mapping product, sub-product, bet type Result Amendment.");

            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            foreach (SettingItem subProduct in subProducts)
            {
                if (tempBettypes.Any())
                {
                    foreach (SystemSettingMapping bettype in tempBettypes)
                    {
                        stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, subProduct.SettingId, bettype.SettingId);
                    }
                }
                else
                {
                    stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, subProduct.SettingId, Constants.BettypeNA);
                }
            }
            logService.LogInformation("end mapping product, sub-product, bet type Result Amendment.");
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual SettingItem GetAmenmentProduct(
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings,
            int productId)
        {
            logService.LogInformation(string.Format("Begin mapping amenment product with productId:{0}.", productId));

            var productName = commonFeedback.GetProductName(productId.ToString(), Language.en_US);
            SystemSettingMapping productMapping = settingMappings.FirstOrDefault(p => p.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(p.SettingSource)
                && p.SettingSource.Equals(productName, StringComparison.OrdinalIgnoreCase));

            var product = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && productMapping != null
                && x.SettingId == productMapping.SettingId);

            logService.LogInformation("End mapping amenment product.");

            return product ?? new SettingItem { SettingId = Constants.ProductNA };
        }

        protected internal virtual IList<SettingItem> GetAmendmentSubProduct(
            int productId,
            int sportTypeId,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation(string.Format("Begin mapping amenment subproduct with productId:{0}, sportTypeId: {1}.", productId, sportTypeId));
            var sportName = commonFeedback.GetSportName(sportTypeId.ToString(), Language.en_US);
            List<SystemSettingMapping> mappings = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && mapping.SettingSource.Equals(sportName, StringComparison.OrdinalIgnoreCase)).ToList();
            List<SettingItem> subProducts = settings.Where(sub => sub.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && sub.ParentIds.Any(parent => parent == productId)
                && mappings != null
                && mappings.Any(mapping => mapping.SettingId == sub.SettingId)).ToList();
            logService.LogInformation("End mapping amenment subproduct.");

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
            logService.LogInformation("Begin mapping amenment betType.");
            IList<SystemSettingMapping> bettypes = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && betTypeMappings.Any(name => name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();
            logService.LogInformation("End mapping amenment betType.");
            return bettypes != null && bettypes.Any()
                ? bettypes.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = Constants.BettypeNA }
                };
        }

        protected internal virtual Tuple<int, int, string> GetCategorySubCategoryResultAmendment(IEnumerable<SettingItem> settings, string settingValueName)
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
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);

            if (string.IsNullOrEmpty(amendment.affectedId))
            {
                return stringBuilder.Append(Constants.EndRootTag).ToString();
            }
            var relateCustIds = amendment.affectedId.Split(",");
            var userNames = amendment.affectedName.Split(",");
            const string XmlTemplate = DefaultValue.RelatedCustomerXml;
            for (int i = 0; i < relateCustIds.Count(); i++)
            {
                stringBuilder.AppendFormat(XmlTemplate, amendment.HeadlineId, relateCustIds[i], userNames[i]);
            }
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual string GetAmendmentDescription(AmendmentAutoFeedbackInfor amendment)
        {
            logService.LogInformation("Begin create template desctiption Result Amendment.");
            var stringBuilder = new StringBuilder(DefaultValue.autoGenerated);
            stringBuilder.Append(Constants.Break);
            var amendmentDescTemplate = commonFeedback.GetFeedbackTemplates<AmendmentDescriptionTemplate>(descTemplateXml);
            var productName = commonFeedback.GetProductName(amendment.ProductId.ToString(), Language.en_US);
            logService.LogInformation(string.Format("Begin create template desctiption productName: {0}.", productName));
            var sportName = commonFeedback.GetSportName(amendment.Sporttype.ToString(), Language.en_US);
            var leagueName = commonFeedback.GetLeagueName(amendment.LeagueId.ToString(), Language.en_US);
            var homeName = commonFeedback.GetTeamName(amendment.HomeId.ToString(), Language.en_US);
            var awayName = commonFeedback.GetTeamName(amendment.Awayid.ToString(), Language.en_US);

            var EventdateGMT4Format = amendment.Eventdate.ToString(DefaultValue.FortmatddmmmyyyyDash);
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var kO_time = amendment.KO_time.Add(timeSpan).ToString(DefaultValue.Formathhmmtt);
            var race_time = amendment.Race_time.Add(timeSpan).ToString(DefaultValue.Formathhmmtt);
            var matchCodeReplace = GetMatchCoddFormat(amendment.MatchCode, Language.en_US);

            var virtualSports = GetAmendmentDescriptionVirtualSports(
                amendment, amendmentDescTemplate, sportName,
                homeName, awayName, race_time, EventdateGMT4Format);
            var numberGame = GetAmendmentDescriptionNumberGame(
             amendment.MatchCode, amendmentDescTemplate, leagueName, EventdateGMT4Format);
            var outright = GetAmendmentDescriptionSportOutRight(
                amendment.Leaguenametc, amendmentDescTemplate, kO_time, leagueName, homeName);
            switch (productName)
            {
                case "Sportsbook":
                    if (amendment.EventType == EventType2 || amendment.EventType == EventType9)
                    {
                        stringBuilder.Append(outright);
                        break;
                    }
                    else
                    {
                        stringBuilder.AppendFormat(
                        amendmentDescTemplate.Sportsbook,
                           EventdateGMT4Format,
                           sportName,
                           kO_time,
                           leagueName,
                           homeName,
                           awayName,
                           Constants.Break
                        );
                        break;
                    }
                case "Virtual Sports 2":
                    stringBuilder.AppendFormat(
                        amendmentDescTemplate.VirtualSports2,
                           EventdateGMT4Format,
                           sportName,
                           kO_time,
                           matchCodeReplace,
                           homeName,
                           awayName,
                           Constants.Break
                        );
                    break;

                case "Virtual Sports":
                    stringBuilder.Append(virtualSports);
                    break;

                case "Number Game":
                    stringBuilder.Append(numberGame);
                    break;

                default:
                    stringBuilder.Append("");
                    break;
            }

            stringBuilder.Append(Constants.Break);
            logService.LogInformation("End create template desctiption Result Amendment");
            return stringBuilder.ToString();
        }

        protected internal virtual StringBuilder GetAmendmentDescriptionVirtualSports(
            AmendmentAutoFeedbackInfor amendment,
            AmendmentDescriptionTemplate amendmentDescTemplate,
            string sportName,
            string homeName,
            string awayName,
            string Race_time,
            string EventdateGMT4
            )
        {
            logService.LogInformation("Begin create template desctiption virtual sport.");

            var stringBuilder = new StringBuilder();
            if (amendment.Sporttype == SportType180 || amendment.Sporttype == SportType186)
            {
                stringBuilder.AppendFormat(
                amendmentDescTemplate.VirtualSports180186,
                  EventdateGMT4,
                  sportName,
                  homeName,
                  awayName,
                  Constants.Break
               );
            }
            else
            {
                stringBuilder.AppendFormat(
                amendmentDescTemplate.VirtualSports181To185,
                  EventdateGMT4,
                  sportName,
                  Race_time,
                  Constants.Break
               );
            }

            logService.LogInformation("End create template desctiption virtual sport.");

            return stringBuilder;
        }

        protected internal virtual StringBuilder GetAmendmentDescriptionNumberGame(
            string MatchCode,
            AmendmentDescriptionTemplate amendmentDescTemplate,
            string leagueName,
            string EventdateGMT4
            )
        {
            logService.LogInformation("Begin create template desctiption number game.");

            var stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat(
                amendmentDescTemplate.NumberGame,
                  EventdateGMT4,
                  leagueName,
                  MatchCode,
                  Constants.Break
               );
            logService.LogInformation("End create template desctiption number game.");

            return stringBuilder;
        }

        protected internal virtual StringBuilder GetAmendmentDescriptionSportOutRight(
            string Leaguenametc,
            AmendmentDescriptionTemplate amendmentDescTemplate,
            string kO_time,
            string leagueName,
            string homeName
            )
        {
            logService.LogInformation("Begin create template desctiption number game.");

            var stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat(
                amendmentDescTemplate.SportsbookOutright,
                Leaguenametc,
                kO_time,
                leagueName,
                homeName,
                Constants.Break
               );
            logService.LogInformation("End create template desctiption number game.");

            return stringBuilder;
        }

        protected internal virtual string GetAmenmendSolution(AmendmentAutoFeedbackInfor amendment, IEnumerable<Message> messageContent)
        {
            logService.LogInformation("Begin create template solution.");

            var amendmentSolTemplate = commonFeedback.GetFeedbackTemplates<AmendmentSolutionTemplate>(solTemplateXml);
            var isVipCust = amendment.Site == "789y" && amendment.IsVip;
            var stringBuilder = new StringBuilder();
            var solutionTemplateEN = GetAmendmentSolutionTemplateEN(amendment, amendmentSolTemplate, messageContent);
            var solutionTemplateSC = GetAmendmentSolutionTemplateYNSC(amendment, amendmentSolTemplate, messageContent, isVipCust);

            stringBuilder.Append(solutionTemplateEN);
            stringBuilder.Append(solutionTemplateSC);
            logService.LogInformation("End create template solution.");
            return stringBuilder.ToString();
        }

        protected internal virtual StringBuilder GetAmendmentSolutionTemplateEN(
           AmendmentAutoFeedbackInfor amendment,
           AmendmentSolutionTemplate amendmentSolTemplate,
           IEnumerable<Message> messageContent)
        {
            logService.LogInformation("begin create template desctiption EN");
            var stringBuilder = new StringBuilder();
            var productName = commonFeedback.GetProductName(amendment.ProductId.ToString(), Language.en_US);
            var sportName = commonFeedback.GetSportName(amendment.Sporttype.ToString(), Language.en_US);
            var leagueName = commonFeedback.GetLeagueName(amendment.LeagueId.ToString(), Language.en_US);
            var homeName = commonFeedback.GetTeamName(amendment.HomeId.ToString(), Language.en_US);
            var awayName = commonFeedback.GetTeamName(amendment.Awayid.ToString(), Language.en_US);
            var matchCode = commonFeedback.GetMatchCode(amendment.MatchCode, Language.en_US);
            var Eventdate = amendment.Eventdate.ToString(DefaultValue.Formatddmm);
            var matchCodeReplace = GetMatchCoddFormat(amendment.MatchCode, Language.en_US);
            var outRightMessageEn = messageContent?.FirstOrDefault()?.Content_en;
            switch (productName)
            {
                case "Sportsbook":
                    if (amendment.EventType == EventType2 || amendment.EventType == EventType9)
                    {
                        stringBuilder.AppendFormat(amendmentSolTemplate.OutrightEN,
                            outRightMessageEn,
                            amendment.affectedName,
                            Constants.LineBreak);
                        break;
                    }
                    stringBuilder.AppendFormat(amendmentSolTemplate.SportsbookEN,
                        sportName,
                        homeName,
                        awayName,
                        leagueName,
                        Eventdate,
                        amendment.ActualResult,
                        amendment.WrongResult,
                        amendment.affectedName,
                        Constants.Break,
                        Constants.LineBreak);
                    break;

                case "Virtual Sports 2":
                    stringBuilder.AppendFormat(
                        amendmentSolTemplate.VirtualSports2EN,
                            homeName,
                            awayName,
                            sportName,
                            matchCodeReplace,
                            Eventdate,
                            amendment.ActualResult,
                            amendment.WrongResult,
                            amendment.affectedName,
                            Constants.Break,
                            Constants.LineBreak);
                    break;

                case "Virtual Sports":
                    stringBuilder.AppendFormat(amendmentSolTemplate.VirtualSportsEN,
                        sportName,
                        amendment.affectedName,
                        Constants.LineBreak);
                    break;

                case "Number Game":
                    stringBuilder.AppendFormat(amendmentSolTemplate.NumberGameEN,
                        sportName,
                        matchCode,
                        Eventdate,
                        amendment.affectedName,
                        Constants.LineBreak);
                    break;

                default:
                    stringBuilder.Append("");
                    break;
            }

            logService.LogInformation("end create template desctiption EN");

            return stringBuilder;
        }

#pragma warning disable S1541 // Methods and properties should not be too complex
        protected internal virtual StringBuilder GetAmendmentSolutionTemplateYNSC(
#pragma warning restore S1541 // Methods and properties should not be too complex
            AmendmentAutoFeedbackInfor amendment,
            AmendmentSolutionTemplate amendmentSolTemplate,
            IEnumerable<Message> messageContent,
            bool isVipCust)
        {
            logService.LogInformation("begin create template desctiption SCYN");
            var stringBuilder = new StringBuilder();
            var productName = commonFeedback.GetProductName(amendment.ProductId.ToString(), Language.en_US);
            var Eventdate = amendment.Eventdate.ToString(DefaultValue.Formatddmm);
            var sportNameYN = commonFeedback.GetSportName(amendment.Sporttype.ToString(), Language.vi_VN);
            var leagueNameYN = commonFeedback.GetLeagueName(amendment.LeagueId.ToString(), Language.vi_VN);
            var homeNameYN = commonFeedback.GetTeamName(amendment.HomeId.ToString(), Language.vi_VN);
            var awayNameYN = commonFeedback.GetTeamName(amendment.Awayid.ToString(), Language.vi_VN);
            var matchCodeReplaceYN = GetMatchCoddFormat(amendment.MatchCode, Language.vi_VN);
            var sportNameSC = commonFeedback.GetSportName(amendment.Sporttype.ToString(), Language.zh_CN);
            var leagueNameSC = commonFeedback.GetLeagueName(amendment.LeagueId.ToString(), Language.zh_CN);
            var homeNameSC = commonFeedback.GetTeamName(amendment.HomeId.ToString(), Language.zh_CN);
            var awayNameSC = commonFeedback.GetTeamName(amendment.Awayid.ToString(), Language.zh_CN);
            var matchCodeReplaceSC = GetMatchCoddFormat(amendment.MatchCode, Language.zh_CN);

            var sportBook = GetAmendmentSolutionTemplateYnSportBook(
                            amendment, amendmentSolTemplate, messageContent,
                            sportNameYN, homeNameYN, awayNameYN, leagueNameYN, Eventdate);
            var virtualSports = GetAmendmentSolutionTemplateYnScVirtualSport(amendment.affectedName, amendmentSolTemplate,
                                isVipCust, sportNameYN, sportNameSC);
            var numberGame = GetAmendmentSolutionTemplateYnScNumberGame(
                            amendment.MatchCode, amendment.affectedName, amendmentSolTemplate, isVipCust,
                            leagueNameYN, Eventdate, leagueNameSC);
            switch (productName)
            {
                case "Sportsbook":
                    if (isVipCust)
                    {
                        stringBuilder.Append(sportBook);
                    }
                    else
                    {
                        if (amendment.EventType == EventType2 || amendment.EventType == EventType9)
                        {
                            var outRightMessageSc = messageContent?.FirstOrDefault()?.Content_cs;
                            stringBuilder.AppendFormat(amendmentSolTemplate.OutrightSC,
                            outRightMessageSc,
                            amendment.affectedName,
                            Constants.LineBreak);
                        }
                        else
                        {
                            stringBuilder.AppendFormat(amendmentSolTemplate.SportsbookSC, sportNameSC, homeNameSC, awayNameSC,
                            leagueNameSC, Eventdate, amendment.ActualResult, amendment.WrongResult,
                            amendment.affectedName, Constants.Break, Constants.LineBreak);
                        }
                    }
                    break;

                case "Virtual Sports 2":
                    if (isVipCust)
                    {
                        stringBuilder.AppendFormat(amendmentSolTemplate.VirtualSports2YN, homeNameYN, awayNameYN, sportNameYN,
                        matchCodeReplaceYN, Eventdate, amendment.ActualResult, amendment.WrongResult, amendment.affectedName, Constants.Break, Constants.LineBreak);
                    }
                    else
                    {
                        stringBuilder.AppendFormat(amendmentSolTemplate.VirtualSports2SC, homeNameSC, awayNameSC, sportNameSC, matchCodeReplaceSC,
                        Eventdate, amendment.ActualResult, amendment.WrongResult, amendment.affectedName, Constants.Break, Constants.LineBreak);
                    }
                    break;

                case "Virtual Sports":
                    stringBuilder.Append(virtualSports);
                    break;

                case "Number Game":
                    stringBuilder.Append(numberGame);
                    break;

                default:
                    stringBuilder.Append("");
                    break;
            }
            logService.LogInformation("End create template desctiption YNSC");
            return stringBuilder;
        }

#pragma warning disable S107 // Methods should not have too many parameters

        protected internal virtual StringBuilder GetAmendmentSolutionTemplateYnSportBook(
          AmendmentAutoFeedbackInfor amendment,
          AmendmentSolutionTemplate amendmentSolTemplate,
          IEnumerable<Message> messageContent,
          string sportNameYN,
          string homeNameYN,
          string awayNameYN,
          string leagueNameYN,
          string Eventdate)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            var stringBuilder = new StringBuilder();
            if (amendment.EventType == EventType2 || amendment.EventType == EventType9)
            {
                var outRightMessageYn = messageContent?.FirstOrDefault()?.Content_vn;
                stringBuilder.AppendFormat(amendmentSolTemplate.OutrightYN,
                outRightMessageYn,
                amendment.affectedName,
                Constants.LineBreak);
            }
            stringBuilder.AppendFormat(amendmentSolTemplate.SportsbookYN, sportNameYN, homeNameYN, awayNameYN,
            leagueNameYN, Eventdate, amendment.ActualResult, amendment.WrongResult, amendment.affectedName, Constants.Break, Constants.LineBreak);
            return stringBuilder;
        }

        protected internal virtual StringBuilder GetAmendmentSolutionTemplateYnScVirtualSport(
          string affectedName,
          AmendmentSolutionTemplate amendmentSolTemplate,
          bool isVipCust,
          string sportNameYN,
          string sportNameSC)
        {
            var stringBuilder = new StringBuilder();
            if (isVipCust)
            {
                stringBuilder.AppendFormat(amendmentSolTemplate.VirtualSportsYN,
                sportNameYN,
                affectedName,
                Constants.LineBreak
                );
            }
            else
            {
                stringBuilder.AppendFormat(amendmentSolTemplate.VirtualSportsSC,
                sportNameSC,
                affectedName,
                Constants.LineBreak
                );
            }
            return stringBuilder;
        }

        protected internal virtual StringBuilder GetAmendmentSolutionTemplateYnScNumberGame(
          string MatchCode,
          string affectedName,
          AmendmentSolutionTemplate amendmentSolTemplate,
          bool isVipCust,
          string leagueNameYN,
          string Eventdate,
          string leagueNameSC)
        {
            var stringBuilder = new StringBuilder();
            if (isVipCust)
            {
                stringBuilder.AppendFormat(amendmentSolTemplate.NumberGameYN, leagueNameYN, MatchCode,
                Eventdate, affectedName, Constants.LineBreak);
            }
            else
            {
                stringBuilder.AppendFormat(amendmentSolTemplate.NumberGameSC, leagueNameSC, MatchCode, Eventdate,
                affectedName, Constants.LineBreak);
            }
            return stringBuilder;
        }

        protected internal virtual string GetMatchCoddFormat(string matchCode, string language)
        {
            var MatchCodeReplace = matchCode;
            if (!string.IsNullOrEmpty(matchCode))
            {
                const string pattern = @"({[^}]*})";
                var regex = Regex.Matches(matchCode, pattern);
                var matchCodeRegexId = regex.Cast<Match>().Select(m => m.Groups[1].Value).ToList();
                foreach (var matchCodeId in matchCodeRegexId)
                {
                    var matchCodeName = commonFeedback.GetMatchCode(matchCodeId, language);
                    MatchCodeReplace = MatchCodeReplace.Replace(matchCodeId, matchCodeName);
                }
            }
            return MatchCodeReplace;
        }
    }
}