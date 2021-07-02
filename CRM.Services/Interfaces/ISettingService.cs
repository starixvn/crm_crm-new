namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Setting;

    public interface ISettingService
    {
        Task<IEnumerable<Setting>> GetSettingAsync(string settingName, bool? isActive = null);

        Task<IEnumerable<SiteSetting>> GetSiteAsync();

        Task<IEnumerable<Setting>> GetCommunicationToolAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

        Task<IEnumerable<Setting>> GetMainCategoryAsync(byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Setting>> GetSubCategoryAsync(int? mainCategoryId = null, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<SettingRelation>> GetSettingRelationByNameAsync(string settingName, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Country>> GetCountryAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

        Task<IEnumerable<Province>> GetProvinceAsync();

        Task<IEnumerable<Setting>> GetSettingRelationAsync();

        Task<IEnumerable<Setting>> GetLanguageAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

        Task<IEnumerable<Setting>> GetStatusAsync(byte statusType);

        Task<IEnumerable<Product>> GetBetTypeAsync(int? productId = null, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Product>> GetProductAsync(byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<Product>> GetSubProductAsync(int productId = 0, byte active = SettingConstants.ActiveAndInactive);

        Task<IEnumerable<BaseModel>> GetCurrencyRedemptionAsync();

        Task<IEnumerable<BaseModel>> GetLicenseeTypeAsync();

        Task<IEnumerable<BaseModel>> GetCurrencyAsync();

        Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(string settings);

        IEnumerable<Setting> GetPositions(bool isExcludeGuest);

        IEnumerable<Setting> GetAllCustomerTypes();

        Task<int> GetNumberOfFeedbackSubjectTemplateAsync();

        Task<IEnumerable<FeedbackTemplate>> GetFeedbackSubjectTemplateByPagingIndexAsync(int pageIndex);
    }
}