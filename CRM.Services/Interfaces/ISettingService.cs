namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Setting;

    public interface ISettingService
    {
        Task<IEnumerable<Setting>> GetAsync(GetSettingParam param);

        Task<IEnumerable<SiteSetting>> GetAllSiteAsync();

        Task<IEnumerable<Setting>> GetAllCommunicationToolAsync(bool isIncludeNA = false);

        Task<IEnumerable<Setting>> GetMainCategoryAsync(GetAllMainCategoryCriteria criteria);

        Task<IEnumerable<Setting>> GetSubCategoryAsync(GetAllSubCategoryCriteria criteria);

        Task<IEnumerable<SettingRelation>> GetAllSettingRelationsByName(string settingName);

        Task<IEnumerable<Country>> GetAllCountryAsync(GetAllCountryCriteria criteria);

        Task<IEnumerable<Province>> GetAllProvinceAsync(GetAllProvinceCriteria criteria);

        Task<IEnumerable<Setting>> GetAllSettingRelationAsync(GetAllSettingRelationCriteria criteria);

        Task<IEnumerable<Setting>> GetAllLanguageAsync(GetAllLanguageCriteria criteria);

        Task<IEnumerable<Setting>> GetAllStatusAsync(int statusType);

        Task<IEnumerable<Product>> GetAllBetTypeAsync(GetAllBetTypeCriteria criteria);

        Task<IEnumerable<Product>> GetProductAsync();

        Task<IEnumerable<Product>> GetSubProductAsync(SubProductCriteria criteria);

        Task<IEnumerable<BaseModel>> GetAllCurrencyRedemptionAsync(GetAllCurrencyRedemptionCriteria criteria);

        Task<IEnumerable<BaseModel>> GetAllLicenseeTypeAsync();

        Task<IEnumerable<BaseModel>> GetAllCurrencyAsync(GetAllCurrencyCriteria criteria);

        Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(GetSourceSettingMappingCriteria criteria);

        IEnumerable<Setting> GetPositions(bool isExcludeGuest);

        IEnumerable<Setting> GetAllCustomerTypes();

        Task<IEnumerable<BaseModel>> GetAllSites(GetAllSiteCriteria criteria = null);
    }
}