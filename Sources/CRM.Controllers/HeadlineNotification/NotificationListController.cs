namespace CRM.Controllers.HeadlineNotification;

using System;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.NotificationList;
using CRM.Criteria.NotificationType;
using CRM.Models.NotificationList;
using Enum;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.NotificationList, Policy = Policy.Read)]
public class NotificationListController(
    INapSession napSession,
    INotificationListService notificationListService,
    INotificationTypeService notificationTypeService,
    ICommonService commonService)
    : BaseController
{
    public async Task<IActionResult> GetSettings()
    {
        var result = new
        {
            NotificationTypes = await notificationTypeService.GetNotificationTypeAsync(new GetNotificationTypeCriteria()),
            Statuses = Enum.GetValues(typeof(NotificationStatus)).Cast<NotificationStatus>().Select(status => status.ToString())
        };

        return Json(result);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationList, Policy = Policy.Read)]
    public async Task<IActionResult> GetGridData([FromBody]GetNotificationListCriteria param)
    {
        if (param.FromDate.HasValue && param.ToDate.HasValue)
        {
            param.FromDate = commonService.ConvertToServerDateTime(param.FromDate.Value);
            param.ToDate = commonService.ConvertToServerDateTime(param.ToDate.Value);
        }

        var notifications = await notificationListService.GetNotificationListAsync(param);
        foreach (var notification in notifications)
        {
            notification.SendDate = commonService.ConvertToClientDateTime(notification.SendDate);
        }

        return Json(new { totalItems = param.TotalRows, data = notifications });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationList, Policy = Policy.Host)]
    public async Task<IActionResult> EditNotificationList([FromBody]EditNotificationListCommand command)
    {
        command.UserId = napSession.UserId;
        var result = await notificationListService.EditNotificationListAsync(command);
        return Json(new { resolvedBy = napSession.UserName, result });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationList, Policy = Policy.Host)]
    public async Task<IActionResult> ValidateNotificationList([FromBody]ValidateNotificationListModel model)
    {
        var criteria = new ValidateNotificationListCriteria { NotificationIds = model.NotificationIds };
        var result = await notificationListService.ValidateNotificationListAsync(criteria);
        result.IsSingle = model.IsSingle;
        return Json(result);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationList, Policy = Policy.Host)]
    public async Task<IActionResult> ResendNotificationList([FromBody]ResendNotificationsCommand command)
    {
        command.UserId = napSession.UserId;
        var result = await notificationListService.ResendNotificationsAsync(command);
        return Json(result);
    }
}