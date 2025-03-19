namespace CRM.Controllers.UnitTests.PicAndHeadline;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using Controllers.PicAndHeadline;
using CRM.Criteria.PicAndHeadline;
using CRM.Models;
using CRM.Models.PicAndHeadline;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using Enum;
using Extensions.XML;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class PicAssignmentControllerTests
{
    private ISettingService settingService;
    private IBaseService baseService;
    private INapSession napSession;
    private IPicAssignmentService picAssignmentService;
    private IExportExcelService excelService;
    private IPermissionService permissionService;
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public async Task AllSetting_WhenCalled_ReturnsExpectedSettings()
    {
        // Arrange
        var controller = GetController();
        var sites = new List<Models.PicAndHeadline.SiteInfo>();
        var currencies = fixture.Create<IEnumerable<BaseModel>>();
        var positions = new List<Setting> { new() { Id = 1, Name = "Name" } };
        var pics = fixture.Create<IEnumerable<PicInfo>>();
        var headlines = fixture.Create<IEnumerable<BaseModel>>();
        var statuses = Enum.GetValues(typeof(CustomerStatus)).Cast<CustomerStatus>().Select(status => status.ToString());
        var headlineTypeIds = Enum.GetValues(typeof(HeadlineType)).Cast<HeadlineType>().Select(status => (int)status);
        var headlineTypeNames = Enum.GetValues(typeof(HeadlineType)).Cast<HeadlineType>().Select(status => status.ToString());
        picAssignmentService.GetSystemSiteAsync(Arg.Any<GetSystemSiteCriteria>()).Returns(sites);
        settingService.GetCurrencyAsync().Returns(currencies);
        settingService.GetPositions(true).Returns(positions);
        baseService.GetDataAsync<PicInfo>(Arg.Any<GetPICCriteria>()).Returns(pics);
        baseService.GetDataAsync<BaseModel>(Arg.Any<GetHeadlinesCriteria>()).Returns(headlines);

        // Action
        var result = await controller.AllSetting() as JsonResult;
        var headlindTypes = (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("HeadlineTypeList").GetValue(result.Value);

        // Assert
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
        var assignment = new List<PICAssignmentInfo>
        {
            new()
            {
                PIC = pics,
                DefaultPIC = null,
                PicList = new List<PicModel>(),
                PicForMapping = defaultPics,
                DefaultPicList = new List<PicModel>()
            }
        };
        var assignmentCommunication = fixture.Create<IEnumerable<AssignmentCommunication>>();
        var tupe = new ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>(assignment, assignmentCommunication);
        var communicationTools = new List<Setting>();
        settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(communicationTools);
        baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(tupe);

        var data = tupe.Item1
            .OrderBy(i => i.HeadlineName, StringComparer.Ordinal)
            .ThenByDescending(p => p.PicList?.Count)
            .ThenBy(p => p.PicList != null)
            .ThenBy(o => o.PicForMapping)
            .ThenBy(i => i.DirectAccount, StringComparer.Ordinal);

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
        var assignment = new List<PICAssignmentInfo>
        {
            new()
            {
                PIC = null,
                DefaultPIC = null,
                PicList = new List<PicModel>(),
                PicForMapping = string.Empty,
                DefaultPicList = new List<PicModel>()
            }
        };
        var assignmentCommunication = fixture.Create<IEnumerable<AssignmentCommunication>>();
        var tupe = new ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>(assignment, assignmentCommunication);
        var communicationTools = new List<Setting>();
        settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(communicationTools);
        baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(tupe);

        var data = tupe.Item1
            .OrderBy(i => i.HeadlineName, StringComparer.Ordinal)
            .ThenByDescending(p => p.PicList?.Count)
            .ThenBy(p => p.PicList != null)
            .ThenBy(o => o.PicForMapping)
            .ThenBy(i => i.DirectAccount, StringComparer.Ordinal);

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
        var assignment = new List<PICAssignmentInfo>
        {
            new()
            {
                PIC = null,
                DefaultPIC = null,
                PicList = new List<PicModel>(),
                PicForMapping = string.Empty,
                DefaultPicList = new List<PicModel>()
            }
        };
        var assignmentCommunication = fixture.Create<IEnumerable<AssignmentCommunication>>();
        var tupe = new ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>(assignment, assignmentCommunication);
        var communicationTools = new List<Setting>();
        settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(communicationTools);
        baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(tupe);

        var data = tupe.Item1.OrderBy(i => i.HeadlineName, StringComparer.Ordinal);

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
        var assignment = new List<PICAssignmentInfo>
        {
            new()
            {
                PIC = null,
                DefaultPIC = null,
                PicList = new List<PicModel>(),
                PicForMapping = string.Empty,
                DefaultPicList = new List<PicModel>()
            }
        };
        var assignmentCommunication = fixture.Create<IEnumerable<AssignmentCommunication>>();
        var tupe = new ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>(assignment, assignmentCommunication);
        var communicationTools = new List<Setting>();
        settingService.GetSettingAsync(SettingName.PicCommunicationTool, true).Returns(communicationTools);
        baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(tupe);

        var data = tupe.Item1.OrderBy(i => i.HeadlineName).ThenBy(i => i.DirectAccount);

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
        var assignment = new List<PICAssignmentInfo>
        {
            new()
            {
                PIC = null,
                DefaultPIC = null,
                PicList = new List<PicModel>(),
                PicForMapping = string.Empty,
                DefaultPicList = new List<PicModel>()
            }
        };
        var assignmentCommunication = fixture.Create<IEnumerable<AssignmentCommunication>>();
        var tupe = new ValueTuple<IEnumerable<PICAssignmentInfo>, IEnumerable<AssignmentCommunication>>(assignment, assignmentCommunication);
        baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(Arg.Do<GetAssignmentCriteria>(x => criteria = x)).Returns(tupe);
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
        permissionService = Substitute.For<IPermissionService>();
        picAssignmentService = Substitute.For<IPicAssignmentService>();
        excelService = Substitute.For<IExportExcelService>();
        return new PicAssignmentController(
            settingService,
            baseService,
            napSession,
            permissionService,
            picAssignmentService,
            excelService);
    }

    #endregion Helpers
}