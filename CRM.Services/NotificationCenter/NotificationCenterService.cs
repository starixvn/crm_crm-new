namespace CRM.Services.NotificationCenter
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.NotificationCenter;
    using CRM.Models.NotificationCenter;
    using Fanex.NAP.Client.Helpers.Web;

    public interface INotificationCenterService
    {
        Task<(IEnumerable<ResultAdmNotification> notifications, IEnumerable<ResultAdmSite> allSite)> GetResultAdmNotificationAsync(GetResultAdmNotification param);

        Task<(IEnumerable<ResultAdmNotificationDetail> notificationDetails, IEnumerable<ResultAdmSite> sites)> GetResultAdmNotificationByIdAsync(int notiId, string sitePermission, short licenseeType);

        Task<CommandResult> EditResultAdmNotificationAsync(EditResultAdmNotification param);

        Task<CommandResult> EditResultAdmStatusAsync(EditResultAdmNotiStatus param);

        Task<IEnumerable<AdmSiteTicket>> GetSiteTicketsByIdAsync(int notiId, string sitePermission, short licenseeType);
    }

    public class NotificationCenterService : INotificationCenterService
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;

        public NotificationCenterService(
            INapSession napSession,
            IBaseService baseService
        )
        {
            this.napSession = napSession;
            this.baseService = baseService;
        }

        public async Task<(IEnumerable<ResultAdmNotification> notifications, IEnumerable<ResultAdmSite> allSite)> GetResultAdmNotificationAsync(GetResultAdmNotification param)
        {
            var criteria = new GetResultAdmNotificationCriteria
            {
                FCreatedDateGMT8 = param.FromDate,
                TCreatedDateGMT8 = param.ToDate,
                NotiType = param.IsOstUser ? UserAmendment.OST : UserAmendment.CSD,
                FNotiID = param.NotificationId ?? param.FromNotificationId,
                TNotiID = param.NotificationId ?? param.ToNotificationId,
                MatchID = param.MatchId,
                MsgID = param.MessageId,
                Content = param.Content,
                Status = param.Statuses,
                Sender = param.Sender,
                TestOnly = param.IsTestOnly,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize,
                SitePermission = param.SitePermission,
                LicenseeType = param.LicenseeType
            };
            var (notifications, allSite) = await baseService.FetchMultipleAsync<ResultAdmNotification, ResultAdmSite>(criteria);
            param.TotalRows = criteria.TotalRows;
            return (notifications, allSite);
        }

        public async Task<(IEnumerable<ResultAdmNotificationDetail> notificationDetails, IEnumerable<ResultAdmSite> sites)>
        GetResultAdmNotificationByIdAsync(int notiId, string sitePermission, short licenseeType)
        {
            var criteria = new GetResultAdmNotiByIdCriteria
            {
                NotiID = notiId,
                SitePermission = sitePermission,
                LicenseeType = licenseeType
            };
            var (notificationDetails, sites) = await baseService.FetchMultipleAsync<ResultAdmNotificationDetail, ResultAdmSite>(criteria);
            return (notificationDetails, sites);
        }

        public async Task<CommandResult> EditResultAdmNotificationAsync(EditResultAdmNotification param)
        {
            var command = new EditResultAdmNotificationCommand
            {
                UpdaterID = napSession.UserId,
                NotiID = param.NotificationId,
                NewStatus = param.NewStatus,
                NewSubject = param.NewSubject,
                NewContentEN = param.NewContentEN,
                NewContentCH = param.NewContentCH,
                NewContentCS = param.NewContentCS,
                NewContentZHCN = param.NewContentZHCN
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditResultAdmStatusAsync(EditResultAdmNotiStatus param)
        {
            var command = new EditResultAdmNotiStatusCommand
            {
                NotiID = param.NotificationId,
                NewStatus = param.NewStatus,
                UpdaterID = napSession.UserId
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<IEnumerable<AdmSiteTicket>> GetSiteTicketsByIdAsync(int notiId, string sitePermission, short licenseeType)
        {
            var criteria = new GetSiteTicketByIdCriteria
            {
                NotiID = notiId,
                SitePermission = sitePermission,
                LicenseeType = licenseeType
            };
            return await baseService.GetDataAsync<AdmSiteTicket>(criteria);
        }
    }
}
