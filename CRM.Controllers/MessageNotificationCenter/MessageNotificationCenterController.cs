namespace CRM.Controllers.MessageNotificationCenter
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Models.MessageNotificationCenter;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.MessageNotificationCenter;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Read)]
    public class MessageNotificationCenterController : BaseController
    {
        private readonly IMessageNotificationCenterService messageNotificationCenterService;
        private readonly IExportExcelService excelService;
        private readonly IPermissionService permissionService;

        public MessageNotificationCenterController(
            IMessageNotificationCenterService messageNotificationCenterService,
            IExportExcelService excelService,
            IPermissionService permissionService
        )
        {
            this.messageNotificationCenterService = messageNotificationCenterService;
            this.excelService = excelService;
            this.permissionService = permissionService;
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetResultAdmNotification([FromBody] GetResultAdmNotification param)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            param.SitePermission = sitePermission;
            param.LicenseeType = licenseeType;

            var (notifications, allSite) = await messageNotificationCenterService.GetResultAdmNotificationAsync(param);
            return Json(new { totalItems = param.TotalRows, data = notifications, allSite });
        }

        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetResultAdmNotificationById(int id)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            var (notificationDetails, sites) = await messageNotificationCenterService.GetResultAdmNotificationByIdAsync(id, sitePermission, licenseeType);
            return Json(new { notificationDetails, sites });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Host)]
        public async Task<IActionResult> EditResultAdmNotification([FromBody] EditResultAdmNotification param)
        {
            CommandResult commandResult = await messageNotificationCenterService.EditResultAdmNotificationAsync(param);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Host)]
        public async Task<IActionResult> EditResultAdmStatus([FromBody] EditResultAdmNotiStatus param)
        {
            CommandResult commandResult = await messageNotificationCenterService.EditResultAdmStatusAsync(param);
            return Json(commandResult);
        }

        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetSiteTicketsById(int id)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            var siteTickets = await messageNotificationCenterService.GetSiteTicketsByIdAsync(id, sitePermission, licenseeType);
            return Json(siteTickets);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> ExportExcel([FromBody] ExcelSiteTicket param)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            IEnumerable<AdmSiteTicket> siteTickets = await messageNotificationCenterService.GetSiteTicketsByIdAsync(param.NotificationId, sitePermission, licenseeType);
            var eventDate = param.EventDate.ToShortDateFormatDash();
            var bytes = excelService.ExportSiteTicket(siteTickets, eventDate, param.EventName);
            string reportName = string.Format(ViewResources.MncAffectedTicketFileName, eventDate);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        private async Task<(string sitePermission, short licenseeType)> GetDataPermission()
        {
            var sitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            return (sitePermission, licenseeType);
        }
    }
}
