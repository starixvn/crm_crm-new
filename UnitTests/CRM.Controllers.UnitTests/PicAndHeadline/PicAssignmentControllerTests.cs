namespace CRM.Controllers.UnitTests.PicAndHeadline
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class PicAssignmentControllerTests
    {
        private ISettingService settingService;
        private IBaseService baseService;
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private IPicAssignmentService picAssignmentService;
        private IExportExcelService excelService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public void Index_WhenCalled_ReturnsExpectedView()
        {
            // Arrange
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.PICAssignment, Policy.Host).Returns(true);
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.PICManagement, Policy.Read).Returns(true);
            // Action
            var result = controller.Index() as ViewResult;

            // Assert
            Assert.Equal(true, result.ViewData["isHost"]);
            Assert.Equal(true, result.ViewData["isReadPicManagement"]);
        }

        [Fact]
        public async Task AllSetting_WhenCalled_ReturnsExpectedSettings()
        {
            // Arrange
            var controller = GetController();
            var sites = fixture.Create<IEnumerable<SiteInfo>>();
            var currencies = fixture.Create<IEnumerable<BaseModel>>();
            var positions = fixture.Create<IEnumerable<Setting>>();
            var pics = fixture.Create<IEnumerable<PicInfo>>();
            var headlines = fixture.Create<IEnumerable<BaseModel>>();
            var statuses = Enum.GetValues(typeof(CustomerStatus)).Cast<CustomerStatus>().Select(status => status.ToString());
            var headlineTypeIds = Enum.GetValues(typeof(HeadlineType)).Cast<HeadlineType>().Select(status => (int)status);
            var headlineTypeNames = Enum.GetValues(typeof(HeadlineType)).Cast<HeadlineType>().Select(status => status.ToString());
            picAssignmentService.GetSystemSiteAsync(Arg.Any<GetSystemSiteCriteria>()).Returns(sites);
            settingService.GetAllCurrencyAsync(Arg.Any<GetAllCurrencyCriteria>()).Returns(currencies);
            settingService.GetPositions(true).Returns(positions);
            baseService.GetDataAsync<PicInfo>(Arg.Any<GetPICCriteria>()).Returns(pics);
            baseService.GetDataAsync<BaseModel>(Arg.Any<GetHeadlinesCriteria>()).Returns(headlines);

            // Action
            var result = await controller.AllSetting() as JsonResult;
            var headlindTypes = (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("HeadlineTypeList").GetValue(result.Value);

            // Assert
            Assert.Equal(sites, (IEnumerable<SiteInfo>)result.Value.GetType().GetProperty("SiteList").GetValue(result.Value));
            Assert.Equal(currencies.OrderBy(c => c.Name), (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("CurrencyList").GetValue(result.Value));
            Assert.Equal(positions, (IEnumerable<Setting>)result.Value.GetType().GetProperty("PositionList").GetValue(result.Value));
            Assert.Equal(pics, (IEnumerable<PicInfo>)result.Value.GetType().GetProperty("PicList").GetValue(result.Value));
            Assert.Equal(headlines, (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("HeadlineList").GetValue(result.Value));
            Assert.Equal(statuses, (IEnumerable<string>)result.Value.GetType().GetProperty("StatusList").GetValue(result.Value));
            Assert.Equal(headlineTypeIds, headlindTypes.Select(ht => ht.Id));
            Assert.Equal(headlineTypeNames, headlindTypes.Select(ht => ht.Name));
        }

        [Fact]
        public async Task ValidateAssignPic_WhenCalled_ReturnsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var model = fixture.Create<AssignPic>();
            var criteria = new ValidateAssignmentCriteria
            {
                HeadlineId = model.HeadlineId,
                PicId = model.PicIds,
                Username = model.DirectAccountIds
            };

            var tuple = fixture.Create<Tuple<PicAssignmentValidation, IEnumerable<AssignedDirectAccount>>>();
            picAssignmentService.ValidateAssignmentDirectAccountAsync(Arg.Do<ValidateAssignmentCriteria>(x => criteria = x)).Returns(tuple);

            // Action
            var result = await controller.ValidateAssignPic(model) as JsonResult;

            // Assert
            Assert.Equal(criteria.ErrCode == 0, (bool)result.Value.GetType().GetProperty("IsSuccessful").GetValue(result.Value));
            Assert.Equal(criteria.ErrMsg, (string)result.Value.GetType().GetProperty("Message").GetValue(result.Value));
            Assert.Equal(tuple.Item1, (PicAssignmentValidation)result.Value.GetType().GetProperty("ErrorAccounts").GetValue(result.Value));
            Assert.Equal(tuple.Item2, (IEnumerable<AssignedDirectAccount>)result.Value.GetType().GetProperty("AssignedDirectAccounts").GetValue(result.Value));
        }

        [Fact]
        public async Task AssignPIC_WhenCalled_ReturnsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var model = fixture.Create<AssignPic>();
            var expected = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            var command = new AssignPicCommand
            {
                HeadlineId = model.HeadlineId,
                PicId = model.PicIds,
                DirectAccount = model.DirectAccountIds,
                IsKeepAssign = model.IsKeepAssign,
                UserId = napSession.UserId,
                LoginIP = clientIP.Connection.RemoteIpAddress.ToString()
            };

            baseService.ExecuteNonQueryAsync(Arg.Do<AssignPicCommand>(x => command = x)).Returns(expected);

            // Action
            var result = await controller.AssignPIC(model) as JsonResult;

            // Assert
            Assert.Equal(expected, result.Value);
        }

        [Fact]
        public async Task RemoveAssignment_WhenCalled_ReturnsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var model = fixture.Create<IEnumerable<RemoveAssignment>>();
            var expected = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            var command = new RemoveAssignmentCommand
            {
                RemovedPICs = model.ToXML("ROOT").ToString(),
                UserId = napSession.UserId,
                LoginIP = clientIP.Connection.RemoteIpAddress.ToString()
            };

            baseService.ExecuteNonQueryAsync(Arg.Do<RemoveAssignmentCommand>(x => command = x)).Returns(expected);

            // Action
            var result = await controller.RemoveAssignment(model) as JsonResult;

            // Assert
            Assert.Equal(expected, result.Value);
        }

        [Fact]
        public async Task GetAllPICAssignment_HavingNotEmptyPICAndDefaultPIC_ReturnsExpectedList()
        {
            // Arrange
            const string pics = "<ROOT><PIC PicName=\"Oliver_PIC\" Role=\"Boss\" PicID=\"200\" RoleId=\"48001\" /></ROOT>";
            const string defaultPics = "<ROOT><PIC PicName=\"Test_201\" Role=\"Boss\" PicID=\"201\" Order=\"1\" RoleId=\"48001\" /></ROOT>";
            var controller = GetController();
            var criteria = fixture.Create<GetAssignmentCriteria>();
            var assignments = fixture.Create<IEnumerable<PICAssignmentInfo>>();
            baseService.GetDataAsync<PICAssignmentInfo>(criteria).Returns(assignments);
            foreach (var assignment in assignments)
            {
                assignment.PIC = pics;
                assignment.DefaultPIC = defaultPics;
                var listPic = XMLIO.Deserialize<PicModel>(assignment.PIC);
                assignment.PicList = listPic.OrderBy(p => p.Order).ThenBy(a => a.RoleId).ThenBy(r => r.PicName).ToList();
                assignment.PicForMapping = string.Join(",", listPic.Select(pic => pic.PicId));
                assignment.DefaultPicList = XMLIO.Deserialize<PicModel>(assignment.DefaultPIC);
            }

            var data = assignments
                .OrderBy(i => i.HeadlineName)
                .ThenBy(i => i.DirectAccount);

            var expected = data.OrderBy(i => i.HeadlineID == 0).ToList();

            // Action
            var result = await controller.GetAllPICAssignment(criteria) as JsonResult;

            // Assert
            Assert.Equal(expected, (List<PICAssignmentInfo>)result.Value.GetType().GetProperty("Data").GetValue(result.Value));
            Assert.Equal(criteria.TotalRows, (int)result.Value.GetType().GetProperty("TotalItems").GetValue(result.Value));
            Assert.Equal(criteria.TotalUnassigned, (int)result.Value.GetType().GetProperty("TotalUnassignedDirectAccount").GetValue(result.Value));
        }

        [Fact]
        public async Task GetAllPICAssignment_HavingEmptyPICAndDefaultPIC_ReturnsExpectedList()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetAssignmentCriteria>();
            var assignments = fixture.Create<IEnumerable<PICAssignmentInfo>>();
            baseService.GetDataAsync<PICAssignmentInfo>(criteria).Returns(assignments);
            foreach (var assignment in assignments)
            {
                assignment.PIC = null;
                assignment.DefaultPIC = null;
                var listPic = new List<PicModel>();
                assignment.PicList = listPic;
                assignment.PicForMapping = string.Empty;
                assignment.DefaultPicList = listPic;
            }

            var data = assignments
                .OrderBy(i => i.HeadlineName)
                .ThenBy(i => i.DirectAccount);

            var expected = data.OrderBy(i => i.HeadlineID == 0).ToList();

            // Action
            var result = await controller.GetAllPICAssignment(criteria) as JsonResult;

            // Assert
            Assert.Equal(expected, (List<PICAssignmentInfo>)result.Value.GetType().GetProperty("Data").GetValue(result.Value));
            Assert.Equal(criteria.TotalRows, (int)result.Value.GetType().GetProperty("TotalItems").GetValue(result.Value));
            Assert.Equal(criteria.TotalUnassigned, (int)result.Value.GetType().GetProperty("TotalUnassignedDirectAccount").GetValue(result.Value));
        }

        [Fact]
        public async Task GetAllPICAssignment_NotNullPageIndexAndPageSize_ReturnsExpectedList()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetAssignmentCriteria>();
            var assignments = fixture.Create<IEnumerable<PICAssignmentInfo>>();
            baseService.GetDataAsync<PICAssignmentInfo>(criteria).Returns(assignments);
            foreach (var assignment in assignments)
            {
                assignment.PIC = null;
                assignment.DefaultPIC = null;
                var listPic = new List<PicModel>();
                assignment.PicList = listPic;
                assignment.PicForMapping = string.Empty;
                assignment.DefaultPicList = listPic;
            }

            var data = assignments
                .OrderBy(i => i.HeadlineName)
                .ThenBy(i => i.DirectAccount);

            var expected = data.OrderBy(i => i.HeadlineID == 0).ToList();

            // Action
            var result = await controller.GetAllPICAssignment(criteria) as JsonResult;
            var dataList = (List<PICAssignmentInfo>)result.Value.GetType().GetProperty("Data").GetValue(result.Value);

            // Assert
            Assert.Equal(expected.Count, dataList.Count);
            for (var index = 0; index < expected.Count; index++)
            {
                Assert.Equal(index + ((criteria.PageIndex - 1) * criteria.PageSize), dataList[index].RowNum);
            }
        }

        [Fact]
        public async Task GetAllPICAssignment_NullPageIndexOrPageSize_ReturnsExpectedList()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetAssignmentCriteria>();
            criteria.PageSize = null;
            var rawData = new ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>();
            var communicationTools = fixture.Create<IEnumerable<Setting>>();
            settingService.GetAsync(new GetSettingParam { IsActive = true, SettingName = SettingName.PicCommunicationTool, UserRole = Constants.UserRole }).Returns(communicationTools);
            baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(rawData);
            var assignments = fixture.Create<IEnumerable<PICAssignmentInfo>>();
            baseService.GetDataAsync<PICAssignmentInfo>(criteria).Returns(assignments);
            foreach (var assignment in assignments)
            {
                assignment.PIC = null;
                assignment.DefaultPIC = null;
                var listPic = new List<PicModel>();
                assignment.PicList = listPic;
                assignment.PicForMapping = string.Empty;
                assignment.DefaultPicList = listPic;
            }

            var data = assignments
                .OrderBy(i => i.HeadlineName)
                .ThenBy(i => i.DirectAccount);

            var expected = data.OrderBy(i => i.HeadlineID == 0).ToList();

            // Action
            var result = await controller.GetAllPICAssignment(criteria) as JsonResult;
            var dataList = (List<PICAssignmentInfo>)result.Value.GetType().GetProperty("Data").GetValue(result.Value);

            // Assert
            Assert.Equal(expected.Count, dataList.Count);
            for (var index = 0; index < expected.Count; index++)
            {
                Assert.Equal(index, dataList[index].RowNum);
            }
        }

        [Fact]
        public async Task SetDefaultPIC_WhenCalled_ReturnsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var command = fixture.Create<SetDefaultPicCommand>();
            var expected = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(command).Returns(expected);

            // Action
            var result = await controller.SetDefaultPIC(command) as JsonResult;

            // Assert
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal(clientIP.Connection.RemoteIpAddress.ToString(), command.LoginIP);
            Assert.Equal(expected, (CommandResult)result.Value);
        }

        [Fact]
        public async Task RemoveDefaultPIC_WhenCalled_ReturnsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var command = fixture.Create<RemoveDefaultPicCommand>();
            var expected = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(command).Returns(expected);

            // Action
            var result = await controller.RemoveDefaultPIC(command) as JsonResult;

            // Assert
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal(clientIP.Connection.RemoteIpAddress.ToString(), command.LoginIP);
            Assert.Equal(expected, (CommandResult)result.Value);
        }

        [Fact]
        public async Task ExportExcelReport_WhenCalled_ReturnsExpectedFile()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<GetAssignmentCriteria>();
            var picInfo = fixture.Create<ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>>();

            baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(picInfo);
            var expected = fixture.Create<byte[]>();
            excelService.ExportPICAssignment(Arg.Any<IEnumerable<PICAssignmentInfo>>(),
                Arg.Any<IEnumerable<GroupAssignmentCommunication>>(),
                Arg.Any<IEnumerable<Setting>>(),
                Arg.Any<bool>()).Returns(expected);

            // Action
            var result = await controller.ExportExcelReport(criteria) as FileContentResult;

            // Assert
            Assert.Null(criteria.PageIndex);
            Assert.Null(criteria.PageSize);
            Assert.Equal(expected, result.FileContents);
            Assert.Equal(MimeType.XLSX, result.ContentType);
            Assert.Equal($"{ViewResources.PICAssignment}.xlsx", result.FileDownloadName);
        }

        #region Helpers

        private PicAssignmentController GetController()
        {
            settingService = Substitute.For<ISettingService>();
            baseService = Substitute.For<IBaseService>();
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            picAssignmentService = Substitute.For<IPicAssignmentService>();
            excelService = Substitute.For<IExportExcelService>();
            return new PicAssignmentController(
                settingService,
                baseService,
                napSession,
                napSettings,
                userService,
                picAssignmentService,
                excelService);
        }

        #endregion Helpers
    }
}