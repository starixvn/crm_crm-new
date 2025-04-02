namespace CRM.Services.UnitTests;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Criteria.InformHeadline;
using CRM.Criteria.PicAndHeadline;
using CRM.Criteria.Setting;
using CRM.Models;
using CRM.Models.AdminTool.SettingLog;
using CRM.Models.Setting;
using CRM.Resources;
using NSubstitute;
using Xunit;

public class SettingServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private IPermissionService permissionService;

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
            new()
            {
                Id = SettingConstants.CommunicationNA,
            },
            new()
            {
                Id = 1,
            }
        };
        var criteria = new GetAllCommunicationToolCriteria();
        var expectedOrder = expected.Where(x => x.Id != SettingConstants.CommunicationNA).OrderBy(s => s.DisplayOrder).ToList();
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
    public async Task GetMainSettingAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var expected = 2;
        var service = GetService();
        var allSettings = new List<Setting>
        {
            new() { Id = 1, SettingName = "Main", SettingId = 1 },
            new() { Id = 2, SettingName = "Main", SettingId = 2 },
            new() { Id = 3, SettingName = "Sup", SettingId = 3 },
        };
        baseService.GetDataAsync<Setting>(Arg.Any<GetSettingCriteria>()).Returns(allSettings);

        // Act
        var actual = await service.GetMainSettingAsync();

        // Assert
        Assert.Equal(expected, actual.Where(x => x.SettingName == "Main").ToList().FirstOrDefault().ChildSettings.Count);
    }

    [Fact]
    public async Task GetSettingByTypes_WhenCalled_ReturnExpected()
    {
        // Arrange
        var expected = 3;
        var service = GetService();
        var allSettings = new List<Setting>
        {
            new() { Id = 1, SettingName = "Main", SettingId = 1, SettingSource = "source" },
            new() { Id = 2, SettingName = "Main", SettingId = 2, SettingSource = "source"  },
            new() { Id = 3, SettingName = "Sup", SettingId = 3, SettingSource = "source"  },
        };
        var relations = new List<Setting>
        {
            new() { Id = 1, SettingName = "Main", SettingId = 1, ParentID = 1 },
            new() { Id = 2, SettingName = "Main", SettingId = 2, ParentID = 1  },
            new() { Id = 3, SettingName = "Sup", SettingId = 3, ParentID = 1  },
        };
        baseService.GetDataAsync<Setting>(Arg.Any<GetAllSettingRelationCriteria>()).Returns(relations);
        baseService.GetDataAsync<Setting>(Arg.Any<GetSettingCriteria>()).Returns(allSettings);

        // Act
        var actual = await service.GetSettingByTypes("Main");

        // Assert
        Assert.Equal(expected, actual.Where(x => x.SettingName == "Main").ToList().FirstOrDefault().ChildSettings.Count);
    }

    [Fact]
    public async Task GetRolesByPicAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var expected = new List<Setting>();
        var service = GetService();
        baseService.GetDataAsync<Setting>(Arg.Any<GetRoleByPicType>()).Returns(expected);

        // Act
        var actual = await service.GetRolesByPicAsync(1);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetSiteByIdAsync_WhenHaveSites_ReturnExpected()
    {
        // Arrange
        var expected = new SiteSetting
        {
            Id = 1,
            AliasName = Constants.Credit,
            Name = "SiteSetting",
            IsActive = false
        };
        var siteInfo = new List<SiteInfo>
        {
            new() { Id = 1, Name = "SiteSetting" }
        };
        var service = GetService();
        baseService.GetDataAsync<SiteInfo>(Arg.Any<GetAllSiteCriteria>()).Returns(siteInfo);

        // Act
        var actual = await service.GetSiteByIdAsync(1);

        // Assert
        Assert.Equal(expected.AliasName, actual.AliasName);
    }

    [Fact]
    public async Task GetSiteByIdAsync_WhenNotHaveSite_ReturnExpected()
    {
        // Arrange
        var siteInfo = new List<SiteInfo>();
        var service = GetService();
        baseService.GetDataAsync<SiteInfo>(Arg.Any<GetAllSiteCriteria>()).Returns(siteInfo);

        // Act
        var actual = await service.GetSiteByIdAsync(1);

        // Assert
        Assert.Equal(ViewResources.Symbol_NotApply, actual.Name);
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
            new()
            {
                Id = 1,
                Name ="name",
                IsActive = true
            }
        };

        var criteria = new GetAllCountryCriteria();
        var expected = new List<Country>
        {
            new()
            {
                Id = SettingConstants.NotApply,
                Name = ViewResources.Symbol_NotApply,
                IsActive = true
            },
            new()
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
            new()
            {
                LanguageId = 1,
                Name ="name",
                IsActive = true
            }
        };

        var criteria = new GetAllLanguageCriteria();
        var expected = new List<Language>
        {
            new()
            {
                LanguageId = SettingConstants.NotApply,
                Name = ViewResources.Symbol_NotApply,
                IsActive = true
            },
            new()
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
        var expected = fixture.Create<IList<FeedbackStatus>>();
        expected[0].StatusId = (int)Enumerables.FeedbackStatus.Closed;
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
        var expected = new List<Product> { new() { Id = 1, Name = "Name" } };
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
        var expected = new List<Product> { new() { Id = 1, Name = "Name" } };
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
    public async Task GetSystemSiteAsync_WhenCalled_ReturnExpectedSettings()
    {
        // Arrange
        var expected = fixture.Create<IEnumerable<Models.PicAndHeadline.SiteInfo>>();
        var service = GetService();
        var param = new GetSystemSiteCriteria();
        baseService.GetDataAsync<Models.PicAndHeadline.SiteInfo>(Arg.Any<GetSystemSiteCriteria>()).Returns(expected);

        // Act
        var actual = await service.GetSystemSiteAsync(param);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetSettingMappingAsync_WhenCalled_ReturnExpectedSettings()
    {
        // Arrange
        var expected = fixture.Create<IEnumerable<SettingMapping>>();
        var allSettings = new List<Setting>
        {
            new() { Id = 1, SettingName = "1,2", SettingId = 1, SettingSource = null }
        };
        var criteria = new GetSourceSettingMappingCriteria();
        var service = GetService();
        baseService.GetDataAsync<Setting>(Arg.Any<GetSettingCriteria>()).Returns(allSettings);
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
            new() {Id = 1, IsLicensee = true, IsActive = true},
            new() {Id = 2, IsLicensee = true, IsActive = true},
            new() {Id = 3, IsLicensee = false, IsActive = true}
        };
        var expected = new List<SiteInfo> {
            new() {Id = 1, IsLicensee = true, Name = "Credit", IsActive = true},
            new() {Id = 2, IsLicensee = true, Name = "Licensee", IsActive = true}
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
    public async Task GetAllSitesWithGroupInformHeadlineAsync_WhenCalled_ReturnExpectedSiteInfos()
    {
        // Arrange
        var siteInfos = new List<SiteInfo> {
            new() {Id = 1, IsLicensee = true, IsActive = true},
            new() {Id = 2, IsLicensee = true, IsActive = true},
            new() {Id = 3, IsLicensee = false, IsActive = true}
        };
        var expected = new List<SiteInfo> {
            new() {Id = 1, IsLicensee = true, Name = "Credit", IsActive = true},
            new() {Id = 2, IsLicensee = true, Name = "Licensee", IsActive = true}
        };
        var service = GetService();
        baseService.GetDataAsync<SiteInfo>(Arg.Any<GetSiteOnInformHeadlineCriteria>()).Returns(siteInfos);

        // Act
        var actual = await service.GetAllSitesWithGroupInformHeadlineAsync();

        // Assert
        Assert.Equal(expected.FirstOrDefault().Name, actual.FirstOrDefault().Name);
    }

    [Fact]
    public async Task GetAllSitesGroupByIsLicenseeAsync_WhenCalled_ReturnExpectedSiteInfos()
    {
        // Arrange
        var siteInfos = new List<SiteInfo> {
            new() {Id = 1, IsLicensee = true, IsActive = true},
            new() {Id = 2, IsLicensee = true, IsActive = true},
            new() {Id = 3, IsLicensee = false, IsActive = true}
        };
        var expected = new List<SiteInfo> {
            new() {Id = 1, IsLicensee = true, Name = "Credit", IsActive = true},
            new() {Id = 2, IsLicensee = true, Name = "Licensee", IsActive = true}
        };
        var service = GetService();
        baseService.GetDataAsync<SiteInfo>(Arg.Any<GetAllSiteCriteria>()).Returns(siteInfos);

        // Act
        var actual = await service.GetAllSitesGroupByIsLicenseeAsync();

        // Assert
        Assert.Equal(expected.FirstOrDefault().Name, actual.FirstOrDefault().Name);
    }

    [Fact]
    public async Task GetAllSitesLicenseeInactive_WhenCalled_ReturnExpectedSiteInfos()
    {
        // Arrange
        var siteInfos = new List<SiteInfo> {
            new() {Id = 1, IsLicensee = true, IsActive = true},
            new() {Id = 2, IsLicensee = true, IsActive = true},
            new() {Id = 3, IsLicensee = false, IsActive = false}
        };
        var service = GetService();
        baseService.GetDataAsync<SiteInfo>(Arg.Any<GetAllSiteCriteria>()).Returns(siteInfos);

        // Act
        var actual = await service.GetAllSitesLicenseeInactive();

        // Assert
        Assert.Equal(siteInfos.Where(x => !x.IsActive && x.IsLicensee), actual);
    }

    [Fact]
    public void GetPositions_WhenCalledWithParamIsTrue_ReturnExpectedSettings()
    {
        // Arrange
        var expected = new List<Setting>
        {
            new() { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
            new() { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
            new() { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
            new() { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member }
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
            new() { SettingId = RoleIdConstants.Super, SettingValue = ViewResources.Super },
            new() { SettingId = RoleIdConstants.Master, SettingValue = ViewResources.Master },
            new() { SettingId = RoleIdConstants.Agent, SettingValue = ViewResources.Agent },
            new() { SettingId = RoleIdConstants.Member, SettingValue = ViewResources.Member },
            new() { SettingId = RoleIdConstants.Guest, SettingValue = ViewResources.Guest}
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
            new() { SettingId = CustomerTypeConstants.All, SettingValue = ViewResources.All },
            new() { SettingId = CustomerTypeConstants.Customer, SettingValue = ViewResources.Customer },
            new() { SettingId = CustomerTypeConstants.Guest, SettingValue = ViewResources.Guest }
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

    [Fact]
    public void GetAllPeriodTypes_WhenCalled_ReturnExpectedSettings()
    {
        // Arrange
        var expected = new List<Setting>
        {
            new() { Id = PeriodTypeConstants.Daily, Name = ViewResources.Daily },
            new() { Id = PeriodTypeConstants.Weekly, Name = ViewResources.Weekly },
            new() { Id = PeriodTypeConstants.Monthly, Name = ViewResources.Monthly },
            new() { Id = PeriodTypeConstants.Yearly, Name = ViewResources.Yearly }
        };
        var service = GetService();

        // Act
        var actual = service.GetAllPeriodTypes().ToList();

        // Assert
        Assert.Equal(expected.Count, actual.Count);
        Assert.Equal(expected[0].Id, actual[0].Id);
        Assert.Equal(expected[0].Name, actual[0].Name);
        Assert.Equal(expected[1].Id, actual[1].Id);
        Assert.Equal(expected[1].Name, actual[1].Name);
        Assert.Equal(expected[2].Id, actual[2].Id);
        Assert.Equal(expected[2].Name, actual[2].Name);
        Assert.Equal(expected[3].Id, actual[3].Id);
        Assert.Equal(expected[3].Name, actual[3].Name);
    }

    [Theory]
    [InlineData(1, "Daily")]
    [InlineData(2, "Weekly")]
    [InlineData(3, "Monthly")]
    [InlineData(4, "Yearly")]
    public void GetPeriodTypeName_WhenCalled_ReturnExpectedSettings(int periodType, string expected)
    {
        // Act
        var actual = SettingService.GetPeriodTypeName(periodType);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetAllMainSubCategoriesAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "MainCategoryID" }
        };
        var subCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "SubCategoryID" }
        };
        var mainCriteria = new GetAllMainCategoryCriteria();
        var subCriteria = new GetAllSubCategoryCriteria();
        var service = GetService();
        baseService.GetDataAsync<Setting>(Arg.Do<GetAllMainCategoryCriteria>(x => mainCriteria = x)).Returns(mainCategories);
        baseService.GetDataAsync<Setting>(Arg.Do<GetAllSubCategoryCriteria>(x => subCriteria = x)).Returns(subCategories);

        // Act
        var actual = await service.GetAllMainSubCategoriesAsync();

        // Assert
        Assert.Equal(subCategories, actual.FirstOrDefault().ChildSettings);
    }

    [Fact]
    public async Task GetMainCategoryWithSubCategoryAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { SettingId = 1, Name = "MainCategoryID" }
        };
        var subCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "SubCategoryID" }
        };
        var mainCriteria = new GetSettingCriteria();
        var subCriteria = new GetAllSubCategoryCriteria();
        var service = GetService();
        baseService.GetDataAsync<Setting>(Arg.Do<GetSettingCriteria>(x => mainCriteria = x)).Returns(mainCategories);
        baseService.GetDataAsync<Setting>(Arg.Do<GetAllSubCategoryCriteria>(x => subCriteria = x)).Returns(subCategories);

        // Act
        var actual = await service.GetMainCategoryWithSubCategoryAsync();

        // Assert
        Assert.Equal(subCategories, actual.FirstOrDefault().ChildSettings);
    }

    [Fact]
    public async Task GetStations_WhenCalled_ReturnExpected()
    {
        // Arrange
        var expected = fixture.Create<IEnumerable<Station>>();
        var service = GetService();
        baseService.GetDataAsync<Station>(Arg.Any<GetAllStationCriteria>()).Returns(expected);

        // Act
        var actual = await service.GetStations();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetAllLogActionAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var expected = fixture.Create<IEnumerable<BaseModel>>();
        var service = GetService();
        baseService.GetDataAsync<BaseModel>(Arg.Any<GetAllActionCriteria>()).Returns(expected);

        // Act
        var actual = await service.GetAllLogActionAsync(1);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetSettingRelationConfirmAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var param = fixture.Create<GetSettingRelationConfirm>();
        var service = GetService();
        baseService.GetDataEntityAsync<int>(Arg.Any<GetSettingRelationConfirmCriteria>()).Returns(1);

        // Act
        var actual = await service.GetSettingRelationConfirmAsync(param);

        // Assert
        Assert.Equal(1, actual);
    }

    #region Helpers

    private SettingService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        permissionService = Substitute.For<IPermissionService>();
        return new SettingService(baseService, permissionService);
    }

    #endregion Helpers
}