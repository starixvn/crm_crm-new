namespace CRM.Services.PicAndHeadline;

using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Models;

public interface IPicManagementService
{
    Task<PicReport> GetReportAsync(GetReportCriteria criteria);

    Task<CommandResult> CreatePicAsync(CreatePicCriteria criteria);

    Task<CommandResult> EditPicAsync(EditPicCriteria criteria);

    Task<CommandResult> ChangePicStateAsync(ChangePicStateCriteria criteria);

    Task<string> ValidateEditPicAsync(ValidateEditPicCriteria criteria);
}
public class PicManagementService(IBaseService baseService) : IPicManagementService
{
    public async Task<PicReport> GetReportAsync(GetReportCriteria criteria)
    {
        var tuple = await baseService.FetchMultipleAsync<PicInfo, CommunicationTool>(criteria);
        foreach (var item in tuple.Item1)
        {
            item.CommunicationTools = tuple.Item2.Where(c => c.PicId == item.PicId).ToList();
        }
        var DataList = tuple.Item1.ToList();
        return new PicReport
        {
            DataList = DataList,
            Total = criteria.TotalRows
        };
    }

    public async Task<CommandResult> CreatePicAsync(CreatePicCriteria criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<CommandResult> ChangePicStateAsync(ChangePicStateCriteria criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<CommandResult> EditPicAsync(EditPicCriteria criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<string> ValidateEditPicAsync(ValidateEditPicCriteria criteria)
    {
        return await baseService.GetDataEntityAsync<string>(criteria);
    }
}