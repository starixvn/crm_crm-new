namespace CRM.Controllers
{
    using System.Linq;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Services;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly IHomeService homeService;
        private readonly IUserService userService;
        private readonly ISessionService sessionService;

        public HomeController(
            IHomeService homeService,
            IUserService userService,
            ISessionService sessionService
        )
        {
            this.homeService = homeService;
            this.userService = userService;
            this.sessionService = sessionService;
        }

        public IActionResult Index()
        {
            var menus = sessionService.Menus.ToList();
            var currentUserMenu = homeService.EditMenuLanguage(menus);
            sessionService.Menus = currentUserMenu;
            return View();
        }
    }
}