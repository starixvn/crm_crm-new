namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using ONEbook.UM.Services;

    public class ErrorController : Controller
    {
        private readonly IMaintenanceService maintenanceService;

        public ErrorController(IMaintenanceService maintenanceService)
        {
            this.maintenanceService = maintenanceService;
        }

        [Route("error/404")]
        [Route("error/PageNotFound")]
        public IActionResult PageNotFound()
        {
            return View();
        }

        [Route("error/405")]
        [Route("error/AccessDenied")]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [Route("error/500")]
        [Route("error/InternalError")]
        public IActionResult InternalError()
        {
            return View();
        }

        [Route("common/offline")]
        public async Task<IActionResult> Offline()
        {
            var downTime = await maintenanceService.GetUnderMaintenanceTimeAsync();
            ViewBag.UmtFrom = downTime.From;
            ViewBag.UmtTo = downTime.To;

            return View();
        }
    }
}