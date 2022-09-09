namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.TurnoverControll;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public interface ITOControlFeedbackService
    {
        Task CreateFeedbackForTurnoverControlAsync(WinLossSystemSetting turnOverSetting);
    }

    public class TOControlFeedbackService : ITOControlFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly IFeedbackTransactionService transactionService;

        private readonly string descTemplateXml = "TODesctiptionTemplate.xml";
        private readonly string solTemplateXml = "TOSolutionTemplate.xml";

#pragma warning disable S107 // Methods should not have too many parameters

        public TOControlFeedbackService(
            IOptions<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback,
            IFeedbackTransactionService transactionService
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

        public async Task CreateFeedbackForTurnoverControlAsync(WinLossSystemSetting turnOverSetting)
        {
            var settingJobStatus = new List<SystemSettingItem>
                {
                    new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                    new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                };

            await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_TOControlFB);
            IEnumerable<TONotification> custNotifications = await customerService.GetListSMANotificationAsync(turnOverSetting);
            var custNotificationsDistinct = custNotifications.GroupBy(item => new { item.CustID, item.MatchID })
                                                              .Select(g => g.First())
                                                              .ToList();

            IEnumerable<CustOutStanding> custOutStandings = await customerService.GetListCustOutStandingAsync(custNotificationsDistinct);
            var custIds = custOutStandings.Select(x => x.CustID);
            IEnumerable<GroupHeadline> headlines = await customerService.GetGroupHeadlineAsync(custIds);
            IEnumerable<TOControlFeedbackInfor> importTOFeedbacks = await transactionService.ImportTOControllFeedbackInfoAsync(
                headlines,
                custOutStandings,
                custNotifications);

            if (!importTOFeedbacks.Any())
            {
                logService.LogInformation(string.Format("Import doesn't have any data with custId: {0} headlineName: {1}!",
                    string.Join(",", headlines.Select(x => x.HeadlineId)), string.Join(",", headlines.Select(x => x.HeadlineName))));
                var maxLogID = custNotifications.Any() ? custNotifications.Max(x => x.LogID) : turnOverSetting.LastLogId;

                await commonFeedback.EditFeedbackSystemSettingAsync(maxLogID, Constants.ServiceName_TOControlFB);
                return;
            }

            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);

            foreach (var ToInfor in importTOFeedbacks)
            {
                await CreateTOControlFeedbackAsync(
                        ToInfor,
                        settings,
                        settingMappings);
            }
            var maxLogIdTO = importTOFeedbacks.Max(x => x.LogID);
            await commonFeedback.EditFeedbackSystemSettingAsync(maxLogIdTO, Constants.ServiceName_TOControlFB);
        }

        protected internal virtual async Task CreateTOControlFeedbackAsync(
            TOControlFeedbackInfor ToInfor,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Closed, StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(DefaultValue.Neutral, StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);
            var category = commonFeedback.GetCategorySubCategoryCWL(settings, DefaultValue.MANotification);

            var sportTypeName = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.en_US);
            var bettypeSplits = ToInfor.BettypeList.Split(",");
            var betTypeMappings = new List<string>();

            foreach (var betType in bettypeSplits.Distinct().ToList())
            {
                var betTypeName = commonFeedback.GetBettypeName(betType, Language.en_US);
                betTypeMappings.Add(betTypeName);
            }

            SettingItem sportsbook = GetTOSportsbookProduct(settings);
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
                CustomerXml = string.Format(DefaultValue.CustomerXml, ToInfor.HeadlineID, ToInfor.HeadlineName),
                ProductXml = GetTOProductXml(sportTypeName, sportsbook.SettingId, betTypeMappings, settings, settingMappings),
                Solution = GetTOSolution(ToInfor),
                RelatedCustomerXml = GetTORelatedCustomerXml(ToInfor),
                ListOrigCustIds = string.Join(",", ToInfor.CustID),
                TOControlLogID = ToInfor.LogID.ToString(),
                Description = GetTODescription(ToInfor)
            };
            await CheckValidTOParamsAndInsertFeedbackAsync(ToInfor, criteria);
        }

        protected internal virtual async Task CheckValidTOParamsAndInsertFeedbackAsync(
            TOControlFeedbackInfor ToInfor,
            CreateMutipleFeedbackCommand criteria)
        {
            var checkValidParamBeforeInsert = commonFeedback.CheckFeedbackValidParams(criteria);
            if (!checkValidParamBeforeInsert.Item1)
            {
                var messageInvalid = "Invalid Params: " + checkValidParamBeforeInsert.Item2;
                logService.LogInformation(string.Format("Invalid Params. @Categorystr: {0} @Category: {1} @Product: {2} @StatusID: {3} @SubCategorystr:{4} @ResponseID:{5} @StationID:{6}",
                        criteria.CategoryIds, criteria.CategoryXml, criteria.ProductXml, criteria.StatusId, criteria.SubCategoryIds, criteria.ResponseId, criteria.StationId));
                await transactionService.EditTOControlFeedbackInfoAsync(ToInfor.LogID.ToString(), CreateFeedbackJobStatus.Fail, messageInvalid);
                return;
            }
            try
            {
                CommandResult commandResult = await baseService.ExecuteNonQueryAsync(criteria);
                if (commandResult.IsSuccessful)
                {
                    logService.LogInformation(string.Format("Create TO feedback successfully HeadlineId {0} HeadlineName:{1} ProfileName: {2} custName: {3}",
                    ToInfor.HeadlineID, ToInfor.HeadlineName, ToInfor.ProfileName, ToInfor.UserName));
                }
                else
                {
                    logService.LogInformation(string.Format("Create TO feedback Faild HeadlineId {0} HeadlineName:{1} ProfileName: {2} custName: {3}",
                    ToInfor.HeadlineID, ToInfor.HeadlineName, ToInfor.ProfileName, ToInfor.UserName));

                    await transactionService.EditTOControlFeedbackInfoAsync(ToInfor.LogID.ToString(), CreateFeedbackJobStatus.Fail, commandResult.Message);
                    await logService.ErrorAsync(commandResult, criteria);
                }
            }
            catch (Exception ex)
            {
                await transactionService.EditTOControlFeedbackInfoAsync(ToInfor.LogID.ToString(), CreateFeedbackJobStatus.Fail, ex.Message);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual string GetTOProductXml(
            string sportName,
            int productId,
            List<string> betTypeMappings,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            IList<SettingItem> subProducts = GetTOSubProduct(productId, sportName, settings, settingMappings);
            SettingItem product = GetTOSportsbookProduct(settings);
            IList<SystemSettingMapping> tempBettypes = GetTOBettype(betTypeMappings, settingMappings);

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
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual SettingItem GetTOSportsbookProduct(IEnumerable<SettingItem> settings)
        {
            var product = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Sportsbook, StringComparison.OrdinalIgnoreCase));

            return product ?? new SettingItem { SettingId = Constants.ProductNA };
        }

        protected internal virtual IList<SettingItem> GetTOSubProduct(
            int productId,
            string sportName,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
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

        protected internal virtual IList<SystemSettingMapping> GetTOBettype(
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

        protected internal virtual string GetTORelatedCustomerXml(TOControlFeedbackInfor ToInfor)
        {
            const string XmlTemplate = DefaultValue.RelatedCustomerXml;
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            stringBuilder.AppendFormat(XmlTemplate, ToInfor.HeadlineID, ToInfor.RelatedCustID, ToInfor.UserName);
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual string GetTODescription(TOControlFeedbackInfor ToInfor)
        {
            var stringBuilder = new StringBuilder(DefaultValue.autoGenerated);
            stringBuilder.Append(Constants.Break);
            var TODescTemplate = commonFeedback.GetFeedbackTemplates<TODescriptionTemplate>(descTemplateXml);
            const byte SuperID = 4;
            const byte MasterID = 3;

            var isMaster = ToInfor.RoleID == MasterID ? SMALevel.Master : SMALevel.Agent;
            var smaLevel = ToInfor.RoleID == SuperID ? SMALevel.Super : isMaster;

            var sportName = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.en_US);
            var leagueName = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.en_US);
            var homeName = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.en_US);
            var awayName = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.en_US);

            stringBuilder.AppendFormat(TODescTemplate.Desc,
                    smaLevel,
                    ToInfor.Level,
                    sportName,
                    leagueName,
                    homeName,
                    awayName,
                    ToInfor.UserName,
                    ToInfor.Currency,
                    ToInfor.TotalTurnover.ToString(Constants.ThousanPaseMoney),
                    ToInfor.ProfileName,
                    ToInfor.HouseTurnover.ToString(Constants.ThousanPaseMoney),
                    ToInfor.MaxTurnover.ToString(Constants.ThousanPaseMoney),
                    ToInfor.Usage.ToString(Constants.ThousanPaseMoney),
                    ToInfor.Outstanding.ToString(Constants.ThousanPaseMoney),
                    Constants.Break
                    );

            stringBuilder.Append(Constants.Break);
            return stringBuilder.ToString();
        }

        protected internal virtual string GetTOSolution(TOControlFeedbackInfor ToInfor)
        {
            var isVipCust = ToInfor.Site == "789y" && ToInfor.IsVip;

            var TOSolTemplate = commonFeedback.GetFeedbackTemplates<TOSolutionTemplate>(solTemplateXml);
            var smaLevelEN = "";
            var smaLevelSC = "";
            const byte SuperID = 4;
            const byte MasterID = 3;
            if (ToInfor.RoleID == SuperID)
            {
                smaLevelEN = SMALevel.Super;
                smaLevelSC = SMALevel.SuperSC;
            }
            else
            {
                smaLevelEN = ToInfor.RoleID == MasterID ? SMALevel.Master : SMALevel.Agent;
                smaLevelSC = ToInfor.RoleID == MasterID ? SMALevel.MasterSC : SMALevel.AgentSC;
            }

            var stringBuilder = new StringBuilder();
            var solutionTemplateEN = GetTOSolutionTemplateEN(ToInfor, TOSolTemplate, smaLevelEN);
            var solutionTemplateSC = GetTOSolutionTemplateYNSC(ToInfor, isVipCust, smaLevelEN, smaLevelSC, TOSolTemplate);

            stringBuilder.Append(solutionTemplateEN);
            stringBuilder.Append(Constants.Break);
            stringBuilder.Append(solutionTemplateSC);
            stringBuilder.Append(Constants.Break);
            return stringBuilder.ToString();
        }

        protected internal virtual StringBuilder GetTOSolutionTemplateEN(
           TOControlFeedbackInfor ToInfor,
           TOSolutionTemplate TOSolTemplate,
           string smaLevelEN)
        {
            var stringBuilder = new StringBuilder();
            var outstanding = ToInfor.Outstanding.ToString(Constants.ThousanPaseMoney);
            var sportNameEN = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.en_US);
            var leagueNameEN = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.en_US);
            var homeNameEN = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.en_US);
            var awayNameEN = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.en_US);

            stringBuilder.AppendFormat(
               TOSolTemplate.SolutionEN,
               smaLevelEN,
               ToInfor.UserName,
               outstanding,
               ToInfor.Currency,
               sportNameEN,
               leagueNameEN,
               homeNameEN,
               awayNameEN,
               Constants.Break);
            return stringBuilder;
        }

        protected internal virtual StringBuilder GetTOSolutionTemplateYNSC(
            TOControlFeedbackInfor ToInfor,
            bool isVipCust,
            string smaLevelEN,
            string smaLevelSC,
            TOSolutionTemplate TOSolTemplate)
        {
            var stringBuilder = new StringBuilder();
            var outstanding = ToInfor.Outstanding.ToString(Constants.ThousanPaseMoney);
            string smaLevel = "";
            string solutionTemplate = "";
            string sportName = "";
            string leagueName = "";
            string homeName = "";
            string awayName = "";

            if (isVipCust)
            {
                smaLevel = smaLevelEN;
                solutionTemplate = TOSolTemplate.SolutionYN;
                sportName = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.vi_VN);
                leagueName = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.vi_VN);
                homeName = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.vi_VN);
                awayName = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.vi_VN);
            }
            else
            {
                smaLevel = smaLevelSC;
                solutionTemplate = TOSolTemplate.SolutionSC;
                sportName = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.zh_CN);
                leagueName = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.zh_CN);
                homeName = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.zh_CN);
                awayName = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.zh_CN);
            }

            stringBuilder.AppendFormat(
                solutionTemplate,
                smaLevel,
                ToInfor.UserName,
                outstanding,
                ToInfor.Currency,
                sportName,
                leagueName,
                homeName,
                awayName,
                Constants.Break);

            return stringBuilder;
        }
    }
}