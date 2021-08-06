namespace CRM.Services.InformHeadline
{
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.InformHeadline;
    using CRM.Models.InformHeadline;
    using CRM.Repositories;
    using CRM.Resources;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IInformHeadlineService
    {
        Task<IEnumerable<InformHeadlineDetail>> GetInformAsync();
    }

    public class InformHeadlineService : IInformHeadlineService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;

        public InformHeadlineService(
            IBaseService baseService,
            ISettingService settingService,
            ICommonService commonService
        )
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.commonService = commonService;        
        }

        public async Task<IEnumerable<InformHeadlineDetail>> GetInformAsync()
        {
            var criteria = new GetInformHeadlinesCriteria();
            IEnumerable <InformHeadlineDetail> informs = await baseService.GetDataAsync<InformHeadlineDetail>(criteria);
            foreach (var inform in informs)
            {
                inform.ClientCreatedDate = string.Format("{0:MMM dd, yyyy}", commonService.ConvertToClientDateTime(inform.CreatedDate));
            }
            return informs;
        }
    }
}
