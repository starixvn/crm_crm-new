namespace CRM.Controllers
{
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Mvc;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        private readonly ISessionService sessionService;
        public HomeController(ISessionService sessionService)
        {
            this.sessionService = sessionService;
        }

        public IActionResult Index()
        {
            //if(sessionService.CurrentCustomer != null)
            //{
            //    return RedirectToAction("Index", "Dashboard");
            //}
            return View();
        }
    }
}