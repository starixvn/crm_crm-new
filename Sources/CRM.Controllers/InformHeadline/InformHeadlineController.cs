namespace CRM.Controllers.InformHeadline
{
    using System.Collections.Generic;
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
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.InformHeadline, Policy = Policy.Read)]
    public class InformHeadlineController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IInformHeadlineService informHeadlineService;
        private readonly IPermissionService permissionService;

        public InformHeadlineController(
            INapSession napSession,
            IBaseService baseService,
            ISettingService settingService,
            IExportExcelService excelService,
            IInformHeadlineService informHeadlineService,
            IPermissionService permissionService
        )
        {
            this.napSession = napSession;
            this.baseService = baseService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.informHeadlineService = informHeadlineService;
            this.permissionService = permissionService;
        }

        public async Task<IActionResult> GetInforms()
        {
            IEnumerable<InformHeadlineModel> informs = await informHeadlineService.GetInformAsync();
            return Json(informs);
        }

        public async Task<IActionResult> GetPermissions()
        {
            var informHeadlineContactPolicy = await permissionService.GetPolicyPermissionAsync(FunctionKey.InformHeadlineContact);
            var permission = new GetPermissionInform
            {
                ContactPolicy = informHeadlineContactPolicy,
                SearchPolicy = await permissionService.GetPolicyPermissionAsync(FunctionKey.InformHeadlineSearch),
                HasHostPermission = informHeadlineContactPolicy == (int)Policy.Host
            };
            return Json(permission);
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
            InformTitleDetail title = await informHeadlineService.GetTitleDetailAsync(titleId);
            return Json(title);
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
        public async Task<IActionResult> ExportContactInforms([FromBody] GetContactInformParam param)
        {
            IEnumerable<EditInform> contactInforms = await informHeadlineService.GetContactInformsAsync(param);
            var informStatuses = await informHeadlineService.GetInformStatusesAsync();
            var informStations = await settingService.GetStations();
            var informProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline);
            var title = await informHeadlineService.GetTitleDetailAsync(param.TitleId);
            var bytes = excelService.ExportEditInformHeadline(contactInforms, informStatuses, informStations, informProductStatuses, title.Title);
            string reportName = ViewResources.ContactInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var allSettings = new CreateInformHeadlineViewModel
            {
                Currencies = await settingService.GetCurrencyAsync(),
                ProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline),
                Sites = await settingService.GetAllSitesWithGroupInformHeadlineAsync(),
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
        public async Task<IActionResult> ExportEditInforms([FromBody] GetEditInformParam param)
        {
            IEnumerable<EditInform> editInforms = await informHeadlineService.GetEditInformsAsync(param);
            var informStatuses = await informHeadlineService.GetInformStatusesAsync();
            var informStations = await settingService.GetStations();
            var informProductStatuses = await settingService.GetStatusAsync(ViewTypeConstants.InformHeadline);
            var title = await informHeadlineService.GetTitleDetailAsync(param.TitleId);
            var bytes = excelService.ExportEditInformHeadline(editInforms, informStatuses, informStations, informProductStatuses, title.Title);
            string reportName = ViewResources.UpdateInformHeadlines;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> GetRemovedAccountLogs([FromBody] GetRemovedAccountLogParam param)
        {
            var result = await informHeadlineService.GetRemovedAccountLogAsync(param);
            var (listRemoveAccounts, totalRows) = result;
            return Json(new { item = listRemoveAccounts, totalItems = totalRows });
        }

        [HttpPost]
        public async Task<IActionResult> GetRemovedAccountLogDetails([FromBody] GetRemovedAccountLogDetailParam param)
        {
            var result = await informHeadlineService.GetRemovedAccountLogDetailAsync(param);
            var (listRemoveAccountDetails, totalRows) = result;
            return Json(new { item = listRemoveAccountDetails, totalItems = totalRows });
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
                listInforms = command.Informs,
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