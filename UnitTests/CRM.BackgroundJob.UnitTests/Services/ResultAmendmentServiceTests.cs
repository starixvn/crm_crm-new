
namespace CRM.BackgroundJob.UnitTests.Services
{
    using AutoFixture;
    using CRM.BackgroundJob.Models.ResultAmendment;
    using CRM.BackgroundJob.Services;
    using CRM.BackgroundJob.UnitTests.Testable;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Xunit;

    public class ResultAmendmentServiceTests
    {
        private  AppJobSettings appSettings;
        private  IBaseService baseService;
        private  ISettingService settingService;
        private  ISystemSettingService systemSettingService;
        private  ICustomerService customerService;
        private  ICRMLogService logService;
        private  ICommonFeedback commonFeedback;
        private  IWinLossTransactionService transactionService;
        private readonly IFixture fixture = new Fixture();



        #region CreateFeedbackForResultAmendmentAsync

        [Fact]

        public async Task CreateFeedbackForResultAmendmentAsync_isAnyNotCompeleteStatusIsTrue_EditSystemSettingAsyncCalled()
        {
            // Arrange
            var service = MockService();
            var resultAmendmentSetting = fixture.Create<ResultAmendmentSetting>();
            var custNotifications = new List<CusReachAmendmentNotification>
            {
                new CusReachAmendmentNotification
                {
                    TicketId = 1,
                    CustId = 1,
                    TicketEventId = 1,
                    Bettype = 1,
                    Status = "Fail"
                }
            };

            customerService.GetListResultAmendmentNotificationAsync(resultAmendmentSetting).Returns(custNotifications);
            // Act
            await service.CreateFeedbackForResultAmendmentAsync(resultAmendmentSetting);

            // Assert
            service.Received().Protected("EditSystemSettingAsync");
            logService.Received(1).LogInformation(Arg.Any<string>());
            service.DidNotReceive().Protected(
                "CreateResultAmendmentFeedbackCreditAsync",
                Arg.Any<AmendmentAutoFeedbackInfor>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        [Fact]
        public async Task CreateFeedbackForResultAmendmentAsync_InserAmendmentNotiAutoFeedbackCreateUnSuccessfull_ExpectedWriteLog()
        {
            // Arrange
            var service = MockService();
            var resultAmendmentSetting = fixture.Create<ResultAmendmentSetting>();
            var custNotifications = new List<CusReachAmendmentNotification>
            {
                new CusReachAmendmentNotification
                {
                    TicketId = 1,
                    CustId = 1,
                    TicketEventId = 1,
                    Bettype = 1,
                    Status = "Completed"
                }
            };

            customerService.GetListResultAmendmentNotificationAsync(resultAmendmentSetting).Returns(custNotifications);

            var commandResult = new CommandResult { Code = 1, Message = "" };
            transactionService.InserAmendmentNotiAutoFeedback(custNotifications).Returns(commandResult);

            // Act
            await service.CreateFeedbackForResultAmendmentAsync(resultAmendmentSetting);

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            service.DidNotReceive().Protected(
                "CreateResultAmendmentFeedbackCreditAsync",
                Arg.Any<AmendmentAutoFeedbackInfor>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        [Fact]
        public async Task CreateFeedbackForResultAmendmentAsync_InserAmendmentNotiAutoFeedbackCreateSuccessfull_ExpectedWriteLogAndUpdate()
        {
            // Arrange
            var service = MockService();
            var resultAmendmentSetting = fixture.Create<ResultAmendmentSetting>();
            var custNotifications = new List<CusReachAmendmentNotification>
            {
                new CusReachAmendmentNotification
                {
                    TicketId = 1,
                    CustId = 1,
                    TicketEventId = 1,
                    Bettype = 1,
                    Status = "Completed"
                }
            };
            var amendmentAutoFeedbackInfors = fixture.Create<IEnumerable<AmendmentAutoFeedbackInfor>>();
            customerService.GetListResultAmendmentNotificationAsync(resultAmendmentSetting).Returns(custNotifications);
            transactionService.GetAmendmentNotiAutoFeedbackInfor(resultAmendmentSetting.BatchSize).Returns(amendmentAutoFeedbackInfors);

            var commandResult = new CommandResult { Code = 0, Message = "" };
            transactionService.InserAmendmentNotiAutoFeedback(custNotifications).Returns(commandResult);

            // Act
            await service.CreateFeedbackForResultAmendmentAsync(resultAmendmentSetting);

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());

            await commonFeedback.Received().EditAmendmentFeedbackSystemSettingAsync(Arg.Any<int>(), Arg.Any<string>());
            service.Received().Protected(
                "CreateResultAmendmentFeedbackCreditAsync",
                Arg.Any<AmendmentAutoFeedbackInfor>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        [Fact]
        public async Task CreateFeedbackForResultAmendmentAsync_InserAmendmentNotiAutoFeedbackThrowException_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var service = MockService();
            var resultAmendmentSetting = fixture.Create<ResultAmendmentSetting>();
            var custNotifications = new List<CusReachAmendmentNotification>
            {
                new CusReachAmendmentNotification
                {
                    TicketId = 1,
                    CustId = 1,
                    TicketEventId = 1,
                    Bettype = 1,
                    Status = "Completed"
                }
            };
            var amendmentAutoFeedbackInfors = fixture.Create<IEnumerable<AmendmentAutoFeedbackInfor>>();
            customerService.GetListResultAmendmentNotificationAsync(resultAmendmentSetting).Returns(custNotifications);
            transactionService.GetAmendmentNotiAutoFeedbackInfor(resultAmendmentSetting.BatchSize).Returns(amendmentAutoFeedbackInfors);

            var exception = fixture.Create<Exception>();
            transactionService.When(x => x.InserAmendmentNotiAutoFeedback(custNotifications)).Throw(exception);

            // Act
            await service.CreateFeedbackForResultAmendmentAsync(resultAmendmentSetting);

            // Assert
            await logService.ErrorAsync(exception);
        }

        #endregion CreateFeedbackForResultAmendmentAsync

        #region CreateResultAmendmentFeedbackCreditAsync

        [Fact]
        public async Task CreateResultAmendmentFeedbackCreditAsync_CreateNewCriteria_ExpectedToCallFunction()
        {
            // Arrange
            var amendment = new AmendmentAutoFeedbackInfor
            {
                LogId = 1,
                HeadlineName = "1",
                HeadlineId = 1,
                ProductId = 1,
                Listbettype = "1,2",
                MessageId = 1,
                Sporttype = 1,
                affectedId = "1"
            };

            var settings = new List<SettingItem>
            {
                new SettingItem { SettingId = 1, SettingName = "Status", SettingValue = "Closed" },
                new SettingItem { SettingId = 2, SettingName = "Response", SettingValue = "Neutral" },
                new SettingItem { SettingId = 2022, SettingName = "Station" }
            };
            var message = fixture.Create<IEnumerable<Message>>();

            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var category = fixture.Create<Tuple<int, int, string>>();
            var service = MockService();
            service.Protected("GetCategorySubCategoryCWL", Arg.Any<IEnumerable<SettingItem>>(), DefaultValue.ResultAmended).Returns(category);
            transactionService.GetMessageContentInfoAsync(amendment.MessageId).Returns(message);
            commonFeedback.GetBettypeName(Arg.Any<string>(), Language.en_US).Returns("BettypeName");
            service.Protected("GetAmendmentProductXml", amendment.Sporttype, amendment.ProductId, Arg.Any<List<string>>(), settings, settingMappings).Returns("product");
            service.Protected("GetAmenmendSolution", amendment, message).Returns("product xml");
            service.Protected("GetAmendmentRelatedCustomerXml", amendment).Returns("relatedCustomerXml");
            service.Protected("GetAmendmentDescription", amendment).Returns("description");
            // Act
            await service.Public_CreateResultAmendmentFeedbackCreditAsync(
                amendment,
                settings,
                settingMappings
                );

            // Assert
            logService.Received(3).LogInformation(Arg.Any<string>());
            service.Received().Protected("CheckValidAmendmentParamsAndInsertFeedbackAsync", Arg.Any<AmendmentAutoFeedbackInfor>()
                , Arg.Any<CreateMutipleFeedbackCommand>());
        }

        #endregion CreateResultAmendmentFeedbackCreditAsync

        #region CheckValidAmendmentParamsAndInsertFeedbackAsync

        [Fact]
        public async Task CheckValidAmendmentParamsAndInsertFeedbackAsync_CreateSuccessfull_ExpectedWriteLog()
        {
            // Arrange
            var amendment = new AmendmentAutoFeedbackInfor
            {
                LogId = 1,
                HeadlineName = "1",
                HeadlineId = 1,
                ProductId = 1,
                Listbettype = "1,2",
                MessageId = 1,
                Sporttype = 1,
                affectedId = "1",
                affectedName = "1"
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(true, ""));

            var commandResult = new CommandResult { Code = 0 };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidAmendmentParamsAndInsertFeedbackAsync(
                amendment,
                criteria
                );

            // Assert
            logService.Received(4).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task CheckValidAmendmentParamsAndInsertFeedbackAsync_CreateUnSuccessfull_ExpectedWriteLogAndUpdateStatus()
        {
            var amendment = new AmendmentAutoFeedbackInfor
            {
                LogId = 1,
                HeadlineName = "1",
                HeadlineId = 1,
                ProductId = 1,
                Listbettype = "1,2",
                MessageId = 1,
                Sporttype = 1,
                affectedId = "1",
                affectedName = "1"
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(true, ""));

            var commandResult = new CommandResult { Code = 1, Message = "" };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidAmendmentParamsAndInsertFeedbackAsync(
                amendment,
                criteria
                );

            // Assert
            logService.Received(4).LogInformation(Arg.Any<string>());
            await transactionService.EditAmendmentNotiAutoFeedback(1, CreateFeedbackJobStatus.Fail, commandResult.Message);
            await logService.ErrorAsync(commandResult, criteria);
        }

        [Fact]
        public async Task CheckValidAmendmentParamsAndInsertFeedbackAsync_InvalidParams_ExpectedReturnAndUpdateStatus()
        {
            // Arrange
            var amendment = new AmendmentAutoFeedbackInfor
            {
                LogId = 1,
                HeadlineName = "1",
                HeadlineId = 1,
                ProductId = 1,
                Listbettype = "1,2",
                MessageId = 1,
                Sporttype = 1,
                affectedId = "1",
                affectedName = "1"
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(false, ""));

            var commandResult = new CommandResult { Code = 0 };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidAmendmentParamsAndInsertFeedbackAsync(
                amendment,
                criteria
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await transactionService.EditAmendmentNotiAutoFeedback(1, CreateFeedbackJobStatus.Fail, Arg.Any<string>());
        }

        [Fact]
        public async Task CheckValidAmendmentParamsAndInsertFeedbackAsync_Exception_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var amendment = new AmendmentAutoFeedbackInfor
            {
                LogId = 1,
                HeadlineName = "1",
                HeadlineId = 1,
                ProductId = 1,
                Listbettype = "1,2",
                MessageId = 1,
                Sporttype = 1,
                affectedId = "1",
                affectedName = "1"
            };
            var exception = fixture.Create<Exception>();
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(true, ""));

            baseService.When(x => x.ExecuteNonQueryAsync(criteria)).Throw(exception);

            // Act
            await service.Public_CheckValidAmendmentParamsAndInsertFeedbackAsync(
                amendment,
                criteria
                );

            // Assert
            logService.Received(3).LogInformation(Arg.Any<string>());
            await transactionService.EditAmendmentNotiAutoFeedback(1, CreateFeedbackJobStatus.Fail, exception.Message);
            await logService.ErrorAsync(exception);
        }

        #endregion CheckValidAmendmentParamsAndInsertFeedbackAsync

        #region GetAmendmentProductXml

        [Fact]
        public void GetAmendmentProductXml_NotExistedBetType_ReturnExpectedXml()
        {
            // Arrange
            var betTypeMappings = fixture.Create<List<string>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var product = new SettingItem { SettingId = 1 };
            var subProduct = new List<SettingItem>
            {
                new SettingItem{ SettingId = 1 }
            };
            var tempBettypes = new List<SystemSettingMapping>();
            var service = MockService();
            service.Protected("GetAmenmentProduct", settings, settingMappings, 1).Returns(product);
            service.Protected("GetAmendmentSubProduct", product.SettingId, 1, settings, settingMappings).Returns(subProduct);
            service.Protected("GetAmendmentBettype", betTypeMappings, settingMappings).Returns(tempBettypes);

            // Act
            var actual = service.Public_GetAmendmentProductXml(1, product.SettingId, betTypeMappings, settings, settingMappings);

            // Assert
            Assert.Equal("<ROOT><Product ProductID='1' SubProductID='1' BetTypeID='9144' /></ROOT>", actual);
        }

        [Fact]
        public void GetAmendmentProductXml_ExistedBetType_ReturnExpectedXml()
        {
            var betTypeMappings = fixture.Create<List<string>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var product = new SettingItem { SettingId = 1 };
            var subProduct = new List<SettingItem>
            {
                new SettingItem{ SettingId = 1 }
            };
            var tempBettypes = new List<SystemSettingMapping>
            {
                new SystemSettingMapping
                {
                    SettingId = 1
                }
            };
            var service = MockService();
            service.Protected("GetAmenmentProduct", settings, settingMappings, 1).Returns(product);
            service.Protected("GetAmendmentSubProduct", product.SettingId, 1, settings, settingMappings).Returns(subProduct);
            service.Protected("GetAmendmentBettype", betTypeMappings, settingMappings).Returns(tempBettypes);

            // Act
            var actual = service.Public_GetAmendmentProductXml(1, product.SettingId, betTypeMappings, settings, settingMappings);

            // Assert
            Assert.Equal("<ROOT><Product ProductID='1' SubProductID='1' BetTypeID='1' /></ROOT>", actual);
        }

        #endregion GetAmendmentProductXml

        #region GetAmenmentProduct

        [Fact]
        public void GetAmenmentProduct_NotExistProductId_ReturnDefaultProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = "1", SettingValue = "1" }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "2", SettingValue = "1" , SettingSource = "1"}
                };
            var service = MockService();
            commonFeedback.GetProductName("1", Language.en_US).Returns("2");

            // Act
            var actual = service.Public_GetAmenmentProduct(setting, settingMappings, 1);

            // Assert
            Assert.Equal(Constants.ProductNA, actual.SettingId);
        }

