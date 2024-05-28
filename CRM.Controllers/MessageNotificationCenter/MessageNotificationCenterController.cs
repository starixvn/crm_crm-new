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

    [CrmPermission(FunctionKey = FunctionKey.MessageNotificationCenter, Policy = Policy.Read)]
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
            var sitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            param.SitePermission = sitePermission;
            param.LicenseeType = licenseeType;

            var (notifications, allSite) = await messageNotificationCenterService.GetResultAdmNotificationAsync(param);
            return Json(new { totalItems = param.TotalRows, data = notifications, allSite });
        }

        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetResultAdmNotificationById(int id)
        {
            var (notificationDetails, sites) = await messageNotificationCenterService.GetResultAdmNotificationByIdAsync(id);
            return Json(new { notificationDetails, sites });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.MessageNotificationCenter, Policy = Policy.Host)]
        public async Task<IActionResult> EditResultAdmNotification([FromBody] EditResultAdmNotification param)
        {
            CommandResult commandResult = await messageNotificationCenterService.EditResultAdmNotificationAsync(param);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.MessageNotificationCenter, Policy = Policy.Host)]
        public async Task<IActionResult> EditResultAdmStatus([FromBody] EditResultAdmNotiStatus param)
        {
            CommandResult commandResult = await messageNotificationCenterService.EditResultAdmStatusAsync(param);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetSiteTicketsById(int id)
        {
            var siteTickets = await messageNotificationCenterService.GetSiteTicketsByIdAsync(id);
            return Json(siteTickets);
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] ExcelSiteTicket param)
        {
            IEnumerable<AdmSiteTicket> siteTickets = await messageNotificationCenterService.GetSiteTicketsByIdAsync(param.NotificationId);
            var eventDate = param.EventDate.ToShortDateFormatDash();
            var bytes = excelService.ExportSiteTicket(siteTickets, eventDate, param.EventName);
            string reportName = string.Format(ViewResources.MncAffectedTicketFileName, eventDate);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
