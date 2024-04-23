namespace CRM.Controllers.MessageNotificationCenter
{
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using CRM.Models.MessageNotificationCenter;
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
            var (notifications, allSite) = await messageNotificationCenterService.GetResulAdmNotificationAsync(param);
            return Json(new { totalItems = param.TotalRows, notifications, allSite });
        }

        public async Task<IActionResult> GetResultAdmNotificationById(int id)
        {
            var (notificationDetails, sites) = await messageNotificationCenterService.GetResulAdmNotificationByIdAsync(id);
            return Json(notificationDetails, sites);
        }

        [HttpPost]
        public async Task<IActionResult> EditResultAdmNotification([FromBody] EditResultAdmNotification param)
        {
            CommandResult commandResult = await messageNotificationCenterService.EditResulAdmNotificationAsync(param);
            return Json(commandResult);
        }
    }
}
