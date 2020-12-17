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
        private readonly IWinLossTransactionService transactionService;

        private readonly string descTemplateXml = "TODesctiptionTemplate.xml";
        private readonly string solTemplateXml = "TOSolutionTemplate.xml";

#pragma warning disable S107 // Methods should not have too many parameters

        public TOControlFeedbackService(
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

        public async Task CreateFeedbackForTurnoverControlAsync(WinLossSystemSetting turnOverSetting)
        {
            logService.LogInformation(string.Format("Start run turnover controll serivce with last LastLogID: {0}!", turnOverSetting.LastLogID));

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
            IEnumerable <CustOutStanding> custOutStandings = await customerService.GetListCustOutStandingAsync(custNotificationsDistinct);

            var custIds = custOutStandings.Select(x => x.CustID);
            IEnumerable<GroupHeadline> headlines = await customerService.GetGroupHeadlineAsync(custIds);

            logService.LogInformation(string.Format("Start import data with headlineid: {0} headlineName: {1} custId: {2}!",
                string.Join(", ", headlines.Select(x => x.HeadlineId)), string.Join(", ", headlines.Select(x => x.HeadlineName)), string.Join(", ", headlines.Select(x => x.CustId))));

            IEnumerable<TOControlFeedbackInfor> importTOFeedbacks = await transactionService.ImportTOControllFeedbackInfoAsync(
                headlines,
                custOutStandings,
                custNotifications);

            if (!importTOFeedbacks.Any())
            {
                logService.LogInformation(string.Format("Import doesn't have any data with custId: {0} headlineName: {1}!",
                    string.Join(",", headlines.Select(x => x.HeadlineId)), string.Join(",", headlines.Select(x => x.HeadlineName))));
                var maxLogID = custNotifications.Any() ? custNotifications.Max(x => x.LogID) : turnOverSetting.LastLogID;

                logService.LogInformation(string.Format("Update maxLogID: {0} !", maxLogID));
                await commonFeedback.EditFeedbackSystemSettingAsync(maxLogID, Constants.ServiceName_TOControlFB);
                return;
            }

            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);

            var importTOFeedbackGroup = importTOFeedbacks.
                GroupBy(item => new { item.CustID, item.HeadlineID })
                .Select(group => new { TOInfors = group.ToList() })
                .ToList();

            foreach (var ToInforGroup in importTOFeedbackGroup)
            {
                logService.LogInformation(string.Format("Count feedback group : {0}", ToInforGroup.TOInfors.Count));
                logService.LogInformation(string.Format("Prepare group send data with CustID: {0} HeadlineName: {1}",
                    string.Join(", ", ToInforGroup.TOInfors.Select(x => x.CustID)), string.Join(", ", ToInforGroup.TOInfors.Select(x => x.HeadlineName))
                    ));

                await CreateTOControlFeedbackAsync(
                        ToInforGroup.TOInfors,
                        settings,
                        settingMappings);
            }
            var maxLogIdTO = importTOFeedbacks.Max(x => x.LogID);
            await commonFeedback.EditFeedbackSystemSettingAsync(maxLogIdTO, Constants.ServiceName_TOControlFB);

            logService.LogInformation("Finished create TO feedback");
        }

        protected internal virtual async Task CreateTOControlFeedbackAsync(
            List<TOControlFeedbackInfor> ToInfors,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            var ToInfor = ToInfors.FirstOrDefault();
            logService.LogInformation(string.Format("Start create TO feedback with profileID: {0} headlineName: {1} profileName: {2}!",
                    ToInfor.ProfileID, ToInfor.HeadlineName, ToInfor.ProfileName));

            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Closed, StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(DefaultValue.Neutral, StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);
            var category = commonFeedback.GetCategorySubCategoryCWL(settings, DefaultValue.MANotification);

            var SportTypeName = new List<string>();
            var betTypeLists = new List<string>();

            foreach (var ToInforCombine in ToInfors)
            {
                var sportName = commonFeedback.GetSportName(ToInforCombine.SportType.ToString(), Language.en_US);
                SportTypeName.Add(sportName);
                var bettypeSplit = ToInforCombine.BettypeList.Split(",");
                betTypeLists.AddRange(bettypeSplit);
            }

            SettingItem sportsbook = GetTOSportsbookProduct(settings);
            var betTypeMappings = new List<string>();

            foreach (var betType in betTypeLists.Distinct().ToList())
            {
                var betTypeName = commonFeedback.GetBettypeName(betType, Language.en_US);
                betTypeMappings.Add(betTypeName);
            }

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
                ProductXml = GetTOProductXml(SportTypeName.Distinct().ToList(), sportsbook.SettingId, betTypeMappings, settings, settingMappings),
                Solution = GetTOSolution(ToInfors),
                RelatedCustomerXml = GetTORelatedCustomerXml(ToInfor),
                ListOrigCustIds = string.Join(",", ToInfor.CustID),
                TOControlLogID = string.Join(",", ToInfors.Select(log=>log.LogID)),
                Description = GetTODescription(ToInfors)
            };

            logService.LogInformation("end create TO control feedback");
            await CheckValidTOParamsAndInsertFeedbackAsync(ToInfors, criteria);
        }

        protected internal virtual async Task CheckValidTOParamsAndInsertFeedbackAsync(
            List<TOControlFeedbackInfor> ToInfors,
            CreateMutipleFeedbackCommand criteria)
        {
            var ToInfor = ToInfors.FirstOrDefault();
            var checkValidParamBeforeInsert = commonFeedback.CheckFeedbackValidParams(criteria);
            if (!checkValidParamBeforeInsert.Item1)
            {
                var messageInvalid = "Invalid Params: " + checkValidParamBeforeInsert.Item2;
                logService.LogInformation(string.Format("Invalid Params. @Categorystr: {0} @Category: {1} @Product: {2} @StatusID: {3} @SubCategorystr:{4} @ResponseID:{5} @StationID:{6}",
                        criteria.CategoryIds, criteria.CategoryXml, criteria.ProductXml, criteria.StatusId, criteria.SubCategoryIds, criteria.ResponseId, criteria.StationId));
                await transactionService.EditTOControlFeedbackInfoAsync(string.Join(",", ToInfors.Select(log => log.LogID)), CreateFeedbackJobStatus.Fail, messageInvalid);
                return;
            }
            try
            {
                logService.LogInformation(string.Format("Begin insert TO feedback : HeadlineId {0} HeadlineName:{1} ProfileName: {2} custName: {3}",
                    ToInfor.HeadlineID, ToInfor.HeadlineName, ToInfor.ProfileName, ToInfor.UserName));

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

                    await transactionService.EditTOControlFeedbackInfoAsync(string.Join(",", ToInfors.Select(log => log.LogID)), CreateFeedbackJobStatus.Fail, commandResult.Message);
                    await logService.ErrorAsync(commandResult, criteria);
                }
            }
            catch (Exception ex)
            {
                await transactionService.EditTOControlFeedbackInfoAsync(string.Join(",", ToInfors.Select(log => log.LogID)), CreateFeedbackJobStatus.Fail, ex.Message);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual string GetTOProductXml(
            List<string> sportNames,
            int productId,
            List<string> betTypeMappings,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation("Begin mapping product, sub-product, bet type.");

            IList<SettingItem> subProducts = GetTOSubProduct(productId, sportNames, settings, settingMappings);
            SettingItem product = GetTOSportsbookProduct(settings);
            IList<SystemSettingMapping> tempBettypes = GetTOBettype(betTypeMappings, settingMappings);

            logService.LogInformation(string.Format("subProducts : {0} product: {1} tempBettypes: {2}",
                string.Join(",", subProducts.Select(name => name.SettingName)),
                product.SettingName,
                 string.Join(",", tempBettypes.Select(name => name.SettingName))));

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

        protected internal virtual SettingItem GetTOSportsbookProduct(IEnumerable<SettingItem> settings)
        {
            var product = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Sportsbook, StringComparison.OrdinalIgnoreCase));

            return product ?? new SettingItem { SettingId = Constants.ProductNA };
        }

        protected internal virtual IList<SettingItem> GetTOSubProduct(
            int productId,
            List<string> sportNames,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation(string.Format("Start get subproduct with productId: {0} sportName: {1}!", productId, string.Join(", ", sportNames.Select(x => x))));
            List<SystemSettingMapping> mappings = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
               && sportNames.Any(name => name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();
            List<SettingItem> subProducts = settings.Where(sub => sub.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && sub.ParentIds.Any(parent => parent == productId)
                && mappings != null
                && mappings.Any(mapping => mapping.SettingId == sub.SettingId)).ToList();

            logService.LogInformation("End get subproduct");
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
            logService.LogInformation(string.Format("Start GetTOBettype: {0}!", string.Join(", ", betTypeMappings.Select(x => x))));

            IList<SystemSettingMapping> bettypes = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && betTypeMappings.Any(name => name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();

            logService.LogInformation("End GetTOBettype");

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

        protected internal virtual string GetTODescription(List<TOControlFeedbackInfor> ToInfors)
        {
            var stringBuilder = new StringBuilder(DefaultValue.autoGenerated);
            var TODescTemplate = commonFeedback.GetFeedbackTemplates<TODescriptionTemplate>(descTemplateXml);
            const byte SuperID = 4;
            const byte MasterID = 3;

            var isMaster = ToInfors[0].RoleID == MasterID ? SMALevel.Master : SMALevel.Agent;
            var smaLevel = ToInfors[0].RoleID == SuperID ? SMALevel.Super : isMaster;
            stringBuilder.Append(Constants.Break);
            stringBuilder.AppendFormat(TODescTemplate.Desc.Header, smaLevel, Constants.Break);

            var profileGroup = ToInfors.
                GroupBy(item => new { item.ProfileID })
                .Select(group => new { profileIDs = group.ToList() })
                .ToList();

            foreach (var profiles in profileGroup)
            {
                var descInfor = profiles.profileIDs.FirstOrDefault();

                logService.LogInformation(string.Format("Begin create template for desctiption with profileName: {0} custName: {1}",
                descInfor.ProfileName, descInfor.HeadlineName));

                var sportName = commonFeedback.GetSportName(descInfor.SportType.ToString(), Language.en_US);
                var leagueName = commonFeedback.GetLeagueName(descInfor.LeagueID.ToString(), Language.en_US);
                var homeName = commonFeedback.GetTeamName(descInfor.HomeID.ToString(), Language.en_US);
                var awayName = commonFeedback.GetTeamName(descInfor.AwayID.ToString(), Language.en_US);

                stringBuilder.AppendFormat(TODescTemplate.Desc.DescTemplate,
                        descInfor.Level,
                        sportName,
                        leagueName,
                        homeName,
                        awayName,
                        descInfor.UserName,
                        descInfor.Currency,
                        descInfor.TotalTurnover.ToString(Constants.ThousanPaseMoney),
                        descInfor.ProfileName,
                        descInfor.HouseTurnover.ToString(Constants.ThousanPaseMoney),
                        descInfor.MaxTurnover.ToString(Constants.ThousanPaseMoney),
                        descInfor.Usage.ToString(Constants.ThousanPaseMoney),
                        descInfor.Outstanding.ToString(Constants.ThousanPaseMoney),
                        Constants.Break
                        );
                stringBuilder.Append(Constants.Break);

                logService.LogInformation("End create template desctiption");
            }
            stringBuilder.Append(Constants.Break);
            return stringBuilder.ToString();
        }

        protected internal virtual string GetTOSolution(List<TOControlFeedbackInfor> ToInfors)
        {
            var isVipCust = ToInfors[0].Site == "789y" && ToInfors[0].IsVip;

            logService.LogInformation(string.Format("Begin GetTOSolution with CustName : {0} HeadlineName:{1} isVipCust: {2} site: {3} isVip: {4}",
                ToInfors[0].UserName, ToInfors[0].HeadlineName, isVipCust, ToInfors[0].Site, ToInfors[0].IsVip));

            var TOSolTemplate = commonFeedback.GetFeedbackTemplates<TOSolutionTemplate>(solTemplateXml);
            string solHeader = "";
            string solfooter = "";
            var smaLevelEN = "";
            var smaLevelSC = "";
            var smaLevel = "";
            const byte SuperID = 4;
            const byte MasterID = 3;
            if (ToInfors[0].RoleID == SuperID)
            {
                smaLevelEN = SMALevel.Super;
                smaLevelSC = SMALevel.SuperSC;
            }
            else
            {
                smaLevelEN = ToInfors[0].RoleID == MasterID ? SMALevel.Master : SMALevel.Agent;
                smaLevelSC = ToInfors[0].RoleID == MasterID ? SMALevel.MasterSC : SMALevel.AgentSC;
            }

            if (isVipCust)
            {
                smaLevel = smaLevelEN;
                solHeader = TOSolTemplate.SolutionYN.Header;
                solfooter = TOSolTemplate.SolutionYN.Footer;
            }
            else
            {
                smaLevel = smaLevelSC;
                solHeader = TOSolTemplate.SolutionSC.Header;
                solfooter = TOSolTemplate.SolutionSC.Footer;
            }

            var stringBuilder = new StringBuilder();
            StringBuilder solutionTemplateEN = new StringBuilder();
            StringBuilder solutionTemplateYNSC = new StringBuilder();

            var matchIDGroup = ToInfors.
                GroupBy(item => new { item.MatchID })
                .Select(group => new { matchIDs = group.ToList() })
                .ToList();

            foreach (var group in matchIDGroup)
            {
                var toInfor = group.matchIDs.FirstOrDefault();
                logService.LogInformation(string.Format("Group matchID: {0}", toInfor.MatchID));
                solutionTemplateEN.Append(GetTOSolutionTemplateEN(toInfor, TOSolTemplate));
                solutionTemplateYNSC.Append(GetTOSolutionTemplateYNSC(toInfor, isVipCust, TOSolTemplate));
            }
            stringBuilder.AppendFormat(TOSolTemplate.SolutionEN.Header, smaLevelEN, ToInfors[0].UserName, Constants.LineBreak);
            stringBuilder.Append(solutionTemplateEN);
            stringBuilder.AppendFormat(TOSolTemplate.SolutionEN.Footer, Constants.LineBreak);

            stringBuilder.AppendFormat(solHeader, smaLevel, ToInfors[0].UserName, Constants.LineBreak);
            stringBuilder.Append(solutionTemplateYNSC);
            stringBuilder.AppendFormat(solfooter, Constants.LineBreak);
            logService.LogInformation("End get GetTOSolution");
            return stringBuilder.ToString();
        }

        protected internal virtual StringBuilder GetTOSolutionTemplateEN(
           TOControlFeedbackInfor ToInfor,
           TOSolutionTemplate TOSolTemplate)
        {
            var stringBuilder = new StringBuilder();
            var outstanding = ToInfor.Outstanding.ToString(Constants.ThousanPaseMoney);
            var sportNameEN = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.en_US);
            var leagueNameEN = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.en_US);
            var homeNameEN = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.en_US);
            var awayNameEN = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.en_US);

            stringBuilder.AppendFormat(
               TOSolTemplate.SolutionEN.SolutionTemplate,
               outstanding,
               ToInfor.Currency,
               sportNameEN,
               leagueNameEN,
               homeNameEN,
               awayNameEN,
               Constants.Break);
            stringBuilder.Append(Constants.Break);
            return stringBuilder;
        }

        protected internal virtual StringBuilder GetTOSolutionTemplateYNSC(
            TOControlFeedbackInfor ToInfor,
            bool isVipCust,
            TOSolutionTemplate TOSolTemplate)
        {
            var stringBuilder = new StringBuilder();
            var outstanding = ToInfor.Outstanding.ToString(Constants.ThousanPaseMoney);

            string solTemplate = "";
            string sportName = "";
            string leagueName = "";
            string homeName = "";
            string awayName = "";

            if (isVipCust)
            {
                solTemplate = TOSolTemplate.SolutionYN.SolutionTemplate;
                sportName = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.vi_VN);
                leagueName = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.vi_VN);
                homeName = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.vi_VN);
                awayName = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.vi_VN);
            }
            else
            {
                solTemplate = TOSolTemplate.SolutionSC.SolutionTemplate;
                sportName = commonFeedback.GetSportName(ToInfor.SportType.ToString(), Language.zh_CN);
                leagueName = commonFeedback.GetLeagueName(ToInfor.LeagueID.ToString(), Language.zh_CN);
                homeName = commonFeedback.GetTeamName(ToInfor.HomeID.ToString(), Language.zh_CN);
                awayName = commonFeedback.GetTeamName(ToInfor.AwayID.ToString(), Language.zh_CN);
            }

            stringBuilder.AppendFormat(
                solTemplate,
                outstanding,
                ToInfor.Currency,
                sportName,
                leagueName,
                homeName,
                awayName,
                Constants.Break);
            stringBuilder.Append(Constants.Break);
            return stringBuilder;
        }
    }
}