namespace CRM.Services;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.InformHeadline;
using CRM.Criteria.PicAndHeadline;
using CRM.Criteria.Setting;
using CRM.Models;
using CRM.Models.AdminTool.SettingLog;
using CRM.Models.Setting;
using CRM.Resources;
using Interfaces;
using FeedbackStatus = Enumerables.FeedbackStatus;

public class SettingService(IBaseService baseService, IPermissionService permissionService)
    : ISettingService
{
    public async Task<IEnumerable<Setting>> GetCommunicationToolAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false)
    {
        var criteria = new GetAllCommunicationToolCriteria
        {
            Active = active
        };

        var tools = await baseService.GetDataAsync<Setting>(criteria);
        return isIncludeNA
            ? tools.ToList()
            : tools.Where(t => t.Id != SettingConstants.CommunicationNA).ToList();
    }

    public async Task<IEnumerable<Setting>> GetSettingAsync(string settingName = "", bool? isActive = null)
    {
        var criteria = new GetSettingCriteria
        {
            SettingName = settingName,
            IsActive = isActive
        };
        return await baseService.GetDataAsync<Setting>(criteria);
    }

    public async Task<IEnumerable<Setting>> GetMainSettingAsync()
    {
        var allSettings = await GetSettingAsync();
        var settingGroups = allSettings
            .GroupBy(x => new { Type = x.SettingName })
            .Select(group => new { group.Key, Count = group.Count() });
        var settingGroupByType = new List<Setting>();
        foreach (var type in settingGroups.Select(x => x.Key.Type))
        {
            var subList = allSettings.Where(s => s.SettingName == type).Select(s => s).ToList();
            var setting = new Setting { SettingName = type, ChildSettings = subList };
            settingGroupByType.Add(setting);
        }
        var settingGroupOrder = settingGroupByType.ToList();
        return settingGroupOrder.ToList();
    }

    public async Task<IEnumerable<Setting>> GetSettingByTypes(string settingName)
    {
        var allSettings = await GetSettingAsync();
        var relations = await GetSettingRelationAsync();
        var result = allSettings
            .Where(s => s.SettingName == settingName)
            .GroupBy(s => s.SettingId).Select(x => x.First());

        foreach (var item in result)
        {
            var settingIds = relations
                .Where(r => r.ParentID == item.SettingId)
                .Select(s => new { s.SettingId });
            if (settingIds.Any())
            {
                item.ChildSettings = allSettings.Where(x => settingIds.Any(y => x.SettingId == y.SettingId))
                    .GroupBy(x => x.SettingId)
                    .Select(x => x.First()).ToList();
            }

            var sources = allSettings.Where(x => x.SettingValue == item.SettingValue && x.SettingSource != null && item.SettingName == x.SettingName).ToList();
            if (sources.Any())
            {
                item.SettingSource = string.Join(", ", sources.Select(r => r.SettingSource));
            }
        }
        return result;
    }

    public async Task<IEnumerable<Setting>> GetRolesByPicAsync(int picType)
    {
        var criteria = new GetRoleByPicType
        {
            PicType = picType
        };
        return await baseService.GetDataAsync<Setting>(criteria);
    }

    public async Task<SiteSetting> GetSiteByIdAsync(int siteId)
    {
        var sites = await GetSiteAsync();
        var site = sites.FirstOrDefault(s => s.Id == siteId);
        return site ?? new SiteSetting
        {
            Name = ViewResources.Symbol_NotApply
        };
    }

    public async Task<IEnumerable<SiteSetting>> GetSiteAsync(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All)
    {
        var siteLabels = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var siteInfos = await baseService.GetDataAsync<SiteInfo>(new GetAllSiteCriteria { UserRole = userRole, LicenseeType = licenseeType, SitePermission = siteLabels });
        return siteInfos.Select(x => new SiteSetting
        {
            Id = x.Id,
            Name = x.Name,
            AliasName = x.IsLicensee ? Constants.Licensee : Constants.Credit,
            IsActive = x.IsActive
        }).OrderBy(s => s.AliasName).ThenBy(s => s.Name).ToList();
    }

    public async Task<IEnumerable<Setting>> GetMainCategoryAsync(byte active = SettingConstants.ActiveAndInactive)
    {
        var criteria = new GetAllMainCategoryCriteria
        {
            Active = active
        };
        return await baseService.GetDataAsync<Setting>(criteria);
    }

    public async Task<IEnumerable<Setting>> GetSubCategoryAsync(int? mainCategoryId = null, byte active = SettingConstants.ActiveAndInactive)
    {
        var criteria = new GetAllSubCategoryCriteria
        {
            MainCategoryId = mainCategoryId,
            Active = active
        };
        return await baseService.GetDataAsync<Setting>(criteria);
    }

    public async Task<IEnumerable<SettingRelation>> GetSettingRelationByNameAsync(string settingName, byte active = SettingConstants.ActiveAndInactive)
    {
        var criteria = new GetSettingRelationByNameCriteria
        {
            SettingName = settingName,
            ParentID = 0,
            Active = active
        };
        var relations = await baseService.GetDataAsync<SettingRelation>(criteria);
        return relations.ToList();
    }

    public async Task<IEnumerable<SettingRelation>> GetMainSettingRelationAsync(GetSettingRelationByNameCriteria criteria)
    {
        var mainRelations = await baseService.GetDataAsync<SettingRelation>(criteria);
        return mainRelations;
    }

    public async Task<IEnumerable<Country>> GetCountryAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false)
    {
        var criteria = new GetAllCountryCriteria
        {
            Active = active
        };
        var countries = (await baseService.GetDataAsync<Country>(criteria)).ToList();
        if (isIncludeNA)
        {
            countries.Insert(
                0,
                new Country
                {
                    Id = SettingConstants.NotApply,
                    Name = ViewResources.Symbol_NotApply,
                    IsActive = true
                });
        }

        return countries;
    }

    public async Task<IEnumerable<Province>> GetProvinceAsync()
    {
        return await baseService.GetDataAsync<Province>(new GetAllProvinceCriteria());
    }

    public async Task<IEnumerable<Setting>> GetSettingRelationAsync()
    {
        return await baseService.GetDataAsync<Setting>(new GetAllSettingRelationCriteria());
    }

    public async Task<IEnumerable<Language>> GetLanguageAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false)
    {
        var criteria = new GetAllLanguageCriteria
        {
            Active = active
        };
        var languages = (await baseService.GetDataAsync<Language>(criteria)).ToList();
        if (isIncludeNA)
        {
            languages.Insert(
                0,
                new Language
                {
                    LanguageId = SettingConstants.NotApply,
                    Name = ViewResources.Symbol_NotApply,
                    IsActive = true
                });
        }

        return languages;
    }

    public async Task<IEnumerable<Models.Setting.FeedbackStatus>> GetStatusAsync(byte statusType)
    {
        var criteria = new GetAllStatusCriteria
        {
            ViewType = statusType
        };

        var statuses = (await baseService.GetDataAsync<Models.Setting.FeedbackStatus>(criteria)).ToList();
        var closedStatus = statuses.Find(d => d.StatusId == (int)FeedbackStatus.Closed);
        if (closedStatus != null)
        {
            statuses.Remove(closedStatus);
            statuses.Insert(0, closedStatus);
        }

        return statuses;
    }

    public async Task<IEnumerable<Product>> GetBetTypeAsync(int? productId = null, byte active = SettingConstants.ActiveAndInactive)
    {
        var criteria = new GetAllBetTypeCriteria
        {
            ProductId = productId,
            Active = active
        };
        return await baseService.GetDataAsync<Product>(criteria);
    }

    public async Task<IEnumerable<Product>> GetProductAsync(byte active = SettingConstants.ActiveAndInactive)
    {
        var criteria = new GetSettingRelationByNameCriteria
        {
            SettingName = SettingTypeConstants.Product,
            ParentID = 0,
            Active = active
        };
        var products = await baseService.GetDataAsync<Product>(criteria);
        return products.ToList();
    }

    public async Task<IEnumerable<Product>> GetSubProductAsync(int productId = 0, byte active = SettingConstants.ActiveAndInactive)
    {
        var criteria = new SubProductCriteria
        {
            ProductId = productId,
            Active = active
        };
        return await baseService.GetDataAsync<Product>(criteria);
    }

    public async Task<IEnumerable<BaseModel>> GetCurrencyRedemptionAsync()
    {
        return await baseService.GetDataAsync<BaseModel>(new GetAllCurrencyRedemptionCriteria());
    }

    public async Task<IEnumerable<BaseModel>> GetLicenseeTypeAsync()
    {
        var liscenseeTypes = (await baseService.GetDataAsync<BaseModel>(new GetAllLicenseeTypeCriteria())).OrderBy(s => s.Name).ToList();
        liscenseeTypes.Insert(
            0,
            new BaseModel
            {
                Id = SettingConstants.NotApply,
                Name = ViewResources.Symbol_NotApply
            });
        return liscenseeTypes;
    }

    public async Task<IEnumerable<BaseModel>> GetCurrencyAsync()
    {
        return await baseService.GetDataAsync<BaseModel>(new GetAllCurrencyCriteria());
    }

    public async Task<IEnumerable<CRM.Models.PicAndHeadline.SiteInfo>> GetSystemSiteAsync(GetSystemSiteCriteria criteria)
    {
        return await baseService.GetDataAsync<CRM.Models.PicAndHeadline.SiteInfo>(criteria);
    }

    public async Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(string settings)
    {
        var allSettings = await GetSettingAsync();
        var selectedSetting = allSettings.Where(x => x.SettingName == settings && x.SettingSource != null).Select(x => x.SettingSource).ToList();

        var criteria = new GetSourceSettingMappingCriteria
        {
            Settings = settings
        };
        var sourceMappings = await baseService.GetDataAsync<SettingMapping>(criteria);
        sourceMappings = sourceMappings.Where(x => !selectedSetting.Contains(x.Source)).ToList();
        return sourceMappings;
    }

    public async Task<IEnumerable<SiteInfo>> GetAllSitesWithGroupAsync(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All)
    {
        var siteLabels = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var sites = await baseService.GetDataAsync<SiteInfo>(new GetAllSiteCriteria { LicenseeType = licenseeType, UserRole = userRole, SitePermission = siteLabels });

        var allSites = (from n in sites
            where n.IsActive
            group n by n.IsLicensee into g
            orderby g.Key
            select new SiteInfo
            {
                Id = g.Key ? SiteConstants.LicenseeGroup : SiteConstants.IBCGroup,
                Name = g.Key ? Constants.Licensee : Constants.Credit,
                ChildSites = (from c in g
                    orderby c.SiteLabel
                    group c by c.SiteLabel into s
                    select new SiteInfo
                    {
                        Name = s.Key,
                        ChildSites = s.ToList()
                    }).ToList()
            }).ToList();
        return allSites;
    }

    public async Task<IEnumerable<SiteInfo>> GetAllSitesWithGroupInformHeadlineAsync()
    {
        var sites = await baseService.GetDataAsync<SiteInfo>(new GetSiteOnInformHeadlineCriteria());

        var allSites = (from n in sites
            where n.IsActive
            group n by n.IsLicensee into g
            orderby g.Key
            select new SiteInfo
            {
                Id = g.Key ? SiteConstants.LicenseeGroup : SiteConstants.IBCGroup,
                Name = g.Key ? Constants.Licensee : Constants.Credit,
                ChildSites = (from c in g
                    orderby c.SiteLabel
                    group c by c.SiteLabel into s
                    select new SiteInfo
                    {
                        Name = s.Key,
                        ChildSites = s.ToList()
                    }).ToList()
            }).ToList();
        return allSites;
    }

    public async Task<IEnumerable<SiteInfo>> GetAllSitesGroupByIsLicenseeAsync(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All)
    {
        var siteLabels = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var sites = await baseService.GetDataAsync<SiteInfo>(new GetAllSiteCriteria { LicenseeType = licenseeType, UserRole = userRole, SitePermission = siteLabels });
        var allSites = (from n in sites
            where n.IsActive
            group n by n.IsLicensee into g
            orderby g.Key
            select new SiteInfo
            {
                Id = g.Key ? SiteConstants.LicenseeGroup : SiteConstants.IBCGroup,
                Name = g.Key ? Constants.Licensee : Constants.Credit,
                ChildSites = (from c in g
                    orderby c.Name
                    select new SiteInfo
                    {
                        Id = c.Id,
                        Name = c.Name
                    }).ToList()
            }).ToList();
        return allSites;
    }

    public async Task<IEnumerable<SiteInfo>> GetAllSitesLicenseeInactive(short userRole = Constants.UserRole, short licenseeType = LicenseeTypeConstants.All)
    {
        var siteLabels = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var sites = await baseService.GetDataAsync<SiteInfo>(new GetAllSiteCriteria { LicenseeType = licenseeType, UserRole = userRole, SitePermission = siteLabels });
        return sites.Where(x => !x.IsActive && x.IsLicensee);
    }

    public IEnumerable<Setting> GetPositions(bool isExcludeGuest)
    {
        var positions = new List<Setting>
        {
            new() { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
            new() { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
            new() { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
            new() { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member }
        };
        if (!isExcludeGuest)
        {
            positions.Add(new Setting { SettingId = RoleIdConstants.Guest, SettingValue = ViewResources.Guest });
        }

        return positions;
    }

    public IEnumerable<Setting> GetAllCustomerTypes()
    {
        return
        [
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
        ];
    }

    public IEnumerable<Setting> GetAllPeriodTypes()
    {
        return
        [
            new Setting
            {
                Id = PeriodTypeConstants.Daily,
                Name = ViewResources.Daily
            },
            new Setting
            {
                Id = PeriodTypeConstants.Weekly,
                Name = ViewResources.Weekly
            },
            new Setting
            {
                Id = PeriodTypeConstants.Monthly,
                Name = ViewResources.Monthly
            },
            new Setting
            {
                Id = PeriodTypeConstants.Yearly,
                Name = ViewResources.Yearly
            }
        ];
    }

    public static string GetPeriodTypeName(int periodType)
    {
        switch (periodType)
        {
            case PeriodTypeConstants.Daily:
                return ViewResources.Daily;

            case PeriodTypeConstants.Weekly:
                return ViewResources.Weekly;

            case PeriodTypeConstants.Monthly:
                return ViewResources.Monthly;

            case PeriodTypeConstants.Yearly:
                return ViewResources.Yearly;

            default:
                return string.Empty;
        }
    }

    public async Task<IEnumerable<Setting>> GetAllMainSubCategoriesAsync()
    {
        var mainCategories = await GetMainCategoryAsync();
        var subCategories = await GetSubCategoryAsync();
        foreach (var category in mainCategories)
        {
            category.ChildSettings = subCategories.Where(x => x.MainCategoryID == category.MainCategoryID).ToList();
        }
        return mainCategories;
    }

    public async Task<IEnumerable<Setting>> GetMainCategoryWithSubCategoryAsync()
    {
        var mainCategories = await GetSettingAsync(SettingName.MainCategory, true);
        var subCategories = await GetSubCategoryAsync(active: SettingConstants.Active);

        foreach (var category in mainCategories)
        {
            category.ChildSettings = subCategories.Where(x => x.MainCategoryID == category.SettingId).ToList();
        }

        return mainCategories;
    }

    public async Task<IEnumerable<Station>> GetStations()
    {
        var criteria = new GetAllStationCriteria();
        return await baseService.GetDataAsync<Station>(criteria);
    }

    public async Task<IEnumerable<BaseModel>> GetAllLogActionAsync(int actionType)
    {
        var criteria = new GetAllActionCriteria
        {
            ActionType = actionType
        };
        return await baseService.GetDataAsync<BaseModel>(criteria);
    }

    public async Task<int> GetSettingRelationConfirmAsync(GetSettingRelationConfirm param)
    {
        var criteria = new GetSettingRelationConfirmCriteria
        {
            SettingID = param.SettingID,
            SettingName = param.SettingName,
            ParentID = param.ParentID
        };
        return await baseService.GetDataEntityAsync<int>(criteria);
    }
}