using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Core.Models;
using CRM.Core.Services;
using CRM.Criteria.Announcement;
using CRM.Models.Announcement;
using CRM.Services.Interfaces;

namespace CRM.Services.HeadlineNotification
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;


        public AnnouncementService(
            IBaseService baseService,
            ICommonService commonService
        )
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }

        public async Task<IEnumerable<AnnouncementInfo>> GetAnnouncementAsync(GetAnnouncementCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
            var announcements = await baseService.GetDataAsync<AnnouncementInfo>(criteria);
            foreach(var announcement in announcements)
            {
                var convertSendDateToClient = commonService.ConvertToClientDateTime(announcement.SendDate);
                var convertCreatedTimeToClient = commonService.ConvertToClientDateTime(announcement.CreatedTime);
                announcement.SendDate = convertSendDateToClient;
                announcement.SendDateString = convertSendDateToClient.ToString("MMM dd, yyyy");
                announcement.SendTimeString = convertSendDateToClient.ToString("hh:mm:ss tt");
                announcement.CreatedTime = convertCreatedTimeToClient;
            }
            return announcements;
        }

        public async Task<CommandResult> NewAnnouncementAsync(CreateAnnouncementCommand command)
        {
            command.SendDate = commonService.ConvertToServerDateTime((DateTime)command.SendDate);
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditAnnouncementAsync(EditAnnouncementCommand command)
        {
            command.SendDate = commonService.ConvertToServerDateTime((DateTime)command.SendDate);
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> CancelAnnouncementAsync(CancelAnnouncementCommand command)
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