namespace CRM.BackgroundJob.UnitTests.Testable
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public class WinLossFeedbackServiceTesable : WinLossFeedbackService
    {
        public WinLossFeedbackServiceTesable(IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            IWinLossTransactionService transactionService,
            ICommonFeedback commonFeedback)
            : base(appSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                transactionService,
                commonFeedback)
        {
        }

        public async Task Public_CreateWinLossFeedbackCreditAsync(
            bool isVipHeadline,
            WinLimitFeedBackInfo winLimit,
            IEnumerable<BettypeInfo> bettype,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            await base.CreateWinLossFeedbackCreditAsync(isVipHeadline, winLimit, bettype, settings, settingMappings);
        }

        public async Task Public_CheckValidParamsAndInsertFeedbackAsync(
            WinLimitFeedBackInfo winLimit,
            CreateMutipleFeedbackCommand criteria)
        {
            await base.CheckValidParamsAndInsertFeedbackAsync(winLimit, criteria);
        }

        public string Public_GetProductXml(
           WinLimitFeedBackInfo winLimit,
           List<BettypeInfo> betTypeMappings,
           IEnumerable<SettingItem> settings,
           IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetProductXml(winLimit, betTypeMappings, settings, settingMappings);
        }

        public IList<SystemSettingMapping> Public_GetProduct(
           IEnumerable<SystemSettingMapping> settingMappings,
           string subProduct)
        {
            return base.GetProduct(settingMappings, subProduct);
        }

        public SystemSettingMapping Public_GetSubProduct(
           WinLimitFeedBackInfo winLimit,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetSubProduct(winLimit, settingMappings);
        }
       
        public IList<SystemSettingMapping> Public_GetBettype(
           List<BettypeInfo> betTypeMappings,
           IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetBettype(betTypeMappings, settingMappings);
        }

        public string Public_GetSolution(WinLimitFeedBackInfo winLimit, bool isVipHeadline)
        {
            return base.GetSolution(winLimit, isVipHeadline);
        }

        public string Public_GetDescription(WinLimitFeedBackInfo winlimit, List<BettypeInfo> bettype)
        {
            return base.GetDescription(winlimit, bettype);
        }

        public string Public_GetRelatedCustomerXml(WinLimitFeedBackInfo winLimit)
        {
            return base.GetRelatedCustomerXml(winLimit);
        }
    }
}