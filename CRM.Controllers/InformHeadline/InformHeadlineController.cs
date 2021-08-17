namespace CRM.Controllers.InformHeadline
{
    using System.Web;
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
    using CRM.Core.Models;
    using CRM.Criteria.InformHeadline;
    using CRM.Core.Services;

    [CrmPermission(FunctionKey = FunctionKey.InformHeadline, Policy = Policy.Read)]
    public class InformHeadlineController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IInformHeadlineService informHeadlineService;

        public InformHeadlineController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IBaseService baseService,
            ISettingService settingService,
            IExportExcelService excelService,
            IInformHeadlineService informHeadlineService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.baseService = baseService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.informHeadlineService = informHeadlineService;
        }

        public IActionResult Index()
        {
            var permission = new GetPermissionInform
            {
                ContactPolicy = ((Policy)userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.InformHeadlineContact)).ToString(),
                SearchPolicy = ((Policy)userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.InformHeadlineSearch)).ToString()
            };
            return View(permission);
        }

        public async Task<IActionResult> GetInforms()
        {
            IEnumerable<InformHeadlineModel> informs = await informHeadlineService.GetInformAsync();
            return Json(informs);
        }

        [HttpPost]
        public async Task<IActionResult> ExportInforms()
        {
            IEnumerable<InformHeadlineModel> informs = await informHeadlineService.GetInformAsync();
            var bytes = excelService.ExportInformHeadline(informs);
            string reportName = ViewResources.InformHeadline_Title;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> GetTitleDetail([FromBody] GetTitleDetailParam param)
        {
            InformTitleDetail titles = await informHeadlineService.GetTitleDetailAsync(param);
            return Json(titles);
        }

        public async Task<IActionResult> GetContactInformSettings()
        {
            var contactInformSettings = new
            {
                filterStatuses = await informHeadlineService.GetInformStatuses(true),
                productStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline),
                stations = await settingService.GetStations(),
                statuses = await informHeadlineService.GetInformStatuses()
            };
            return Json(contactInformSettings);
        }

        [HttpPost]
        public async Task<IActionResult> GetContactInforms([FromBody] GetContactInformParam param)
        {
            IEnumerable<UpdateInform> contactInforms = await informHeadlineService.GetContactInforms(param);
            return Json(contactInforms);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineContact, Policy = Policy.Host)]
        public async Task<IActionResult> UpdateContactInforms([FromBody] UpdateContactInformsCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineContact, Policy = Policy.Host)]
        public async Task<IActionResult> ExportContactInforms([FromBody] GetContactInformParam param)
        {
            IEnumerable<UpdateInform> contactInforms = await informHeadlineService.GetContactInforms(param);
            InformTitleDetail titles = await baseService.GetDataEntityAsync<InformTitleDetail>(new GetInformTitleDetailCriteria
            {
                TitleId = param.TitleId
            });
            var bytes = excelService.ExportUpdateInformHeadline(contactInforms, informHeadlineService, settingService, titles.Title);
            string reportName = ViewResources.ContactInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var allSettings = new
            {
                currencies = await settingService.GetCurrencyAsync(),
                productStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline),
                sites = await settingService.GetAllSitesWithGroupAsync(),
                stations = await settingService.GetStations(),
                statuses = await informHeadlineService.GetInformStatuses()
            };
            return Json(allSettings);
        }

        [HttpPost]
        public async Task<IActionResult> GetSearchInforms([FromBody] GetSearchInformParam param)
        {
            IEnumerable<UpdateInform> searchInforms = await informHeadlineService.GetSearchInforms(param);
            return Json(searchInforms);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> UpdateSearchInforms([FromBody] UpdateSearchInformsCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            command.Title = HttpUtility.HtmlEncode(command.Title);
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> ExportSearchInforms([FromBody] GetSearchInformParam param)
        {
            IEnumerable<UpdateInform> searchInforms = await informHeadlineService.GetSearchInforms(param);
            InformTitleDetail titles = await baseService.GetDataEntityAsync<InformTitleDetail>(new GetInformTitleDetailCriteria
            {
                TitleId = param.TitleId
            });
            var bytes = excelService.ExportUpdateInformHeadline(searchInforms, informHeadlineService, settingService, titles.Title);
            string reportName = ViewResources.UpdateInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> GetRemovedAccountLogs([FromBody] GetRemovedAccountLogParam param)
        {
            var result = await informHeadlineService.GetRemovedAccountLogAsync(param);
            return Json(new { item = result.Item1, totalItems = result.Item2 });
        }

        [HttpPost]
        public async Task<IActionResult> GetRemovedAccountLogDetails([FromBody] GetRemovedAccountLogDetailParam param)
        {
            var result = await informHeadlineService.GetRemovedAccountLogDetailAsync(param);
            return Json(new { item = result.Item1, totalItems = result.Item2 });
        }

        [HttpPost]
        public async Task<IActionResult> GetNewInforms([FromBody] GetNewInformParam param)
        {
            IEnumerable<NewInform> newInforms = await informHeadlineService.GetNewInforms(param);
            return Json(newInforms);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> InsertInforms([FromBody] InsertInformHeadlinesCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            command.Title = HttpUtility.HtmlEncode(command.Title);
            await baseService.ExecuteNonQueryAsync(command);
            var updateContactCriteria = new UpdateContactInformsCommand
            {
                Informs = command.Informs,
                TitleId = command.TitleId,
                IP = ClientIP,
                UserId = napSession.UserId
            };
            return await UpdateContactInforms(updateContactCriteria);
        }
    }
}
