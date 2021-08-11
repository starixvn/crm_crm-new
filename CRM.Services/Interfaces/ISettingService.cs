namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Models;
    using CRM.Models.Setting;

    public interface ISettingService
    {
        Task<IEnumerable<Setting>> GetSettingAsync(string settingName, bool? isActive = null);

        Task<IEnumerable<SiteSetting>> GetSiteAsync();

        Task<SiteSetting> GetSiteByIdAsync(int siteId);

        Task<IEnumerable<SiteInfo>> GetAllSitesWithGroupAsync();

        Task<IEnumerable<Setting>> GetCommunicationToolAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

        Task<IEnumerable<Setting>> GetMainCategoryAsync(byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Setting>> GetSubCategoryAsync(int? mainCategoryId = null, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<SettingRelation>> GetSettingRelationByNameAsync(string settingName, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Country>> GetCountryAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

        Task<IEnumerable<Province>> GetProvinceAsync();

        Task<IEnumerable<Setting>> GetSettingRelationAsync();

        Task<IEnumerable<Language>> GetLanguageAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

        Task<IEnumerable<FeedbackStatus>> GetStatusAsync(byte statusType);

        Task<IEnumerable<Product>> GetBetTypeAsync(int? productId = null, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Product>> GetProductAsync(byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Product>> GetSubProductAsync(int productId = 0, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<BaseModel>> GetCurrencyRedemptionAsync();

        Task<IEnumerable<BaseModel>> GetLicenseeTypeAsync();

        Task<IEnumerable<BaseModel>> GetCurrencyAsync();

        Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(string settings);

        IEnumerable<Setting> GetPositions(bool isExcludeGuest);

        IEnumerable<Setting> GetAllCustomerTypes();

        Task<IEnumerable<Setting>> GetMainCategoryWithSubCategoryAsync();

        Task<IEnumerable<Station>> GetStations();
    }
}