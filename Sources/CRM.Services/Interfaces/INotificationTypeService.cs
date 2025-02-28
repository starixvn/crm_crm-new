namespace CRM.Services.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.NotificationType;
using CRM.Models.NotificationType;
using Models;

public interface INotificationTypeService
{
    Task<CommandResult> CreateAsync(CreateNotificationType model);

    Task<CommandResult> EditAsync(EditNotificationType model);

    Task<CommandResult> DeleteAsync(DeleteNotificationType model);

    Task<IEnumerable<NotificationType>> GetNotificationTypeAsync(GetNotificationTypeCriteria criteria);
}