namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Services;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    public class HomeController : Controller
    {
        private readonly IHomeService homeService;
        private readonly IUserService userService;

        public HomeController(
            IHomeService homeService,
            IUserService userService
        )
        {
            this.homeService = homeService;
            this.userService = userService;
        }

        public IActionResult Index()
        {
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