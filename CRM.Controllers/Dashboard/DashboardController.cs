namespace CRM.Controllers.Dashboard
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.DashBoard;
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

        public IActionResult Index()
        {
            var permission = new CustomerPermissionViewModel
            {
                CreateUpdateFeedbackPermission = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo)
            };
            return View(permission);
        }

        public async Task<IActionResult> GetCustomerRemarks(GetCustomerRemarksCriteria criteria)
        {
            var customerRemarks = await dashboardService.GetCustomerRemarksAsync(criteria);
            return Json(customerRemarks);
        }
    }
}
