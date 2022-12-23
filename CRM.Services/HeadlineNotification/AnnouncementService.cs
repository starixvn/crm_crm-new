using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Core.Services;
using CRM.Criteria.Announcement;
using CRM.Models.Announcement;
using CRM.Services.Interfaces;
using Fanex.NAP.Client.Helpers.Web;
using Microsoft.AspNetCore.Http;

namespace CRM.Services.HeadlineNotification
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AnnouncementService(
            INapSession napSession,
            IBaseService baseService,
            IHttpContextAccessor httpContextAccessor)
        {
            this.napSession = napSession;
            this.baseService = baseService;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<AnnouncementInfo>> GetAnnouncementAsync(GetAnnouncementCriteria criteria)
        {
            return await baseService.GetDataAsync<AnnouncementInfo>(criteria);
        }
    }
}
