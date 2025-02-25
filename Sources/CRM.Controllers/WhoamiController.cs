namespace CRM.Controllers
{
    using CRM.Core.Extensions;
    using Microsoft.AspNetCore.Mvc;

    public class WhoamiController : Controller
    {
        [Route("Whoami")]
        [Route("Whoami.aspx")]
        public IActionResult Index()
        {
            return Content(WhoamiHelper.GetContent(HttpContext));
        }
    }
}