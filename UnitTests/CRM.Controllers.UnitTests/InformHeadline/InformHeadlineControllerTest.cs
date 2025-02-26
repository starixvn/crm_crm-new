namespace CRM.Controllers.UnitTests.InformHeadline
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.InformHeadline;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.InformHeadline;
    using CRM.Models;
    using CRM.Models.InformHeadline;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.InformHeadline;
    using CRM.ViewModels.InformHeadline;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class InformHeadlineControllerTest
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private IBaseService baseService;
        private ISettingService settingService;
        private IExportExcelService excelService;
        private IInformHeadlineService informHeadlineService;
        private IPermissionService permissionService;


        [Fact]
        public async Task GetInforms_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var informs = fixture.Create<IEnumerable<InformHeadlineModel>>();
            var controller = GetController();
            informHeadlineService.GetInformAsync().Returns(informs);

            // Act
            var result = await controller.GetInforms();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<InformHeadlineModel>>(jsonResult.Value);
            Assert.Equal(informs, actual);
        }

        [Fact]
        public async Task ExportInforms_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var fileName = $"InformHeadlines.xlsx";
            var informs = fixture.Create<IEnumerable<InformHeadlineModel>>();
            var controller = GetController();
            informHeadlineService.GetInformAsync().Returns(informs);

            // Act
            var result = await controller.ExportInforms();

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        [Fact]
        public async Task GetTitleDetail_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var title = fixture.Create<InformTitleDetail>();
            var param = fixture.Create<int>();
            var controller = GetController();
            informHeadlineService.GetTitleDetailAsync(param).Returns(title);

            // Act
            var result = await controller.GetTitleDetail(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<InformTitleDetail>(jsonResult.Value);
            Assert.Equal(title, actual);
        }

        [Fact]
        public async Task GetContactInformSettings_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var filterStatuses = fixture.Create<IEnumerable<InformStatus>>();
            var productStatuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            var stations = fixture.Create<IEnumerable<Station>>();
            var statuses = fixture.Create<IEnumerable<InformStatus>>();
            var controller = GetController();
            informHeadlineService.GetInformStatusesAsync(true).Returns(filterStatuses);
            settingService.GetStatusAsync(ViewTypeConstants.InformHeadline).Returns(productStatuses);
            settingService.GetStations().Returns(stations);
            informHeadlineService.GetInformStatusesAsync().Returns(statuses);

            // Act
            var result = await controller.GetContactInformSettings();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var contactInformSettings = (CreateInformHeadlineViewModel)jsonResult.Value;
            Assert.Equal(filterStatuses, contactInformSettings.FilterStatuses);
            Assert.Equal(productStatuses, contactInformSettings.ProductStatuses);
            Assert.Equal(stations, contactInformSettings.Stations);
            Assert.Equal(statuses, contactInformSettings.Statuses);
        }

        [Fact]
        public async Task GetContactInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var contactInforms = fixture.Create<IEnumerable<EditInform>>();
            var param = fixture.Create<GetContactInformParam>();
            var controller = GetController();
            informHeadlineService.GetContactInformsAsync(param).Returns(contactInforms);

            // Act
            var result = await controller.GetContactInforms(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<EditInform>>(jsonResult.Value);
            Assert.Equal(contactInforms, actual);
        }

        [Fact]
        public async Task UpdateContactInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditContactInformsCommand>();
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

            // Act
            var result = await controller.EditContactInforms(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        [Fact]
        public async Task ExportContactInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fileName = $"ContactInformHeadlines.xlsx";
            var contactInforms = fixture.Create<IEnumerable<EditInform>>();
            var param = fixture.Create<GetContactInformParam>();
            var title = fixture.Create<InformTitleDetail>();
            var controller = GetController();
            informHeadlineService.GetContactInformsAsync(param).Returns(contactInforms);
            informHeadlineService.GetTitleDetailAsync(param.TitleId).Returns(title);

            // Act
            var result = await controller.ExportContactInforms(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var currencies = fixture.Create<IEnumerable<BaseModel>>();
            var productStatuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            var sites = new List<SiteInfo> {
                new SiteInfo {Id = 1, Name ="1000", IsLicensee = true, IsActive = true, ChildSites = null },
            };
            var stations = fixture.Create<IEnumerable<Station>>();
            var statuses = fixture.Create<IEnumerable<InformStatus>>();

            var controller = GetController();
            settingService.GetCurrencyAsync().Returns(currencies);
            settingService.GetStatusAsync(ViewTypeConstants.InformHeadline).Returns(productStatuses);
            settingService.GetAllSitesWithGroupInformHeadlineAsync().Returns(sites);
            settingService.GetStations().Returns(stations);
            informHeadlineService.GetInformStatusesAsync().Returns(statuses);

            // Act
            var result = await controller.GetAllSettings();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var allSettings = (CreateInformHeadlineViewModel)jsonResult.Value;
            Assert.Equal(currencies, allSettings.Currencies);
            Assert.Equal(productStatuses, allSettings.ProductStatuses);
            Assert.Equal(stations, allSettings.Stations);
            Assert.Equal(statuses, allSettings.Statuses);
        }

        [Fact]
        public async Task GetEditInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var editInforms = fixture.Create<IEnumerable<EditInform>>();
            var param = fixture.Create<GetEditInformParam>();
            var controller = GetController();
            informHeadlineService.GetEditInformsAsync(param).Returns(editInforms);

            // Act
            var result = await controller.GetEditInforms(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<EditInform>>(jsonResult.Value);
            Assert.Equal(editInforms, actual);
        }

        [Fact]
        public async Task UpdateEditInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditInformsCommand>();
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

            // Act
            var result = await controller.EditInforms(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        [Fact]
        public async Task ExportEditInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fileName = $"UpdateInformHeadlines.xlsx";
            var editInforms = fixture.Create<IEnumerable<EditInform>>();
            var param = fixture.Create<GetEditInformParam>();
            var title = fixture.Create<InformTitleDetail>();
            var controller = GetController();
            informHeadlineService.GetEditInformsAsync(param).Returns(editInforms);
            informHeadlineService.GetTitleDetailAsync(param.TitleId).Returns(title);

            // Act
            var result = await controller.ExportEditInforms(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        [Fact]
        public async Task GetRemovedAccountLogs_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var removedAccountLogs = fixture.Create<(IEnumerable<RemovedAccountLog>,int)>();
            var param = fixture.Create<GetRemovedAccountLogParam>();
            var controller = GetController();
            informHeadlineService.GetRemovedAccountLogAsync(param).Returns(removedAccountLogs);

            // Act
            var result = await controller.GetRemovedAccountLogs(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var item = (IEnumerable<RemovedAccountLog>)jsonResult.Value.GetType().GetProperty("item").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(removedAccountLogs.Item1, item);
            Assert.Equal(removedAccountLogs.Item2, totalItems);
        }

        [Fact]
        public async Task GetRemovedAccountLogDetails_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var removedAccountDetailLogs = fixture.Create<(IEnumerable<RemovedAccountLogDetail>, int)>();
            var param = fixture.Create<GetRemovedAccountLogDetailParam>();
            var controller = GetController();
            informHeadlineService.GetRemovedAccountLogDetailAsync(param).Returns(removedAccountDetailLogs);

            // Act
            var result = await controller.GetRemovedAccountLogDetails(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var item = (IEnumerable<RemovedAccountLogDetail>)jsonResult.Value.GetType().GetProperty("item").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(removedAccountDetailLogs.Item1, item);
            Assert.Equal(removedAccountDetailLogs.Item2, totalItems);
        }

        [Fact]
        public async Task GetNewInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var newInforms = fixture.Create<IEnumerable<NewInform>>();
            var param = fixture.Create<GetNewInformParam>();
            var controller = GetController();
            informHeadlineService.GetNewInformsAsync(param).Returns(newInforms);

            // Act
            var result = await controller.GetNewInforms(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<NewInform>>(jsonResult.Value);
            Assert.Equal(newInforms, actual);
        }

        [Fact]
        public async Task InsertInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var command = fixture.Create<InsertInformHeadlinesCommand>();
            command.ErrCode = 100;
            command.ErrMsg = "haha";
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

            // Act
            await controller.InsertInforms(command);

            // Assert
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
        }

        [Fact]
        public async Task UpdateInformStatus_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditInformStatusCommand>();
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

            // Act
            var result = await controller.EditInformStatus(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        [Fact]
        public async Task ExportNewInforms_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fileName = $"NewInformHeadlines.xlsx";
            var newInforms = fixture.Create<IEnumerable<NewInform>>();
            var param = fixture.Create<GetNewInformParam>();
            var controller = GetController();
            informHeadlineService.GetNewInformsAsync(param).Returns(newInforms);

            // Act
            var result = await controller.ExportNewInforms(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        private InformHeadlineController GetController()
        {
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            excelService = Substitute.For<IExportExcelService>();
            informHeadlineService = Substitute.For<IInformHeadlineService>();
            permissionService = Substitute.For<IPermissionService>();
            
            return new InformHeadlineController(napSession,baseService,settingService,excelService,informHeadlineService, permissionService);
        }
    }
}
