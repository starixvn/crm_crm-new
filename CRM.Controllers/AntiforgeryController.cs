namespace CRM.Controllers
{
    using Microsoft.AspNetCore.Antiforgery;
    using Microsoft.AspNetCore.Mvc;

    [IgnoreAntiforgeryToken]
    public class AntiforgeryController : BaseController
    {
        private  readonly IAntiforgery AntiForgery;
        public AntiforgeryController(IAntiforgery AntiForgery)
        {
            this.AntiForgery = AntiForgery;
        }

        public IActionResult GenerateAntiForgeryTokens()
        {
            var tokens = AntiForgery.GetAndStoreTokens(HttpContext);
            return Json(tokens);
        }
    }
}
