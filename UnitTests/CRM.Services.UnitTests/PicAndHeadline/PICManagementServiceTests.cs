namespace CRM.Services.UnitTests.PicAndHeadline;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Models;
using NSubstitute;
using Services.PicAndHeadline;
using Xunit;

public class PicManagementServiceTests
{
    private IBaseService baseService;

    [Fact]
    public async Task GetReportAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<GetReportCriteria>();
        var tuple = fixture.Create<ValueTuple<IEnumerable<PicInfo>, IEnumerable<CommunicationTool>>>();
        var service = GetService();
        baseService
            .FetchMultipleAsync<PicInfo, CommunicationTool>(Arg.Do<GetReportCriteria>(x => criteria = x))
            .Returns(tuple);
        foreach (var item in tuple.Item1)
        {
            item.CommunicationTools = tuple.Item2.Where(c => c.PicId == item.PicId).ToList();
        }
        var DataList = tuple.Item1.ToList();
        var expected = new PicReport
        {
            DataList = DataList,
            Total = criteria.TotalRows
        };

        // Act
        var result = await service.GetReportAsync(criteria);

        // Assert
        Assert.Equal(expected.DataList, result.DataList);
        Assert.Equal(expected.Total, result.Total);
    }

    [Fact]
    public async Task CreatePicAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<CreatePicCriteria>();
        var expected = fixture.Create<CommandResult>();

        var service = GetService();
        baseService.ExecuteNonQueryAsync(Arg.Any<CreatePicCriteria>()).Returns(expected);

        // Act
        var result = await service.CreatePicAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task EditPicAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<EditPicCriteria>();
        var expected = fixture.Create<CommandResult>();

        var service = GetService();
        baseService.ExecuteNonQueryAsync(Arg.Any<EditPicCriteria>()).Returns(expected);

        // Act
        var result = await service.EditPicAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task ChangePicStateAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<ChangePicStateCriteria>();
        var expected = fixture.Create<CommandResult>();

        var service = GetService();
        baseService.ExecuteNonQueryAsync(Arg.Any<ChangePicStateCriteria>()).Returns(expected);

        // Act
        var result = await service.ChangePicStateAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task ValidateEditPicAsync_WhenCalled_ReturnExpectedString()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<ValidateEditPicCriteria>();
        var expected = fixture.Create<string>();

        var service = GetService();
        baseService.GetDataEntityAsync<string>(criteria).Returns(expected);

        // Act
        var result = await service.ValidateEditPicAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    #region Helpers

    private PicManagementService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        var service = new PicManagementService(baseService);
        return service;
    }

    #endregion Helpers
}