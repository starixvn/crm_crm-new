namespace CRM.Services.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Setting;
    using CRM.Resources;
    using NSubstitute;
    using Xunit;

    public class SettingServiceTests
    {
        private readonly IFixture fixture = new Fixture();
        private IBaseService baseService;

        [Fact]
        public async Task GetCommunicationToolAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>();
            var expectedOrder = expected.OrderBy(s => s.DisplayOrder).ToList();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Any<GetAllCommunicationToolCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetCommunicationToolAsync();

            // Assert
            Assert.Equal(expectedOrder, actual);
        }

        [Fact]
        public async Task GetCommunicationToolAsync_NotsIncludeNA_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting> { 
                new Setting {
                    Id = SettingConstants.CommunicationNA,
                },
                new Setting
                {
                    Id = 1,
                }
            };
            var criteria = new GetAllCommunicationToolCriteria();
            var expectedOrder = expected.Where(x=> x.Id != SettingConstants.CommunicationNA).OrderBy(s => s.DisplayOrder).ToList();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Do<GetAllCommunicationToolCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetCommunicationToolAsync(2, false);

            // Assert
            Assert.Equal(expectedOrder, actual);
            // Assert
            Assert.Equal(2, criteria.Active);
        }

        [Fact]
        public async Task GetSiteAsync_WhenCalled_ReturnExpectedSiteSettings()
        {
            // Arrange
            var expected = new List<SiteSetting>();
            var service = GetService();
            baseService.GetDataAsync<SiteSetting>(Arg.Any<GetAllSiteCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetSiteAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        

        [Fact]
        public async Task GetSettingAsync_WhenCalled_ReturnExpectedListSettings()
        {
            // Arrange
            var expected = new List<Setting>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Any<GetSettingCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetSettingAsync(fixture.Create<string>());

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetMainCategoryAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>();
            var criteria = new GetAllMainCategoryCriteria();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Do<GetAllMainCategoryCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetMainCategoryAsync(0);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(0, criteria.Active);
        }


        [Fact]
        public async Task GetSettingRelationByNameAsync_WhenCalled_ReturnExpectedSettingRelations()
        {
            // Arrange
            var expected = new List<SettingRelation>();
            var criteria = new GetSettingRelationByNameCriteria();
            var service = GetService();
            baseService.GetDataAsync<SettingRelation>(Arg.Do<GetSettingRelationByNameCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetSettingRelationByNameAsync("product");

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal("product", criteria.SettingName);
        }

        [Fact]
        public async Task GetMainSettingRelationAsync_WhenCalled_ReturnExpectedMainSettingRelations()
        {
            // Arrange
            var mainRelations = fixture.Create<IEnumerable<SettingRelation>>();
            var criteria = fixture.Create<GetSettingRelationByNameCriteria>();
            var service = GetService();
            baseService.GetDataAsync<SettingRelation>(Arg.Do<GetSettingRelationByNameCriteria>(x => criteria = x)).Returns(mainRelations);

            // Act
            var actual = await service.GetMainSettingRelationAsync(criteria);

            // Assert
            Assert.Equal(mainRelations, actual);
        }

        [Fact]
        public async Task GetSubCategoryAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>();
            var criteria = new GetAllSubCategoryCriteria();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Do<GetAllSubCategoryCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetSubCategoryAsync(1, 0);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(1, criteria.MainCategoryId);
            Assert.Equal(0, criteria.Active);
        }

        [Fact]
        public async Task GetCountryAsync_WhenCalled_ReturnExpectedCountry()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<Country>>();
            var criteria = new GetAllCountryCriteria();
            var service = GetService();
            baseService.GetDataAsync<Country>(Arg.Do<GetAllCountryCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetCountryAsync(0);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(0, criteria.Active);
        }

        [Fact]
        public async Task GetCountryAsync_IsIncludeNA_ReturnExpectedCountry()
        {
            // Arrange
            var countries = new List<Country>
            {
                new Country
                {
                    Id = 1,
                    Name ="name",
                    IsActive = true
                }
            };

            var criteria = new GetAllCountryCriteria();
            var expected = new List<Country>
            {
                new Country
                {
                    Id = SettingConstants.NotApply,
                    Name = ViewResources.Symbol_NotApply,
                    IsActive = true
                },
                new Country
                {
                    Id = 1,
                    Name ="name",
                    IsActive = true
                }
            };
            var service = GetService();
            baseService.GetDataAsync<Country>(Arg.Do<GetAllCountryCriteria>(x => criteria = x)).Returns(countries);

            // Act
            var actual = await service.GetCountryAsync(0, true);

            // Assert
            Assert.Equal(expected.First().Id, actual.First().Id);
            Assert.Equal(expected.Last().Id, actual.Last().Id);
            Assert.Equal(0, criteria.Active);
        }


        [Fact]
        public async Task GetProvinceAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<Province>>();
            var service = GetService();
            baseService.GetDataAsync<Province>(Arg.Any<GetAllProvinceCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetProvinceAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetSettingRelationAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Any<GetAllSettingRelationCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetSettingRelationAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetLanguageAsync_WhenCalled_ReturnExpectedLanguages()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<Language>>();
            var criteria = new GetAllLanguageCriteria();
            var service = GetService();
            baseService.GetDataAsync<Language>(Arg.Do<GetAllLanguageCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetLanguageAsync(0);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(0, criteria.Active);
        }

        [Fact]
        public async Task GetLanguageAsync_IsIncludeNA_ReturnExpectedLanguages()
        {
            // Arrange
            var languages = new List<Language>
            {
                new Language
                {
                    LanguageId = 1,
                    Name ="name",
                    IsActive = true
                }
            };

            var criteria = new GetAllLanguageCriteria();
            var expected = new List<Language>
            {
                new Language
                {
                    LanguageId = SettingConstants.NotApply,
                    Name = ViewResources.Symbol_NotApply,
                    IsActive = true
                },
                new Language
                {
                    LanguageId = 1,
                    Name ="name",
                    IsActive = true
                }
            };
            var service = GetService();
            baseService.GetDataAsync<Language>(Arg.Do<GetAllLanguageCriteria>(x => criteria = x)).Returns(languages);

            // Act
            var actual = await service.GetLanguageAsync(1, true);

            // Assert
            Assert.Equal(expected.First().LanguageId, actual.First().LanguageId);
            Assert.Equal(expected.Last().LanguageId, actual.Last().LanguageId);
            Assert.Equal(1, criteria.Active);
        }

        [Fact]
        public async Task GetStatusAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<FeedbackStatus>>();
            var criteria = fixture.Create<GetAllStatusCriteria>();
            var service = GetService();
            baseService.GetDataAsync<FeedbackStatus>(Arg.Do<GetAllStatusCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetStatusAsync(1);

            // Assert
            Assert.Equal(expected.ToList(), actual);
        }

        [Fact]
        public async Task GetBetTypeAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Product> { new Product { Id = 1, Name ="Name"} };
            var criteria = new GetAllBetTypeCriteria();
            var service = GetService();
            baseService.GetDataAsync<Product>(Arg.Do<GetAllBetTypeCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetBetTypeAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetProductAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Product> { new Product { Id = 1, Name = "Name" } };
            var criteria = new GetSettingRelationByNameCriteria();
            var service = GetService();
            baseService.GetDataAsync<Product>(Arg.Do<GetSettingRelationByNameCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetProductAsync();

            // Assert
            Assert.Equal(expected, actual);
        }
        

        [Fact]
        public async Task GetSubProductAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Product>();
            var criteria = new SubProductCriteria();
            var service = GetService();
            baseService.GetDataAsync<Product>(Arg.Do<SubProductCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetSubProductAsync(1, 0);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(1, criteria.ProductId);
            Assert.Equal(0, criteria.Active);
        }

        [Fact]
        public async Task GetCurrencyRedemptionAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<BaseModel>>();
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(Arg.Any<GetAllCurrencyRedemptionCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetCurrencyRedemptionAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetLicenseeTypeAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<BaseModel>();
            var criteria = fixture.Create<GetAllLicenseeTypeCriteria>();
            expected.Insert(
               0,
               new BaseModel
               {
                   Id = SettingConstants.NotApply,
                   Name = ViewResources.Symbol_NotApply
               });
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(criteria).Returns(expected);

            // Act
            var actual = await service.GetLicenseeTypeAsync();

            // Assert
            Assert.Equal(expected.First().Id, actual.First().Id);
        }

        [Fact]
        public async Task GetCurrencyAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<BaseModel>>();
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(Arg.Any<GetAllCurrencyCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetCurrencyAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetSettingMappingAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<SettingMapping>>();
            var criteria = new GetSourceSettingMappingCriteria();
            var service = GetService();
            baseService.GetDataAsync<SettingMapping>(Arg.Do<GetSourceSettingMappingCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetSettingMappingAsync("1,2");

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal("1,2", criteria.Settings);
        }

        [Fact]
        public async Task GetAllSitesWithGroupAsync_WhenCalled_ReturnExpectedSiteInfos()
        {
            // Arrange
            var siteInfos = new List<SiteInfo> { 
                new SiteInfo {Id = 1, IsLicensee = true, IsActive = true},
                new SiteInfo {Id = 2, IsLicensee = true, IsActive = true},
                new SiteInfo {Id = 3, IsLicensee = false, IsActive = true}
            };
            var expected = new List<SiteInfo> {
                new SiteInfo {Id = 1, IsLicensee = true, Name = "Credit", IsActive = true},
                new SiteInfo {Id = 2, IsLicensee = true, Name = "Licensee", IsActive = true}
            };
            var service = GetService();
            baseService.GetDataAsync<SiteInfo>(Arg.Any<GetAllSiteCriteria>()).Returns(siteInfos);

            // Act
            var actual = await service.GetAllSitesWithGroupAsync();

            // Assert
            Assert.Equal(expected.FirstOrDefault().Name, actual.FirstOrDefault().Name);
            Assert.Equal(expected.LastOrDefault().Name, actual.LastOrDefault().Name);

        }

        [Fact]
        public void GetPositions_WhenCalledWithParamIsTrue_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>
            {
                new Setting { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
                new Setting { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
                new Setting { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
                new Setting { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member }
            };
            var service = GetService();

            // Act
            var actual = service.GetPositions(true).ToList();

            // Assert
            Assert.Equal(expected.Count, actual.Count);
            Assert.Equal(expected[0].SettingId, actual[0].SettingId);
            Assert.Equal(expected[0].SettingValue, actual[0].SettingValue);
            Assert.Equal(expected[1].SettingId, actual[1].SettingId);
            Assert.Equal(expected[1].SettingValue, actual[1].SettingValue);
            Assert.Equal(expected[2].SettingId, actual[2].SettingId);
            Assert.Equal(expected[2].SettingValue, actual[2].SettingValue);
            Assert.Equal(expected[3].SettingId, actual[3].SettingId);
            Assert.Equal(expected[3].SettingValue, actual[3].SettingValue);
        }

        [Fact]
        public void GetPositions_WhenCalledWithParamIsFalse_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>
            {
                new Setting { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
                new Setting { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
                new Setting { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
                new Setting { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member },
                new Setting { SettingId = RoleIdConstants.Guest, SettingValue = ViewResources.Guest}
            };
            var service = GetService();

            // Act
            var actual = service.GetPositions(false).ToList();

            // Assert
            Assert.Equal(expected.Count, actual.Count);
            Assert.Equal(expected[0].SettingId, actual[0].SettingId);
            Assert.Equal(expected[0].SettingValue, actual[0].SettingValue);
            Assert.Equal(expected[1].SettingId, actual[1].SettingId);
            Assert.Equal(expected[1].SettingValue, actual[1].SettingValue);
            Assert.Equal(expected[2].SettingId, actual[2].SettingId);
            Assert.Equal(expected[2].SettingValue, actual[2].SettingValue);
            Assert.Equal(expected[3].SettingId, actual[3].SettingId);
            Assert.Equal(expected[3].SettingValue, actual[3].SettingValue);
            Assert.Equal(expected[4].SettingId, actual[4].SettingId);
            Assert.Equal(expected[4].SettingValue, actual[4].SettingValue);
        }

        [Fact]
        public void GetAllCustomerTypes_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var expected = new List<Setting>
            {
                new Setting{ SettingId = CustomerTypeConstants.All, SettingValue = ViewResources.All },
                new Setting{ SettingId = CustomerTypeConstants.Customer, SettingValue = ViewResources.Customer },
                new Setting{ SettingId = CustomerTypeConstants.Guest, SettingValue = ViewResources.Guest }
            };
            var service = GetService();

            // Act
            var actual = service.GetAllCustomerTypes().ToList();

            // Assert
            Assert.Equal(expected.Count, actual.Count);
            Assert.Equal(expected[0].SettingId, actual[0].SettingId);
            Assert.Equal(expected[0].SettingValue, actual[0].SettingValue);
            Assert.Equal(expected[1].SettingId, actual[1].SettingId);
            Assert.Equal(expected[1].SettingValue, actual[1].SettingValue);
            Assert.Equal(expected[2].SettingId, actual[2].SettingId);
            Assert.Equal(expected[2].SettingValue, actual[2].SettingValue);
        }

        #region Helpers

        private SettingService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            return new SettingService(baseService);
        }

        #endregion Helpers
    }
}