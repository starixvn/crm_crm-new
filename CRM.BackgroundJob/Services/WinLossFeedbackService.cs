namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Options;

    public interface IWinLossFeedbackService
    {
        Task CreateFeedbackForWinLossLimitAsync(WinLossSystemSetting setting);
    }

    public class WinLossFeedbackService : IWinLossFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ISystemSettingService systemSettingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly IWinLossTransactionService transactionService;
        private readonly ICommonFeedback commonFeedback;

        private readonly string templateXml = "FeedbackTemplate.xml";

#pragma warning disable S107 // Methods should not have too many parameters
        public WinLossFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            IWinLossTransactionService transactionService,
            ICommonFeedback commonFeedback
            )
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.systemSettingService = systemSettingService;
            this.customerService = customerService;
            this.logService = logService;
            this.transactionService = transactionService;
            this.commonFeedback = commonFeedback;
        }

        public async Task CreateFeedbackForWinLossLimitAsync(WinLossSystemSetting setting)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
            };
            logService.LogInformation(string.Format("Start run WL serivce with last log ID: {0}!", setting.LastLogId));
            await systemSettingService.EditSystemSettingAsync(settingJobStatus, Constants.ServiceName_WinLimitFB);
            IEnumerable<CustomerWinLimit> cusWinLimit = await customerService.GetListCustReachLimitAsync(setting);
            var custIds = cusWinLimit.Select(x => x.CustId).Distinct();
            IEnumerable<GroupHeadline> headlines = await customerService.GetGroupHeadlineAsync(custIds);
            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);

            ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>> winlossInfo = await transactionService.ImportWinLimitFeedbackInfoAsync(
                cusWinLimit,
                headlines
                );
            if (!winlossInfo.Item1.Any())
            {
                var lastLogID = cusWinLimit.Any() ? cusWinLimit.Max(x => x.LogID) : setting.LastLogId;
                await commonFeedback.EditFeedbackSystemSettingAsync(lastLogID, Constants.ServiceName_WinLimitFB);
                return;
            }

            foreach (WinLimitFeedBackInfo winLimit in winlossInfo.Item1)
            {
                var isVipHeadline = winLimit.Site == "789y" && winLimit.IsVip;
                await CreateWinLossFeedbackCreditAsync(
                        isVipHeadline,
                        winLimit,
                        winlossInfo.Item2,
                        settings,
                        settingMappings);
            }
            var maxLastLogID = winlossInfo.Item1.Max(x => x.LogID);
            await commonFeedback.EditFeedbackSystemSettingAsync(maxLastLogID, Constants.ServiceName_WinLimitFB);
        }

        protected internal virtual async Task CreateWinLossFeedbackCreditAsync(
            bool isVipHeadline,
            WinLimitFeedBackInfo winLimit,
            IEnumerable<BettypeInfo> bettype,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation(string.Format("Start create win loss feedback custID: {0}!", winLimit.CustId));
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Closed, StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(DefaultValue.Neutral, StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);
            var category = commonFeedback.GetCategorySubCategoryCWL(settings, DefaultValue.CompanyWLLimit);
            string[] betTypeLists = winLimit.BettypeIDList.Split(",");
            var betTypeMappings = new List<BettypeInfo>();
            foreach (var bet in bettype)
            {
                if (betTypeLists.Contains(bet.Bettype))
                {
                    betTypeMappings.Add(bet);
                }
            }

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
                LogID = winLimit.LogID,
                CustomerXml = string.Format(DefaultValue.CustomerXml, winLimit.HeadlineId, winLimit.HeadlineName),
                ProductXml = GetProductXml(winLimit, betTypeMappings, settings, settingMappings),
                Solution = GetSolution(winLimit, isVipHeadline),
                RelatedCustomerXml = GetRelatedCustomerXml(winLimit),
                ListOrigCustIds = string.Join(",", winLimit.CustId),
                Description = GetDescription(winLimit, betTypeMappings)
            };

            logService.LogInformation(string.Format("end create win loss feedback custID: {0}!", winLimit.CustId));
            await CheckValidParamsAndInsertFeedbackAsync(winLimit, criteria);
        }

        protected internal virtual async Task CheckValidParamsAndInsertFeedbackAsync(
            WinLimitFeedBackInfo winLimit,
            CreateMutipleFeedbackCommand criteria)
        {
            var checkValidParamBeforeInsert = commonFeedback.CheckFeedbackValidParams(criteria);
            if(!checkValidParamBeforeInsert.Item1)
            {
                var messageInvalid = "Invalid Params: " + checkValidParamBeforeInsert.Item2;
                logService.LogInformation(string.Format("Invalid Params. @Categorystr: {0} @Category: {1} @Product: {2} @StatusID: {3} @SubCategorystr:{4} @ResponseID:{5} @StationID:{6}",
                        criteria.CategoryIds, criteria.CategoryXml, criteria.ProductXml, criteria.StatusId, criteria.SubCategoryIds, criteria.ResponseId, criteria.StationId));
                await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, messageInvalid);
                return;
            }
            try
            {
                logService.LogInformation(string.Format("Begin create win loss feedback : HeadlineId {0} logID:{1}",
                    winLimit.HeadlineId, winLimit.LogID));

                CommandResult commandResult = await baseService.ExecuteNonQueryAsync(criteria);
                if (commandResult.IsSuccessful)
                {
                    logService.LogInformation(string.Format("Create feedback successfully. HeadlineId: {0} logID:{1}",
                        winLimit.HeadlineId, winLimit.LogID));
                }
                else
                {
                    logService.LogInformation(string.Format("Create feedback failed. HeadlineId: {0} logID: {1}",
                        winLimit.HeadlineId, winLimit.LogID));

                    await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, commandResult.Message);
                    await logService.ErrorAsync(commandResult, criteria);
                }
            }
            catch (Exception ex)
            {
                logService.LogInformation(string.Format("Create feedback failed. HeadlineId: {0} logID:{1}",
                    winLimit.HeadlineId,
                    winLimit.LogID));
                await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, ex.Message);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual string GetProductXml(
            WinLimitFeedBackInfo winLimit,
            List<BettypeInfo> betTypeMappings,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            const string XmlTemplate = DefaultValue.ProductXml;
            SystemSettingMapping subProduct = GetSubProduct(winLimit, settingMappings);
            IList<SystemSettingMapping> products = GetProduct(settingMappings, subProduct.SettingSource);
            IList<SystemSettingMapping> tempBettypes = GetBettype(betTypeMappings, settingMappings);
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);

            foreach (SystemSettingMapping product in products)
            {
                if (tempBettypes.Any())
                {
                    foreach (SystemSettingMapping bettype in tempBettypes)
                    {
                        stringBuilder.AppendFormat(XmlTemplate, product.SettingId, subProduct.SettingId, bettype.SettingId);
                    }
                }
                else
                {
                    stringBuilder.AppendFormat(XmlTemplate, product.SettingId, subProduct.SettingId, Constants.BettypeNA);
                }
            }
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual IList<SystemSettingMapping> GetProduct(
            IEnumerable<SystemSettingMapping> settingMappings,
            string subProduct)
        {
            IList<SystemSettingMapping> products = settingMappings.Where(product => product.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(product.SettingSource)
                && product.SettingSource.Equals(subProduct, StringComparison.OrdinalIgnoreCase)).ToList();

            return products != null && products.Any()
                ? products.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = Constants.ProductNA }
                };
        }

        protected internal virtual SystemSettingMapping GetSubProduct(
            WinLimitFeedBackInfo winLimit,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            SystemSettingMapping subProduct = settingMappings.FirstOrDefault(mapping => mapping.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && mapping.SettingSource.Equals(winLimit.ProductName, StringComparison.OrdinalIgnoreCase));

            return subProduct ?? new SystemSettingMapping { SettingId = Constants.SubProductNA };
        }


        protected internal virtual IList<SystemSettingMapping> GetBettype(
            List<BettypeInfo> betTypeMappings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            IList<SystemSettingMapping> bettypes = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && betTypeMappings.Any(betInfo => betInfo.Name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();

            return bettypes != null && bettypes.Any()
                ? bettypes.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = Constants.BettypeNA }
                };
        }

