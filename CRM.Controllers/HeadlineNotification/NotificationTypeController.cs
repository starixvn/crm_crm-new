namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.NotificationType;
    using CRM.Models.NotificationType;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Read)]
    public class NotificationTypeController : BaseController
    {
        private readonly INotificationTypeService notificationTypeService;
        private readonly ICommonService commonService;

        public NotificationTypeController(
            INotificationTypeService notificationTypeService,
            ICommonService commonService)
        {
            this.notificationTypeService = notificationTypeService;
            this.commonService = commonService;
        }

        public async Task<IActionResult> GetSettings()
        {
            var result = new
            {
                ChatTypes = commonService.GetChatTypes(),
                Systems = await commonService.GetSystemAsync(),
                RecipientTypes = await commonService.GetRecipientTypeAsync()
            };

            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> GetNotificationType([FromBody] GetNotificationTypeParam param)
        {
            var criteria = new GetNotificationTypeCriteria
            {
                RecipientTypeIds = param.RecipientTypeIds,
                ChatTypeIds = param.ChatTypeIds,
                SystemId = param.SystemId,
                NotificationTypeName = param.NotificationTypeName,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };

            var notificationTypes = await notificationTypeService.GetNotificationTypeAsync(criteria);

            return Json(new { totalItems = criteria.TotalRows, data = notificationTypes });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody] CreateNotificationType model)
        {
            CommandResult commandResult = await notificationTypeService.CreateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Host)]
        public async Task<IActionResult> Edit([FromBody] EditNotificationType model)
        {
            CommandResult commandResult = await notificationTypeService.EditAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Host)]
        public async Task<IActionResult> Delete([FromBody] DeleteNotificationType model)
        {
            CommandResult commandResult = await notificationTypeService.DeleteAsync(model);
            return Json(commandResult);
        }
    }
}