namespace CRM.Controllers
{
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Services;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly ISessionService sessionService;
        public HomeController(ISessionService sessionService)
        {
            this.sessionService = sessionService;
        }

        )
        {
            this.homeService = homeService;
            this.userService = userService;
        }

        public IActionResult Index()
        {
            if(sessionService.CurrentCustomer != null)
            {
                return RedirectToAction("Index", "Dashboard");
            }
            return View();
        }

        [HttpGet]
        public IEnumerable<MenuItem> GettingUserMenu()
        {
            var menus = userService.GetMenuItem(8, 96, "UAT", true).ToList();
            var currentUserMenu = homeService.EditMenuLanguage(menus);
            return currentUserMenu;
        }
    }
}