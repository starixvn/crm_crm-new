namespace CRM.Services.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.PicAndHeadline;
using CRM.Criteria.Setting;
using CRM.Models.AdminTool.SettingLog;
using CRM.Models.Setting;
using Models;

public interface ISettingService
{
    Task<IEnumerable<Setting>> GetSettingAsync(string settingName = "", bool? isActive = null);

    Task<IEnumerable<Setting>> GetMainSettingAsync();

    Task<IEnumerable<Setting>> GetRolesByPicAsync(int picType);

    Task<IEnumerable<SiteSetting>> GetSiteAsync(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All);

    Task<IEnumerable<Setting>> GetSettingByTypes(string settingName);

    Task<SiteSetting> GetSiteByIdAsync(int siteId);

    Task<IEnumerable<SiteInfo>> GetAllSitesWithGroupAsync(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All);

    Task<IEnumerable<SiteInfo>> GetAllSitesWithGroupInformHeadlineAsync();

    Task<IEnumerable<SiteInfo>> GetAllSitesGroupByIsLicenseeAsync(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All);

    Task<IEnumerable<SiteInfo>> GetAllSitesLicenseeInactive(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All);

    Task<IEnumerable<Setting>> GetCommunicationToolAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

    Task<IEnumerable<Setting>> GetMainCategoryAsync(byte active = SettingConstants.ActiveAndInactive);

    Task<IEnumerable<Setting>> GetAllMainSubCategoriesAsync();

    Task<IEnumerable<Setting>> GetSubCategoryAsync(int? mainCategoryId = null, byte active = SettingConstants.ActiveAndInactive);

    Task<IEnumerable<SettingRelation>> GetSettingRelationByNameAsync(string settingName, byte active = SettingConstants.ActiveAndInactive);

    Task<IEnumerable<Country>> GetCountryAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

    Task<IEnumerable<Province>> GetProvinceAsync();

    Task<IEnumerable<Setting>> GetSettingRelationAsync();

    Task<IEnumerable<SettingRelation>> GetMainSettingRelationAsync(GetSettingRelationByNameCriteria criteria);

    Task<IEnumerable<Language>> GetLanguageAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false);

    Task<IEnumerable<FeedbackStatus>> GetStatusAsync(byte statusType);

    Task<IEnumerable<Product>> GetBetTypeAsync(int? productId = null, byte active = SettingConstants.ActiveAndInactive);

    Task<IEnumerable<Product>> GetProductAsync(byte active = SettingConstants.ActiveAndInactive);

    Task<IEnumerable<Product>> GetSubProductAsync(int productId = 0, byte active = SettingConstants.ActiveAndInactive);

    Task<IEnumerable<BaseModel>> GetCurrencyRedemptionAsync();

    Task<IEnumerable<BaseModel>> GetLicenseeTypeAsync();

    Task<IEnumerable<BaseModel>> GetCurrencyAsync();

    Task<IEnumerable<CRM.Models.PicAndHeadline.SiteInfo>> GetSystemSiteAsync(GetSystemSiteCriteria criteria);

    Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(string settings);

    IEnumerable<Setting> GetPositions(bool isExcludeGuest);

    IEnumerable<Setting> GetAllCustomerTypes();

    IEnumerable<Setting> GetAllPeriodTypes();

    Task<IEnumerable<Setting>> GetMainCategoryWithSubCategoryAsync();

    Task<IEnumerable<Station>> GetStations();

    Task<IEnumerable<BaseModel>> GetAllLogActionAsync(int actionType);

    Task<int> GetSettingRelationConfirmAsync(GetSettingRelationConfirm param);
}