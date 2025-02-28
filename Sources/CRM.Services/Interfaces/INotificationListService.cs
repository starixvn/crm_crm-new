namespace CRM.Services.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.NotificationList;
using CRM.Models.NotificationList;
using Models;

public interface INotificationListService
{
    Task<IEnumerable<Notification>> GetNotificationListAsync(GetNotificationListCriteria criteria);

    Task<CommandResult> EditNotificationListAsync(EditNotificationListCommand command);

    Task<ValidationNotificationListResult> ValidateNotificationListAsync(ValidateNotificationListCriteria criteria);

    Task<CommandResult> ResendNotificationsAsync(ResendNotificationsCommand command);
}