namespace CRM.Controllers.UnitTests.Customer
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Customer;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models;
    using CRM.Models.Customer;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class CustomerInfoDetailControllerTest : BaseController
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ICustomerDetailService customerDetailService;
        private ISettingService settingService;
        private IBaseService baseService;

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            //Arrange
            var controller = GetController();
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.Updateheadlineinfo).Returns(2);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var permission = (GetPermissionCustomer)viewResult.Model;
            Assert.Equal(2, permission.CustomerInfoPolicy);
            Assert.Equal(2, permission.UpdateHeadlineInfoPolicy);
        }

        [Fact]
        public async Task GetCustomerInfoDetailById_WhenCalled_ReturnAsExpectedResult()
        {
            //Arrange
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var customer = fixture.Create<CustomerInfo>();
            var param = fixture.Create<GetCustomerInfoDetailByIdCriteria>();
            var controller = GetController();
            customerDetailService.GetCustomerInfoDetailByIdAsync(param).Returns(customer);

            //Act
            var result = await controller.GetCustomerInfoDetailById(param);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var customerInfoDetail = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            Assert.Equal(customer, customerInfoDetail);
        }

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
        {
            //Arrange
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var countries = fixture.Create<IEnumerable<Country>>();
            var languages = fixture.Create<IEnumerable<Language>>();
            var licenseeTypes = fixture.Create<IEnumerable<BaseModel>>();
            var sites = fixture.Create<IEnumerable<SiteInfo>>();
            var titles = fixture.Create<IEnumerable<SettingRelation>>();

            var controller = GetController();
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
            settingService.GetLanguageAsync(SettingConstants.Active).Returns(languages);
            settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);
            settingService.GetAllSitesWithGroupAsync().Returns(sites);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(titles);

            // Act
            var result = await controller.GetAllSettings();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var allSettings = (CreateCustomerInfoViewModel)jsonResult.Value;
            Assert.Equal(countries, allSettings.Countries);
            Assert.Equal(languages, allSettings.Languages);
            Assert.Equal(licenseeTypes, allSettings.LicenseeTypes);
            Assert.Equal(sites, allSettings.Sites);
            Assert.Equal(titles, allSettings.Titles);
        }

        [Fact]
        public async Task EditCustomerDetailInfo_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var command = fixture.Create<UpdateCustomerInfoDetailCommand>();
            var commandResult = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            var controller = GetController();
            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            //Act
            var result = await controller.EditCustomerDetailInfo(command);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        #region Helpers

        private CustomerInfoDetailController GetController()
        {
            customerDetailService = Substitute.For<ICustomerDetailService>();
            settingService = Substitute.For<ISettingService>();
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            baseService = Substitute.For<IBaseService>();
            return new CustomerInfoDetailController(napSession, napSettings, userService, customerDetailService, settingService, baseService);
        }

        #endregion Helpers
    }
}
