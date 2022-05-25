namespace CRM.Controllers
{
    using CRM.Core.Filters;
    using Microsoft.AspNetCore.Mvc;

    [CrmAuthorize]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}