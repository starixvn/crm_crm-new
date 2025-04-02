namespace CRM.Services.HeadlineNotification;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.NotificationList;
using CRM.Models.NotificationList;
using Interfaces;
using Models;

public class NotificationListService(IBaseService baseService) : INotificationListService
{
    public async Task<IEnumerable<Notification>> GetNotificationListAsync(GetNotificationListCriteria criteria)
    {
        var result = await baseService.FetchMultipleAsync<Notification, Recipient, Headline>(criteria);
        foreach (var notification in result.Item1)
        {
            notification.Recipients = result.Item2.Where(recipient => notification.NotificationId == recipient.NotificationId);
            notification.Headlines = result.Item3.Where(headline => notification.NotificationId == headline.NotificationId);
        }
        return result.Item1;
    }

    public async Task<CommandResult> EditNotificationListAsync(EditNotificationListCommand command)
    {
        return await baseService.ExecuteNonQueryAsync(command);
    }

    public async Task<ValidationNotificationListResult> ValidateNotificationListAsync(ValidateNotificationListCriteria criteria)
    {
        var result = await baseService.FetchMultipleAsync<int, int>(criteria);
        return new ValidationNotificationListResult
        {
            InActiveNotificationIds = result.Item1,
            ResendIds = result.Item2
        };
    }

    public async Task<CommandResult> ResendNotificationsAsync(ResendNotificationsCommand command)
    {
        return await baseService.ExecuteNonQueryAsync(command);
    }
}