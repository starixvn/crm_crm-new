namespace CRM.BackgroundJob.UnitTests.Testable
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.TurnoverControll;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public class TOControlFeedbackServiceTestable : TOControlFeedbackService
    {
        public TOControlFeedbackServiceTestable(IOptionsSnapshot<AppJobSettings> appSettings,
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
                commonFeedback,
                transactionService
              )
        {
        }

        public async Task Public_CreateTOControlFeedbackAsync(
            List<TOControlFeedbackInfor> ToInfors,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            await base.CreateTOControlFeedbackAsync(ToInfors, settings, settingMappings);
        }

        public async Task Public_CheckValidTOParamsAndInsertFeedbackAsync(
            List<TOControlFeedbackInfor> ToInfors,
            CreateMutipleFeedbackCommand criteria)
        {
            await base.CheckValidTOParamsAndInsertFeedbackAsync(ToInfors, criteria);
        }

        public string Public_GetTOProductXml(
            List<string> sportNames,
            int productId,
            List<string> betTypeMappings,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetTOProductXml(sportNames, productId, betTypeMappings, settings, settingMappings);
        }

        public SettingItem Public_GetTOSportsbookProduct(IEnumerable<SettingItem> settings)
        {
            return base.GetTOSportsbookProduct(settings);
        }

        public IList<SettingItem> Public_GetTOSubProduct(
            int productId,
            List<string> sportNames,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetTOSubProduct(productId, sportNames, settings, settingMappings);
        }

        public IList<SystemSettingMapping> Public_GetTOBettype(
           List<string> betTypeMappings,
           IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetTOBettype(betTypeMappings, settingMappings);
        }

        public string Public_GetTORelatedCustomerXml(TOControlFeedbackInfor ToInfor)
        {
            return base.GetTORelatedCustomerXml(ToInfor);
        }

        public string Public_GetTODescription(List<TOControlFeedbackInfor> ToInfors)
        {
            return base.GetTODescription(ToInfors);
        }

        public string Public_GetTOSolution(List<TOControlFeedbackInfor> ToInfors)
        {
            return base.GetTOSolution(ToInfors);
        }

        public StringBuilder Public_GetTOSolutionTemplateEN(
           TOControlFeedbackInfor ToInfor,
           TOSolutionTemplate TOSolTemplate)
        {
            return base.GetTOSolutionTemplateEN(ToInfor, TOSolTemplate);
        }

        public StringBuilder Public_GetTOSolutionTemplateYNSC(
            TOControlFeedbackInfor ToInfor,
            bool isVipCust,
            TOSolutionTemplate TOSolTemplate)
        {
            return base.GetTOSolutionTemplateYNSC(ToInfor, isVipCust, TOSolTemplate);
        }
    }
}