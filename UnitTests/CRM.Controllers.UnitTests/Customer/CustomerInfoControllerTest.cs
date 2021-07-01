namespace CRM.Controllers.UnitTests.Customer
{
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Customer;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Customer;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class CustomerInfoControllerTest : BaseController
    {
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ICustomerService customerService;
        private ISettingService settingService;

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            //Arrange
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CustomerInfo, Policy.Host).Returns(true);

            //Act
            var result = controller.Index();

            //Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

        [Fact]
        public async Task GetCustomerInfo_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var customer = fixture.Create<CustomerInfo>();
            var param = fixture.Create<GetCustomerInfoByUsernameCriteria>();
            var controller = GetController();
            customerService.GetCustomerInfoAsync(param).Returns(customer);

            //Act
            var result = await controller.GetCustomerInfo(param);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var customerInfo = (CustomerInfo)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            Assert.Equal(customer, customerInfo);

        }

        [Fact]
        public async Task GetSettings_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var sites = fixture.Create<IEnumerable<SiteSetting>>();
            var countries = fixture.Create<IEnumerable<Country>>();
            var languages = fixture.Create<IEnumerable<Setting>>();
            var controller = GetController();
            settingService.GetAllSiteAsync().Returns(sites);
            settingService.GetAllCountryAsync(new GetAllCountryCriteria()).Returns(countries);
            settingService.GetAllLanguageAsync(new GetAllLanguageCriteria()).Returns(languages);

            var expected = new
            {
                sites,
                countries,
                languages
            };

            //Act
            var result = await controller.GetSettings();

            //Asssert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var settingsResult = jsonResult.Value;
            expected.Equals(settingsResult);
        }

        [Fact]
        public async Task EditCustomerInfo_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var model = fixture.Create<UpdateCustomerInfoCommand>();
            var controller = GetController();
            customerService.UpdateCustomerInfoAsync(model).Returns(expected);

            //Act
            var result = await controller.EditCustomerInfo(model);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);

        }


        #region Helpers

        private CustomerInfoController GetController()
        {
            customerService = Substitute.For<ICustomerService>();
            settingService = Substitute.For<ISettingService>();
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            var controller = new CustomerInfoController(napSession, napSettings, userService, customerService, settingService);
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            return controller;
        }

        #endregion Helpers
    }
}
