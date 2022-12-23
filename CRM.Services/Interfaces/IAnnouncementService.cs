using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Core.Models;
using CRM.Criteria.Announcement;
using CRM.Criteria.NotificationType;
using CRM.Models.Announcement;
using CRM.Models.NotificationType;

namespace CRM.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<IEnumerable<AnnouncementInfo>> GetAnnouncementAsync(GetAnnouncementCriteria criteria);
    }
}
