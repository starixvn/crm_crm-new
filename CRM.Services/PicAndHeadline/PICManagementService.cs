namespace CRM.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models.PicAndHeadline;

    public interface IPicManagementService
    {
        Task<PicReport> GetReportAsync(GetReportCriteria criteria);

        Task<CommandResult> CreatePicAsync(CreatePicCriteria criteria);

        Task<CommandResult> EditPicAsync(EditPicCriteria criteria);

        Task<CommandResult> ChangePicStateAsync(ChangePicStateCriteria criteria);

        Task<string> ValidateEditPicAsync(ValidateEditPicCriteria criteria);
    }
    public class PicManagementService : IPicManagementService
    {
        private readonly IBaseService baseService;

        public PicManagementService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

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
}
