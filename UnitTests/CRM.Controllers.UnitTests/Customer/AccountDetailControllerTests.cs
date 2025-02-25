namespace CRM.Controllers.UnitTests.Customer
{
    using System;
    using System.Net;
    using AutoFixture;
    using CRM.Core.Enumerables;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Models.Customer;
    using CRM.Services;
    using CRM.Services.Customer;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using CRM.Criteria.Customer;
    using CRM.Core.Constants;
    using CRM.Models;
    using System.Collections.Generic;
    using System.Linq;
    using Models.Setting;
    using CRM.Core.Models;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Resources;
    using Fanex.NAP.Client.Helpers.Business;

    public class AccountDetailControllerTest : BaseController
    {
        private INapSession napSession;
        private ICustomerService customerService;
        private ISettingService settingService;
        private IBaseService baseService;
        private IPermissionService permissionService;

        [Fact]
        public async Task GetCustomerById_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var customer = fixture.Create<CustomerInfoDetails>();
            var criteria = fixture.Create<GetCustomerInfoDetailByIdCriteria>();

            permissionService.GetCurrentUserLicenseeTypeAsync().Returns((short)SitePermission.Both);
            customerService.GetCustomerByIdAsync(criteria).Returns(customer);
            customerService.GetSiteTypeByCustIdAsync(Arg.Any<int>()).
                Returns(new CustomerPermissionInfo
                {
                    CustomerType = customer.CustomerType, SitePermission = customer.SitePermission
                });

            //Act
            var result = await controller.GetCustomerById(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var customerInfo = jsonResult.Value;
            Assert.Equal(customer, customerInfo);
        }

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior(1));
            var sites = fixture.Create<IEnumerable<SiteInfo>>();
            var countries = fixture.Create<IEnumerable<Country>>();
            var languages = fixture.Create<IEnumerable<Language>>();
            var licenseeTypes = fixture.Create<IEnumerable<BaseModel>>();
            var titles = fixture.Create<IEnumerable<SettingRelation>>();
            var controller = GetController();

            settingService.GetAllSitesWithGroupAsync().Returns(sites);
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
            settingService.GetLanguageAsync(SettingConstants.Active).Returns(languages);
            settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(titles);

            //Act
            var result = await controller.GetAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            if (jsonResult.Value != null)
            {
                var sitesJson = (IEnumerable<SiteInfo>)jsonResult.Value.GetType().GetProperty("Sites")?.GetValue(jsonResult.Value);
                var countriesJson = (IEnumerable<Country>)jsonResult.Value.GetType().GetProperty("Countries")?.GetValue(jsonResult.Value);
                var languagesJson = (IEnumerable<Language>)jsonResult.Value.GetType().GetProperty("Languages")?.GetValue(jsonResult.Value);
                var licenseeTypesJson = (IEnumerable<BaseModel>)jsonResult.Value.GetType().GetProperty("LicenseeTypes")?.GetValue(jsonResult.Value);
            
                Assert.Equal(sitesJson, sites);
                Assert.Equal(countriesJson, countries);
                Assert.Equal(languagesJson, languages);
                Assert.Equal(licenseeTypes, licenseeTypesJson);
            }
        }

        [Fact]
        public async Task EditCustomerInfoDetail_WhenCalledWithCanEdit_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var expectedResult = fixture.Create<CommandResult>();
            var command = fixture.Create<EditCustomerInfoDetailCommand>();

            customerService.HasHostPermissionOnCustIdAsync(command.CustomerId).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Headlineinfo, Constant.Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(Arg.Any<EditCustomerInfoDetailCommand>()).Returns(expectedResult);
            //Act
            var result = await controller.EditCustomerInfoDetail(command);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(expectedResult, jsonResult.Value);
        }

        [Fact]
        public async Task EditCustomerInfoDetail_WhenCalledWithNotCanEdit_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var expectedResult = new CommandResult
            {
                Message = ViewResources.NoPermission
            };
            var command = fixture.Create<EditCustomerInfoDetailCommand>();

            customerService.HasHostPermissionOnCustIdAsync(command.CustomerId).Returns(false);
            baseService.ExecuteNonQueryAsync(command).Returns(expectedResult);
            //Act
            var result = await controller.EditCustomerInfoDetail(command);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsType<CommandResult>(jsonResult.Value);
            Assert.Equal(expectedResult.Message, commandResult.Message);
        }

        [Fact]
        public async Task GetRolesByPic_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var id = fixture.Create<int>();
            var roles = fixture.Create<IEnumerable<Setting>>();

            permissionService.GetCurrentUserLicenseeTypeAsync().Returns((short)SitePermission.Both);
            settingService.GetRolesByPicAsync(id).Returns(roles);
            //Act
            var result = await controller.GetRolesByPic(id);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(roles, jsonResult.Value);
        }

        [Fact]
        public async Task GetSettingStaffAndAuthority_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var staffAndAuthority = fixture.Create<IEnumerable<Setting>>();

            permissionService.GetCurrentUserLicenseeTypeAsync().Returns((short)SitePermission.Both);
            settingService.GetSettingAsync(SettingName.StaffAndAuthority, true).Returns(staffAndAuthority);
            //Act
            var result = await controller.GetSettingStaffAndAuthority();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(staffAndAuthority, jsonResult.Value);
        }

        [Fact]
        public async Task GetSettingPicRole_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var settings = fixture.Create<IEnumerable<Setting>>();

            permissionService.GetCurrentUserLicenseeTypeAsync().Returns((short)SitePermission.Both);
            settingService.GetSettingAsync(SettingName.PicRole, true).Returns(settings);
            //Act
            var result = await controller.GetSettingPicRole();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(settings, jsonResult.Value);
        }

        [Fact]
        public async Task GetSettingPicCommunicationTools_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var settings = fixture.Create<IEnumerable<Setting>>();

            permissionService.GetCurrentUserLicenseeTypeAsync().Returns((short)SitePermission.Both);
            settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(settings);
            //Act
            var result = await controller.GetSettingPicCommunicationTools();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(settings, jsonResult.Value);
        }

        [Fact]
        public async Task EditPic_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criterias = fixture.Create<IList<EditPicCriteria>>();
            var commandResult = fixture.Create<CommandResult>();

            customerService.EditPicAsync(Arg.Any<EditPicCriteria>()).Returns(commandResult);
            //Act
            var result = await controller.EditPic(criterias);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var command = Assert.IsType<List<CommandResult>>(jsonResult.Value);
            Assert.Equal(commandResult, command[0]);
        }

        [Fact]
        public async Task ValidateEditPic_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criterias = fixture.Create<IList<ValidateEditNewPicCriteria>>();
            var resultlValid = fixture.Create<IList<PicValidationInfo>>();

            var resultlList = (from criteria in criterias where resultlValid.Any(x => x.PicID != 0) select resultlValid).Cast<IEnumerable<PicValidationInfo>>().ToList();

            customerService.ValidateEditNewPicAsync(Arg.Any<ValidateEditNewPicCriteria>()).Returns(resultlValid);
            //Act
            var result = await controller.ValidateEditPic(criterias);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var command = Assert.IsAssignableFrom<IList<IEnumerable<PicValidationInfo>>>(jsonResult.Value);
            Assert.Equal(resultlList, command);
        }

        [Fact]
        public async Task GetHeadlineCompanyService_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criteria = fixture.Create<GetHeadlineCompanyServiceCriteria>();
            var headlineCompanyServices = fixture.Create<IEnumerable<HeadlineCompanyService>>();
            var headlineAccountCommunicationInfos = fixture.Create<IEnumerable<HeadlineAccountCommunicationInfo>>();
            var exspected = new Tuple<IEnumerable<HeadlineCompanyService>,
                IEnumerable<HeadlineAccountCommunicationInfo>>(headlineCompanyServices,
                headlineAccountCommunicationInfos);
            customerService.GetHeadlineCompanyServiceAsync(criteria).Returns(exspected);
            //Act
            var result = await controller.GetHeadlineCompanyService(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(exspected, jsonResult.Value);
        }

        [Fact]
        public async Task GetHeadlineStaffsAndAuthority_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criteria = fixture.Create<GetHeadlineStaffAndAuthorityCriteria>();
            var commandSynCompanyServices = fixture.Create<CommandResult>();
            var headlineStaffsAndAuthorities = fixture.Create<IEnumerable<HeadlineStaffsAndAuthority>>();

            customerService.SyncHeadlineStaffsAndAuthorityAsync(Arg.Any<SyncHeadlineStaffAndAuthorityCriteria>())
                .Returns(commandSynCompanyServices);
            customerService.GetHeadlineStaffsAndAuthorityAsync(criteria).Returns(headlineStaffsAndAuthorities);
            //Act
            var result = await controller.GetHeadlineStaffsAndAuthority(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(headlineStaffsAndAuthorities, jsonResult.Value);
        }

        [Fact]
        public async Task EditHeadlineStaffsAndAuthority_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criteria = fixture.Create<UpdateHeadlineStaffAndAuthorityCommand>();
            var command = fixture.Create<CommandResult>();

            customerService.EditHeadlineStaffsAndAuthorityAsync(criteria).Returns(command);
            //Act
            var result = await controller.EditHeadlineStaffsAndAuthority(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(command, jsonResult.Value);
        }

        [Fact]
        public async Task EditHeadlineCompanyService_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criteria = fixture.Create<UpdateHeadlineCompanyServiceCommand>();
            var command = fixture.Create<CommandResult>();

            customerService.EditHeadlineCompanyServiceAsync(criteria).Returns(command);
            //Act
            var result = await controller.EditHeadlineCompanyService(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(command, jsonResult.Value);
        }

        [Fact]
        public async Task EditOtherAccCommunicationInfo_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criteria = fixture.Create<UpdateOtherAccCommunicationInfoCommand>();
            var command = fixture.Create<CommandResult>();

            customerService.EditOtherAccCommunicationInfoAsync(criteria).Returns(command);
            //Act
            var result = await controller.EditOtherAccCommunicationInfo(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(command, jsonResult.Value);
        }

        [Fact]
        public async Task CheckCustomerExistsOnCRM_WhenCalled_ReturnExpectedData()
        {
            //Arrange
            var controller = GetController();
            var fixture = new Fixture();
            var criteria = fixture.Create<CheckCustomerExistsOnCrmCriteria>();
            var command = fixture.Create<int>();

            baseService.GetDataEntityAsync<int>(criteria).Returns(command);
            //Act
            var result = await controller.CheckCustomerExistsOnCRM(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(command, jsonResult.Value);
        }
        #region Helpers

        private AccountDetailController GetController()
        {
            customerService = Substitute.For<ICustomerService>();
            settingService = Substitute.For<ISettingService>();
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            permissionService = Substitute.For<IPermissionService>();
            var controller = new AccountDetailController(napSession, customerService, settingService, baseService, permissionService);
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