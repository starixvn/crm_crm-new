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

        public async Task<IEnumerable<Setting>> GetCommunicationToolAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false)
        {
            var criteria = new GetAllCommunicationToolCriteria
            {
                Active = active
            };

            var tools = (await baseService.GetDataAsync<Setting>(criteria)).OrderBy(s => s.DisplayOrder);
            return isIncludeNA
                ? tools.ToList()
                : tools.Where(t => t.Id != SettingConstants.CommunicationNA).ToList();
        }

        public async Task<IEnumerable<Setting>> GetSettingAsync(string settingName, bool? isActive = null)
        {
            var criteria = new GetSettingCriteria
            {
                SettingName = settingName,
                IsActive = isActive
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

        public async Task<IEnumerable<SiteSetting>> GetSiteAsync()
        {
            var siteInfos = await baseService.GetDataAsync<SiteInfo>(new GetAllSiteCriteria());
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
            return relations.OrderBy(setting => setting.DisplayOrder).ToList();
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

        public async Task<IEnumerable<Setting>> GetLanguageAsync(byte active = SettingConstants.ActiveAndInactive, bool isIncludeNA = false)
        {
            var criteria = new GetAllLanguageCriteria
            {
                Active = active
            };
            var languages = (await baseService.GetDataAsync<Setting>(criteria)).ToList();
            if (isIncludeNA)
            {
                languages.Insert(
                    0,
                    new Setting
                    {
                        SettingId = SettingConstants.NotApply,
                        SettingName = ViewResources.Symbol_NotApply,
                        IsActive = true
                    });
            }

            return languages;
        }

        public async Task<IEnumerable<Setting>> GetStatusAsync(byte statusType)
        {
            var criteria = new GetAllStatusCriteria
            {
                ViewType = statusType
            };

            var statuses = (await baseService.GetDataAsync<Setting>(criteria)).ToList();
            var closedStatus = statuses.FirstOrDefault(d => d.SettingId == (int)CRMStatus.Closed);
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
            var bettypes = await baseService.GetDataAsync<Product>(criteria);
            return bettypes.OrderBy(b => b.DisplayOrder);
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
            return products.OrderBy(setting => setting.DisplayOrder).ToList();
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
            var liscenseeTypes = (await baseService.GetDataAsync<BaseModel>(new GetAllLicenseeTypeCriteria())).ToList();
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

        public async Task<IEnumerable<SettingMapping>> GetSettingMappingAsync(string settings)
        {
            var criteria = new GetSourceSettingMappingCriteria
            {
                Settings = settings
            };
            return await baseService.GetDataAsync<SettingMapping>(criteria);
        }

        public async Task<IEnumerable<SiteInfo>> GetAllSitesWithGroupAsync()
        {
            var sites = await baseService.GetDataAsync<SiteInfo>(new GetAllSiteCriteria());
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

        public IEnumerable<Setting> GetPositions(bool isExcludeGuest)
        {
            var positions = new List<Setting>
            {
                new Setting { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
                new Setting { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
                new Setting { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
                new Setting { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member }
            };
            if (!isExcludeGuest)
            {
                positions.Add(new Setting { SettingId = RoleIdConstants.Guest, SettingValue = ViewResources.Guest });
            }

            return positions;
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