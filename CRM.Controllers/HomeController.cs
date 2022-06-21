namespace CRM.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Models.Report.CustomerReport;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly ISessionService sessionService;
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly ICommonService commonService;
        private readonly AppSettings appSettings;

        public HomeController(ISessionService sessionService,
            IUserService userService,
            INapSession napSession,
            INapSettings napSettings,
            ICommonService commonService,
            IOptionsSnapshot<AppSettings> appSettings
        )
        {
            this.sessionService = sessionService;
            this.userService = userService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.commonService = commonService;
            this.appSettings = appSettings.Value;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetSessionData()
        {
            IEnumerable<MenuItem> menus = new List<MenuItem>();
            var currentUsername = napSession.UserName;
            var currentClientTime = commonService.ConvertToClientDateTime(DateTime.Now);
            var clientTimezone = appSettings.ClientTimezone;
            var serverTimezone = appSettings.ServerTimezone;
            var permission = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo);
            var hasCreateFeedbackPermission = permission > 0;
            if (sessionService.MenuItems != null)
            {
                menus = sessionService.MenuItems.ToList();
            }
            else
            {
                menus = userService.GetMenuItem(napSession.UserId, napSettings.SiteId, napSettings.Environment, true).ToList();
            }
            return Json(new {
                currentUsername,
                currentClientTime,
                clientTimezone,
                serverTimezone,
                hasCreateFeedbackPermission,
                menus
            });
        }
    }
}