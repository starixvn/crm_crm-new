namespace CRM.Controllers
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

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
            var permission = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo);
            var hasCreateFeedbackPermission = permission > 0;
            return View(hasCreateFeedbackPermission);
        }
    }
}