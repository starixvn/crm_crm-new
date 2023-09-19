namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Services;
    using CRM.Services.Customer;
    using Microsoft.AspNetCore.Mvc;
    using ONEbook.UM.AspNetCore.Filters;
    using static Fanex.NAP.Core.Business.Constant;

    [ServiceFilter(typeof(CheckUMFilterAttribute))]
    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly IPermissionService permissionService;
        private readonly ISessionService sessionService;
        private readonly ICustomerService customerService;

        public HomeController(IPermissionService permissionService, ISessionService sessionService, ICustomerService customerService)
        {
            this.permissionService = permissionService;
            this.sessionService = sessionService;
            this.customerService = customerService;
        }

        public async Task<IActionResult> Index()
        {
            var hasReadCreditPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit);
            var hasReadLicenseePermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);

            var hasReadFeedbackInfoPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback);
            var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);

            var hasReadCustomerInfo = hasReadCreditPermission || hasReadLicenseePermission;
            var hasHostCreditPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host);
            var hasHostLicenseePermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host);

            ViewBag.hasReadFeedbackPermission = hasReadFeedbackInfoPermission && hasReadCustomerInfo;
            ViewBag.hasReadCustomerInfo = hasReadCustomerInfo;
            ViewBag.hasHostCreditPermission = hasHostCreditPermission;
            ViewBag.hasHostLicenseePermission = hasHostLicenseePermission;
            return View(hasCreateFeedbackPermission);
        }
    }
}