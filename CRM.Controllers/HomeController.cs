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

        public HomeController(
            IPermissionService permissionService
        )
        {
            this.permissionService = permissionService;
        }

        public async Task<IActionResult> Index()
        {
            var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            var hasReadFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedbackAndCustomerInfo);
            ViewBag.hasReadFeedbackPermission = hasReadFeedbackPermission;
            return View(hasCreateFeedbackPermission);
        }
    }
}