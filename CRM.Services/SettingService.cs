namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
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

        public async Task<IEnumerable<Setting>> GetMainCategoryAsync()
        {
            var criteria = new GetAllMainCategoryCriteria();
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<Setting>> GetSubCategoryAsync()
        {
            var criteria = new GetAllSubCategoryCriteria();
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<SettingRelation>> GetSettingRelations(GetSettingRelationByNameCriteria criteria)
        {
            return await baseService.GetDataAsync<SettingRelation>(criteria);
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

        public async Task<IEnumerable<Setting>> GetAllStatusAsync(GetAllStatusCriteria criteria)

        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<Setting>> GetAllBetTypeAsync(GetAllBetTypeCriteria criteria)
        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<Setting>> GetSubProductAsync(SubProductCriteria criteria)
        {
            return await baseService.GetDataAsync<Setting>(criteria);
        }

        public async Task<IEnumerable<BaseModel>> GetAllCurrencyRedemptionAsync(GetAllCurrencyRedemptionCriteria criteria)
        {
            return await baseService.GetDataAsync<BaseModel>(criteria);
        }

        public async Task<IEnumerable<BaseModel>> GetAllLicenseeTypeAsync(GetAllLicenseeTypeCriteria criteria)
        {
            return await baseService.GetDataAsync<BaseModel>(criteria);
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


    }
}