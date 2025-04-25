namespace CRM.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.Common;
using CRM.Extensions;
using CRM.Models;
using CRM.Models.Common;
using Enum;
using Interfaces;
using Microsoft.Extensions.Options;

public class CommonService(
    IBaseService baseService,
    IOptionsSnapshot<AppSettings> appSettings)
    : ICommonService
{
    private readonly AppSettings appSettings = appSettings.Value;

    public async Task<IEnumerable<BaseBotModel>> GetConversationBotAsync() => await baseService.GetDataAsync<BaseBotModel>(new GetConversationBotsCriteria());

    public async Task<(IEnumerable<RecipientModel>, IEnumerable<BotInfo>)> GetRecipientAsync(GetRecipientsCriteria criteria) => await baseService.FetchMultipleAsync<RecipientModel, BotInfo>(criteria);

    public async Task<IEnumerable<BaseModel>> GetRecipientTypeAsync() => await baseService.GetDataAsync<BaseModel>(new GetRecipientTypesCriteria());

    public async Task<IEnumerable<BaseModel>> GetBotServicesAsync() => await baseService.GetDataAsync<BaseModel>(new GetBotServicesCriteria());

    public async Task<IEnumerable<BaseModel>> GetSystemAsync()
    {
        var criteria = new GetSystemsCriteria();
        return await baseService.GetDataAsync<BaseModel>(criteria);
    }

    public async Task<IEnumerable<BaseModel>> GetHeadlineAsync(GetHeadlinesCriteria criteria) => await baseService.GetDataAsync<BaseModel>(criteria);

    public IEnumerable<BaseModel> GetChatTypes() =>
        Enum.GetValues(typeof(ChatType)).Cast<ChatType>()
            .Select(type => new BaseModel { Id = (int)type, Name = EnumHelper.GetDescription(type) });
    
     
    public async Task<string> GetSitePermission(short licenseeType, string sitePermission)
    {
        var criteria = new GetSitePermissionCriteria
        {
            LicenseeType = licenseeType,
            SitePermission = sitePermission
        };

        return await baseService.GetDataEntityAsync<string>(criteria);
    }     


    public IEnumerable<BaseModel> GetMappingStatus() =>
        Enum.GetValues(typeof(MappingStatus)).Cast<MappingStatus>()
            .Select(type => new BaseModel { Id = (int)type, Name = EnumHelper.GetDescription(type) });

    public DateTime ConvertToClientDateTime(DateTime date)
    {
        var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
        return date.Add(timeSpan);
    }

    public DateTime ConvertToServerDateTime(DateTime date)
    {
        var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
        return date.Subtract(timeSpan);
    }

    public DateTime ConvertClientFromTimeToServerTime(DateTime clientFromTime)
    {
        var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
        return clientFromTime.Date.Subtract(timeSpan);
    }

    public DateTime ConvertClientToTimeToServerTime(DateTime clientToTime)
    {
        var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
        var endClientDate = GetEndOfDate(clientToTime);
        return endClientDate.Subtract(timeSpan);
    }

    public DateTime GetEndOfDate(DateTime date)
    {
        date = new DateTimeOffset(date.Year, date.Month, date.Day, 0, 0, 0, TimeSpan.Zero).AddDays(1).AddSeconds(-1).DateTime;
        return date;
    }

    public DateTime FirstDayOfMonth(DateTime dateTime) => new DateTimeOffset(dateTime.Year, dateTime.Month, 1, 0, 0, 0, TimeSpan.Zero).DateTime;

    public DateTime LastDayOfMonth(DateTime dateTime) => FirstDayOfMonth(dateTime).AddMonths(1).AddDays(-1);
}