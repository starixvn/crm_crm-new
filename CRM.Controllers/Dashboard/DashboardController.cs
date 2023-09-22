namespace CRM.Controllers.Dashboard
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Dashboard;
    using CRM.Services;
    using CRM.Services.Dashboard;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmMultiplePermissionAttribute(FunctionKey = FunctionKey.Credit, Policy = Policy.Read)]
    [CrmMultiplePermissionAttribute(FunctionKey = FunctionKey.Licensee, Policy = Policy.Read)]
    public class DashboardController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly IDashboardService dashboardService;

        public DashboardController(
            INapSession napSession,
            ISettingService settingService,
            IDashboardService dashboardService
        )
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.dashboardService = dashboardService;
        }

        public async Task<IActionResult> GetCustomerRemarks(GetCustomerRemarksCriteria criteria)
        {
            var customerRemarks = await dashboardService.GetCustomerRemarksAsync(criteria);
            return Json(customerRemarks);
        }

        public async Task<IActionResult> GetRedemptionLogs(GetRedemptionLogsCriteria criteria)
        {
            var redemptionLogs = await dashboardService.GetRedemptionLogsAsync(criteria);
            return Json(redemptionLogs);
        }

        public async Task<IActionResult> GetCommunicationLogs(GetCommunicationLogsCriteria criteria)
        {
            var communicationLogs = await dashboardService.GetCommunicationLogsAsync(criteria);
            var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            return Json(new { data = communicationLogs, mainCategories });
        }

        public async Task<IActionResult> GetCustomerInfoVerify(GetCustomerInfoVerifyCriteria criteria)
        {
            var customerInfoVerify = await dashboardService.GetCustomerInfoVerifyAsync(criteria);
            return Json(customerInfoVerify);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditCustomerVerify([FromBody] EditCustomerVerifyCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            CommandResult commandResult = await dashboardService.EditCustomerVerifyAsync(command);
            return Json(commandResult);
        }
    }
}