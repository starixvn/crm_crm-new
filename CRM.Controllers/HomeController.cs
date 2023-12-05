namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using ONEbook.UM.AspNetCore.Filters;
    using static Fanex.NAP.Core.Business.Constant;

    [ServiceFilter(typeof(CheckUMFilterAttribute))]
    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly IPermissionService permissionService;

        public HomeController(IPermissionService permissionService)
        {
            this.permissionService = permissionService;
        }

        public async Task<IActionResult> Index()
        {
            var hasReadCreditPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit);
            var hasReadLicenseePermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);

            var hasReadFeedbackInfoPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback);
            var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);

            var hasReadCustomerInfo = hasReadCreditPermission || hasReadLicenseePermission;

            ViewBag.hasReadFeedbackPermission = hasReadFeedbackInfoPermission && hasReadCustomerInfo;
            ViewBag.hasReadCustomerInfo = hasReadCustomerInfo;

            return View(hasCreateFeedbackPermission);
        }
    }
}