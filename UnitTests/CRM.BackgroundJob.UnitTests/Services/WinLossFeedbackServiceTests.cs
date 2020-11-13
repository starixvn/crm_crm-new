namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
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
            service.Protected("GetSolution", winLimit).Returns("solution");
            service.Protected("GetRelatedCustomerXml", winLimit).Returns("related customer xml");
            service.Protected("GetDescription", winLimit, Arg.Any<List<BettypeInfo>>()).Returns("description");

            // Act
            await service.Public_CreateWinLossFeedbackCreditAsync(
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

            var commandResult = new CommandResult { Code = 1, Message = ""};
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

        #endregion CreateWinLossFeedbackCreditAsync

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

        #endregion GetProductXml

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

        #endregion GetSubProduct

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
        public void GetSolution_ProductNameRNGCasino_CallExactFunction()
        {
            // Arrange
            var winlimit = new WinLimitFeedBackInfo
            {
                ProductName = "RNG Casino",
                ProductGroup = "RNG Casino - Minor Jackpot"
            };

            var service = MockService();

            // Act
            service.Public_GetSolution(winlimit);

            // Assert
            service.Received().Protected("GetSolutionRNG", Arg.Any<WinLimitFeedBackInfo>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>()
                );
        }

        [Theory]
        [InlineData("Orange", "GetSolutionLevelOrange")]
        [InlineData("Yellow", "GetSolutionLevelOrange")]
        [InlineData("Grey", "GetSolutionLevelOrange")]
        [InlineData("Red", "GetSolutionLevelRed")]
        [InlineData("Black", "GetSolutionLevelBlack")]
        public void GetSolution_LevelOrangeYellowYellow_CallExactFunction(string level, string expectFunction)
        {
            // Arrange
            var winlimit = new WinLimitFeedBackInfo
            {
                Level = level
            };

            var service = MockService();

            // Act
            service.Public_GetSolution(winlimit);

            // Assert
            service.Received().Protected(expectFunction, Arg.Any<WinLimitFeedBackInfo>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>()
                );
        }

        [Fact]
        public void GetSolution_CallFunction_ReturnExpectTemplate()
        {
            // Arrange
            var winlimit = new WinLimitFeedBackInfo
            {
                ProductName = "RNG Casino",
                ProductGroup = "RNG Casino - Minor Jackpot"
            };

            var service = MockService();
            var stringBuilder = new StringBuilder();
            StringBuilder solution = stringBuilder.Append("Dear Sir, Customer Support ");
            service.Protected("GetSolutionRNG", winlimit, Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>(),
                 Arg.Any<string>()).Returns(solution);

            // Act
            var actual = service.Public_GetSolution(winlimit);

            // Assert
            Assert.Equal(solution.ToString(), actual);
        }

        [Fact]
        public void GetSolutionRNG_CallFunction_ReturnExpectTemplate()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                UserName = "Test",
                Currency = "USD",
                TotalWinAmt = 1000
            };
            const string greeting = "Dear Sir, Customer Support would like to inform that member ";
            const string thanks = "Thank you for your kind attention!";
            const string greetingChinese = "您好, 客服部在此通知 会员 ";
            const string thanksChinese = "谢谢您的关注与支持!";
            var TotalWinAmt = "1,000";

            var stringBuilder = new StringBuilder();
            stringBuilder.Append(greeting);
            stringBuilder.AppendFormat("\"{0}\", has currently won the Jackpot amount of  ", winLimit.UserName);
            stringBuilder.AppendFormat("\"{0} ({1})\" in RNG Casino Baccarat Progressive Jackpot. ", TotalWinAmt, winLimit.Currency);
            stringBuilder.Append(thanks);
            stringBuilder.Append(Constants.LineBreak);
            stringBuilder.Append(greetingChinese);
            stringBuilder.AppendFormat("\"{0}\", 目前在 娱乐城赢了百家乐聚宝奖金 为 ", winLimit.UserName);
            stringBuilder.AppendFormat("\"{0} ({1})\"", TotalWinAmt, winLimit.Currency);
            stringBuilder.Append(thanksChinese);
            stringBuilder.Append(Constants.LineBreak);

            var service = MockService();

            // Act
            var actual = service.Public_GetSolutionRNG(winLimit,
                 greeting,
                 thanks,
                 greetingChinese,
                 thanksChinese);

            // Assert
            Assert.Equal(stringBuilder.ToString(), actual.ToString());
        }

        [Theory]
        [InlineData("Grey", "loss", "输了")]
        [InlineData("Yellow", "won", "赢了")]
        [InlineData("Orange", "won", "赢了")]
        public void GetSolutionLevelOrange_CallFunction_ReturnExpectTemplate(string level, string winloss,string winlossChinese)
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                Level = level,
                UserName = "Test",
                ProductName = "Allbet",
                Currency = "USD",
                TotalWinAmt = 1000
            };
            const string greetingOrangeYellowGreyRNG = "Dear Sir, Customer Support would like to inform that member ";
            const string templateInfor = "\"{0} ({1})\" in \"{2}\". ";
            const string ThanksAttendtion = "Thank you for your kind attention!";
            const string greetingOrangeYellowGreyRNGChinese = "您好, 客服部在此通知 会员 ";
            const string templateInforOrangeChinese = "\"{0} ({1})\". ";
            const string ThanksAttendtionChinese = "谢谢您的关注与支持!";

            var TotalWinAmt = "1,000";

            var stringBuilder = new StringBuilder();
            stringBuilder.Append(greetingOrangeYellowGreyRNG);
            stringBuilder.AppendFormat("{0}, currently has ", winLimit.UserName);
            stringBuilder.AppendFormat("{0} amounted to ", winloss);
            stringBuilder.AppendFormat(templateInfor, TotalWinAmt, winLimit.Currency, winLimit.ProductName);
            stringBuilder.Append(ThanksAttendtion);
            stringBuilder.Append(Constants.LineBreak);
            stringBuilder.Append(greetingOrangeYellowGreyRNGChinese);
            stringBuilder.AppendFormat("\"{0}\", 目前在 {1} {2} ", winLimit.UserName, winLimit.ProductName, winlossChinese);
            stringBuilder.AppendFormat(templateInforOrangeChinese, TotalWinAmt, winLimit.Currency);
            stringBuilder.Append(ThanksAttendtionChinese);
            stringBuilder.Append(Constants.LineBreak);

            var service = MockService();

            // Act
            var actual = service.Public_GetSolutionLevelOrange(winLimit,
                 greetingOrangeYellowGreyRNG,
                 templateInfor,
                 ThanksAttendtion,
                 greetingOrangeYellowGreyRNGChinese,
                 templateInforOrangeChinese,
                 ThanksAttendtionChinese);

            // Assert
            Assert.Equal(stringBuilder.ToString(), actual.ToString());
        }

        [Fact]
        public void GetSolutionLevelRed_CallFunction_ReturnExpectTemplate()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                UserName = "Test",
                Currency = "USD",
                TotalWinAmt = 1000,
                ProductName = "Allbet"
            };
            const string greetingRed = "Dear Sir, Customer Support would like to inform that there is [BIG Winner] under your line. Member username is ";
            const string templateInfor = "\"{0} ({1})\" in \"{2}\". ";
            const string ThanksKindly = "Kindly take note, thank you!";
            const string greetingRedChinese = "您好，客服部在此通知 会员 ";
            const string templateInforChinese = "\"{0} ({1})\" 在 \"{2}\". ";
            const string ThanksKindlyChinese = "请您留意 谢谢!";

            var TotalWinAmt = "1,000";
            var stringBuilder = new StringBuilder();
            stringBuilder.Append(greetingRed);
            stringBuilder.AppendFormat("\"{0}\", currently has won amount of ", winLimit.UserName);
            stringBuilder.AppendFormat(templateInfor, TotalWinAmt, winLimit.Currency, winLimit.ProductName);
            stringBuilder.Append(ThanksKindly);
            stringBuilder.Append(Constants.LineBreak);
            stringBuilder.Append(greetingRedChinese);
            stringBuilder.AppendFormat("\"{0}\", 目前已达到 [赢取金额上限] 数目为 ", winLimit.UserName);
            stringBuilder.AppendFormat(templateInforChinese, TotalWinAmt, winLimit.Currency, winLimit.ProductName);
            stringBuilder.Append(ThanksKindlyChinese);
            stringBuilder.Append(Constants.LineBreak);

            var service = MockService();

            // Act
            var actual = service.Public_GetSolutionLevelRed(winLimit,
                 greetingRed,
                 templateInfor,
                 ThanksKindly,
                 greetingRedChinese,
                 templateInforChinese,
                 ThanksKindlyChinese);

            // Assert
            Assert.Equal(stringBuilder.ToString(), actual.ToString());
        }

        [Fact]
        public void GetSolutionLevelBlack_CallFunction_ReturnExpectTemplate()
        {
            // Arrange
            var winLimit = new WinLimitFeedBackInfo
            {
                UserName = "Test",
                Currency = "USD",
                TotalWinAmt = 1000,
                ProductName = "Allbet"
            };
            const string greetingBlackChinese = "您好，客服部在此通知 会员 ";
            const string greetingBlack = "Dear Sir, Customer Support would like to draw your attention towards member ";
            const string templateInfor = "\"{0} ({1})\" in \"{2}\". ";
            const string ThanksKindly = "Kindly take note, thank you!";
            const string templateInforChinese = "\"{0} ({1})\" 在 \"{2}\". ";
            const string ThanksKindlyChinese = "请您留意 谢谢!";

            var TotalWinAmt = "1,000";
            var stringBuilder = new StringBuilder();
            stringBuilder.Append(greetingBlack);
            stringBuilder.AppendFormat("\"{0}\" has [hit Max Lose Limit] amounted to ", winLimit.UserName);
            stringBuilder.AppendFormat(templateInfor, TotalWinAmt, winLimit.Currency, winLimit.ProductName);
            stringBuilder.Append(ThanksKindly);
            stringBuilder.Append(Constants.LineBreak);
            stringBuilder.Append(greetingBlackChinese);
            stringBuilder.AppendFormat("\"{0}\" 目前已达到 [最高输额上限] 数目为 ", winLimit.UserName);
            stringBuilder.AppendFormat(templateInforChinese, TotalWinAmt, winLimit.Currency, winLimit.ProductName);
            stringBuilder.Append(ThanksKindlyChinese);
            stringBuilder.Append(Constants.LineBreak);

            var service = MockService();

            // Act
            var actual = service.Public_GetSolutionLevelBlack(winLimit,
                 greetingBlack,
                 templateInfor,
                 ThanksKindly,
                 greetingBlackChinese,
                 templateInforChinese,
                 ThanksKindlyChinese);

            // Assert
            Assert.Equal(stringBuilder.ToString(), actual.ToString());
        }
        #endregion GetSolution

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

            return Substitute.For<WinLossFeedbackServiceTesable>(
                appJobSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                transactionService
                );
        }

        #endregion Helpers
    }
}