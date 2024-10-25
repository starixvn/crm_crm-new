namespace CRM.Services.UnitTests.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Criteria.Feedback.DeletedFeedback;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Criteria.MultipleLogs;
    using CRM.Criteria.Report.FeedbackStatistic;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Customer;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Services.Feedback;
    using Fanex.Data.Repository;
    using NSubstitute;
    using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
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
            var tupe = (feedbacks, latestFeedbackCommunicationTools, settings, relatedCustomers);
            var service = GetService();

            dynamicRepository.GetAsync<bool>(Arg.Any<CheckFeedbackIDIsNewCriteria>()).Returns(true);
            baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool, FeedbackSettingRelation, RelatedCustomerPermission>(Arg.Do<GetCustomerNewManualFeedbackByIdCriteria>(x => param = x)).Returns(tupe);

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
            var clientdate = fixture.Create<DateTime>();
            var feedbacks = new List<CustomerFeedback>
            {
                new CustomerFeedback
                {
                    FeedbackId = 1, SiteId = 1, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                }
            };
            var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
            var latestFeedbackCommunicationTools = fixture.Create<IEnumerable<LatestFeedbackCommunicationTool>>();
            var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
            var site = fixture.Create<SiteSetting>();
            var feedbackId = fixture.Create<int>();
            var customerFeedbackModel = new CustomerFeedbackModel
            {
                CustomerFeedback = feedbacks,
                FeedbackSettingRelation = settings,
                FeedbackCommunicationTool = latestFeedbackCommunicationTools,
                RelatedCustomerPermission = relatedCustomers
            };
            var tupe = (feedbacks, latestFeedbackCommunicationTools, settings, relatedCustomers);
            var service = GetService();

            dynamicRepository.GetAsync<bool>(Arg.Any<CheckFeedbackIDIsNewCriteria>()).Returns(true);
            baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool, FeedbackSettingRelation, RelatedCustomerPermission>(Arg.Do<GetCustomerNewManualFeedbackByIdCriteria>(x => param = x)).Returns(tupe);

            settingService.GetSiteByIdAsync(1).Returns(site);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientdate);

            // Act
            var actual = await service.GetCustomerFeedbackByIdAsync(feedbackId);

            // Assert
            Assert.Equal(feedbacks.First(), actual);
            Assert.Equal(clientdate, actual.FeedbackDate);
            Assert.Equal(clientdate, actual.ResolutionDate);
            Assert.Equal(clientdate, actual.SolveDate);
            Assert.Equal(clientdate, actual.CreateDate);
            Assert.Equal(settings, actual.Settings);
            Assert.Equal(site.Id, actual.SiteSetting.Id);
            Assert.Equal(site.Name, actual.SiteSetting.Name);
            Assert.True(actual.HasRelated);
        }

        #endregion GetCustomerFeedbackByIdAsync

        [Fact] public async Task GetCustomerFeedbackDataByIdAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var param = fixture.Create<GetCustomerNewManualFeedbackByIdCriteria>();
            var date = fixture.Create<DateTime>();
            var clientdate = fixture.Create<DateTime>();
            var feedbacks = new List<CustomerFeedback>
            {
                new CustomerFeedback
                {
                    FeedbackId = 1, SiteId = 1, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                }
            };
            var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
            var latestFeedbackCommunicationTools = fixture.Create<IEnumerable<LatestFeedbackCommunicationTool>>();
            var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
            var site = fixture.Create<SiteSetting>();
            var feedbackId = fixture.Create<int>();
            var customerFeedbackModel = new CustomerFeedbackModel
            {
                CustomerFeedback = feedbacks,
                FeedbackSettingRelation = settings,
                FeedbackCommunicationTool = latestFeedbackCommunicationTools,
                RelatedCustomerPermission = relatedCustomers
            };
            var tupe = (feedbacks, latestFeedbackCommunicationTools, settings, relatedCustomers);
            var service = GetService();

            baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool, FeedbackSettingRelation, RelatedCustomerPermission>(Arg.Do<GetCustomerNewManualFeedbackByIdCriteria>(x => param = x)).Returns(tupe);

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
            var clientdate = fixture.Create<DateTime>();
            var param = fixture.Create<GetLatestFeedbackCriteria>();
            var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
            var statuses = new List<FeedbackStatus>
            {
                new FeedbackStatus { StatusId = 100, Name = "Pending" }
            };
            var feedbacks = new List<DeletedFeedback>
            {
                new DeletedFeedback
                {
                    FeedbackId = 1, StatusId = 100, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                },
                new DeletedFeedback
                {
                    FeedbackId = 2, StatusId = 101, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                }
            };
            var tupe = (feedbacks, settings);
            var service = GetService();
            baseService.FetchMultipleAsync<DeletedFeedback, FeedbackSettingRelation>(Arg.Do<GetLatestFeedbackCriteria>(x => param = x)).Returns(tupe);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientdate);

            // Act
            var actual = await service.GetLatestFeedbackAsync(param);

            // Assert
            Assert.Equal(feedbacks, actual);
            Assert.Collection(actual, item =>
            {
                Assert.Equal(clientdate, item.FeedbackDate);
                Assert.Equal(clientdate, item.ResolutionDate);
                Assert.Equal(clientdate, item.SolveDate);
                Assert.Equal(clientdate, item.CreateDate);
                Assert.Equal("Pending", item.Status);
            }, item =>
            {
                Assert.Equal(clientdate, item.FeedbackDate);
                Assert.Equal(clientdate, item.ResolutionDate);
                Assert.Equal(clientdate, item.SolveDate);
                Assert.Equal(clientdate, item.CreateDate);
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
            var clientdate = fixture.Create<DateTime>();
            var param = fixture.Create<GetDeletedFeedbackParam>();
            var criteria = new GetDeletedFeedbackCriteria();
            var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
            var statuses = new List<FeedbackStatus>
            {
                new FeedbackStatus { StatusId = 100, Name = "Pending" }
            };
            var feedbacks = new List<DeletedFeedback>
            {
                new DeletedFeedback
                {
                    FeedbackId = 1, StatusId = 100, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                },
                new DeletedFeedback
                {
                    FeedbackId = 2, StatusId = 101, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                }
            };
            var tupe = (feedbacks, settings);
            var service = GetService();
            baseService.FetchMultipleAsync<DeletedFeedback, FeedbackSettingRelation>(Arg.Do<GetDeletedFeedbackCriteria>(x => criteria = x)).Returns(tupe);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientdate);

            // Act
            var actual = await service.GetDeletedFeedbackAsync(param);

            // Assert
            Assert.Equal(feedbacks, actual);
            Assert.Collection(actual, item =>
            {
                Assert.Equal(clientdate, item.FeedbackDate);
                Assert.Equal(clientdate, item.ResolutionDate);
                Assert.Equal(clientdate, item.SolveDate);
                Assert.Equal(clientdate, item.CreateDate);
                Assert.Equal("Pending", item.Status);
            }, item =>
            {
                Assert.Equal(clientdate, item.FeedbackDate);
                Assert.Equal(clientdate, item.ResolutionDate);
                Assert.Equal(clientdate, item.SolveDate);
                Assert.Equal(clientdate, item.CreateDate);
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
                new FeedbackStatus { StatusId = 100, Name = "Pending" }
            };
            var feedbacks = new List<DeletedFeedback>
            {
                new DeletedFeedback
                {
                    FeedbackId = 1, StatusId = 100, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                },
                new DeletedFeedback
                {
                    FeedbackId = 2, StatusId = 101, FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date, CreateDate = date
                }
            };
            var tupe = (feedbacks, settings);
            var service = GetService();
            baseService.FetchMultipleAsync<DeletedFeedback, FeedbackSettingRelation>(Arg.Do<GetFeedbackStatisticDetailCriteria>(x => criteria = x)).Returns(tupe);
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
            var clientdate = fixture.Create<DateTime>();
            var communicationLogs = new List<CommunicationLog>
            {
                new CommunicationLog
                {
                    FeedbackDate = date,
                    ResolutionDate = date, SolveDate = date
                }
            };
            var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
            var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
            var criteria = new GetLogByFeedbackIdCriteria();
            var service = GetService();
            baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomerPermission, FeedbackSettingRelation>(
                Arg.Do<GetLogByFeedbackIdCriteria>(x => criteria = x)).Returns((communicationLogs, relatedCustomers, settings));
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientdate);

            // Act
            var actual = await service.GetLogByFeedbackIdAsync(1);

            // Assert
            Assert.Equal(communicationLogs.First(), actual);
            Assert.Equal(clientdate, actual.FeedbackDate);
            Assert.Equal(clientdate, actual.ResolutionDate);
            Assert.Equal(clientdate, actual.SolveDate);
            Assert.Equal(relatedCustomers.OrderBy(x => x.Username), actual.RelatedCustomers);
            Assert.Equal(settings, actual.Settings);
        }

        #endregion GetCustomerFeedbackByIdAsync

        [Fact]
        public async Task GetManageFeedbackAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var service = GetService();
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
            var tupe = (feedbacks, settings);
            var criteria = new ManageFeedbackCriteria();
            baseService.FetchMultipleAsync<DeletedFeedback, FeedbackSettingRelation>(Arg.Do<ManageFeedbackCriteria>(x => criteria = x)).Returns(tupe);

            // Act
            var actual = await service.GetManageFeedbackAsync(criteria);

            // Assert
            Assert.Equal(feedbacks, actual);
        }

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
}