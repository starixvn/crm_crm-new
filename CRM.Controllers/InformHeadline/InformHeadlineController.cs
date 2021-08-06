namespace CRM.Controllers.InformHeadline
{
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Models.InformHeadline;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.InformHeadline;
    using Microsoft.AspNetCore.Mvc;
    using CRM.Core.Filters;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Services;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.InformHeadline, Policy = Policy.Read)]
    public class InformHeadlineController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IInformHeadlineService informHeadlineService;

        public InformHeadlineController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IExportExcelService excelService,
            IInformHeadlineService informHeadlineService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.informHeadlineService = informHeadlineService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.InformHeadline, Policy.Host);
            return View(isHost);
        }

        [HttpGet]
        public async Task<IActionResult> GetInforms()
        {
            IEnumerable<InformHeadlineDetail> informs = await informHeadlineService.GetInformAsync();
            return Json(informs);
        }

        [HttpPost]
        public async Task<IActionResult> ExportInformExcel()
        {
            IEnumerable<InformHeadlineDetail> informs = await informHeadlineService.GetInformAsync();
            var bytes = excelService.ExportInformHeadline(informs);
            string reportName = ViewResources.InformHeadline_Title;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
