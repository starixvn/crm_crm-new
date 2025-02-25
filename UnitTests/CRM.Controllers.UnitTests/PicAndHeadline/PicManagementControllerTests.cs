namespace CRM.Controllers.UnitTests.PicAndHeadline
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Setting;
    using CRM.Services;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using NSubstitute;
    using Xunit;

    public class PicManagementControllerTests
    {
        private INapSession napSession;
        private ISettingService settingService;
        private IPicManagementService picManagementService;
        private IExportExcelService excelService;


        [Fact]
        public async Task GetReport_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var templates = fixture.Create<PicReport>();
            var param = fixture.Create<GetReportCriteria>();
            param.TotalRows = templates.Total;
            var controller = GetController();
            picManagementService.GetReportAsync(param).Returns(templates);

            // Act
            var result = await controller.GetReport(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var picTemplates = (IList<PicInfo>)jsonResult.Value.GetType().GetProperty("DataList").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("Total").GetValue(jsonResult.Value);
            Assert.Equal(templates.DataList, picTemplates);
            Assert.Equal(param.TotalRows, totalItems);
        }

        [Fact]
        public async Task GetAllSetting_WhenCalled_ReturnExpectedJsonResult()
        {
            // Arrange
            var roleList = new List<Setting>();
            var picList = new List<Setting>();
            var communicationTools = new List<Setting>();
            var languages = new List<Setting>();
            var countries = new List<Country>();

            var expected = new
            {
                RoleListWithInActive = roleList,
                RoleList = roleList.Where(role => role.IsActive),
                PicTypeList = picList,
                CommunicationTools = communicationTools,
                Languages = languages,
                Countries = countries
            };
            var controller = GetController();

            settingService.GetSettingAsync(SettingName.PicRole).Returns(roleList);
            settingService.GetSettingAsync(SettingName.PicType, true).Returns(picList);
            settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(communicationTools);
            settingService.GetSettingAsync(SettingName.Language, true).Returns(languages);

            settingService.GetCountryAsync(SettingConstants.Active).Returns(countries);

            // Act
            var actual = await controller.GetAllSetting();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Equal(JsonConvert.SerializeObject(expected), JsonConvert.SerializeObject(jsonResult.Value));
        }

        [Fact]
        public async Task CreatePic_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<CreatePicCriteria>();
            var expected = fixture.Create<CommandResult>();
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };
            picManagementService.CreatePicAsync(criteria).Returns(expected);

            // Act
            var actual = await controller.CreatePic(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task EditPic_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<EditPicCriteria>();
            var expected = fixture.Create<CommandResult>();
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };
            picManagementService.EditPicAsync(criteria).Returns(expected);

            // Act
            var actual = await controller.EditPic(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task ChangePicState_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<ChangePicStateCriteria>();
            var expected = fixture.Create<CommandResult>();
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };
            picManagementService.ChangePicStateAsync(criteria).Returns(expected);

            // Act
            var actual = await controller.ChangePicState(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task ExportExcel_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fixture = new Fixture();
            var templates = fixture.Create<PicReport>();
            var param = fixture.Create<GetReportCriteria>();
            var communicationTools = new List<Setting>();
            var fileName = "PIC Management";
            var expected = fixture.Create<byte[]>();
            var controller = GetController();
            picManagementService.GetReportAsync(param).Returns(templates);
            settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(communicationTools);
            excelService.ExportPICManagement(Arg.Any<IEnumerable<BaseModel>>(), templates).Returns(expected);

            // Act
            var result = await controller.ExportExcel(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
        }

        [Fact]
        public async Task ValidateEditPic_WhenCalled_ReturnExpectedString()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<ValidateEditPicCriteria>();
            var expected = fixture.Create<string>();
            var controller = GetController();
            picManagementService.ValidateEditPicAsync(criteria).Returns(expected);

            // Act
            var actual = await controller.ValidateEditPic(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = Assert.IsAssignableFrom<string>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        #region Helpers

        private PicManagementController GetController()
        {
            napSession = Substitute.For<INapSession>();
            settingService = Substitute.For<ISettingService>();
            picManagementService = Substitute.For<IPicManagementService>();
            excelService = Substitute.For<IExportExcelService>();
            return new PicManagementController(napSession, settingService, picManagementService, excelService);
        }

        #endregion Helpers
    }
}