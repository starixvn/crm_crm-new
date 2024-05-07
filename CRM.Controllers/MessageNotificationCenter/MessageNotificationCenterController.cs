namespace CRM.Controllers.MessageNotificationCenter
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Models.MessageNotificationCenter;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.MessageNotificationCenter;
    using Microsoft.AspNetCore.Mvc;

    public class MessageNotificationCenterController : BaseController
    {
        private readonly IMessageNotificationCenterService messageNotificationCenterService;
        private readonly IExportExcelService excelService;

        public MessageNotificationCenterController(
            IMessageNotificationCenterService messageNotificationCenterService,
            IExportExcelService excelService
        )
        {
            this.messageNotificationCenterService = messageNotificationCenterService;
            this.excelService = excelService;
        }

        [HttpPost]
        public async Task<IActionResult> GetResultAdmNotification([FromBody] GetResultAdmNotification param)
        {
            var (notifications, allSite) = await messageNotificationCenterService.GetResultAdmNotificationAsync(param);
            return Json(new { totalItems = param.TotalRows, data = notifications, allSite });
        }

        public async Task<IActionResult> GetResultAdmNotificationById(int id)
        {
            var (notificationDetails, sites) = await messageNotificationCenterService.GetResultAdmNotificationByIdAsync(id);
            return Json(new { notificationDetails, sites });
        }

        [HttpPost]
        public async Task<IActionResult> EditResultAdmNotification([FromBody] EditResultAdmNotification param)
        {
            CommandResult commandResult = await messageNotificationCenterService.EditResultAdmNotificationAsync(param);
            return Json(commandResult);
        }

        [HttpPost]
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
