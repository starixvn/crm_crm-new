using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Core.Models;
using CRM.Criteria.Announcement;
using CRM.Models.Announcement;

namespace CRM.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<IEnumerable<AnnouncementInfo>> GetAnnouncementAsync(GetAnnouncementCriteria criteria);

        Task<ValueTuple<IEnumerable<AnnouncementDetail>, IEnumerable<ContentInfo>>> GetContentByIdAsync(int id);

        Task<CommandResult> NewAnnouncementAsync(CreateAnnouncementCommand command);

        Task<CommandResult> EditAnnouncementAsync(EditAnnouncementCommand command);

        Task<CommandResult> CancelAnnouncementAsync(CancelAnnouncementCommand command);

        Task<ValueTuple<IEnumerable<NotificationTemplate>, IEnumerable<ContentLanguage>>> GetAnnouncementTemplateAsync();

        Task<(IEnumerable<AnnouncementDetail>, CommandResult)> ValidateAnnouncementAsync(ValidateAnnouncementCommand command);
    }
}