namespace CRM.Controllers.InformHeadline
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.InformHeadline;
    using CRM.Models.InformHeadline;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.InformHeadline;
    using CRM.ViewModels.InformHeadline;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

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

        [HttpGet]
        public async Task<IActionResult> GetTitleDetail(int titleId)
        {
            InformTitleDetail titles = await informHeadlineService.GetTitleDetailAsync(titleId);
            return Json(titles);
        }

        public async Task<IActionResult> GetContactInformSettings()
        {
            var contactInformSettings = new CreateInformHeadlineViewModel
            {
                FilterStatuses = await informHeadlineService.GetInformStatusesAsync(true),
                ProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline),
                Stations = await settingService.GetStations(),
                Statuses = await informHeadlineService.GetInformStatusesAsync()
            };
            return Json(contactInformSettings);
        }

        [HttpPost]
        public async Task<IActionResult> GetContactInforms([FromBody] GetContactInformParam param)
        {
            IEnumerable<EditInform> contactInforms = await informHeadlineService.GetContactInformsAsync(param);
            return Json(contactInforms);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineContact, Policy = Policy.Host)]
        public async Task<IActionResult> EditContactInforms([FromBody] EditContactInformsCommand command)
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
            IEnumerable<EditInform> contactInforms = await informHeadlineService.GetContactInformsAsync(param);
            var informStatuses = await informHeadlineService.GetInformStatusesAsync();
            var informStations = await settingService.GetStations();
            var informProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline);
            InformTitleDetail titles = await baseService.GetDataEntityAsync<InformTitleDetail>(new GetInformTitleDetailCriteria
            {
                TitleId = param.TitleId
            });
            var bytes = excelService.ExportEditInformHeadline(contactInforms, informStatuses, informStations, informProductStatuses, titles.Title);
            string reportName = ViewResources.ContactInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var allSettings = new CreateInformHeadlineViewModel
            {
                Currencies = await settingService.GetCurrencyAsync(),
                ProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                Stations = await settingService.GetStations(),
                Statuses = await informHeadlineService.GetInformStatusesAsync()
            };
            return Json(allSettings);
        }

        [HttpPost]
        public async Task<IActionResult> GetEditInforms([FromBody] GetEditInformParam param)
        {
            IEnumerable<EditInform> editInforms = await informHeadlineService.GetEditInformsAsync(param);
            return Json(editInforms);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> EditInforms([FromBody] EditInformsCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            command.Title = HttpUtility.HtmlEncode(command.Title);
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> ExportEditInforms([FromBody] GetEditInformParam param)
        {
            IEnumerable<EditInform> editInforms = await informHeadlineService.GetEditInformsAsync(param);
            var informStatuses = await informHeadlineService.GetInformStatusesAsync();
            var informStations = await settingService.GetStations();
            var informProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline);
            InformTitleDetail titles = await baseService.GetDataEntityAsync<InformTitleDetail>(new GetInformTitleDetailCriteria
            {
                TitleId = param.TitleId
            });
            var bytes = excelService.ExportEditInformHeadline(editInforms, informStatuses, informStations, informProductStatuses, titles.Title);
            string reportName = ViewResources.UpdateInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> GetRemovedAccountLogs([FromBody] GetRemovedAccountLogParam param)
        {
            var result = await informHeadlineService.GetRemovedAccountLogAsync(param);
            return Json(new { item = result.listRemoveAccount, totalItems = result.totalRows });
        }

        [HttpPost]
        public async Task<IActionResult> GetRemovedAccountLogDetails([FromBody] GetRemovedAccountLogDetailParam param)
        {
            var result = await informHeadlineService.GetRemovedAccountLogDetailAsync(param);
            return Json(new { item = result.listRemoveAccountDetail, totalItems = result.totalRows });
        }

        [HttpPost]
        public async Task<IActionResult> GetNewInforms([FromBody] GetNewInformParam param)
        {
            var newInforms = await informHeadlineService.GetNewInformsAsync(param);
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
            var editContactCriteria = new EditContactInformsCommand
            {
                Informs = command.Informs,
                TitleId = command.TitleId,
                IP = ClientIP,
                UserId = napSession.UserId
            };
            return await EditContactInforms(editContactCriteria);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> EditInformStatus([FromBody] EditInformStatusCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.InformHeadlineSearch, Policy = Policy.Host)]
        public async Task<IActionResult> ExportNewInforms([FromBody] GetNewInformParam param)
        {
            var newInforms = await informHeadlineService.GetNewInformsAsync(param);
            var informStatuses = await informHeadlineService.GetInformStatusesAsync();
            var bytes = excelService.ExportNewInformHeadline(newInforms, informStatuses, param.Title);
            string reportName = ViewResources.NewInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
