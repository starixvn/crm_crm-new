namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly ISessionService sessionService;
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        public HomeController(ISessionService sessionService, IUserService userService, INapSession napSession, INapSettings napSettings)
        {
            this.sessionService = sessionService;
            this.userService = userService;
            this.napSession = napSession;
            this.napSettings = napSettings;
        }

        public IActionResult Index()
        {
            //if(sessionService.CurrentCustomer != null)
            //{
            //    return RedirectToAction("Index", "Dashboard");
            //}
            return View();
        }

        public IActionResult GetMenus()
        {
            if(sessionService.MenuItems != null)
            {
                return Json(sessionService.MenuItems);
            }
            else
            {
                var menus = userService.GetMenuItem(napSession.UserId, napSettings.SiteId, napSettings.Environment, true).ToList();
                return Json(menus);
            }
        }
    }
}