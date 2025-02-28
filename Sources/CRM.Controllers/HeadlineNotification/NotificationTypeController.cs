namespace CRM.Controllers.HeadlineNotification;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.NotificationType;
using CRM.Models.NotificationType;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Read)]
public class NotificationTypeController(
    INotificationTypeService notificationTypeService,
    ICommonService commonService)
    : BaseController
{
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
        var commandResult = await notificationTypeService.CreateAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Host)]
    public async Task<IActionResult> Edit([FromBody] EditNotificationType model)
    {
        var commandResult = await notificationTypeService.EditAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationType, Policy = Policy.Host)]
    public async Task<IActionResult> Delete([FromBody] DeleteNotificationType model)
    {
        var commandResult = await notificationTypeService.DeleteAsync(model);
        return Json(commandResult);
    }
}