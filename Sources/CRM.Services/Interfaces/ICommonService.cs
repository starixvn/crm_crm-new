namespace CRM.Services.Interfaces;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.Common;
using CRM.Models.Common;
using Models;

public interface ICommonService
{
    Task<IEnumerable<BaseBotModel>> GetConversationBotAsync();

    Task<(IEnumerable<RecipientModel>, IEnumerable<BotInfo>)> GetRecipientAsync(GetRecipientsCriteria criteria);

    Task<IEnumerable<BaseModel>> GetRecipientTypeAsync();

    Task<IEnumerable<BaseModel>> GetBotServicesAsync();

    Task<IEnumerable<BaseModel>> GetSystemAsync();

    IEnumerable<BaseModel> GetChatTypes();

    IEnumerable<BaseModel> GetMappingStatus();

    Task<IEnumerable<BaseModel>> GetHeadlineAsync(GetHeadlinesCriteria criteria);

    Task<string> GetSitePermissionXml(short licenseeType, string sitePermission);

    DateTime ConvertToClientDateTime(DateTime date);

    DateTime ConvertToServerDateTime(DateTime date);

    DateTime ConvertClientFromTimeToServerTime(DateTime clientFromTime);

    DateTime ConvertClientToTimeToServerTime(DateTime clientToTime);

    DateTime GetEndOfDate(DateTime date);

    DateTime FirstDayOfMonth(DateTime dateTime);

    DateTime LastDayOfMonth(DateTime dateTime);
}