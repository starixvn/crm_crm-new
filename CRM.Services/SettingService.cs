namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Services;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Setting;
    using CRM.Resources;

    public class SettingService : ISettingService
    {
        private readonly IBaseService baseService;

        public SettingService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<Setting>> GetAllCommunicationToolAsync(bool isIncludeNA = false)
        {
            var criteria = new GetAllCommunicationToolCriteria();
            var tools = await baseService.GetDataAsync<Setting>(criteria);
            return isIncludeNA
                ? tools.OrderBy(s => s.DisplayOrder).ToList()
                : tools.Where(t => t.Id != SettingConstants.CommunicationNA).OrderBy(s => s.DisplayOrder).ToList();
        }

        public async Task<IEnumerable<Setting>> GetAsync(GetSettingParam param)
        {
            var criteria = new GetSettingCriteria
            {
                UserRole = param.UserRole,
                SettingName = param.SettingName,
                IsActive = param.IsActive
            };
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<SiteSetting>>GetAllSiteAsync()
        {
            var sites = new List<SiteSetting>();
            var criteria = new GetAllSiteCriteria();
            var rawdata = await baseService.GetDataAsync<SiteInfo>(criteria);
            foreach (var item in rawdata)
            {
                var group = item.IsLicensee ? Constants.Licensee : Constants.Credit;
                sites.Add(new SiteSetting
                {
                    Id = item.Id,
                    Name = item.Name,
                    AliasName = group,
                    IsActive = item.IsActive
                });
            }

            sites = sites.OrderBy(s => s.AliasName).ThenBy(s => s.Name).ToList();
            return sites;
        }

        public async Task<IEnumerable<Setting>> GetMainCategoryAsync(GetAllMainCategoryCriteria criteria)
        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<Setting>> GetSubCategoryAsync(GetAllSubCategoryCriteria criteria)
        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<SettingRelation>> GetAllSettingRelationsByName(string settingName)
        {
            var criteria = new GetSettingRelationByNameCriteria
            {
                SettingName = settingName,
                ParentID = 0,
                Active = SettingConstants.ActiveAndInactive
            };
            var relation = await baseService.GetDataAsync<SettingRelation>(criteria);
            var relationList = relation.OrderBy(setting => setting.DisplayOrder).ToList();
            return relationList;
        }


        public async Task<IEnumerable<Country>> GetAllCountryAsync(GetAllCountryCriteria criteria)
        {
            return await baseService.GetDataAsync<Country>(criteria);
        }

        public async Task<IEnumerable<Province>> GetAllProvinceAsync(GetAllProvinceCriteria criteria)
        {
            return await baseService.GetDataAsync<Province>(criteria);
        }

        public async Task<IEnumerable<Setting>> GetAllSettingRelationAsync(GetAllSettingRelationCriteria criteria)
        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<Setting>> GetAllLanguageAsync(GetAllLanguageCriteria criteria)
        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }


        public async Task<IEnumerable<Setting>> GetAllStatusAsync(int statusType)
        {
            var criteria = new GetAllStatusCriteria
            {
                ViewType = statusType
            };

            var data = await baseService.GetDataAsync<Setting>(criteria);
            var closedStatus = data.FirstOrDefault(d => d.SettingId == (int)CRMStatus.Closed);
            if (closedStatus != null)
            {
                data.ToList().Remove(closedStatus);
                data.ToList().Insert(0, closedStatus);
            }

            return data;
        }

        public async Task<IEnumerable<SettingRelation>> GetAllExtentionsAsync(GetAllBetTypeCriteria criteria)
        {
            return await baseService.GetDataAsync<SettingRelation>(criteria);
        }

        public async Task<IEnumerable<Product>> GetAllBetTypeAsync(GetAllBetTypeCriteria criteria)
        {
            return await baseService.GetDataAsync<Product>(criteria);
        }


        public async Task<IEnumerable<Product>> GetProductAsync()
        {
            var criteria = new GetSettingRelationByNameCriteria
            {
                SettingName = SettingTypeConstants.Product,
                ParentID = 0,
                Active = SettingConstants.ActiveAndInactive
            };
            var product = await baseService.GetDataAsync<Product>(criteria);
            var productList = product.OrderBy(setting => setting.DisplayOrder).ToList();
            return productList;
        }

        public async Task<IEnumerable<Product>> GetSubProductAsync(SubProductCriteria criteria)
        {
            return await baseService.GetDataAsync<Product>(criteria);
        }

        public async Task<IEnumerable<BaseModel>> GetAllCurrencyRedemptionAsync(GetAllCurrencyRedemptionCriteria criteria)
        {
            return await baseService.GetDataAsync<BaseModel>(criteria);
        }

        public async Task<IEnumerable<BaseModel>> GetAllLicenseeTypeAsync()
        {
            var criteria = new GetAllLicenseeTypeCriteria();
            var liscenseeType = await baseService.GetDataAsync<BaseModel>(criteria);
            var liscenseeTypeList = liscenseeType.ToList();
            liscenseeTypeList.Insert(
                0,
                new BaseModel
                {
                    Id = SettingConstants.NotApply,
                    Name = ViewResources.Symbol_NA
                });
            return liscenseeTypeList;
        }

        public async Task<IEnumerable<BaseModel>> GetAllCurrencyAsync(GetAllCurrencyCriteria criteria)
        {
            return await baseService.GetDataAsync<BaseModel>(criteria);
        }

        public async Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(GetSourceSettingMappingCriteria criteria)
        {
            return await baseService.GetDataAsync<SettingMapping>(criteria);
        }

        public async Task<IEnumerable<BaseModel>> GetAllSites(GetAllSiteCriteria criteria = null)
        {
            return await baseService.GetDataAsync<BaseModel>(criteria);
        }

        public IEnumerable<Setting> GetPositions(bool isExcludeGuest)
        {
            if (isExcludeGuest)
            {
                return new List<Setting>
                     {
                        new Setting { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
                        new Setting { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
                        new Setting { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
                        new Setting { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member }
                     };
            }
            return new List<Setting>
            {
                new Setting { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
                new Setting { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
                new Setting { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
                new Setting { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member },
                new Setting { SettingId = RoleIdConstants.Guest, SettingValue = ViewResources.Guest}
            };
        }

        public IEnumerable<Setting> GetAllCustomerTypes()
        {
            return new[]
            {
                new Setting
                {
                    SettingId = CustomerTypeConstants.All,
                    SettingValue = ViewResources.All
                },
                new Setting
                {
                    SettingId = CustomerTypeConstants.Customer,
                    SettingValue = ViewResources.Customer
                },
                new Setting
                {
                    SettingId = CustomerTypeConstants.Guest,
                    SettingValue = ViewResources.Guest
                }
            };
        }

        public async Task<int> NumberOfFeedbackSubjectTemplate()
        {
            var feedbacks = await GetFeedbackSubjectTemplates();
            return feedbacks.ToList().Count;
        }

        private async Task<IList<FeedbackTemplate>> GetFeedbackSubjectTemplates()
        {
            var criteria = new GetFeedbackSubjectTemplateByIdCriteria
            {
                TemplateId = 0
            };
            var feedbackTemplates = await baseService.GetDataAsync<FeedbackTemplate>(criteria);
            var feedbackTemplatesActive = feedbackTemplates.Where(s => s.IsActive).ToList();
            return feedbackTemplatesActive;
        }

        public async Task<IEnumerable<FeedbackTemplate>> GetFeedbackSubjectTemplateByPagingIndex(GetFeedbackSubjectTemplateByPagingIndexCriteria criteria)
        {
            int multipleNum = SettingConstants.MaxFeedbackSubjectTemplateNumberOnLoad;

            var feedbackTemplates = await GetFeedbackSubjectTemplates();

            return (feedbackTemplates != null && feedbackTemplates.Any()) ?
                    feedbackTemplates.Skip((criteria.PagingIndex - 1) * multipleNum).Take(criteria.PagingIndex * multipleNum).ToList() :
                    new List<FeedbackTemplate>();
        }
    }
}