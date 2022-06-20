namespace CRM.Controllers.Dashboard
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Dashboard;
    using CRM.Services;
    using CRM.Services.Dashboard;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class DashboardController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly ISettingService settingService;
        private readonly IUserService userService;
        private readonly IDashboardService dashboardService;

        public DashboardController(
            INapSession napSession,
            INapSettings napSettings,
            ISettingService settingService,
            IUserService userService,
            IDashboardService dashboardService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.settingService = settingService;
            this.userService = userService;
            this.dashboardService = dashboardService;
        }

        //public IActionResult Index()
        //{
        //    var permission = new CustomerPermissionViewModel
        //    {
        //        CreateUpdateFeedbackPermission = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
        //    };
        //    return View(permission);
        //}

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
            return Json(new { data = communicationLogs, mainCategories});
        }

        public async Task<IActionResult> GetCustomerInfoVerify(GetCustomerInfoVerifyCriteria criteria)
        {
            var customerInfoVerify = await dashboardService.GetCustomerInfoVerifyAsync(criteria);
            return Json(customerInfoVerify);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditCustomerVerify([FromBody] EditCustomerVerifyCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            CommandResult commandResult = await dashboardService.EditCustomerVerifyAsync(command);
            return Json(commandResult);
        }
    }
}
