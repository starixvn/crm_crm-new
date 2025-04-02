namespace CRM.Services.UnitTests.PicAndHeadline;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using NSubstitute;
using Services.PicAndHeadline;
using Xunit;

public class PicAssignmentServiceTests
{
    private IBaseService baseService;
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public async Task ValidateAssignmentDirectAccountAsync_WhenCalled_ReturnsCorrectTuples()
    {
        // Arrange
        var service = GetService();
        var criteria = fixture.Create<ValidateAssignmentCriteria>();
        var expected = fixture.Create<ValueTuple<IEnumerable<PicAssignmentValidation>, IEnumerable<AssignedDirectAccount>>>();
        baseService.FetchMultipleAsync<PicAssignmentValidation, AssignedDirectAccount>(criteria).Returns(expected);

        // Action
        var result = await service.ValidateAssignmentDirectAccountAsync(criteria);

        // Assert
        Assert.Equal(expected.Item1.FirstOrDefault(), result.Item1);
        Assert.Equal(expected.Item2, result.Item2);
    }

    [Fact]
    public async Task GetSystemSiteAsync_WhenCalled_ReturnsCorrectResult()
    {
        // Arrange
        var service = GetService();
        var criteria = fixture.Create<GetSystemSiteCriteria>();
        var expected = fixture.Create<IEnumerable<SiteInfo>>();
        baseService.GetDataAsync<SiteInfo>(criteria).Returns(expected);

        // Action
        var result = await service.GetSystemSiteAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    #region Helpers

    private PicAssignmentService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        return new PicAssignmentService(baseService);
    }

    #endregion Helpers
}