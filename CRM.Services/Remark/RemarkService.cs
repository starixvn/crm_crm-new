namespace CRM.Services.Remark
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Remark;
    using CRM.Models.Remark;
    using CRM.Repositories;

    public interface IRemarkService
    {
        Task<RemarkInfo> GetRemarkAsync(GetRemarkCriteria criteria);
    }

    public class RemarkService : IRemarkService
    {
        private readonly IBaseService baseService;
        private readonly IRemarkRepository remarkRepository;

        public RemarkService(IBaseService baseService, IRemarkRepository remarkRepository)
        {
            this.baseService = baseService;
            this.remarkRepository = remarkRepository;
        }

        public async Task<RemarkInfo> GetRemarkAsync(GetRemarkCriteria criteria)
        {
            var remarks = await remarkRepository.GetRemarkAsync(criteria);
            return remarks;
        }
    }
}
