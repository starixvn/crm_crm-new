namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Mvc;
    using ONEbook.UM.AspNetCore.Filters;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

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

            var hasReadSitePermission = hasReadCreditPermission || hasReadLicenseePermission;
            ViewBag.hasReadFeedbackPermission = hasReadFeedbackInfoPermission && hasReadSitePermission;
            ViewBag.hasReadSitePermission = hasReadSitePermission;
            ViewBag.hasReadCustomerInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CustomerInfo);
            ViewBag.hasHeadlineInfoPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Headlineinfo);
            ViewBag.hasReadLicenseePermission = hasReadLicenseePermission;
            ViewBag.hasReadCreditPermission = hasReadCreditPermission;

            var hasHostPicManagementPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.PICManagement);

            ViewBag.hasHostPicManagementPermission = hasHostPicManagementPermission;
            return View(hasCreateFeedbackPermission);
        }
    }
}