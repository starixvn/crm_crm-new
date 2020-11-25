namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Models;
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

    public class WinLossFeedbackServiceTests
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

        #region CreateFeedbackForWinLossLimitAsync

        [Fact]
        public async Task CreateFeedbackForWinLossLimitAsync_NotExistedWinlossInfo_ExpectedUpdateSystemSetting()
        {
            // Arrange
            var service = MockService();
            var setting = fixture.Create<WinLossSystemSetting>();
            var cusWinLimit = fixture.Create<IEnumerable<CustomerWinLimit>>();
            var winLimit = new List<WinLimitFeedBackInfo>();
            var betInfo = fixture.Create<IEnumerable<BettypeInfo>>();
            var winlossInfo = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betInfo);
            customerService.GetListCustReachLimitAsync(setting).Returns(cusWinLimit);
            transactionService.ImportWinLimitFeedbackInfoAsync(Arg.Any<IEnumerable<CustomerWinLimit>>(), Arg.Any<IEnumerable<GroupHeadline>>()).Returns(winlossInfo);
            // Act
            await service.CreateFeedbackForWinLossLimitAsync(setting);

            // Assert
            service.Received().Protected("EditWinLossSystemSettingAsync", Arg.Any<int>());
            service.DidNotReceive().Protected(
                "CreateWinLossFeedbackCreditAsync",
                Arg.Any<WinLimitFeedBackInfo>(),
                Arg.Any<IEnumerable<BettypeInfo>>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        [Fact]
        public async Task CreateFeedbackForWinLossLimitAsync_ExistedWinlossInfo_ExpectedUpdateSystemSetting()
        {
            // Arrange
            var service = MockService();
            var setting = fixture.Create<WinLossSystemSetting>();
            var cusWinLimit = fixture.Create<IEnumerable<CustomerWinLimit>>();
            var winLimit = new List<WinLimitFeedBackInfo>
            {
                new WinLimitFeedBackInfo { LogID = 1, CustId = 1}
            };
            var betInfo = new List<BettypeInfo>
            {
                new BettypeInfo {Name = "Gaming", Bettype = "1"}
            };
            var winlossInfo = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betInfo);
            customerService.GetListCustReachLimitAsync(setting).Returns(cusWinLimit);
            transactionService.ImportWinLimitFeedbackInfoAsync(Arg.Any<IEnumerable<CustomerWinLimit>>(), Arg.Any<IEnumerable<GroupHeadline>>()).Returns(winlossInfo);

            // Act
            await service.CreateFeedbackForWinLossLimitAsync(setting);

            // Assert
            service.Received().Protected("EditWinLossSystemSettingAsync", Arg.Any<int>());
            service.Received().Protected(
                "CreateWinLossFeedbackCreditAsync",
                Arg.Any<WinLimitFeedBackInfo>(),
                Arg.Any<IEnumerable<BettypeInfo>>(),
                Arg.Any<IEnumerable<SettingItem>>(),
                Arg.Any<IEnumerable<SystemSettingMapping>>());
        }

        #endregion CreateFeedbackForWinLossLimitAsync

        #region CreateWinLossFeedbackCreditAsync

        [Fact]
        public async Task CreateWinLossFeedbackCreditAsync__CreateNewCriteria_ExpectedToCallFunction()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var betInfo = new List<BettypeInfo>
            {
                new BettypeInfo {Name = "Gaming", Bettype = "1"},
                new BettypeInfo {Name = "Bet", Bettype = "2" }
            };
            var settings = new List<SettingItem>
            {
                new SettingItem { SettingId = 1, SettingName = "Status", SettingValue = "Closed" },
                new SettingItem { SettingId = 2, SettingName = "Response", SettingValue = "Neutral" },
                new SettingItem { SettingId = 2022, SettingName = "Station" }
            };
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var category = fixture.Create<Tuple<int, int, string>>();
            var service = MockService();
            service.Protected("GetCategorySubCategoryWinloss", settings).Returns(category);
            service.Protected("GetProductXml", winLimit, Arg.Any<List<BettypeInfo>>(), settings, settingMappings).Returns("product xml");
            service.Protected("GetSolution", winLimit, true).Returns("solution");
            service.Protected("GetRelatedCustomerXml", winLimit).Returns("related customer xml");
            service.Protected("GetDescription", winLimit, Arg.Any<List<BettypeInfo>>()).Returns("description");

            // Act
            await service.Public_CreateWinLossFeedbackCreditAsync(
                false,
                winLimit,
                betInfo,
                settings,
                settingMappings
                );

            // Assert
            service.Received().Protected("CheckValidParamsAndInsertFeedbackAsync", Arg.Any<WinLimitFeedBackInfo>()
                , Arg.Any<CreateMutipleFeedbackCommand>());
        }

        #endregion CreateWinLossFeedbackCreditAsync

        #region CheckValidParamsAndInsertFeedbackAsync

        [Fact]
        public async Task CheckValidParamsAndInsertFeedbackAsync__CreateSuccessfull_ExpectedWriteLog()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            service.Protected("CheckValidParams", criteria).Returns(new ValueTuple<bool, string>(true, ""));

            var commandResult = new CommandResult { Code = 0 };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidParamsAndInsertFeedbackAsync(
                winLimit,
                criteria
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task CheckValidParamsAndInsertFeedbackAsync__CreateUnSuccessfull_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            service.Protected("CheckValidParams", criteria).Returns(new ValueTuple<bool, string>(true, ""));

            var commandResult = new CommandResult { Code = 1, Message = "" };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidParamsAndInsertFeedbackAsync(
                winLimit,
                criteria
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, commandResult.Message);
            await logService.ErrorAsync(commandResult, criteria);
        }

        [Fact]
        public async Task CheckValidParamsAndInsertFeedbackAsync__InvalidParams_ExpectedReturnAndUpdateStatus()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            service.Protected("CheckValidParams", criteria).Returns(new ValueTuple<bool, string>(false, ""));

            var commandResult = new CommandResult { Code = 0 };
            baseService.ExecuteNonQueryAsync(criteria).Returns(commandResult);

            // Act
            await service.Public_CheckValidParamsAndInsertFeedbackAsync(
                winLimit,
                criteria
                );

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, Arg.Any<string>());
        }

        [Fact]
        public async Task CheckValidParamsAndInsertFeedbackAsync__Exception_ExpectedWriteLogAndUpdateStatus()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                LogID = 1,
                CustId = 1,
                BettypeIDList = "1,2",
                HeadlineId = 1,
                HeadlineName = "headline",
                RelatedCustId = "1",
                UserName = "test"
            };
            var exception = fixture.Create<Exception>();
            var criteria = fixture.Create<CreateMutipleFeedbackCommand>();
            var service = MockService();
            service.Protected("CheckValidParams",
                criteria
                ).Returns(new ValueTuple<bool, string>(true, ""));

            baseService.When(x => x.ExecuteNonQueryAsync(criteria)).Throw(exception);

            // Act
            await service.Public_CheckValidParamsAndInsertFeedbackAsync(
                winLimit,
                criteria
                );

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await transactionService.EditFeedbackWinLossInfoAsync(winLimit.LogID, CreateFeedbackJobStatus.Fail, exception.Message);
            await logService.ErrorAsync(exception);
        }

        #endregion CheckValidParamsAndInsertFeedbackAsync

        #region CheckValidParams

        [Fact]
        public void CheckValidParams__ValidParamsCriteria_ExpectedReturnTrue()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1,
            };
            var expect = new ValueTuple<bool, string>(true, "");
            var service = MockService();

            // Act
            var result = service.Public_CheckValidParams(criteria);

            // Assert
            result.Equals(expect);
        }

        [Fact]
        public void CheckValidParams__InValidParamsCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1,
            };
            var expect = new ValueTuple<bool, string>(false, "CategoryIds is null.");
            var service = MockService();

            // Act
            var result = service.Public_CheckValidParams(criteria);

            // Assert
            result.Equals(expect);
        }

        #endregion CheckValidParams

        #region GetProductXml

        [Fact]
        public void GetProductXml_NotExistedBetType_ReturnExpectedXml()
        {
            // Arrange
            var winLimit = fixture.Create<WinLimitFeedBackInfo>();
            var betTypeMappings = fixture.Create<List<BettypeInfo>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var subProduct = new SystemSettingMapping
            {
                SettingId = 1
            };
            var products = new List<SystemSettingMapping>
            {
                new SystemSettingMapping
                {
                    SettingId = 1
                }
            };
            var tempBettypes = new List<SystemSettingMapping>();
            var service = MockService();
            service.Protected("GetProduct", settingMappings, subProduct.SettingSource).Returns(products);
            service.Protected("GetSubProduct", winLimit, settingMappings).Returns(subProduct);
            service.Protected("GetBettype", betTypeMappings, settingMappings).Returns(tempBettypes);

            // Act
            var actual = service.Public_GetProductXml(winLimit, betTypeMappings, settings, settingMappings);

            // Assert
            Assert.Equal("<ROOT><Product ProductID='1' SubProductID='1' BetTypeID='9144' /></ROOT>", actual);
        }

        [Fact]
        public void GetProductXml_ExistedBetType_ReturnExpectedXml()
        {
            // Arrange
            var winLimit = fixture.Create<WinLimitFeedBackInfo>();
            var betTypeMappings = fixture.Create<List<BettypeInfo>>();
            var settings = fixture.Create<IEnumerable<SettingItem>>();
            var settingMappings = fixture.Create<IEnumerable<SystemSettingMapping>>();
            var subProduct = new SystemSettingMapping
            {
                SettingId = 1
            };
            var products = new List<SystemSettingMapping>
            {
                new SystemSettingMapping
                {
                    SettingId = 1
                }
            };
            var tempBettypes = new List<SystemSettingMapping>
            {
                new SystemSettingMapping
                {
                    SettingId = 1
                }
            };
            var service = MockService();
            service.Protected("GetProduct", settingMappings, subProduct.SettingSource).Returns(products);
            service.Protected("GetSubProduct", winLimit, settingMappings).Returns(subProduct);
            service.Protected("GetBettype", betTypeMappings, settingMappings).Returns(tempBettypes);

            // Act
            var actual = service.Public_GetProductXml(winLimit, betTypeMappings, settings, settingMappings);

            // Assert
            Assert.Equal("<ROOT><Product ProductID='1' SubProductID='1' BetTypeID='1' /></ROOT>", actual);
        }

        #endregion GetProductXml

        #region GetProduct

        [Fact]
        public void GetProduct_NotExistSubProduct_ReturnDefaultProduct()
        {
            // Arrange
            var subProduct = "1";
            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "Product", SettingSource = "2" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetProduct(settingMappings, subProduct);

            // Assert
            Assert.Single(actual);
            Assert.Equal(Constants.ProductNA, actual.First().SettingId);
        }

        [Fact]
        public void GetProduct_ExistSubProduct_ReturnExpectedProduct()
        {
            // Arrange
            var subProduct = "1";
            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "Product", SettingSource = "1" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetProduct(settingMappings, subProduct);

            // Assert
            Assert.Single(actual);
            Assert.Equal(settingMappings.First(), actual.First());
        }

        #endregion GetProduct

        #region GetSubProduct

        [Fact]
        public void GetSubProduct_NotExistProductName_ReturnDefaultSubProduct()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                ProductName = "game"
            };
            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "SubProduct", SettingSource = "allbet" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetSubProduct(winLimit, settingMappings);

            // Assert
            Assert.Equal(Constants.SubProductNA, actual.SettingId);
        }

        [Fact]
        public void GetSubProduct_ExistProductName_ReturnExpectedSubproduct()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                ProductName = "game"
            };
            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "SubProduct", SettingSource = "game" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetSubProduct(winLimit, settingMappings);

            // Assert
            Assert.Equal(settingMappings.FirstOrDefault(), actual);
        }

        #endregion GetSubProduct

        #region GetCategorySubCategoryWinloss

        [Fact]
        public void GetCategorySubCategoryWinloss_NotExistMainCategory_ReturnDefaultMainCategoryXML()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem { SettingName = "MainCategory", SettingValue = "Special" }
                };
            var service = MockService();

            // Act
            var actual = service.Public_GetCategorySubCategoryWinloss(settings);

            // Assert
            Assert.Equal(0, actual.Item1);
            Assert.Equal(0, actual.Item2);
            Assert.Equal("<ROOT><Category MainCategoryID='0' SubCategoryID='0' /></ROOT>", actual.Item3);
        }

        [Fact]
        public void GetCategorySubCategoryWinloss_ExistMainCategoryAndNotExistSubCategory_ReturnExpectedTuple()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem { SettingId = 1, SettingName = "MainCategory", SettingValue = "Special Notification" },
                    new SettingItem { SettingName = "SubCategory", SettingValue = "Company" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetCategorySubCategoryWinloss(settings);

            // Assert
            Assert.Equal(1, actual.Item1);
            Assert.Equal(0, actual.Item2);
            Assert.Equal("<ROOT><Category MainCategoryID='1' SubCategoryID='0' /></ROOT>", actual.Item3);
        }

        [Fact]
        public void GetCategorySubCategoryWinloss_ExistMainCategoryAndExistSubCategory_ReturnExpectedTuple()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem { SettingId = 1, SettingName = "MainCategory", SettingValue = "Special Notification" },
                    new SettingItem { SettingId = 2, SettingName = "SubCategory", SettingValue = "Company W/L Limit" , ParentIds = new List<int>{ 1 }}
                };
            var service = MockService();

            // Act
            var actual = service.Public_GetCategorySubCategoryWinloss(settings);

            // Assert
            Assert.Equal(1, actual.Item1);
            Assert.Equal(2, actual.Item2);
            Assert.Equal("<ROOT><Category MainCategoryID='1' SubCategoryID='2' /></ROOT>", actual.Item3);
        }

        #endregion GetCategorySubCategoryWinloss

        #region GetBettype

        [Fact]
        public void GetBettype_NotExistBetTypeMappings_ReturnDefaultBetType()
        {
            // Arrange
            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingName = "Bettype", SettingSource = "a" }
                };
            var betTypeMappings = new List<BettypeInfo>
                {
                    new BettypeInfo { Name = "b" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetBettype(betTypeMappings, settingMappings);

            // Assert
            Assert.Single(actual);
            Assert.Equal(Constants.BettypeNA, actual.First().SettingId);
        }

        [Fact]
        public void GetBettype_ExistBetTypeMappings_ReturnExpectedBetType()
        {
            // Arrange
            var settingMappings = new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = 1, SettingName = "Bettype", SettingSource = "a" }
                };
            var betTypeMappings = new List<BettypeInfo>
                {
                    new BettypeInfo { Name = "a" }
                };

            var service = MockService();

            // Act
            var actual = service.Public_GetBettype(betTypeMappings, settingMappings);

            // Assert
            Assert.Equal(settingMappings.First(), actual.First());
        }

        #endregion GetBettype

        #region GetSolution

        [Fact]
        public void GetSolution_ProductNameRNGCasinoNotVipCustomer_CallExactFunction()
        {
            // Arrange
            var winlimit = new WinLimitFeedBackInfo
            {
                UserName ="test",
                TotalWinAmt = 1000,
                Currency = "USD",
                ProductID = 1,
                ProductName = "RNG Casino",
                ProductGroup = "RNG Casino - Minor Jackpot"
            };

            var service = MockService();
            var template = new FeedbackTemplate
            {
                Templates = new List<Template>
                {
                    new Template{RNGTemplateENSC = "{0} {1} {2} {3}"}
                }
            };
            commonFeedback.GetFeedbackTemplates(Arg.Any<string>()).Returns(template);
            var expect = "test 1000 USD" + Constants.LineBreak;

            // Act
            var result = service.Public_GetSolution(winlimit, false);

            // Assert
            result.Equals(expect);
        }

        #endregion GetSolution

        #region GetDescription

        public static IEnumerable<object[]> TestBetTypesCount()
        {
            return new List<object[]>
           {
                new object[] { new List<BettypeInfo>
                {
                    new BettypeInfo{Name = "a"},
                    new BettypeInfo{Name = "b"},
                    new BettypeInfo{Name = "c"},
                    new BettypeInfo{Name = "d"}
                }, "a, b, c"},
                new object[] { new List<BettypeInfo>
                {
                    new BettypeInfo{Name = "a"},
                    new BettypeInfo{Name = "b"},
                }, "a, b"}
           };
        }

        [Theory]
        [MemberData(nameof(TestBetTypesCount))]
        public void GetDescription_WhenCalled_ReturnExpectTemplate(
                List<BettypeInfo> bettypes,
                string numGamesFormat)
        {
            // Arrange
            var winlimit = new WinLimitFeedBackInfo
            {
                MaxWinLimitSetting = "1000",
                TotalWinAmt_RM = 1000,
                TotalWinAmt = 1000,
                UserName = "Test",
                Site = "123",
                Currency = "USD",
                ReachedTime = new DateTime(2020, 11, 13),
                Level = "Red"
            };

            var service = MockService();
            var description = new StringBuilder("<span style=\"color: rgb(255, 0, 0);\">This is an auto-generated entry.</span>");
            description.Append("<br />Informed Headline Win/Loss Alert for below member:");
            description.AppendFormat("<br />Product: {0}", winlimit.ProductName);
            description.Append("<br />Game Type: ");
            description.AppendFormat(bettypes.Count > 3 ? "{0} ..." : "{0}", numGamesFormat);
            description.AppendFormat("<br /> UserName: {0}, Site: {1}", winlimit.UserName, winlimit.Site);
            description.AppendFormat("<br /> Winning/Losing Limit Amount: {0} (RM), Winning/Losing Amount in RM: {1} (RM), Winloss Amount in player currency: {2} ({3})"
            , "1,000", "1,000", "1,000", winlimit.Currency);
            description.AppendFormat("<br />Reached Limit Time: {0}, Reached Limit Level: {1}", winlimit.ReachedTime, winlimit.Level);
            description.Append(Constants.LineBreak);

            // Act
            var actual = service.Public_GetDescription(winlimit, bettypes);

            // Assert
            Assert.Equal(description.ToString(), actual);
        }

        #endregion GetDescription

        #region GetRelatedCustomerXml
        [Fact]
        public void GetRelatedCustomerXml_CallFunction_ReturnExpectTemplate()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                HeadlineId = 1,
                RelatedCustId = "1",
                UserName = "test"
            };

            var service = MockService();

            // Act
            var actual = service.Public_GetRelatedCustomerXml(winLimit);

            // Assert
            Assert.Equal("<ROOT><Row CustId='1' RelatedCustId='1' Username='test' /></ROOT>", actual);
        }
        #endregion GetRelatedCustomerXml

        [Fact]
        public async Task EditWinLossSystemSettingAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var service = MockService();
            systemSettingService.EditSystemSettingAsync(Arg.Any<IEnumerable<SystemSettingItem>>(), Constants.ServiceName_WinLimitFB).Returns(commandResult);

            // Act
            var actual = await service.Public_EditWinLossSystemSettingAsync(1);

            // Assert
            Assert.Equal(commandResult, actual);
        }

        #region Helpers

        private WinLossFeedbackServiceTesable MockService()
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

            return Substitute.For<WinLossFeedbackServiceTesable>(
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