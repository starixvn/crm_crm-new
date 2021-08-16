namespace CRM.Services.InformHeadline
{
    using CRM.Core.Services;
    using CRM.Criteria.InformHeadline;
    using CRM.Models.InformHeadline;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;
    using System.Web;

    public interface IInformHeadlineService
    {
        Task<IEnumerable<InformHeadlineModel>> GetInformAsync();
        Task<InformTitleDetail> GetTitleDetailAsync(GetTitleDetailParam param);
        Task<IEnumerable<InformStatus>> GetInformStatuses(bool isIncludeKeptForRefence = false);
        Task<IEnumerable<UpdateInform>> GetContactInforms(GetContactInformParam param);
        Task<IEnumerable<UpdateInform>> GetSearchInforms(GetSearchInformParam param);
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

        public async Task<IEnumerable<InformHeadlineModel>> GetInformAsync()
        {
            var criteria = new GetInformHeadlinesCriteria();
            IEnumerable <InformHeadlineModel> informs = await baseService.GetDataAsync<InformHeadlineModel>(criteria);
            foreach (var inform in informs)
            {
                inform.Title = HttpUtility.HtmlDecode(inform.Title);
                inform.ClientCreatedDate = string.Format("{0:MMM dd, yyyy}", commonService.ConvertToClientDateTime(inform.CreatedDate));
            }
            return informs;
        }

        public async Task<InformTitleDetail> GetTitleDetailAsync(GetTitleDetailParam param)
        {
            var criteria = new GetInformTitleDetailCriteria
            {
                TitleId = param.TitleId
            };
            return await baseService.GetDataEntityAsync<InformTitleDetail>(criteria);
        }

        public async Task<IEnumerable<InformStatus>> GetInformStatuses(bool isIncludeKeptForRefence = false)
        {
            var criteria = new GetInformStatusesCriteria
            {
                IsIncludeKeptForRefence = isIncludeKeptForRefence
            };
            return await baseService.GetDataAsync<InformStatus>(criteria);
        }

        public async Task<IEnumerable<UpdateInform>> GetContactInforms(GetContactInformParam param)
        {
            var criteria = new GetContactInformsCriteria
            {
                TitleId = param.TitleId,
                Username = param.Username,
                StatusId = param.StatusId,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
            IEnumerable<UpdateInform> contactInforms = await baseService.GetDataAsync<UpdateInform>(criteria);
            foreach (var contactInform in contactInforms)
            {
                contactInform.ClientUpdatedTime = contactInform.UpdatedTime.HasValue ? string.Format("{0:MMM dd, yyyy hh:mm:ss tt}", commonService.ConvertToClientDateTime((System.DateTime)contactInform.UpdatedTime)) : string.Empty;
                contactInform.Remark = HttpUtility.HtmlDecode(contactInform.Remark);
            }
            return contactInforms;
        }

        public async Task<IEnumerable<UpdateInform>> GetSearchInforms(GetSearchInformParam param)
        {
            var criteria = new GetSearchInformsCriteria
            {
                TitleId = param.TitleId,
                TypeAccount = param.TypeAccount,
                Currencies = param.Currencies,
                Levels = param.Levels,
                Sites = param.Sites,
                IsVip = param.IsVip,
                ExcludeIgnoredAccounts = param.ExcludeIgnoredAccounts
            };
            IEnumerable<UpdateInform> updateInforms = await baseService.GetDataAsync<UpdateInform>(criteria);
            foreach (var updateInform in updateInforms)
            {
                updateInform.ClientUpdatedTime = updateInform.UpdatedTime.HasValue ? string.Format("{0:MMM dd, yyyy hh:mm:ss tt}", commonService.ConvertToClientDateTime((System.DateTime)updateInform.UpdatedTime)) : string.Empty;
                updateInform.Remark = HttpUtility.HtmlDecode(updateInform.Remark);
            }
            return updateInforms;
        }
    }
}
