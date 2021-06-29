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
        private IBaseService baseService;

        [Fact]
        public async Task GetAllCommunicationToolAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();
            var expectedOrder = expected.OrderBy(s => s.DisplayOrder).ToList();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Any<GetAllCommunicationToolCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetAllCommunicationToolAsync(true);


            // Assert
            Assert.Equal(expectedOrder, actual);
        }

        [Fact]
        public async Task GetAsync_WhenCalled_ReturnExpectedListSettings()
        {
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();

            var service = GetService();

            baseService.GetDataAsync<Setting>(Arg.Any<GetSettingCriteria>()).Returns(expected);

            var actual = await service.GetAsync(fixture.Create<GetSettingParam>());

            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetMainCategoryAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Any<GetAllMainCategoryCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetMainCategoryAsync(new GetAllMainCategoryCriteria());

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetSubCategoryAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(Arg.Any<GetAllSubCategoryCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetSubCategoryAsync(new GetAllSubCategoryCriteria());

            // Assert
            Assert.Equal(expected, actual);
        }


        [Fact]
        public async Task GetAllCountryAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Country>>();
            var criteria = fixture.Create<GetAllCountryCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Country>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllCountryAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllProvinceAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Province>>();
            var criteria = fixture.Create<GetAllProvinceCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Province>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllProvinceAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllSettingRelationAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();
            var criteria = fixture.Create<GetAllSettingRelationCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllSettingRelationAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllLanguageAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();
            var criteria = fixture.Create<GetAllLanguageCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllLanguageAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllStatusAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Setting>>();
            var criteria = fixture.Create<GetAllStatusCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Setting>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllStatusAsync(1);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllBetTypeAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Product>>();
            var criteria = fixture.Create<GetAllBetTypeCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Product>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllBetTypeAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetSubProductAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<Product>>();
            var criteria = fixture.Create<SubProductCriteria>();
            var service = GetService();
            baseService.GetDataAsync<Product>(criteria).Returns(expected);

            // Act
            var actual = await service.GetSubProductAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllCurrencyRedemptionAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<BaseModel>>();
            var criteria = fixture.Create<GetAllCurrencyRedemptionCriteria>();
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllCurrencyRedemptionAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllLicenseeTypeAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<BaseModel>>();
            var criteria = fixture.Create<GetAllLicenseeTypeCriteria>();
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllLicenseeTypeAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetAllCurrencyAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<BaseModel>>();
            var criteria = fixture.Create<GetAllCurrencyCriteria>();
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(criteria).Returns(expected);

            // Act
            var actual = await service.GetAllCurrencyAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetSettingMappingAsync_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<SettingMapping>>();
            var criteria = fixture.Create<GetSourceSettingMappingCriteria>();
            var service = GetService();
            baseService.GetDataAsync<SettingMapping>(criteria).Returns(expected);

            // Act
            var actual = await service.GetSettingMappingAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
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
        #endregion
    }
}