namespace CRM.Controllers
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;

        public HomeController(
            IUserService userService,
            INapSession napSession,
            INapSettings napSettings
        )
        {
            this.userService = userService;
            this.napSession = napSession;
            this.napSettings = napSettings;
        }

        public IActionResult Index()
        {
            var hasCreateFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            var hasReadFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Read);
            ViewBag.hasReadFeedbackPermission = hasReadFeedbackPermission;
            return View(hasCreateFeedbackPermission);
        }
    }
}