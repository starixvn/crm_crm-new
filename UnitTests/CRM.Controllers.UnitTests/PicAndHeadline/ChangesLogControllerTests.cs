namespace CRM.Controllers.UnitTests.PicAndHeadline;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Controllers.PicAndHeadline;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services;
using Xunit;

public class ChangesLogControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;

    [Fact]
    public async Task GetHeadlineDAReportAsync_WhenCalled_ReturnExpectedJsonResult()
    {
        // Arrange
        fixture.Customize<GetHeadlineDALogCriteria>(composer =>
            composer.With(p => p.PageIndex, 0).With(p => p.PageSize, 100));
        var logInfo = fixture.Create<IEnumerable<ChangeHeadlineDALog>>();
        var criteria = fixture.Create<GetHeadlineDALogCriteria>();
        var controler = GetController();

        baseService.GetDataAsync<ChangeHeadlineDALog>(Arg.Do<GetHeadlineDALogCriteria>(x => criteria = x)).Returns(logInfo);

        // Act
        var actual = await controler.GetHeadlineDAReport(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(actual);
        var data = (IEnumerable<ChangeHeadlineDALog>)jsonResult.Value.GetType().GetProperty("logInfo").GetValue(jsonResult.Value);
        var totals = (int)jsonResult.Value.GetType().GetProperty("totals").GetValue(jsonResult.Value);
        Assert.Equal(logInfo, data);
        Assert.Equal(criteria.TotalRows, totals);
    }

    [Fact]
    public async Task GetPicReportAsync_WhenCalled_ReturnExpectedJsonResult()
    {
        // Arrange
        fixture.Customize<GetPicLogCriteria>(composer =>
            composer.With(p => p.PageIndex, 0).With(p => p.PageSize, 100));
        var picInfo = fixture.Create<IEnumerable<ChangePicLogInfo>>();
        var criteria = fixture.Create<GetPicLogCriteria>();
        var controler = GetController();

        baseService.GetDataAsync<ChangePicLogInfo>(Arg.Do<GetPicLogCriteria>(x => criteria = x)).Returns(picInfo);

        // Act
        var actual = await controler.GetPicReport(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(actual);
        var data = (IEnumerable<ChangePicLogInfo>)jsonResult.Value.GetType().GetProperty("picInfo").GetValue(jsonResult.Value);
        var totals = (int)jsonResult.Value.GetType().GetProperty("totals").GetValue(jsonResult.Value);
        Assert.Equal(picInfo, data);
        Assert.Equal(criteria.TotalRows, totals);
    }

    [Fact]
    public async Task GetActionTypesAsync_WhenCalled_ReturnExpectedJsonResult()
    {
        // Arrange
        var actionTypes = fixture.Create<IEnumerable<ActionType>>();
        var controler = GetController();

        baseService.GetDataAsync<ActionType>(Arg.Any<GetActionTypeCriteria>()).Returns(actionTypes);

        // Act
        var actual = await controler.GetActionTypes();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(actual);
        var data = (IEnumerable<ActionType>)jsonResult.Value;
        Assert.Equal(actionTypes, data);
    }

    #region Helpers

    private ChangesLogController GetController()
    {
        baseService = Substitute.For<IBaseService>();

        return new ChangesLogController(baseService);
    }

    #endregion Helpers
}