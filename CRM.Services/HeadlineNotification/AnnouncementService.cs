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
        private readonly string FormatMMMddyyyy = "MMM dd, yyyy";
        private readonly string Formathhmmsstt = "hh:mm:ss tt";


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
            if (criteria.FromDate.HasValue && criteria.ToDate.HasValue)
            {
                criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate.Value);
                criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate.Value);
            }
            var announcements = await baseService.GetDataAsync<AnnouncementInfo>(criteria);
            foreach(var announcement in announcements)
            {
                if (announcement.SendDate != null)
                {
                    var convertSendDateToClient = commonService.ConvertToClientDateTime((DateTime)announcement.SendDate);
                    announcement.SendDate = convertSendDateToClient;
                    announcement.SendDateString = convertSendDateToClient.ToString(FormatMMMddyyyy);
                    announcement.SendTimeString = convertSendDateToClient.ToString(Formathhmmsstt);
                }

                var convertCreatedTimeToClient = commonService.ConvertToClientDateTime(announcement.CreatedTime);
                announcement.CreatedTime = convertCreatedTimeToClient;
                announcement.CreatedDateString = convertCreatedTimeToClient.ToString(FormatMMMddyyyy);
                announcement.CreatedTimeString = convertCreatedTimeToClient.ToString(Formathhmmsstt);
            }
            return announcements;
        }

        public async Task<CommandResult> NewAnnouncementAsync(CreateAnnouncementCommand command)
        {
                DateTime? notSendImmediately = command.SendDate != null ? commonService.ConvertToServerDateTime((DateTime)command.SendDate) : null;
                command.SendDate = command.SendImmediately ? command.SendDate : notSendImmediately;
                return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditAnnouncementAsync(EditAnnouncementCommand command)
        {
            DateTime? notSendImmediately = command.SendDate != null ? commonService.ConvertToServerDateTime((DateTime)command.SendDate) : null;
            command.SendDate = command.SendImmediately ? command.SendDate : notSendImmediately;
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
            var (announcements, contents) = await baseService.FetchMultipleAsync<AnnouncementDetail, ContentInfo>(criteria);
            foreach (var announcement in announcements)
            {
                if (announcement.SendDate != null)
                {
                    var convertSendDateToClient = commonService.ConvertToClientDateTime((DateTime)announcement.SendDate);
                    announcement.SendDate = convertSendDateToClient;
                    announcement.SendDateString = convertSendDateToClient.ToString(FormatMMMddyyyy);
                    announcement.SendTimeString = convertSendDateToClient.ToString(Formathhmmsstt);
                }
            }
            return new ValueTuple<IEnumerable<AnnouncementDetail>, IEnumerable<ContentInfo>>(announcements, contents);
        }

        public async Task<ValueTuple<IEnumerable<NotificationTemplate>, IEnumerable<ContentLanguage>>> GetAnnouncementTemplateAsync()
        {
            var criteria = new GetAnnouncementTemplateCriteria();
            return await baseService.FetchMultipleAsync<NotificationTemplate, ContentLanguage>(criteria);
        }

        public async Task<(IEnumerable<AnnouncementDetail> , CommandResult)> ValidateAnnouncementAsync(ValidateAnnouncementCommand command)
        {
            var sendDate = command.SendImmediately ? command.SendDate : commonService.ConvertToServerDateTime((DateTime)command.SendDate);
            IEnumerable<AnnouncementDetail> announcements = new List<AnnouncementDetail>();
            var commandResult = await baseService.ExecuteNonQueryAsync(command);

            if (commandResult.IsSuccessful)
            {
                announcements = await baseService.GetDataAsync<AnnouncementDetail>(command);
                if (sendDate != null)
                {
                    foreach (var announcement in announcements)
                    {
                        var convertSendDateToClient = commonService.ConvertToClientDateTime((DateTime)sendDate);
                        announcement.SendDate = convertSendDateToClient;
                        announcement.SendDateString = convertSendDateToClient.ToString(FormatMMMddyyyy);
                        announcement.SendTimeString = convertSendDateToClient.ToString(Formathhmmsstt);
                    }
                }
            }

            return (announcements, commandResult);
        }
    }
}