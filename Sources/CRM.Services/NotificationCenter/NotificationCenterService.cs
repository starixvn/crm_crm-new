namespace CRM.Services.NotificationCenter;

using Constants;
using CRM.Criteria.NotificationCenter;
using CRM.Models.NotificationCenter;
using Fanex.NAP.Client;
using Microsoft.Extensions.Configuration;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public interface INotificationCenterService
{
    Task<(IEnumerable<ResultAdmNotification> notifications, IEnumerable<ResultAdmSite> allSite)> GetResultAdmNotificationAsync(GetResultAdmNotification param);

    Task<(IEnumerable<ResultAdmNotificationDetail> notificationDetails, IEnumerable<ResultAdmSite> sites)>
        GetResultAdmNotificationByIdAsync(int notificationId, string sitePermission, short licenseeType);

    Task<CommandResult> EditResultAdmNotificationAsync(EditResultAdmNotification param);

    Task<CommandResult> EditResultAdmStatusAsync(EditResultAdmNotiStatus param);

    Task<CommandResult> EditResultAdmReasonAsync(int notificationId, int reasonId);

    Task<IEnumerable<AdmSiteTicket>> GetSiteTicketsByIdAsync(int notificationId, string sitePermission, short licenseeType);
    Task<IEnumerable<Models.Setting.Setting>> GetReasonListSettingAsync();
}

public class NotificationCenterService(
    INapSession napSession,
    IBaseService baseService,
    IConfiguration configuration)
    : INotificationCenterService
{
    private readonly string BaseNotificationCenterImgUrl = configuration.GetValue<string>("BaseNotiCenterImgUrl");
    private const string formatImageUrl = "{0}{1}/{2}";

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

        await MapReasonDetail(notifications);

        param.TotalRows = criteria.TotalRows;
        return (notifications, allSite);
    }

    public async Task<(IEnumerable<ResultAdmNotificationDetail> notificationDetails, IEnumerable<ResultAdmSite> sites)>
        GetResultAdmNotificationByIdAsync(int notificationId, string sitePermission, short licenseeType)
    {
        var criteria = new GetResultAdmNotiByIdCriteria
        {
            NotiID = notificationId,
            SitePermission = sitePermission,
            LicenseeType = licenseeType
        };
        var (notificationDetails, sites) = await baseService.FetchMultipleAsync<ResultAdmNotificationDetail, ResultAdmSite>(criteria);
        return (notificationDetails, sites);
    }

    private async Task MapReasonDetail(IEnumerable<ResultAdmNotificationDetail> notifications)
    {
        var settings = await GetReasonListSettingAsync();

        foreach (var notification in notifications)
        {
            var settingReason = settings.FirstOrDefault(s => s.SettingId == notification.ReasonId);
            notification.Reason = settingReason?.SettingValue ?? string.Empty;
        }
    }

    public async Task<CommandResult> EditResultAdmNotificationAsync(EditResultAdmNotification param)
    {
        if (!string.IsNullOrEmpty(param.Filename))
        {
            param.Filename = FormatImageUrls(param.Filename, param.NotificationId);
        }

        var command = new EditResultAdmNotificationCommand
        {
            UpdaterID = napSession.UserId,
            NotiID = param.NotificationId,
            NewStatus = param.NewStatus,
            NewSubject = param.NewSubject,
            NewContentEN = param.NewContentEN,
            NewContentCH = param.NewContentCH,
            NewContentCS = param.NewContentCS,
            NewContentZHCN = param.NewContentZHCN,
            Remark = param.Remark,
            Filename = param.Filename
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

    public async Task<CommandResult> EditResultAdmReasonAsync(int notificationId, int reasonId)
    {
        var command = new EditReasonAdmNotificationCommand
        {
            NotiId = notificationId,
            ReasonId = reasonId,
            UpdaterId = napSession.UserId
        };
        return await baseService.ExecuteNonQueryAsync(command);
    }

    public async Task<IEnumerable<AdmSiteTicket>> GetSiteTicketsByIdAsync(int notificationId, string sitePermission, short licenseeType)
    {
        var criteria = new GetSiteTicketByIdCriteria
        {
            NotiID = notificationId,
            SitePermission = sitePermission,
            LicenseeType = licenseeType
        };
        return await baseService.GetDataAsync<AdmSiteTicket>(criteria);
    }

    public async Task<IEnumerable<Models.Setting.Setting>> GetReasonListSettingAsync()
        => await baseService.GetDataAsync<Models.Setting.Setting>(new GetReasonListSettingCriteria { IsActive = true });

    private string FormatImageUrls(string filenames, int notificationId)
    {
        return string.Join(",", filenames.Split(",")
            .Select(img => string.Format(formatImageUrl, BaseNotificationCenterImgUrl, notificationId, img))
            .ToList());
    }
}