#pragma warning disable S1541 // Methods and properties should not be too complex
        protected internal virtual string GetSolution(WinLimitFeedBackInfo winLimit, bool isVipHeadline)
#pragma warning restore S1541 // Methods and properties should not be too complex
        {
            var productEN = commonFeedback.GetProductName(winLimit.ProductID.ToString(), Language.en_US);
            var productSC = commonFeedback.GetProductName(winLimit.ProductID.ToString(), Language.zh_CN);
            var productYN = commonFeedback.GetProductName(winLimit.ProductID.ToString(), Language.vi_VN);

            string productFormat = "";
            string templateYellow = "";
            string templateRed = "";
            string templateBlack = "";
            string templateGrey = "";
            string templateRng = "";
            string templateJackpotPrize = "";

            var totalWinAmt = Math.Truncate(winLimit.TotalWinAmt).ToString(Constants.ThousanPase);
            var templates = commonFeedback.GetFeedbackTemplates<FeedbackTemplate>(templateXml);
            var formatTemplates = templates.Templates;
            if (isVipHeadline)
            {
                templateRng = formatTemplates.RNGTemplateENYN;
                templateYellow = formatTemplates.YellowTemplateENYN;
                templateRed = formatTemplates.RedTemplateENYN;
                templateBlack = formatTemplates.BlackTemplateYN;
                templateGrey = formatTemplates.GreyTemplateENYN;
                templateJackpotPrize = formatTemplates.JackpotPrizeTemplateENYN;
                productFormat = productYN;
            }
            else
            {
                templateRng = formatTemplates.RNGTemplateENSC;
                templateYellow = formatTemplates.YellowTemplateENSC;
                templateRed = formatTemplates.RedTemplateENSC;
                templateBlack = formatTemplates.BlackTemplateSC;
                templateGrey = formatTemplates.GreyTemplateENSC;
                templateJackpotPrize = formatTemplates.JackpotPrizeTemplateENSC;
                productFormat = productSC;
            }
            var stringBuilder = new StringBuilder();
            if (winLimit.ProductName == "RNG Casino" && (winLimit.ProductGroup == "RNG Casino - Minor Jackpot" || winLimit.ProductGroup == "RNG Casino - Mega Jackpot"))
            {
                stringBuilder.AppendFormat(templateRng, winLimit.UserName, totalWinAmt, winLimit.Currency, Constants.LineBreak);
            }
            else if (winLimit.ProductName == "PP" && winLimit.ProductGroup == "PP - Jackpot Prize")
            {
                stringBuilder.AppendFormat(templateJackpotPrize, winLimit.UserName, totalWinAmt, winLimit.Currency, Constants.LineBreak);
            }
            else
            {
                switch (winLimit.Level)
                {
                    case "Orange":
                    case "Yellow":
                        stringBuilder.AppendFormat(templateYellow, winLimit.UserName, totalWinAmt, winLimit.Currency, productEN, productFormat, Constants.LineBreak);
                        break;
                    case "Grey":
                        stringBuilder.AppendFormat(templateGrey, winLimit.UserName, totalWinAmt, winLimit.Currency, productEN, productFormat, Constants.LineBreak);
                        break;
                    case "Red":
                        stringBuilder.AppendFormat(templateRed, winLimit.UserName, totalWinAmt, winLimit.Currency, productEN, productFormat, Constants.LineBreak);
                        break;

                    case "Black":
                        stringBuilder.AppendFormat(templateBlack, winLimit.UserName, totalWinAmt, winLimit.Currency, productEN, productFormat, Constants.LineBreak);
                        break;

                    default:
                        stringBuilder.Append("");
                        break;
                }
            }
            return stringBuilder.ToString();
        }

        protected internal virtual string GetDescription(WinLimitFeedBackInfo winlimit, List<BettypeInfo> bettype)
        {
            const int numGames = 3;
            List<BettypeInfo> numGamesDisplay = bettype.Count > 3 ? bettype.Take(numGames).ToList() : bettype;
            var numGamesFormat = numGamesDisplay.Any() ? string.Join(", ", numGamesDisplay.Select(x => x.Name)) : "";
            var MaxWinLimitSetting = Math.Truncate(Convert.ToDouble(winlimit.MaxWinLimitSetting)).ToString(Constants.ThousanPase);
            var TotalWinAmt_RM = Math.Truncate(winlimit.TotalWinAmt_RM).ToString(Constants.ThousanPase);
            var TotalWinAmt = Math.Truncate(winlimit.TotalWinAmt).ToString(Constants.ThousanPase);

            var stringBuilder = new StringBuilder(DefaultValue.autoGenerated);
            stringBuilder.Append("<br />Informed Headline Win/Loss Alert for below member:");
            stringBuilder.AppendFormat("<br />Product: {0}", winlimit.ProductName);
            stringBuilder.Append("<br />Game Type: ");
            stringBuilder.AppendFormat(bettype.Count > numGames ? "{0} ..." : "{0}", numGamesFormat);
            stringBuilder.AppendFormat("<br /> UserName: {0}, Site: {1}", winlimit.UserName, winlimit.Site);
            stringBuilder.AppendFormat("<br /> Winning/Losing Limit Amount: {0} (RM), Winning/Losing Amount in RM: {1} (RM), Winloss Amount in player currency: {2} ({3})"
            , MaxWinLimitSetting, TotalWinAmt_RM, TotalWinAmt, winlimit.Currency);
            stringBuilder.AppendFormat("<br />Reached Limit Time: {0}, Reached Limit Level: {1}", winlimit.ReachedTime, winlimit.Level);
            stringBuilder.Append(Constants.LineBreak);

            return stringBuilder.ToString();
        }

        protected internal virtual string GetRelatedCustomerXml(WinLimitFeedBackInfo winLimit)
        {
            const string XmlTemplate = DefaultValue.RelatedCustomerXml;
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            stringBuilder.AppendFormat(XmlTemplate, winLimit.HeadlineId, winLimit.RelatedCustId, winLimit.UserName);

            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }
    }
}