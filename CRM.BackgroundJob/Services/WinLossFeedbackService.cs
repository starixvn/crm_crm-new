namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
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
        private readonly IMessageService messageService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly IWinLossTransactionService transactionService;

#pragma warning disable S107 // Methods should not have too many parameters
        public WinLossFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            IMessageService messageService,
            ICustomerService customerService,
            ICRMLogService logService,
            IWinLossTransactionService transactionService)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.systemSettingService = systemSettingService;
            this.messageService = messageService;
            this.customerService = customerService;
            this.logService = logService;
            this.transactionService = transactionService;
        }

        public async Task CreateFeedbackForWinLossLimitAsync(WinLossSystemSetting setting)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Running },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") }
            };
            await systemSettingService.EditSystemSettingAsync(settingJobStatus);

            IEnumerable<CustomerWinLimit> cusWinLimit = await customerService.getListCustReachLimitAsync();
            var custIds = cusWinLimit.Select(x => x.CustId);
            IEnumerable<GroupHeadline> headlines = await customerService.GetGroupHeadlineAsync(custIds);
            var settingNames = new[] { SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);
            IEnumerable<SiteSettingMapping> siteSettingMappings = await settingService.GetSiteSettingMappingAsync();

            ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>> winlossInfo = await transactionService.ImportWinLimitFeedbackInfoAsync(
                cusWinLimit,
                headlines
                );
            if (!winlossInfo.Item1.Any())
            {
                await EditSystemSettingAsync();
                return;
            }

            foreach (WinLimitFeedBackInfo winLimit in winlossInfo.Item1)
            {
                await CreateWinLossFeedbackCreditAsync(
                        winLimit,
                        winlossInfo.Item2,
                        headlines.Where(x => x.CustId == winLimit.CustId),
                        settings,
                        settingMappings);
            }
            await EditSystemSettingAsync();
        }

        protected internal virtual async Task CreateWinLossFeedbackCreditAsync(
            WinLimitFeedBackInfo winLimit,
            IEnumerable<BettypeInfo> bettype,
            IEnumerable<GroupHeadline> headlines,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation("Begin mapping common setting for customer: " + winLimit.UserName);
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals("Closed", StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals("Neutral", StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);
            var category = GetCategorySubCategory(settings);

            var criteria = new CreateMutipleFeedbackCommand
            {
                CreatorId = appSettings.CreatorId,
                UserId = appSettings.CreatorId,
                UserRole = Constants.UserRole,
                FeedbackDate = feedbackDate.Subtract(timeSpan),
                ResolutionDate = feedbackDate.AddMinutes(1).Subtract(timeSpan),
                IsCheckedDefaultComm = true,
                StationId = station != null ? station.SettingId.ToString() : string.Empty,
                StatusId = status != null ? status.SettingId : 0,
                ResponseId = response != null ? response.SettingId : 0,
                CategoryXml = category.Item3,
                CategoryIds = category.Item1.ToString(),
                SubCategoryIds = category.Item2.ToString(),
                Subject = "Special Notification",
                AutoField = string.Empty,
                AutoField1 = string.Empty,
                AutoField2 = string.Format("Date Time & Tool: {0}/{1}/", feedbackDate.ToString("yyyyMMdd"), feedbackDate.ToString("hh:mmtt")),
                AutoField3 = $"{Environment.NewLine}System ID: "
            };
            logService.LogInformation("End mapping setting for customer: " + winLimit.UserName);

            var headlineIds = headlines.Select(x => x.HeadlineId).Distinct();
            foreach (var headlineId in headlineIds)
            {
                GroupHeadline headline = headlines.First(x => x.HeadlineId == headlineId);
                IEnumerable<int> relatedCustomerIds = headlines.Where(x => x.HeadlineId == headline.HeadlineId).Select(x => x.CustId);
                criteria.CustomerXml = string.Format("<ROOT><Cust CustId='{0}' Username='{1}' /></ROOT>", headline.HeadlineId, headline.HeadlineName);

                int totalCustomers = relatedCustomerIds.Count();
                for (int i = 0; i < totalCustomers; i++)
                {
                    criteria.ProductXml = GetProductXml(winLimit, bettype, settings, settingMappings);
                    criteria.Solution = GetSolution(winLimit);
                    criteria.RelatedCustomerXml = GetRelatedCustomerXml(headline.HeadlineId, winLimit);
                    criteria.ListOrigCustIds = string.Join(",", relatedCustomerIds);
                }
            }

        }

        protected internal virtual string GetProductXml(
            WinLimitFeedBackInfo winLimit,
            IEnumerable<BettypeInfo> bettype,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation("Begin mapping product, sub-product, bet type.");
            const string XmlTemplate = "<Product ProductID='{0}' SubProductID='{1}' BetTypeID='{2}' />";
            SettingItem subProducts = GetSubProduct(winLimit, settings, settingMappings);
            //SettingItem product = GetProduct(winLimit, settings, settingMappings, subProducts.SettingId);
            
            //SettingItem product = GetProduct(settings, subProduct.SettingId);
           IList<SettingItem> bettypes = GetBettype(subProducts.SettingId, settings, bettype, settingMappings);
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);

            logService.LogInformation("End mapping product, sub-product, bet type.");
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        //protected internal virtual SettingItem GetProduct(IEnumerable<SettingItem> settings)
        //{
        //    var product = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
        //        && x.SettingValue.Equals(winLimit.ProductName, StringComparison.OrdinalIgnoreCase));

        //    return product ?? new SettingItem { SettingId = Constants.ProductNA };
        //}

        protected internal virtual SettingItem GetSubProduct(
            WinLimitFeedBackInfo winLimit,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            SettingItem subProduct = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(winLimit.ProductName, StringComparison.OrdinalIgnoreCase));

            return subProduct ?? new SettingItem { SettingId = Constants.ProductNA };
        }

        protected internal virtual Tuple<int, int, string> GetCategorySubCategory(IEnumerable<SettingItem> settings)
        {
            var category = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.MainCategory, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals("Special Notification", StringComparison.OrdinalIgnoreCase));
            var subCategoryId = 0;

            if (category != null)
            {
                var subCategory = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.SubCategory, StringComparison.OrdinalIgnoreCase)
                    && x.ParentIds.Any(y => y == category.SettingId)
                    && x.SettingValue.Equals("Company W/L Limit", StringComparison.OrdinalIgnoreCase));

                subCategoryId = subCategory != null ? subCategory.SettingId : 0;
            }

            return new Tuple<int, int, string>(
                category != null ? category.SettingId : 0,
                subCategoryId,
                string.Format("<ROOT><Category MainCategoryID='{0}' SubCategoryID='{1}' /></ROOT>",
                    category != null ? category.SettingId : 0,
                    subCategoryId));
        }

        protected internal virtual IList<SettingItem> GetBettype(
            int subProducts,
            IEnumerable<SettingItem> settings,
            IEnumerable<BettypeInfo> bettype,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            IList<SystemSettingMapping> mappings = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && bettype.Any(betInfo => betInfo.Name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();
            IList<SettingItem> bettypes = settings.Where(bet => bet.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && bet.ParentIds.Any(parent => parent == subProducts)
                && mappings != null
                && mappings.Any(mapping => mapping.SettingId == bet.SettingId)).ToList();

            return bettypes != null && bettypes.Any()
                ? bettypes.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SettingItem>
                {
                    new SettingItem { SettingId = Constants.BettypeNA, ParentIds = new List<int> { Constants.SubProductNA } }
                };
        }

        protected internal virtual string GetSolution(WinLimitFeedBackInfo winLimit)
        {
            var stringBuilder = new StringBuilder();
            const string greetingOrangeYellowGreyRNG = "Dear Sir, Customer Support would like to inform that member ";
            const string greetingRed = "Dear Sir, Customer Support would like to inform that there is [BIG Winner] under your line. Member username is ";
            const string greetingBlack = "Dear Sir, Customer Support would like to draw your attention towards member ";

            const string templateInfor = "'{0} ({1})' in '{2}'. ";

            const string ThanksAttendtion = "Thank you for your kind attention!";
            const string ThanksKindly = "Kindly take note, thank you!";

            const string greetingOrangeYellowGreyRNGChinese = "您好, 客服部在此通知 会员 ";
            const string greetingRedChinese = "您好，客服部在此通知 会员 ";
            const string greetingBlackChinese = "您好，客服部在此通知 会员 ";

            const string templateInforChinese = "'{0} ({1})' 在 '{2}'. ";

            const string ThanksAttendtionChinese = "谢谢您的关注与支持!";
            const string ThanksKindlyChinese = "请您留意 谢谢!";

            if (winLimit.ProductName == "RNG Casino" && (winLimit.ProductGroup == "RNG Casino - Minor Jackpot" || winLimit.ProductGroup == "RNG Casino - Mega Jackpot"))
            {
                stringBuilder.Append(greetingOrangeYellowGreyRNG);
                stringBuilder.AppendFormat("'{0}', has currently won the Jackpot amount of  ", winLimit.UserName);
                stringBuilder.AppendFormat("'{0} ({1})' in RNG Casino Baccarat Progressive Jackpot. ", winLimit.TotalWinAmt, winLimit.Currency);
                stringBuilder.Append(ThanksAttendtion);
                stringBuilder.Append("<br /><br />");

                stringBuilder.Append(greetingOrangeYellowGreyRNGChinese);
                stringBuilder.AppendFormat("'{0}', 目前在 娱乐城赢了百家乐聚宝奖金 为 ", winLimit.UserName);
                stringBuilder.AppendFormat("'{0} ({1})'", winLimit.TotalWinAmt, winLimit.Currency);
                stringBuilder.Append(ThanksAttendtionChinese);
                stringBuilder.Append("<br /><br />");
            }
            else
            {
                switch (winLimit.Level)
                {
                    case "Orange":
                    case "Yellow":
                    case "Grey":
                        stringBuilder.Append(greetingOrangeYellowGreyRNG);
                        stringBuilder.AppendFormat("'{0}', currently has " + winLimit.Level == "Grey" ? "loss" : "won" + " amounted to ", winLimit.UserName);
                        stringBuilder.AppendFormat(templateInfor, winLimit.TotalWinAmt, winLimit.Currency, winLimit.ProductName);
                        stringBuilder.Append(ThanksAttendtion);
                        stringBuilder.Append("<br /><br />");

                        stringBuilder.Append(greetingOrangeYellowGreyRNGChinese);
                        stringBuilder.AppendFormat("'{0}', 目前在 " + winLimit.Level == "Grey" ? "输了" : "赢了", winLimit.UserName);
                        stringBuilder.AppendFormat(templateInforChinese, winLimit.TotalWinAmt, winLimit.Currency, winLimit.ProductName);
                        stringBuilder.Append(ThanksAttendtionChinese);
                        break;
                    case "Red":
                        stringBuilder.Append(greetingRed);
                        stringBuilder.AppendFormat("'{0}', currently has won amount of ", winLimit.UserName);
                        stringBuilder.AppendFormat(templateInfor, winLimit.TotalWinAmt, winLimit.Currency, winLimit.ProductName);
                        stringBuilder.Append(ThanksKindly);
                        stringBuilder.Append("<br /><br />");

                        stringBuilder.Append(greetingRedChinese);
                        stringBuilder.AppendFormat("'{0}', 目前已达到 [赢取金额上限] 数目为 ", winLimit.UserName);
                        stringBuilder.AppendFormat(templateInforChinese, winLimit.TotalWinAmt, winLimit.Currency, winLimit.ProductName);
                        stringBuilder.Append(ThanksKindlyChinese);
                        break;
                    case "Black":
                        stringBuilder.Append(greetingBlack);
                        stringBuilder.AppendFormat("'{0}' has [hit Max Lose Limit] amounted to ", winLimit.UserName);
                        stringBuilder.AppendFormat(templateInfor, winLimit.TotalWinAmt, winLimit.Currency, winLimit.ProductName);
                        stringBuilder.Append(ThanksKindly);
                        stringBuilder.Append("<br /><br />");

                        stringBuilder.Append(greetingBlackChinese);
                        stringBuilder.AppendFormat("'{0}' 目前已达到 [最高输额上限] 数目为 ", winLimit.UserName);
                        stringBuilder.AppendFormat(templateInforChinese, winLimit.TotalWinAmt, winLimit.Currency, winLimit.ProductName);
                        stringBuilder.Append(ThanksKindlyChinese);
                        break;
                    default:
                        break;
                }
            }
            return stringBuilder.ToString();
        }

        protected internal virtual string GetRelatedCustomerXml(int headlineId, WinLimitFeedBackInfo winLimit)
        {
            const string XmlTemplate = "<Row CustId='{0}' RelatedCustId='{1}' Username='{2}' />";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            stringBuilder.AppendFormat(XmlTemplate, headlineId, winLimit.RelatedCustId, winLimit.UserName);

            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual async Task<CommandResult> EditSystemSettingAsync()
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Completed },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") }
            };
            return await systemSettingService.EditSystemSettingAsync(settingJobStatus);
        }
    }
}
