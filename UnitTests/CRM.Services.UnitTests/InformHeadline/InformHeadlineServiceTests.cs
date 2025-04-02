namespace CRM.Services.UnitTests.InformHeadline;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.InformHeadline;
using CRM.Models.InformHeadline;
using CRM.Services.InformHeadline;
using Interfaces;
using NSubstitute;
using Xunit;

public class InformHeadlineServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;

    [Fact]
    public async Task GetInformAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var informs = fixture.Create<IEnumerable<InformHeadlineModel>>();
        var criteria = fixture.Create<GetInformHeadlinesCriteria>();
        foreach (var inform in informs)
        {
            inform.Title = "&lt;";
        }
        var service = GetService();
        baseService.GetDataAsync<InformHeadlineModel>(Arg.Do<GetInformHeadlinesCriteria>(x => criteria = x)).Returns(informs);

        // Act
        var actual = await service.GetInformAsync();

        // Assert
        Assert.Equal(informs, actual);
        Assert.All(actual, item =>
        {
            Assert.Equal("<", item.Title);
            Assert.Equal("Jan 01, 0001", item.ClientCreatedDate);
        });
    }

    [Fact]
    public async Task GetTitleDetailAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var titleDetail = fixture.Create<InformTitleDetail>();
        var criteria = fixture.Create<GetInformTitleDetailCriteria>();
        var param = fixture.Create<int>();
        var service = GetService();
        baseService.GetDataEntityAsync<InformTitleDetail>(Arg.Do<GetInformTitleDetailCriteria>(x => criteria = x)).Returns(titleDetail);

        // Act
        var actual = await service.GetTitleDetailAsync(param);

        // Assert
        Assert.Equal(titleDetail, actual);
    }

    [Fact]
    public async Task GetInformStatuses_WhenCalled_ReturnExpectResult()
    {
        // Arrange
        var informStatus = fixture.Create<IEnumerable<InformStatus>>();
        var criteria = fixture.Create<GetInformStatusesCriteria>();
        var service = GetService();
        baseService.GetDataAsync<InformStatus>(Arg.Do<GetInformStatusesCriteria>(x => criteria = x)).Returns(informStatus);

        // Act
        var actual = await service.GetInformStatusesAsync(true);

        // Assert
        Assert.Equal(informStatus, actual);
        Assert.True(criteria.IsIncludeKeptForRefence);
    }

    [Fact]
    public async Task GetContactInforms_WhenCalled_ReturnExpectResult()
    {
        // Arrange
        var contactInforms = fixture.Create<IEnumerable<EditInform>>();
        var criteria = fixture.Create<GetContactInformsCriteria>();
        var param = fixture.Create<GetContactInformParam>();
        foreach (var contactInform in contactInforms)
        {
            contactInform.Remark = "&lt;";
        }
        var service = GetService();
        baseService.GetDataAsync<EditInform>(Arg.Do<GetContactInformsCriteria>(x => criteria = x)).Returns(contactInforms);

        // Act
        var actual = await service.GetContactInformsAsync(param);

        // Assert
        Assert.Equal(contactInforms, actual);
        Assert.All(actual, item =>
        {
            Assert.Equal("<", item.Remark);
            Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientUpdatedTime);
        });
    }

    [Fact]
    public async Task GetEditInforms_WhenCalled_ReturnExpectResult()
    {
        // Arrange
        var editInforms = fixture.Create<IEnumerable<EditInform>>();
        var criteria = fixture.Create<GetEditInformsCriteria>();
        var param = fixture.Create<GetEditInformParam>();
        foreach (var editInform in editInforms)
        {
            editInform.Remark = "&lt;";
        }
        var service = GetService();
        baseService.GetDataAsync<EditInform>(Arg.Do<GetEditInformsCriteria>(x => criteria = x)).Returns(editInforms);

        // Act
        var actual = await service.GetEditInformsAsync(param);

        // Assert
        Assert.Equal(editInforms, actual);
        Assert.All(actual, item =>
        {
            Assert.Equal("<", item.Remark);
            Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientUpdatedTime);
        });
    }

    [Fact]
    public async Task GetRemovedAccountLogAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var removeAccountLogs = fixture.Create<IEnumerable<RemovedAccountLog>>();
        var totals = fixture.Create<int>();
        var criteria = fixture.Create<GetRemovedAccountLogsCriteria>();
        var param = fixture.Create<GetRemovedAccountLogParam>();
        var service = GetService();
        baseService.GetDataAsync<RemovedAccountLog>(Arg.Do<GetRemovedAccountLogsCriteria>(x => criteria = x)).Returns(removeAccountLogs);
        baseService.When(x => x.GetDataAsync<RemovedAccountLog>(Arg.Do<GetRemovedAccountLogsCriteria>(y => criteria = y)))
            .Do(x => criteria.TotalRows = totals);
            
        // Act
        var actual = await service.GetRemovedAccountLogAsync(param);
        var (listRemoveAccounts, totalRows) = actual;

        // Assert
        Assert.Equal(removeAccountLogs, listRemoveAccounts);
        Assert.Equal(criteria.TotalRows, totalRows);
        Assert.All(listRemoveAccounts, item =>
        {
            Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientLogDate);
        });
    }

    [Fact]
    public async Task GetRemovedAccountLogDetailAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var removeAccountLogs = fixture.Create<IEnumerable<RemovedAccountLogDetail>>();
        var totals = fixture.Create<int>();
        var criteria = fixture.Create<GetRemovedAccountLogDetailsCriteria>();
        var param = fixture.Create<GetRemovedAccountLogDetailParam>();
        var service = GetService();
        baseService.GetDataAsync<RemovedAccountLogDetail>(Arg.Do<GetRemovedAccountLogDetailsCriteria>(x => criteria = x)).Returns(removeAccountLogs);
        baseService.When(x => x.GetDataAsync<RemovedAccountLogDetail>(Arg.Do<GetRemovedAccountLogDetailsCriteria>(y => criteria = y)))
            .Do(x => criteria.TotalRows = totals);

        // Act
        var actual = await service.GetRemovedAccountLogDetailAsync(param);
        var (listRemoveAccountDetails, totalRows) = actual;

        // Assert
        Assert.Equal(removeAccountLogs, listRemoveAccountDetails);
        Assert.Equal(criteria.TotalRows, totalRows);
        Assert.All(listRemoveAccountDetails, item =>
        {
            Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientUpdatedTime);
        });
    }

    [Fact]
    public async Task GetNewInformsAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var newInforms = fixture.Create<IEnumerable<NewInform>>();
        var criteria = fixture.Create<GetNewInformsCriteria>();
        var param = fixture.Create<GetNewInformParam>();
        var service = GetService();
        baseService.GetDataAsync<NewInform>(Arg.Do<GetNewInformsCriteria>(x => criteria = x)).Returns(newInforms);

        // Act
        var actual = await service.GetNewInformsAsync(param);

        // Assert
        Assert.Equal(newInforms, actual);
    }

    private InformHeadlineService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();

        return new InformHeadlineService(baseService, commonService);
    }
}