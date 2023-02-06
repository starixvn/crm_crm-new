using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Core.Models;
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
        private readonly IBaseService baseService;

        public AnnouncementService(
            IBaseService baseService
        )
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<AnnouncementInfo>> GetAnnouncementAsync(GetAnnouncementCriteria criteria)
        {
            return await baseService.GetDataAsync<AnnouncementInfo>(criteria);
        }

        public async Task<CommandResult> NewAnnouncementAsync(CreateAnnouncementCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditAnnouncementAsync(EditAnnouncementCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<ValueTuple<IEnumerable<AnnouncementDetail>, IEnumerable<ContentInfo>>> GetContentByIdAsync(int id)
        {
            var criteria = new GetContentByIdCriteria
            {
                AnnouncementId = id
            };
            return await baseService.FetchMultipleAsync<AnnouncementDetail, ContentInfo>(criteria);
        }

        public async Task<ValueTuple<IEnumerable<NotificationTemplate>, IEnumerable<ContentLanguage>>> GetAnnouncementTemplateAsync()
        {
            var criteria = new GetAnnouncementTemplateCriteria();
            return await baseService.FetchMultipleAsync<NotificationTemplate, ContentLanguage>(criteria);
        }
    }
}
