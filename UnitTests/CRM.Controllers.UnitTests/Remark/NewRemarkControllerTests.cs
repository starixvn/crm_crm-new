namespace CRM.Controllers.UnitTests.Remark
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Remark;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Criteria.NewRemark;
    using CRM.Models.Customer;
    using CRM.Models.Remark;
    using CRM.Models.RemarkNew;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class NewRemarkControllerTests
    {
        private INapSession napSession;
        private INapSettings napSettings;
        private IPermissionService permissionService;
        private IRemarkService remarkService;
        private ISettingService settingService;
        private ICommonService commonService;
        private ICustomerService customerService;

        [Fact]
        public async Task GetRemarkTitles_WhenCalled_ReturnExpectedJsonResult()
        {
            var remarkSettings = new List<Setting> { new() { Name = " test" } };
            var expected = remarkSettings.OrderBy(s => s.DisplayOrder).ToList();

            var controller = GetController();

            settingService.GetSettingAsync(SettingName.RemarkTitles, true).Returns(remarkSettings);

            var actual = await controller.GetRemarkTitles();
            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Equal(expected, jsonResult.Value);
        }

        [Fact]
        public async Task GetAllSetting_WhenCalled_ReturnExpectedJsonResult()
        {
            var fixture = new Fixture();
            var users = fixture.Create<IEnumerable<Models.Customer.UserInfo>>();
            var extentions = fixture.Create<IEnumerable<SettingRelation>>();
            var controller = GetController();

            customerService.GetAllCustomerAsync(Arg.Any<GetAllCustomersCriteria>()).Returns(users);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extentions);

            // Act
            var actual = await controller.GetAllSetting();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var extentionsJson = (IEnumerable<SettingRelation>)jsonResult.Value.GetType().GetProperty("extentions").GetValue(jsonResult.Value);
            var usersJson = (IEnumerable<Models.Customer.UserInfo>)jsonResult.Value.GetType().GetProperty("users").GetValue(jsonResult.Value);

            Assert.Equal(extentions, extentionsJson);
            Assert.Equal(users, usersJson);
        }

        [Fact]
        public async Task GetRelatedPicsByCustId_WhenCalled_ReturnExpectedJsonResult()
        {
            var fixture = new Fixture();
            var criteria = fixture.Create<GetRelatedPicsCriteria>();
            var relatedPics = fixture.Create<IEnumerable<PicInfo>>();
            var controller = GetController();

            remarkService.GetRelatedPicByCustIdAsync(criteria).Returns(relatedPics);

            var actual = await controller.GetRelatedPicsByCustId(criteria);
            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Equal(relatedPics, jsonResult.Value);
        }

        [Fact]
        public async Task GetNewRemarks_WhenCalled_ReturnExpectedJsonResult()
        {
            var fixture = new Fixture();
            var newRemarks = fixture.Create<ValueTuple<IEnumerable<RemarkNewInfo>, IEnumerable<RemarkDateFilter>>>();
            var criteria = fixture.Create<GetNewRemarkCriteria>();

            var controller = GetController();

            remarkService.GetNewRemarkAsync(Arg.Any<GetNewRemarkCriteria>()).Returns(newRemarks);

            // Act
            var actual = await controller.GetNewRemarks(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var newRemarksJson = (IEnumerable<RemarkNewInfo>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(newRemarks.Item1, newRemarksJson);
            Assert.Equal(criteria.TotalRows, totalItems);
        }

        [Fact]
        public async Task ValidateUsername_WhenCalled_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
            var criteria = fixture.Create<CustomerRemarkNewCheckCriteria>();

            var controller = GetController();

            remarkService.ValidateUsernameAsyn(Arg.Any<CustomerRemarkNewCheckCriteria>()).Returns(relatedCustomers);

            // Act
            var actual = await controller.ValidateUsername(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Equal(relatedCustomers, jsonResult.Value);
        }

        [Fact]
        public async Task Create_WhenCalled_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var commandResult = fixture.Create<CommandResult>();
            var cusInfo = fixture.Create<CustomerPermissionInfo>();
            var criteria = fixture.Create<CreateNewReamarkCommand>();

            var controller = GetController();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            customerService.GetSiteTypeByCustIdAsync(criteria.CustID).Returns(cusInfo);
            permissionService.IsHavingPermissionByPolicyAsync(cusInfo.SitePermission).Returns(true);
            remarkService.CreateNewAsync(Arg.Any<CreateNewReamarkCommand>()).Returns(commandResult);

            // Act
            var actual = await controller.Create(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = Assert.IsType<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult.IsSuccessful, result.IsSuccessful);
        }

        [Fact]
        public async Task Edit_WhenCalled_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var commandResult = fixture.Create<CommandResult>();
            var cusInfo = fixture.Create<CustomerPermissionInfo>();
            var criteria = fixture.Create<EditNewRemarkCommand>();

            var controller = GetController();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            customerService.GetSiteTypeByCustIdAsync(criteria.CustID).Returns(cusInfo);
            permissionService.IsHavingPermissionByPolicyAsync(cusInfo.SitePermission).Returns(true);
            remarkService.EditNewAsync(Arg.Any<EditNewRemarkCommand>()).Returns(commandResult);

            // Act
            var actual = await controller.Edit(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = Assert.IsType<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult.IsSuccessful, result.IsSuccessful);
        }

        [Fact]
        public async Task Delete_WhenCalled_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var commandResult = fixture.Create<CommandResult>();
            var criteria = fixture.Create<DeleteNewRemarkCommand>();

            var controller = GetController();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            remarkService.DeleteNewAsync(Arg.Any<DeleteNewRemarkCommand>()).Returns(commandResult);

            // Act
            var actual = await controller.Delete(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Equal(commandResult, jsonResult.Value);
        }

        [Fact]
        public async Task GetNewRemarkHistory_WhenCalled_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var history = fixture.Create<IEnumerable<RemarkNewHistory>>();
            var criteria = fixture.Create<GetCustomerRemarkNewHistoryCriteria>();

            var controller = GetController();

            remarkService.GetCustomerNewRemarkHistoryAsync(Arg.Any<GetCustomerRemarkNewHistoryCriteria>()).Returns(history);

            // Act
            var actual = await controller.GetNewRemarkHistory(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var historyJson = (IEnumerable<RemarkNewInfo>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(history, historyJson);
            Assert.Equal(criteria.TotalRows, totalItems);
        }

        #region helper

        private NewRemarkController GetController()
        {
            permissionService = Substitute.For<IPermissionService>();
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            settingService = Substitute.For<ISettingService>();
            commonService = Substitute.For<ICommonService>();
            remarkService = Substitute.For<IRemarkService>();
            customerService = Substitute.For<ICustomerService>();

            return new NewRemarkController(
                napSession,
                napSettings,
                permissionService,
                remarkService,
                settingService,
                commonService,
                customerService
           );
        }

        #endregion helper
    }
}