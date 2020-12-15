namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models.TurnoverControll;
    using CRM.BackgroundJob.Models.WinLossLimit;
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
    using Xunit;

    public class TOControlFeedbackServiceTests
    {
        private AppJobSettings appSettings;
        private IBaseService baseService;
        private ISettingService settingService;
        private ISystemSettingService systemSettingService;
        private ICustomerService customerService;
        private ICRMLogService logService;
        private IWinLossTransactionService transactionService;
        private ICommonFeedback commonFeedback;
        private readonly IFixture fixture = new Fixture();

        #region CreateFeedbackForTurnoverControlAsync

        [Fact]
        public async Task CreateFeedbackForTurnoverControlAsync_NotExistedTOFeedbacksInfor_ExpectedUpdateSystemSetting()
        {
            // Arrange
            var service = MockService();
            var turnOverSetting = fixture.Create<WinLossSystemSetting>();
            var custNotifications = fixture.Create<IEnumerable<TONotification>>();
            var custOutStandings = fixture.Create<IEnumerable<CustOutStanding>>();
            var importTOFeedbacks = new List<TOControlFeedbackInfor>();
            customerService.GetListSMANotificationAsync(turnOverSetting).Returns(custNotifications);
            customerService.GetListCustOutStandingAsync(custNotifications).Returns(custOutStandings);

            transactionService.ImportTOControllFeedbackInfoAsync(
                Arg.Any<IEnumerable<GroupHeadline>>(),
                Arg.Any<IEnumerable<CustOutStanding>>(),
                Arg.Any<IEnumerable<TONotification>>())
                .Returns(importTOFeedbacks);
            // Act
            await service.CreateFeedbackForTurnoverControlAsync(turnOverSetting);

            // Assert
            service.Received().Protected("EditTOSystemSettingAsync", Arg.Any<DateTime>());
            service.DidNotReceive().Protected(
                "CreateTOControlFeedbackAsync",
                Arg.Any<List<TOControlFeedbackInfor>>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        [Fact]
        public async Task CreateFeedbackForTurnoverControlAsync_ExistedTOFeedbacksInfor_ExpectedEditTOSystemSettingAsyncAndCallCreateTOControlFeedbackAsync()
        {
            // Arrange
            var service = MockService();
            var turnOverSetting = fixture.Create<WinLossSystemSetting>();
            var custNotifications = fixture.Create<IEnumerable<TONotification>>();
            var custOutStandings = fixture.Create<IEnumerable<CustOutStanding>>();
            var importTOFeedbacks = fixture.Create<IEnumerable<TOControlFeedbackInfor>>();
            customerService.GetListSMANotificationAsync(turnOverSetting).Returns(custNotifications);
            customerService.GetListCustOutStandingAsync(custNotifications).Returns(custOutStandings);

            transactionService.ImportTOControllFeedbackInfoAsync(
                Arg.Any<IEnumerable<GroupHeadline>>(),
                Arg.Any<IEnumerable<CustOutStanding>>(),
                Arg.Any<IEnumerable<TONotification>>())
                .Returns(importTOFeedbacks);
            // Act
            await service.CreateFeedbackForTurnoverControlAsync(turnOverSetting);

            // Assert
            service.Received().Protected("EditTOSystemSettingAsync", Arg.Any<DateTime>());
            service.Received().Protected(
                "CreateTOControlFeedbackAsync",
                Arg.Any<List<TOControlFeedbackInfor>>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        #endregion CreateFeedbackForTurnoverControlAsync

        #region CreateTOControlFeedbackAsync

        [Fact]
        public async Task CreateTOControlFeedbackAsync__CreateNewCriteria_ExpectedToCallFunction()
        {
            // Arrange
            var ToInfors = new List<TOControlFeedbackInfor>
            {
                new TOControlFeedbackInfor
                {
                    SportType = 2,
                    BettypeList = "1,20",
                    LogID = 1,
                    HeadlineID = 1,
                    HeadlineName = "1",
                    ProfileID = 1,
                    ProfileName = "1",
                    CustID = 1
                }
            };

            var settings = new List<SettingItem>
            {
                new SettingItem { SettingId = 1, SettingName = "Status", SettingValue = "Closed" },
                new SettingItem { SettingId = 2, SettingName = "Response", SettingValue = "Neutral" },
                new SettingItem { SettingId = 2022, SettingName = "Station" }
            };
            var setting = new SettingItem
            {
                SettingId = 1
            };

            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var category = fixture.Create<Tuple<int, int, string>>();
            var service = MockService();
            commonFeedback.GetCategorySubCategoryCWL(settings, DefaultValue.MANotification).Returns(category);
            service.Protected("GetTOSportsbookProduct", settings).Returns(setting);
            service.Protected("GetTOProductXml", Arg.Any<List<string>>(), setting.SettingId, Arg.Any<List<string>>(), settings, settingMappings).Returns("product xml");
            service.Protected("GetTOSolution", ToInfors).Returns("solution");
            service.Protected("GetTORelatedCustomerXml", ToInfors[0]).Returns("related customer xml");
            service.Protected("GetTODescription", ToInfors).Returns("description");

            // Act
            await service.Public_CreateTOControlFeedbackAsync(
                ToInfors,
                settings,
                settingMappings
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            service.Received().Protected("CheckValidTOParamsAndInsertFeedbackAsync", Arg.Any<TOControlFeedbackInfor>()
                , Arg.Any<CreateMutipleFeedbackCommand>());
        }

        #endregion CreateTOControlFeedbackAsync

        #region CheckValidTOParamsAndInsertFeedbackAsync

        [Fact]
        public async Task CheckValidTOParamsAndInsertFeedbackAsync_CreateSuccessfull_ExpectedWriteLog()
        {
            // Arrange
            var ToInfor = new TOControlFeedbackInfor
            {
                LogID = 1,
                HeadlineID = 1,
                HeadlineName = "1",
                ProfileID = 1,
                ProfileName = "1",
                CustID = 1
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(true, ""));

            var commandResult = new CommandResult { Code = 0 };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidTOParamsAndInsertFeedbackAsync(
                ToInfor,
                criteria
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task CheckValidTOParamsAndInsertFeedbackAsync_CreateUnSuccessfull_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var ToInfor = new TOControlFeedbackInfor
            {
                LogID = 1,
                HeadlineID = 1,
                HeadlineName = "1",
                ProfileID = 1,
                ProfileName = "1",
                CustID = 1
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(true, ""));

            var commandResult = new CommandResult { Code = 1, Message = "" };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidTOParamsAndInsertFeedbackAsync(
                ToInfor,
                criteria
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(ToInfor.LogID, CreateFeedbackJobStatus.Fail, commandResult.Message);
            await logService.ErrorAsync(commandResult, criteria);
        }

        [Fact]
        public async Task CheckValidTOParamsAndInsertFeedbackAsync_InvalidParams_ExpectedReturnAndUpdateStatus()
        {
            // Arrange
            var ToInfor = new TOControlFeedbackInfor
            {
                LogID = 1,
                HeadlineID = 1,
                HeadlineName = "1",
                ProfileID = 1,
                ProfileName = "1",
                CustID = 1
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(false, ""));

            var commandResult = new CommandResult { Code = 0 };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidTOParamsAndInsertFeedbackAsync(
                ToInfor,
                criteria
                );

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(ToInfor.LogID, CreateFeedbackJobStatus.Fail, Arg.Any<string>());
        }

        [Fact]
        public async Task CheckValidTOParamsAndInsertFeedbackAsync_Exception_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var ToInfor = new TOControlFeedbackInfor
            {
                LogID = 1,
                HeadlineID = 1,
                HeadlineName = "1",
                ProfileID = 1,
                ProfileName = "1",
                CustID = 1
            };
            var exception = fixture.Create<Exception>();
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            commonFeedback.CheckFeedbackValidParams(criteria).Returns(new ValueTuple<bool, string>(true, ""));

            baseService.When(x => x.ExecuteNonQueryAsync(criteria)).Throw(exception);

            // Act
            await service.Public_CheckValidTOParamsAndInsertFeedbackAsync(
                ToInfor,
                criteria
                );

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(ToInfor.LogID, CreateFeedbackJobStatus.Fail, exception.Message);
            await logService.ErrorAsync(exception);
        }

        #endregion CheckValidTOParamsAndInsertFeedbackAsync

        #region GetTOProductXml

        [Fact]
        public void GetProductXml_NotExistedBetType_ReturnExpectedXml()
        {
            // Arrange
            var betTypeMappings = fixture.Create<List<string>>();
            var sportNames = fixture.Create<List<string>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var subProduct = new List<SettingItem>
            {
                new SettingItem{ SettingId = 1 }
            };
            var product = new SettingItem
            {
                SettingId = 1,
                SettingName = "test"
            };
            var tempBettypes = new List<SystemSettingMapping>();
            var service = MockService();
            service.Protected("GetTOSportsbookProduct",settings).Returns(product);
            service.Protected("GetTOSubProduct", product.SettingId, sportNames, settings, settingMappings).Returns(subProduct);
            service.Protected("GetTOBettype", betTypeMappings, settingMappings).Returns(tempBettypes);

            // Act
            var actual = service.Public_GetTOProductXml(sportNames, product.SettingId, betTypeMappings, settings, settingMappings);

            // Assert
            Assert.Equal("<ROOT><Product ProductID='1' SubProductID='1' BetTypeID='9144' /></ROOT>", actual);
        }

        [Fact]
        public void GetProductXml_ExistedBetType_ReturnExpectedXml()
        {
            // Arrange
            var betTypeMappings = fixture.Create<List<string>>();
            var sportNames = fixture.Create<List<string>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var subProduct = new List<SettingItem>
            {
                new SettingItem{ SettingId = 1 }
            };
            var product = new SettingItem
            {
                SettingId = 1,
                SettingName = "test"
            };
            var tempBettypes = new List<SystemSettingMapping>
            {
                new SystemSettingMapping{ SettingId = 1 }
            };
            var service = MockService();
            service.Protected("GetTOSportsbookProduct", settings).Returns(product);
            service.Protected("GetTOSubProduct", product.SettingId, sportNames, settings, settingMappings).Returns(subProduct);
            service.Protected("GetTOBettype", betTypeMappings, settingMappings).Returns(tempBettypes);

            // Act
            var actual = service.Public_GetTOProductXml(sportNames, product.SettingId, betTypeMappings, settings, settingMappings);

            // Assert
            Assert.Equal("<ROOT><Product ProductID='1' SubProductID='1' BetTypeID='1' /></ROOT>", actual);
        }

        #endregion GetTOProductXml

        #region GetTOSportsbookProduct

        [Fact]
        public void GetTOSportsbookProduct_NotExistSportbook_ReturnDefaultProduct()
        {
            // Arrange
            var setting = new List<SettingItem>
                {
                    new SettingItem { SettingName = "Product", SettingValue = "sportbook1" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetTOSportsbookProduct(setting);

            // Assert
            Assert.Equal(Constants.ProductNA, actual.SettingId);
        }

        [Fact]
        public void GetTOSportsbookProduct_ExistSportbook_ReturnDefaultProduct()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem
                    {
                        SettingName = "Product",
                        SettingValue = "Sportsbook",
                        SettingId = 1
                    }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetTOSportsbookProduct(settings);

            // Assert
            Assert.Equal(1, actual.SettingId);
        }

        #endregion GetTOSportsbookProduct

        #region GetTOSubProduct

        [Fact]
        public void GetTOSubProduct_NotExistedsportNames_ReturnDefaultSubProduct()
        {
            // Arrange
            var sportNames = fixture.Create<List<string>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();

            var service = MockService();

            // Act
            var actual = service.Public_GetTOSubProduct(1, sportNames, settings, settingMappings);

            // Assert
            Assert.Single(actual);
            Assert.Equal(Constants.SubProductNA, actual.First().SettingId);
        }

        [Fact]
        public void GetTOSubProduct_ExistedsportNames_ReturnExpectedSubProduct()
        {
            // Arrange
            var sportNames = new List<string>
            {
                "1"
            };
            var settings = new List<SettingItem>
            {
                new SettingItem
                {
                    SettingName = "SubProduct",
                    ParentIds = new List<int>{1} ,
                    SettingId = 1
                }
            };
            var settingMappings = new List<SystemSettingMapping>
            {
                new SystemSettingMapping
                {
                    SettingName = "SubProduct",
                    SettingId = 1,
                    SettingSource = "1"
                }
            };

            var service = MockService();

            // Act
            var actual = service.Public_GetTOSubProduct(1, sportNames, settings, settingMappings);

            // Assert
            Assert.Single(actual);
            Assert.Equal(1, actual.First().SettingId);
        }

        #endregion GetTOSubProduct

        #region GetTOBettype

        [Fact]
        public void GetTOBettype_NotExistedbetTypeMappings_ReturnDefaultBettype()
        {
            // Arrange
            var betTypeMappings = fixture.Create<List<string>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();

            var service = MockService();

            // Act
            var actual = service.Public_GetTOBettype(betTypeMappings, settingMappings);

            // Assert
            Assert.Single(actual);
            Assert.Equal(Constants.BettypeNA, actual.First().SettingId);
        }

        [Fact]
        public void GetTOBettype_ExistedbetTypeMappings_ReturnExpectedBettype()
        {
            // Arrange
            var betTypeMappings = new List<string>
            {
                "1"
            };
            var settingMappings = new List<SystemSettingMapping>
            {
                new SystemSettingMapping
                {
                    SettingName = "Bettype",
                    SettingSource = "1",
                    SettingId = 1
                }

            };
            var service = MockService();

            // Act
            var actual = service.Public_GetTOBettype(betTypeMappings, settingMappings);

            // Assert
            Assert.Single(actual);
            Assert.Equal(1, actual.First().SettingId);
        }

        #endregion GetTOBettype

        #region GetTORelatedCustomerXml

        [Fact]
        public void GetTORelatedCustomerXml_CallFunction_ReturnExpectTemplate()
        {
            // Arrange
            var Toinfor = new TOControlFeedbackInfor
            {
                HeadlineID = 1,
                RelatedCustID = 1,
                UserName = "test"
            };

            var service = MockService();

            // Act
            var actual = service.Public_GetTORelatedCustomerXml(Toinfor);

            // Assert
            Assert.Equal("<ROOT><Row CustId='1' RelatedCustId='1' Username='test' /></ROOT>", actual);
        }

        #endregion GetTORelatedCustomerXml

        #region Helpers

        private TOControlFeedbackServiceTestable MockService()
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

            return Substitute.For<TOControlFeedbackServiceTestable>(
                appJobSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                transactionService,
                commonFeedback
                );
        }

        #endregion Helpers

    }
}