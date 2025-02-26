namespace CRM.Controllers.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.HeadlineNotification;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Announcement;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models;
    using CRM.Models.Announcement;
    using CRM.Services;
    using CRM.Services.Interfaces;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class AnnouncementControllerTests
    {
        private IAnnouncementService announcementService;
        private INapSession napSession;
        private ISettingService settingService;
        private IWebHostEnvironment hostingEnvironment;
        private ISendAnnouncementService sendAnnouncementService;

        private readonly Fixture fixture = new Fixture();

        [Fact]
        public async Task GetAnnouncementTemplate_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var notificationTemplates = fixture.Create<IEnumerable<NotificationTemplate>>();
            var contents = fixture.Create<IEnumerable<ContentLanguage>>();
            var expectTupe = new ValueTuple<IEnumerable<NotificationTemplate>, IEnumerable<ContentLanguage>>(notificationTemplates, contents);
            var controller = GetController();
            announcementService.GetAnnouncementTemplateAsync().Returns(expectTupe);

            // Act
            var result = await controller.GetAnnouncementTemplate() as JsonResult;
            var notificationTemplatesJson = (IEnumerable<NotificationTemplate>)result.Value.GetType().GetProperty("notificationTemplates").GetValue(result.Value);
            var contentsJson = (IEnumerable<ContentLanguage>)result.Value.GetType().GetProperty("contents").GetValue(result.Value);

            // Assert
            Assert.Equal(notificationTemplates, notificationTemplatesJson);
            Assert.Equal(contents, contentsJson);
        }

        [Fact]
        public async Task GetAnnouncement_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetAnnouncementCriteria>();
            var announcements = fixture.CreateMany<AnnouncementInfo>().ToList();
            announcementService.GetAnnouncementAsync(criteria).Returns(announcements);

            // Act
            var result = await controller.GetAnnouncement(criteria) as JsonResult;
            var data = result.Value.GetType().GetProperty("data").GetValue(result.Value) as IEnumerable<AnnouncementInfo>;
            var totalItems = (int)result.Value.GetType().GetProperty("TotalItems").GetValue(result.Value);

            // Assert
            Assert.Equal(announcements, data);
            Assert.Equal(criteria.TotalRows, totalItems);
            await announcementService.Received(1).GetAnnouncementAsync(criteria);
        }

        [Fact]
        public async Task AllSetting_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var sites = fixture.Create<IEnumerable<CRM.Models.PicAndHeadline.SiteInfo>>();
            var currencies = fixture.Create<IEnumerable<BaseModel>>();
            var expectedSetting = new
            {
                SiteList = sites,
                CurrencyList = currencies.OrderBy(c => c.Name)
            };
            settingService.GetSystemSiteAsync(Arg.Any<GetSystemSiteCriteria>()).Returns(sites);
            settingService.GetCurrencyAsync().Returns(currencies);

            // Act
            var result = await controller.AllSetting() as JsonResult;
            var currencyListJson = (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("CurrencyList").GetValue(result.Value);
            var siteListJson = (IEnumerable<CRM.Models.PicAndHeadline.SiteInfo>)result.Value.GetType().GetProperty("SiteList").GetValue(result.Value);

            // Assert
            Assert.Equal(expectedSetting.SiteList, siteListJson);
            Assert.Equal(expectedSetting.CurrencyList, currencyListJson);
            await settingService.Received(1).GetSystemSiteAsync(Arg.Any<GetSystemSiteCriteria>());
            await settingService.Received(1).GetCurrencyAsync();
        }

        [Fact]
        public async Task SaveFilesAndCreate_ExpectWhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            byte[] fileBytes = new byte[128];

            IFormFile file = new FormFile(
                baseStream: new MemoryStream(fileBytes),
                baseStreamOffset: 0,
                length: fileBytes.Length,
                name: "myFile",
                fileName: "myFile.txt");

            var command = new CreateAnnouncementCommand
            {
                AnnouncementId = 1,
                FormFile = new List<IFormFile> { file }
            };
            var commandResult = new CommandResult { Code = 0 };
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            controller.ControllerContext.HttpContext = clientIP;
            announcementService.NewAnnouncementAsync(command).Returns(commandResult);

            // Act
            var result = await controller.SaveFilesAndCreate(command) as JsonResult;
            var commandResultJson = result.Value;

            // Assert
            Assert.Equal(commandResult, commandResultJson);
        }

        [Fact]
        public async Task SendMessageAnnouncementToBotEndpoint_ExpectWhenCalled_ExpectCallExactFunction()
        {
            // Arrange
            var controller = GetController();

            // Act
            var result = await controller.SendMessageAnnouncementToBotEndpoint();

            // Assert
            await sendAnnouncementService.Received(1).ScanSendAndUpateAnnouncementNotification();
        }

        [Fact]
        public async Task Edit_ExpectWhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            byte[] fileBytes = new byte[128];

            IFormFile file = new FormFile(
                baseStream: new MemoryStream(fileBytes),
                baseStreamOffset: 0,
                length: fileBytes.Length,
                name: "myFile",
                fileName: "myFile.txt");
            var command = new EditAnnouncementCommand
            {
                AnnouncementId = 1,
                FormFile = new List<IFormFile> { file }
            };
            var commandResult = new CommandResult { Code = 0 };
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            controller.ControllerContext.HttpContext = clientIP;
            announcementService.EditAnnouncementAsync(command).Returns(commandResult);

            // Act
            var result = await controller.Edit(command) as JsonResult;
            var commandResultJson = result.Value;

            // Assert
            Assert.Equal(commandResult, commandResultJson);
        }

        [Fact]
        public async Task GetAnnouncementById_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var announcements = fixture.Create<IEnumerable<AnnouncementDetail>>();
            var contents = fixture.Create<IEnumerable<ContentInfo>>();
            var expectTupe = new ValueTuple<IEnumerable<AnnouncementDetail>, IEnumerable<ContentInfo>>(announcements, contents);
            announcementService.GetContentByIdAsync(Arg.Any<int>()).Returns(expectTupe);

            // Act
            var result = await controller.GetAnnouncementById(1) as JsonResult;
            var dataJson = result.Value.GetType().GetProperty("data").GetValue(result.Value) as IEnumerable<AnnouncementDetail>;
            var contentsJson = result.Value.GetType().GetProperty("contents").GetValue(result.Value) as IEnumerable<ContentInfo>;

            // Assert
            Assert.Equal(announcements, dataJson);
            Assert.Equal(contents, contentsJson);
        }

        [Fact]
        public async Task ValidateAnnouncement_WhenCalled_ExpectReturnsCommand()
        {
            // Arrange
            var controller = GetController();
            var announcements = fixture.Create<IEnumerable<AnnouncementDetail>>();
            byte[] fileBytes = new byte[128];
            IFormFile file = new FormFile(
                baseStream: new MemoryStream(fileBytes),
                baseStreamOffset: 0,
                length: fileBytes.Length,
                name: "myFile",
                fileName: "myFile.txt");
            var command = new ValidateAnnouncementCommand
            {
                FormFile = new List<IFormFile> { file }
            };
            var commandResult = fixture.Create<CommandResult>();

            var expectTupe = new ValueTuple<IEnumerable<AnnouncementDetail>, CommandResult>(announcements, commandResult);
            announcementService.ValidateAnnouncementAsync(command).Returns(expectTupe);

            // Act
            var result = await controller.ValidateAnnouncement(command) as JsonResult;
            var commandResultJson = result.Value as CommandResult;

            // Assert
            Assert.Equal(commandResult, commandResultJson);
        }

        [Fact]
        public async Task ValidateAnnouncement_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var announcements = fixture.Create<IEnumerable<AnnouncementDetail>>();
            byte[] fileBytes = new byte[128];
            IFormFile file = new FormFile(
                baseStream: new MemoryStream(fileBytes),
                baseStreamOffset: 0,
                length: fileBytes.Length,
                name: "myFile",
                fileName: "myFile.txt");
            var command = new ValidateAnnouncementCommand
            {
                FormFile = new List<IFormFile> { file }
            };
            var commandResult = fixture.Create<CommandResult>();
            commandResult.Code = 0;

            var expectTupe = new ValueTuple<IEnumerable<AnnouncementDetail>, CommandResult>(announcements, commandResult);
            announcementService.ValidateAnnouncementAsync(command).Returns(expectTupe);

            // Act
            var result = await controller.ValidateAnnouncement(command) as JsonResult;
            var announcementJson = result.Value as IEnumerable<AnnouncementDetail>;

            // Assert
            Assert.Equal(announcements, announcementJson);
        }

        #region helper

        private AnnouncementController GetController()
        {
            announcementService = Substitute.For<IAnnouncementService>();
            napSession = Substitute.For<INapSession>();
            settingService = Substitute.For<ISettingService>();
            hostingEnvironment = Substitute.For<IWebHostEnvironment>();
            sendAnnouncementService = Substitute.For<ISendAnnouncementService>();
            return new AnnouncementController(
                announcementService,
                napSession,
                settingService,
                hostingEnvironment,
                sendAnnouncementService
            );
        }

        #endregion helper
    }
}