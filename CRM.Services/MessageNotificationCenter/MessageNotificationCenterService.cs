namespace CRM.Services.MessageNotificationCenter
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.MessageNotificationCenter;
    using CRM.Models.MessageNotificationCenter;
    using Fanex.NAP.Client.Helpers.Web;

    public interface IMessageNotificationCenterService
    {
        Task<(IEnumerable<ResultAdmNotification> notifications, IEnumerable<ResultAdmSite> allSite)> GetResulAdmNotificationAsync(GetResultAdmNotification param);

        Task<(IEnumerable<ResultAdmNotificationDetail> notificationDetails, IEnumerable<ResultAdmSite> sites)> GetResulAdmNotificationByIdAsync(int notiId);

        Task<CommandResult> EditResulAdmNotificationAsync(EditResultAdmNotification param);
    }

    public class MessageNotificationCenterService : IMessageNotificationCenterService
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;

        public MessageNotificationCenterService(
            INapSession napSession,
            IBaseService baseService
        )
        {
            this.napSession = napSession;
            this.baseService = baseService;
        }

        public async Task<(IEnumerable<ResultAdmNotification> notifications, IEnumerable<ResultAdmSite> allSite)> GetResulAdmNotificationAsync(GetResultAdmNotification param)
        {
            var criteria = new GetResultAdmNotificationCriteria
            {
                FCreatedDate = param.FromDate,
                TCreatedDate = param.ToDate,
                NotiType = param.IsOstUser ? UserAmendment.OST : UserAmendment.CSD,
                FNotiID = param.NotificationId ??  param.FromNotificationId,
                TNotiID = param.NotificationId ?? param.ToNotificationId,
                MatchID = param.MatchId,
                MsgID = param.MessageId,
                Content = param.Content,
                Status = param.Statuses,
                Sender = param.Sender,
                IncludeTest = param.IsIncludeTestData,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
            var (notifications, allSite) = await baseService.FetchMultipleAsync<ResultAdmNotification, ResultAdmSite>(criteria);
            param.TotalRows = criteria.TotalRows;
            return (notifications, allSite);
        }

        public async Task<(IEnumerable<ResultAdmNotificationDetail> notificationDetails, IEnumerable<ResultAdmSite> sites)> GetResulAdmNotificationByIdAsync(int notiId)
        {
            var criteria = new GetResultAdmNotiByIdCriteria
            {
                NotiID = notiId
            };
            var (notificationDetails, sites) = await baseService.FetchMultipleAsync<ResultAdmNotificationDetail, ResultAdmSite>(criteria);
            return (notificationDetails, sites);
        }

        public async Task<CommandResult> EditResulAdmNotificationAsync(EditResultAdmNotification param)
        {
            var command = new EditResultAdmNotificationCommand
            {
                UpdaterID = napSession.UserId,
                NotiID = param.NotiID,
                NewStatus = param.NewStatus,
                NewContentEN = param.NewContentEN,
                NewContentCH = param.NewContentCH,
                NewContentCS = param.NewContentCS
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
