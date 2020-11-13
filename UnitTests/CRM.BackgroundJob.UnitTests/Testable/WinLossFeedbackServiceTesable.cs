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
            IWinLossTransactionService transactionService)
            : base(appSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                transactionService)
        {
        }

        public async Task Public_CreateWinLossFeedbackCreditAsync(
            WinLimitFeedBackInfo winLimit,
            IEnumerable<BettypeInfo> bettype,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            await base.CreateWinLossFeedbackCreditAsync(winLimit, bettype, settings, settingMappings);
        }

        public async Task Public_CheckValidParamsAndInsertFeedbackAsync(
            WinLimitFeedBackInfo winLimit,
            CreateMutipleFeedbackCommand criteria)
        {
            await base.CheckValidParamsAndInsertFeedbackAsync(winLimit, criteria);
        }

        public ValueTuple<bool, string> Public_CheckValidParams(
            CreateMutipleFeedbackCommand criteria)
        {
             return base.CheckValidParams(criteria);
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

        public Tuple<int, int, string> Public_GetCategorySubCategoryWinloss(
           IEnumerable<SettingItem> settings)
        {
            return base.GetCategorySubCategoryWinloss(settings);
        }

        public IList<SystemSettingMapping> Public_GetBettype(
           List<BettypeInfo> betTypeMappings,
           IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetBettype(betTypeMappings, settingMappings);
        }

        public string Public_GetSolution(WinLimitFeedBackInfo winLimit)
        {
            return base.GetSolution(winLimit);
        }

        public StringBuilder Public_GetSolutionRNG(
            WinLimitFeedBackInfo winLimit,
            string greeting,
            string thanks,
            string greetingChinese,
            string thanksChinese)
        {
            return base.GetSolutionRNG(winLimit, greeting, thanks, greetingChinese, thanksChinese);
        }

        public StringBuilder Public_GetSolutionLevelOrange(
            WinLimitFeedBackInfo winLimit,
            string greetingOrangeYellowGreyRNG,
            string templateInfor,
            string ThanksAttendtion,
            string greetingOrangeYellowGreyRNGChinese,
            string templateInforOrangeChinese,
            string ThanksAttendtionChinese)
        {
            return base.GetSolutionLevelOrange(
                winLimit, greetingOrangeYellowGreyRNG, templateInfor, 
                ThanksAttendtion, greetingOrangeYellowGreyRNGChinese,
                templateInforOrangeChinese, ThanksAttendtionChinese);
        }

        public StringBuilder Public_GetSolutionLevelRed(
            WinLimitFeedBackInfo winLimit,
            string greetingRed,
            string templateInfor,
            string ThanksKindly,
            string greetingRedChinese,
            string templateInforChinese,
            string ThanksKindlyChinese)
        {
            return base.GetSolutionLevelRed(
                winLimit, greetingRed, templateInfor, 
                ThanksKindly, greetingRedChinese,
                templateInforChinese, ThanksKindlyChinese);
        }

        public StringBuilder Public_GetSolutionLevelBlack(
            WinLimitFeedBackInfo winLimit,
            string greetingBlack,
            string templateInfor,
            string ThanksKindly,
            string greetingBlackChinese,
            string templateInforChinese,
            string ThanksKindlyChinese)
        {
            return base.GetSolutionLevelBlack(
                winLimit, greetingBlack, templateInfor,
                ThanksKindly, greetingBlackChinese,
                templateInforChinese, ThanksKindlyChinese);
        }

        public string Public_GetDescription(WinLimitFeedBackInfo winlimit, List<BettypeInfo> bettype)
        {
            return base.GetDescription(winlimit, bettype);
        }

        public string Public_GetRelatedCustomerXml(WinLimitFeedBackInfo winLimit)
        {
            return base.GetRelatedCustomerXml(winLimit);
        }

        public async Task<CommandResult> Public_EditWinLossSystemSettingAsync(int LastLogID)
        {
            return await base.EditWinLossSystemSettingAsync(LastLogID);
        }
    }
}