namespace CRM.Controllers.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.HeadlineNotification;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.NotificationType;
    using CRM.Criteria.SMAPersonalMessage;
    using CRM.Models.NotificationType;
    using CRM.Models.SMAPersonalMessage;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class SMAPersonalMessageControllerTests
    {
        private INapSession napSession;
        private IBaseService baseService;
        private ICommonService commonService;
        private readonly Fixture fixture = new Fixture();

        [Fact]
        public async Task GetGridData_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var controller = GetController();
            var sMAMessageInfors = fixture.Create<IEnumerable<SMAMessageInfor>>();
            var criteria = fixture.Create<GetPersonalMessageCriteria>();
            var dateTimeClient =  new DateTime(2023, 04, 14);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(dateTimeClient);
            baseService.GetDataAsync<SMAMessageInfor>(Arg.Do<GetPersonalMessageCriteria>(x => criteria = x)).Returns(sMAMessageInfors);

            // Act
            var result = await controller.GetGridData(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var sMAMessageInforsResult = (IEnumerable<SMAMessageInfor>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(sMAMessageInfors, sMAMessageInforsResult);
            Assert.Equal(criteria.TotalRows, totalItems);
        }

        [Fact]
        public async Task CheckValidUsername_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var controller = GetController();
            var commandResult = fixture.Create<CommandResult>();
            var command = fixture.Create<CheckValidUsernameCommand>();
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.CheckValidUsername(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var data = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            Assert.Equal(data, commandResult);
        }

        [Fact]
        public async Task Delete_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var controller = GetController();
            var commandResult = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            var command = new DeletePersonalMessageCommand
            {
                MessageID = 1,
                IP = clientIP.ToString()
            };
            
            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(Arg.Do<DeletePersonalMessageCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.Delete(1);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(jsonResult.Value, commandResult);
        }

        [Fact]
        public async Task CreateNewMessage_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var controller = GetController();
            var commandResult = fixture.Create<CommandResult>();
            var command = fixture.Create<AddPersonalMessageCommand>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.CreateNewMessage(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(jsonResult.Value, commandResult);
            Assert.Equal(napSession.UserId, command.Creator);
            Assert.Equal("1.0.0.0", command.IP);
        }

        private SMAPersonalMessageController GetController()
        {
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            commonService = Substitute.For<ICommonService>();
            return new SMAPersonalMessageController(napSession, baseService, commonService);
        }
    }
}
