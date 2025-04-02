namespace CRM.Services.InformHeadline;

using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using CRM.Criteria.InformHeadline;
using CRM.Extensions;
using CRM.Models.InformHeadline;
using Interfaces;

public interface IInformHeadlineService
{
    Task<IEnumerable<InformHeadlineModel>> GetInformAsync();
    Task<InformTitleDetail> GetTitleDetailAsync(int titleId);
    Task<IEnumerable<InformStatus>> GetInformStatusesAsync(bool isIncludeKeptForRefence = false);
    Task<IEnumerable<EditInform>> GetContactInformsAsync(GetContactInformParam param);
    Task<IEnumerable<EditInform>> GetEditInformsAsync(GetEditInformParam param);
    Task<(IEnumerable<RemovedAccountLog>, int)> GetRemovedAccountLogAsync(GetRemovedAccountLogParam param);
    Task<(IEnumerable<RemovedAccountLogDetail>, int)> GetRemovedAccountLogDetailAsync(GetRemovedAccountLogDetailParam param);
    Task<IEnumerable<NewInform>> GetNewInformsAsync(GetNewInformParam param);
}

public class InformHeadlineService(
    IBaseService baseService,
    ICommonService commonService)
    : IInformHeadlineService
{
    public async Task<IEnumerable<InformHeadlineModel>> GetInformAsync()
    {
        var criteria = new GetInformHeadlinesCriteria();
        var informs = await baseService.GetDataAsync<InformHeadlineModel>(criteria);
        foreach (var inform in informs)
        {
            inform.Title = HttpUtility.HtmlDecode(inform.Title);
            inform.ClientCreatedDate = commonService.ConvertToClientDateTime(inform.CreatedDate).ToShortDateFormat();
        }
        return informs;
    }

    public async Task<InformTitleDetail> GetTitleDetailAsync(int titleId)
    {
        var criteria = new GetInformTitleDetailCriteria
        {
            TitleId = titleId
        };
        return await baseService.GetDataEntityAsync<InformTitleDetail>(criteria);
    }

    public async Task<IEnumerable<InformStatus>> GetInformStatusesAsync(bool isIncludeKeptForRefence = false)
    {
        var criteria = new GetInformStatusesCriteria
        {
            IsIncludeKeptForRefence = isIncludeKeptForRefence
        };
        return await baseService.GetDataAsync<InformStatus>(criteria);
    }

    public async Task<IEnumerable<EditInform>> GetContactInformsAsync(GetContactInformParam param)
    {
        var criteria = new GetContactInformsCriteria
        {
            TitleId = param.TitleId,
            Username = param.Username,
            StatusId = param.StatusId
        };
        var contactInforms = await baseService.GetDataAsync<EditInform>(criteria);
        foreach (var contactInform in contactInforms)
        {
            if (contactInform.UpdatedTime.HasValue)
            {
                contactInform.ClientUpdatedTime = commonService.ConvertToClientDateTime(contactInform.UpdatedTime.Value).ToLongDateTimeFormat();
            }
            contactInform.Remark = HttpUtility.HtmlDecode(contactInform.Remark);
        }
        return contactInforms;
    }

    public async Task<IEnumerable<EditInform>> GetEditInformsAsync(GetEditInformParam param)
    {
        var criteria = new GetEditInformsCriteria
        {
            TitleId = param.TitleId,
            TypeAccount = param.TypeAccount,
            Currencies = param.Currencies,
            Levels = param.Levels,
            Sites = param.Sites,
            IsVip = param.IsVip,
            ExcludeIgnoredAccounts = param.ExcludeIgnoredAccounts
        };
        var updateInforms = await baseService.GetDataAsync<EditInform>(criteria);
        foreach (var updateInform in updateInforms)
        {
            if (updateInform.UpdatedTime.HasValue)
            {
                updateInform.ClientUpdatedTime = commonService.ConvertToClientDateTime(updateInform.UpdatedTime.Value).ToLongDateTimeFormat();
            }
            updateInform.Remark = HttpUtility.HtmlDecode(updateInform.Remark);
        }
        return updateInforms;
    }

    public async Task<(IEnumerable<RemovedAccountLog>, int)> GetRemovedAccountLogAsync(GetRemovedAccountLogParam param)
    {
        var criteria = new GetRemovedAccountLogsCriteria
        {
            TitleId = param.TitleId,
            PageIndex = param.PageIndex,
            PageSize = param.PageSize
        };
        var result = await baseService.GetDataAsync<RemovedAccountLog>(criteria);
        foreach (var item in result)
        {
            item.ClientLogDate = commonService.ConvertToClientDateTime(item.LogDate).ToLongDateTimeFormat();
        }

        return (result, criteria.TotalRows);
    }

    public async Task<(IEnumerable<RemovedAccountLogDetail>, int)> GetRemovedAccountLogDetailAsync(GetRemovedAccountLogDetailParam param)
    {
        var criteria = new GetRemovedAccountLogDetailsCriteria
        {
            LogId = param.LogId,
            PageIndex = param.PageIndex,
            PageSize = param.PageSize
        };
        var result = await baseService.GetDataAsync<RemovedAccountLogDetail>(criteria);
        foreach (var item in result)
        {
            item.ClientUpdatedTime = commonService.ConvertToClientDateTime(item.UpdatedTime).ToLongDateTimeFormat();
            item.Remark = HttpUtility.HtmlDecode(item.Remark);
        }

        return (result, criteria.TotalRows);
    }

    public async Task<IEnumerable<NewInform>> GetNewInformsAsync(GetNewInformParam param)
    {
        var criteria = new GetNewInformsCriteria
        {
            TypeAccount = param.TypeAccount,
            Currencies = param.Currencies,
            Levels = param.Levels,
            Sites = param.Sites,
            IsVip = param.IsVip,
            ExcludeIgnoredAccounts = param.ExcludeIgnoredAccounts
        };
        var newInforms = await baseService.GetDataAsync<NewInform>(criteria);
        return newInforms;
    }
}