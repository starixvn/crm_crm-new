namespace CRM.Services.UnitTests.Feedback;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using Criteria.Feedback.MultipleLogs;
using CRM.Criteria.Feedback;
using CRM.Criteria.Feedback.DeletedFeedback;
using CRM.Criteria.Feedback.ManageFeedback;
using CRM.Criteria.Report.DeletedFeedbackStatistic;
using CRM.Criteria.Report.FeedbackStatistic;
using CRM.Models.CommunicationLogs;
using CRM.Models.Customer;
using CRM.Models.Feedback;
using CRM.Models.Feedback.LatestFeedback;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Models.Setting;
using CRM.Services.Feedback;
using Fanex.Data.Repository;
using Interfaces;
using Models;
using Models.Feedback.DeletedFeedback;
using NSubstitute;
using Xunit;

public class FeedbackServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IDynamicRepository dynamicRepository;
    private IBaseService baseService;
    private ISettingService settingService;
    private ICommonService commonService;

    #region GetCustomerFeedbackByIdAsync

    [Fact]
    public async Task GetCustomerFeedbackByIdAsync_FeedbackIsNotExist_ReturnNull()
    {
        // Arrange
        var param = fixture.Create<GetCustomerNewManualFeedbackByIdCriteria>();
        var feedbacks = new List<CustomerFeedback>();
        var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        var latestFeedbackCommunicationTools = fixture.Create<IEnumerable<LatestFeedbackCommunicationTool>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var customerFeedbackModel = new CustomerFeedbackModel
        {
            CustomerFeedback = feedbacks,
            FeedbackSettingRelation = settings,
            FeedbackCommunicationTool = latestFeedbackCommunicationTools,
            RelatedCustomerPermission = relatedCustomers
        };
        var tuple = (feedbacks, latestFeedbackCommunicationTools, settings, relatedCustomers);
        var service = GetService();

        dynamicRepository.GetAsync<bool>(Arg.Any<CheckFeedbackIDIsNewCriteria>()).Returns(true);
        baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool, FeedbackSettingRelation, RelatedCustomerPermission>(Arg.Do<GetCustomerNewManualFeedbackByIdCriteria>(x => param = x)).Returns(tuple);

        // Act
        var actual = await service.GetCustomerFeedbackByIdAsync(1);

        // Assert
        Assert.Null(actual);
        commonService.DidNotReceive().ConvertToClientDateTime(Arg.Any<DateTime>());
        await settingService.DidNotReceive().GetSiteByIdAsync(Arg.Any<int>());
    }

    [Fact]
    public async Task GetCustomerFeedbackByIdAsync_FeedbackIsExist_ReturnAsExpectedResult()
    {
        // Arrange
        var param = fixture.Create<GetCustomerNewManualFeedbackByIdCriteria>();
        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        var feedbacks = new List<CustomerFeedback>
        {
            new()
            {
                FeedbackId = 1, SiteId = 1, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date,
                    FirstResponseTime = date
            }
        };
        var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        var latestFeedbackCommunicationTools = fixture.Create<IEnumerable<LatestFeedbackCommunicationTool>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var site = fixture.Create<SiteSetting>();
        var feedbackId = fixture.Create<int>();
        var tuple = (feedbacks, latestFeedbackCommunicationTools, settings, relatedCustomers);
        var service = GetService();

        dynamicRepository.GetAsync<bool>(Arg.Any<CheckFeedbackIDIsNewCriteria>()).Returns(true);
        baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool, FeedbackSettingRelation, RelatedCustomerPermission>(Arg.Do<GetCustomerNewManualFeedbackByIdCriteria>(x => param = x)).Returns(tuple);

        settingService.GetSiteByIdAsync(1).Returns(site);
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

        // Act
        var actual = await service.GetCustomerFeedbackByIdAsync(feedbackId);

        // Assert
        Assert.Equal(feedbacks.First(), actual);
        Assert.Equal(clientDate, actual.FeedbackDate);
        Assert.Equal(clientDate, actual.ResolutionDate);
        Assert.Equal(clientDate, actual.SolveDate);
        Assert.Equal(clientDate, actual.CreateDate);
        Assert.Equal(settings, actual.Settings);
        Assert.Equal(site.Id, actual.SiteSetting.Id);
        Assert.Equal(site.Name, actual.SiteSetting.Name);
        Assert.True(actual.HasRelated);
    }

    #endregion GetCustomerFeedbackByIdAsync

    [Fact]
    public async Task GetCustomerFeedbackDataByIdAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var param = fixture.Create<GetCustomerNewManualFeedbackByIdCriteria>();
        var date = fixture.Create<DateTime>();
        var feedbacks = new List<CustomerFeedback>
        {
            new()
            {
                FeedbackId = 1, SiteId = 1, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date,
                    FirstResponseTime = date
            }
        };
        var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        var latestFeedbackCommunicationTools = fixture.Create<IEnumerable<LatestFeedbackCommunicationTool>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();

        var customerFeedbackModel = new CustomerFeedbackModel
        {
            CustomerFeedback = feedbacks,
            FeedbackSettingRelation = settings,
            FeedbackCommunicationTool = latestFeedbackCommunicationTools,
            RelatedCustomerPermission = relatedCustomers
        };
        var tuple = (feedbacks, latestFeedbackCommunicationTools, settings, relatedCustomers);
        var service = GetService();

        baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool, FeedbackSettingRelation, RelatedCustomerPermission>(Arg.Do<GetCustomerNewManualFeedbackByIdCriteria>(x => param = x)).Returns(tuple);

        // Act
        var actual = await service.GetCustomerFeedbackDataByIdAsync(param);

        // Assert
        Assert.Equal(customerFeedbackModel.CustomerFeedback, actual.CustomerFeedback);
    }

    [Fact]
    public async Task GetLatestFeedbackAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        var param = fixture.Create<GetLatestFeedbackCriteria>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var statuses = new List<FeedbackStatus>
        {
            new() { StatusId = 100, Name = "Pending" }
        };
        var feedbacks = new List<FeedbackDeleted>
        {
            new()
            {
                FeedbackId = 1, StatusId = 100, FeedbackDate = date,
                ResolutionDate = date, SolveDate = date, CreateDate = date
            },
            new()
            {
                FeedbackId = 2, StatusId = 101, FeedbackDate = date,
                ResolutionDate = date, SolveDate = date, CreateDate = date
            }
        };
        var tuple = (feedbacks, settings);
        var service = GetService();
        baseService.FetchMultipleAsync<FeedbackDeleted, FeedbackSettingRelation>(Arg.Do<GetLatestFeedbackCriteria>(x => param = x)).Returns(tuple);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

        // Act
        var actual = await service.GetLatestFeedbackAsync(param);

        // Assert
        Assert.Equal(feedbacks, actual);
        Assert.Collection(actual, item =>
        {
            Assert.Equal(clientDate, item.FeedbackDate);
            Assert.Equal(clientDate, item.ResolutionDate);
            Assert.Equal(clientDate, item.SolveDate);
            Assert.Equal(clientDate, item.CreateDate);
            Assert.Equal("Pending", item.Status);
        }, item =>
        {
            Assert.Equal(clientDate, item.FeedbackDate);
            Assert.Equal(clientDate, item.ResolutionDate);
            Assert.Equal(clientDate, item.SolveDate);
            Assert.Equal(clientDate, item.CreateDate);
            Assert.Empty(item.Status);
        });
    }

    [Fact]
    public async Task GetNoOfInquiryByFeedbackIdAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var feedback = fixture.Create<EditNoOfInquiry>();
        var criteria = new GetNoOfInquiryByFeedbackIdCriteria();
        var service = GetService();
        baseService.GetDataEntityAsync<EditNoOfInquiry>(Arg.Do<GetNoOfInquiryByFeedbackIdCriteria>(x => criteria = x)).Returns(feedback);

        // Act
        var actual = await service.GetNoOfInquiryByFeedbackIdAsync(1);

        // Assert
        Assert.Equal(feedback, actual);
        Assert.Equal(1, criteria.FeedbackId);
    }

    [Fact]
    public async Task EditNoOfInquiryAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = fixture.Create<CommandResult>();
        var command = new EditNoOfInquiryCommand();
        var service = GetService();
        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var actual = await service.EditNoOfInquiryAsync(command);

        // Assert
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task EditCustomerFeedbackAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = fixture.Create<CommandResult>();
        var command = new EditCustomerFeedbackCommand();
        var service = GetService();
        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var actual = await service.EditCustomerFeedbackAsync(command);

        // Assert
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task GetDeletedFeedbackAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        var param = fixture.Create<GetDeletedFeedbackParam>();
        var criteria = new GetDeletedFeedbackCriteria();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var statuses = new List<FeedbackStatus>
        {
            new() { StatusId = 100, Name = "Pending" }
        };
        var feedbacks = new List<FeedbackDeleted>
        {
            new()
            {
                FeedbackId = 1, StatusId = 100, FeedbackDate = date,
                ResolutionDate = date, SolveDate = date, CreateDate = date
            },
            new()
            {
                FeedbackId = 2, StatusId = 101, FeedbackDate = date,
                ResolutionDate = date, SolveDate = date, CreateDate = date
            }
        };
        var tuple = (feedbacks, settings);
        var service = GetService();
        baseService.FetchMultipleAsync<FeedbackDeleted, FeedbackSettingRelation>(Arg.Do<GetDeletedFeedbackCriteria>(x => criteria = x)).Returns(tuple);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

        // Act
        var actual = await service.GetDeletedFeedbackAsync(param);

        // Assert
        Assert.Equal(feedbacks, actual);
        Assert.Collection(actual, item =>
        {
            Assert.Equal(clientDate, item.FeedbackDate);
            Assert.Equal(clientDate, item.ResolutionDate);
            Assert.Equal(clientDate, item.SolveDate);
            Assert.Equal(clientDate, item.CreateDate);
            Assert.Equal("Pending", item.Status);
        }, item =>
        {
            Assert.Equal(clientDate, item.FeedbackDate);
            Assert.Equal(clientDate, item.ResolutionDate);
            Assert.Equal(clientDate, item.SolveDate);
            Assert.Equal(clientDate, item.CreateDate);
            Assert.Empty(item.Status);
        });
    }

    [Fact]
    public async Task GetFeedbackStatisticDetailAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var date = fixture.Create<DateTime>();
        var param = fixture.Create<GetFeedbackStatisticDetailCriteria>();
        var criteria = new GetFeedbackStatisticDetailCriteria();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var statuses = new List<FeedbackStatus>
        {
            new() { StatusId = 100, Name = "Pending" }
        };
        var feedbacks = new List<FeedbackDeleted>
        {
            new()
            {
                FeedbackId = 1, StatusId = 100, FeedbackDate = date,
                ResolutionDate = date, SolveDate = date, CreateDate = date
            },
            new()
            {
                FeedbackId = 2, StatusId = 101, FeedbackDate = date,
                ResolutionDate = date, SolveDate = date, CreateDate = date
            }
        };
        var tuple = (feedbacks, settings);
        var service = GetService();
        baseService.FetchMultipleAsync<FeedbackDeleted, FeedbackSettingRelation>(Arg.Do<GetFeedbackStatisticDetailCriteria>(x => criteria = x)).Returns(tuple);
        settingService.GetStatusAsync(ViewTypeConstants.All).Returns(statuses);

        // Act
        var actual = await service.GetFeedbackStatisticDetailAsync(param);

        // Assert
        Assert.Equal(feedbacks, actual);
    }

    #region GetCustomerFeedbackByIdAsync

    [Fact]
    public async Task GetLogByFeedbackIdAsync_CommunicationLogIsNotExist_ReturnNull()
    {
        // Arrange
        var communicationLogInfos = new List<CommunicationLog>();
        var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var criteria = new GetLogByFeedbackIdCriteria();
        var service = GetService();
        baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomerPermission, FeedbackSettingRelation>(
            Arg.Do<GetLogByFeedbackIdCriteria>(x => criteria = x)).Returns((communicationLogInfos, relatedCustomers, settings));

        // Act
        var actual = await service.GetLogByFeedbackIdAsync(1);

        // Assert
        Assert.Null(actual);
        Assert.Equal(1, criteria.FeedbackId);
        commonService.DidNotReceive().ConvertToClientDateTime(Arg.Any<DateTime>());
    }

    [Fact]
    public async Task GetLogByFeedbackIdAsync_CommunicationLog_ReturnAsExpectedResult()
    {
        // Arrange
        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        var communicationLogs = new List<CommunicationLog>
        {
            new()
            {
                FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date,
                    FirstResponseTime = date
            }
        };
        var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var criteria = new GetLogByFeedbackIdCriteria();
        var service = GetService();
        baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomerPermission, FeedbackSettingRelation>(
            Arg.Do<GetLogByFeedbackIdCriteria>(x => criteria = x)).Returns((communicationLogs, relatedCustomers, settings));
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

        // Act
        var actual = await service.GetLogByFeedbackIdAsync(1);

        // Assert
        Assert.Equal(communicationLogs.First(), actual);
        Assert.Equal(clientDate, actual.FeedbackDate);
        Assert.Equal(clientDate, actual.ResolutionDate);
        Assert.Equal(clientDate, actual.SolveDate);
        Assert.Equal(relatedCustomers.OrderBy(x => x.Username), actual.RelatedCustomers);
        Assert.Equal(settings, actual.Settings);
    }

    #endregion GetCustomerFeedbackByIdAsync

    [Fact]
    public async Task GetManageFeedbackAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var tuple = (feedbacks, settings);
        var criteria = new ManageFeedbackCriteria();
        baseService.FetchMultipleAsync<FeedbackDeleted, FeedbackSettingRelation>(Arg.Do<ManageFeedbackCriteria>(x => criteria = x)).Returns(tuple);

        // Act
        var actual = await service.GetManageFeedbackAsync(criteria);

        // Assert
        Assert.Equal(feedbacks, actual);
    }

    [Fact]
    public async Task GetDeletedFeedbackStatisticAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<DeletedFeedbackStatisticsCriteria>();
        var feedbacks = fixture.Create<IEnumerable<DeletedFeedbackStatistic>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var tuple = (feedbacks, settings);
        var service = GetService();

        baseService.FetchMultipleAsync<DeletedFeedbackStatistic, FeedbackSettingRelation>(Arg.Do<DeletedFeedbackStatisticsCriteria>(x => criteria = x)).Returns(tuple);

        // Act
        var actual = await service.GetDeletedFeedbackStatisticAsync(criteria);

        // Assert
        Assert.Equal(feedbacks, actual);
        foreach (var feedback in feedbacks)
        {
            Assert.Equal(settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList(), feedback.Settings);
            Assert.Equal(string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x)), feedback.RelatedCustomer);
        }
    }

    [Fact]
    public async Task GetDeletedFeedbackStatisticAsync_WhenRelatedCustomerIsNull_ReturnsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<DeletedFeedbackStatisticsCriteria>();
        var feedbacks = fixture.CreateMany<DeletedFeedbackStatistic>(1).ToList();
        feedbacks[0].RelatedCustomer = null;
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var tuple = (feedbacks, settings);
        var service = GetService();

        baseService.FetchMultipleAsync<DeletedFeedbackStatistic, FeedbackSettingRelation>(Arg.Do<DeletedFeedbackStatisticsCriteria>(x => criteria = x)).Returns(tuple);

        // Act
        var actual = await service.GetDeletedFeedbackStatisticAsync(criteria);

        // Assert
        Assert.Equal(feedbacks, actual);
        foreach (var feedback in feedbacks)
        {
            Assert.Equal(settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList(), feedback.Settings);
            Assert.Equal("", feedback.RelatedCustomer);
        }
    }

    [Fact]
    public async Task EditCustomerNewManualFeedbackAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<EditCustomerNewManualFeedbackCommand>();
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();

        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var actual = await service.EditCustomerNewManualFeedbackAsync(command);

        // Assert
        Assert.Equal(commandResult, actual);
        await baseService.Received(1).ExecuteNonQueryAsync(command);
    }

    [Fact]
    public async Task EditCustomerNewManualFeedbackAsync_WhenCalled_ConvertsDates()
    {
        // Arrange
        var command = fixture.Create<EditCustomerNewManualFeedbackCommand>();
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();
        var serverDate = fixture.Create<DateTime>();

        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(serverDate);
        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var actual = await service.EditCustomerNewManualFeedbackAsync(command);

        // Assert
        Assert.Equal(commandResult, actual);
        Assert.Equal(serverDate, command.FeedbackDate);
        Assert.Equal(serverDate, command.ResolutionDate);
        if (command.FirstResponseTime.HasValue)
        {
            Assert.Equal(serverDate, command.FirstResponseTime.Value);
        }
        await baseService.Received(1).ExecuteNonQueryAsync(command);
    }

    [Fact]
    public async Task CheckFeedbackDuplicationAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<CheckFeedbackDuplicationCriteria>();
        var expectedResult = fixture.Create<int>();
        var service = GetService();

        baseService.GetDataEntityAsync<int>(criteria).Returns(expectedResult);

        // Act
        var actual = await service.CheckFeedbackDuplicationAsync(criteria);

        // Assert
        Assert.Equal(expectedResult, actual);
        await baseService.Received(1).GetDataEntityAsync<int>(criteria);
    }

    #region GetFeedbackStatisticAsync

    [Fact]
    public async Task GetFeedbackStatisticAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();

        var criteria = fixture.Create<GetFeedbackStatisticCriteria>();
        var dataTable1 = new DataTable();
        dataTable1.Columns.Add("MainCategoryId", typeof(int));
        dataTable1.Columns.Add("MainCategory", typeof(string));
        dataTable1.Columns.Add("SubCategoryId", typeof(int));
        dataTable1.Columns.Add("SubCategory", typeof(string));
        dataTable1.Columns.Add("User1", typeof(int));
        dataTable1.Columns.Add("User2", typeof(int));

        var dataTable2 = new DataTable();
        dataTable2.Columns.Add("Item", typeof(int));

        var dataRow1 = dataTable1.NewRow();
        dataRow1["MainCategoryId"] = 1;
        dataRow1["MainCategory"] = "Category1";
        dataRow1["SubCategoryId"] = 1;
        dataRow1["SubCategory"] = "SubCategory1";
        dataRow1["User1"] = 10;
        dataRow1["User2"] = 20;
        dataTable1.Rows.Add(dataRow1);

        var dataRow2 = dataTable2.NewRow();
        dataRow2["Item"] = 1;
        dataTable2.Rows.Add(dataRow2);

        var dataSet = new DataSet();
        dataSet.Tables.Add(dataTable1);
        dataSet.Tables.Add(dataTable2);

        dynamicRepository.FetchDataSetAsync(criteria).Returns(dataSet);

        // Act
        var result = await service.GetFeedbackStatisticAsync(criteria);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Usernames.Count);
        Assert.Equal("User1", result.Usernames[0].Name);
        Assert.Equal("User2", result.Usernames[1].Name);
        Assert.Equal(1, result.FeedbackCategories.Count);
        Assert.Equal("Category1", result.FeedbackCategories[0].Name);
        Assert.Equal(1, result.FeedbackCategories[0].FeedbackSubcategories.Count);
        Assert.Equal("SubCategory1", result.FeedbackCategories[0].FeedbackSubcategories[0].Name);
        Assert.Equal(10, result.FeedbackCategories[0].FeedbackSubcategories[0].Resolves[0]);
        Assert.Equal(20, result.FeedbackCategories[0].FeedbackSubcategories[0].Resolves[1]);
    }

    #endregion GetFeedbackStatisticAsync

    #region Get rating feedback statistic Async

    [Fact]
    public async Task GetFeedbackRatingStatisticAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<GetFeedbackStatisticCriteria>();
        var dataTable1 = new DataTable();
        dataTable1.Columns.Add("Column1", typeof(string));
        dataTable1.Columns.Add("Excellent", typeof(int));
        dataTable1.Columns.Add("Good", typeof(int));
        dataTable1.Columns.Add("Neutral", typeof(int));
        dataTable1.Columns.Add("Poor", typeof(int));
        dataTable1.Columns.Add("VeryPoor", typeof(int));
        dataTable1.Columns.Add("NARating", typeof(int));

        var dataTable2 = new DataTable();
        dataTable2.Columns.Add("Item", typeof(int));

        var dataRow1 = dataTable1.NewRow();
        dataRow1["Column1"] = "Test Column";
        dataRow1["Excellent"] = 10;
        dataRow1["Good"] = 20;
        dataRow1["Neutral"] = 30;
        dataRow1["Poor"] = 40;
        dataRow1["VeryPoor"] = 50;
        dataRow1["NARating"] = 60;
        dataTable1.Rows.Add(dataRow1);

        var dataRow2 = dataTable2.NewRow();
        dataRow2["Item"] = 1;
        dataTable2.Rows.Add(dataRow2);

        var dataSet = new DataSet();
        dataSet.Tables.Add(dataTable1);
        dataSet.Tables.Add(dataTable2);
        var service = GetService();

        dynamicRepository.FetchDataSetAsync(criteria).Returns(dataSet);

        // Act
        var result = await service.GetFeedbackRatingStatisticAsync(criteria);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Records.Count);
        Assert.Equal("Test Column", result.Records[0].ColumnData.Name);
        Assert.Equal(10, result.Records[0].Excellent);
        Assert.Equal(20, result.Records[0].Good);
        Assert.Equal(30, result.Records[0].Neutral);
        Assert.Equal(40, result.Records[0].Poor);
        Assert.Equal(50, result.Records[0].VeryPoor);
        Assert.Equal(60, result.Records[0].NARating);
    }

    [Fact]
    public async Task GetFeedbackRatingStatisticAsync_WhenNoData_ReturnsNull()
    {
        // Arrange
        var criteria = fixture.Create<GetFeedbackStatisticCriteria>();
        var dataSet = new DataSet();
        var service = GetService();

        dynamicRepository.FetchDataSetAsync(criteria).Returns(dataSet);

        // Act
        var result = await service.GetFeedbackRatingStatisticAsync(criteria);

        // Assert
        Assert.Null(result);
    }

    #endregion Get rating feedback statistic Async

    #region Helpers

    private FeedbackService GetService()
    {
        dynamicRepository = Substitute.For<IDynamicRepository>();
        baseService = Substitute.For<IBaseService>();
        settingService = Substitute.For<ISettingService>();
        commonService = Substitute.For<ICommonService>();

        return new FeedbackService(dynamicRepository, baseService, settingService, commonService);
    }

    #endregion Helpers
}