        [Fact]
        public void GetAmenmentProduct_SettingNotEqualProductMapping_ReturnDefaultProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = "2", SettingValue = "2" }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "1", SettingValue = "1" , SettingSource = "1"}
                };
            var service = MockService();
            commonFeedback.GetProductName("1", Language.en_US).Returns("1");

            // Act
            var actual = service.Public_GetAmenmentProduct(setting, settingMappings, 1);

            // Assert
            Assert.Equal(Constants.ProductNA, actual.SettingId);
        }

        [Fact]
        public void GetAmenmentProduct_SettingEqualProductMapping_ReturnProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingId = 1, SettingName = SettingName.Product, SettingValue = "1" }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = 1, SettingName = SettingName.Product, SettingValue = "1" , SettingSource = "1"}
                };
            var service = MockService();
            commonFeedback.GetProductName("1", Language.en_US).Returns("1");

            // Act
            var actual = service.Public_GetAmenmentProduct(setting, settingMappings, 1);

            // Assert
            Assert.Equal(1, actual.SettingId);
        }

        #endregion GetAmenmentProduct

        #region GetAmendmentSubProduct

        [Fact]
        public void GetAmendmentSubProduct_NotExistsportName_ReturnDefaultProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = "1", SettingValue = "1" }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "2", SettingValue = "1" , SettingSource = "1"}
                };
            var service = MockService();
            commonFeedback.GetSportName("1", Language.en_US).Returns("1");

            // Act
            var actual = service.Public_GetAmendmentSubProduct(1, 1, setting, settingMappings);

            // Assert
            Assert.Single(actual);
            Assert.Equal(Constants.SubProductNA, actual.First().SettingId);
        }

        [Fact]
        public void GetAmendmentSubProduct_SettingNotEqualMapping_ReturnDefaultProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = SettingName.SubProduct, SettingValue = "1" , SettingId = 2, ParentIds = new List<int>{ 1,2} }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "1", SettingValue = "1" , SettingSource = "1", SettingId = 1}
                };
            var service = MockService();
            commonFeedback.GetProductName("1", Language.en_US).Returns("1");

            // Act
            var actual = service.Public_GetAmendmentSubProduct(1, 1, setting, settingMappings);

            // Assert
            Assert.Equal(Constants.ProductNA, actual.First().SettingId);
        }

        [Fact]
        public void GetAmendmentSubProduct_SportNameNotEqualMapping_ReturnDefaultProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = SettingName.SubProduct, SettingValue = "1" , SettingId = 2, ParentIds = new List<int>{ 1,2} }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "1", SettingValue = "1" , SettingSource = "1", SettingId = 1}
                };
            var service = MockService();
            commonFeedback.GetProductName("2", Language.en_US).Returns("1");

            // Act
            var actual = service.Public_GetAmendmentSubProduct(1, 1, setting, settingMappings);

            // Assert
            Assert.Equal(Constants.ProductNA, actual.First().SettingId);
        }

        [Fact]
        public void GetAmendmentSubProduct_ExistSportName_ReturnProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = SettingName.SubProduct, SettingValue = "1" , SettingId = 1, ParentIds = new List<int>{ 1,2} }
                };

            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = SettingName.SubProduct, SettingValue = "1" , SettingSource = "1", SettingId = 1}
                };
            var service = MockService();
            commonFeedback.GetSportName("1", Language.en_US).Returns("1");

            // Act
            var actual = service.Public_GetAmendmentSubProduct(1, 1, setting, settingMappings);

            // Assert
            Assert.Equal(1, actual.First().SettingId);
        }

        #endregion GetAmendmentSubProduct

        #region Helpers

        private ResultAmendmentServiceTestable MockService()
        {
            appSettings = new AppJobSettings
            {
                CreatorId = 8,
                TimeSpan = 12
            };
            var appJobSettings = Substitute.For<IOptionsSnapshot<AppJobSettings>>();
            appJobSettings.Value.Returns(appSettings);
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            systemSettingService = Substitute.For<ISystemSettingService>();
            customerService = Substitute.For<ICustomerService>();
            logService = Substitute.For<ICRMLogService>();
            transactionService = Substitute.For<IWinLossTransactionService>();
            commonFeedback = Substitute.For<ICommonFeedback>();

            return Substitute.For<ResultAmendmentServiceTestable>(
                appJobSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                commonFeedback,
                transactionService
                );
        }

        #endregion Helpers
    }
}
