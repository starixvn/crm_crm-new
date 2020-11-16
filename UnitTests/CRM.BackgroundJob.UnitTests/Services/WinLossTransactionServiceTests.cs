using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.BackgroundJob.Criteria.WinLossLimit;
using CRM.BackgroundJob.Models.WinLossLimit;
using CRM.BackgroundJob.Services;
using CRM.Core.Models;
using CRM.Core.Services;
using Fanex.CRM.BackgroundJob.Models;
using NSubstitute;
using Xunit;

namespace CRM.BackgroundJob.UnitTests.Services
{
    public class WinLossTransactionServiceTests
    {
        private IBaseService baseService;

        [Fact]
        public async Task EditFeedbackWinLossInfoAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var criteria = new EditFeedbackWinLossInfoCommand();
            var service = GetWinLossTransactionService();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditFeedbackWinLossInfoCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.EditFeedbackWinLossInfoAsync(12345, "Completed", "");

            // Assert
            Assert.Equal(expected, actual);
        }

        #region ImportWinLimitFeedbackInfoAsync

        [Fact]
        public async Task ImportWinLimitFeedbackInfoAsync_CustomerLimitNull_ReturnValueTupleNull()
        {
            // Arrange
            var cusWinLimit = new List<CustomerWinLimit>();
            var headlines = new List<GroupHeadline>();
            var winLimit = new List<WinLimitFeedBackInfo>();
            var betTypes = new List<BettypeInfo>();
            var winLimitReturn = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betTypes);
            var criteria = new ImportWinLossFeedbackInfoCriteria();
            var service = GetWinLossTransactionService();
            baseService.FetchMultipleAsync<WinLimitFeedBackInfo, BettypeInfo>(Arg.Do<ImportWinLossFeedbackInfoCriteria>(x => criteria = x)).Returns(winLimitReturn);

            // Act
            var actual = await service.ImportWinLimitFeedbackInfoAsync(cusWinLimit, headlines);

            // Assert

            Assert.Empty(actual.Item1);
            Assert.Empty(actual.Item2);
            Assert.Equal("<ROOT></ROOT>", criteria.xml);
        }

        [Fact]
        public async Task ImportWinLimitFeedbackInfoAsync_MaxWinLimitSettingNull_ReturnExpectedXML()
        {
            // Arrange
            var cusWinLimit = new List<CustomerWinLimit>
            {
                new CustomerWinLimit{
                    LogID = 1,
                    MaxWinLimitSetting = "",
                    ProductID = 1,
                    ProductGroup = "1",
                    Level = "1",
                    ReachedTime = new DateTime(2020,11,13),
                    BettypeIDList = "1",
                    CustId = 1,
                    TotalWinAmt = 1000,
                    TotalWinAmt_RM = 1000
                }
            };
            var headlines = new List<GroupHeadline>
            {
                new GroupHeadline
                {
                    CustId = 1,
                    HeadlineId = 1,
                    HeadlineName = "1"
                }
            };
            var winLimit = new List<WinLimitFeedBackInfo>();
            var betTypes = new List<BettypeInfo>();
            var winLimitReturn = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betTypes);
            var XmlTemplate = "<ROOT><r logid='1' custid='1' hl='1' hlname='1' related='1' product='1' group='1' level='1' " +
                                       "limitsetting='0' winamount='1000' winamountRM='1000' time='11/13/2020 12:00:00 AM' bettype='1'/></ROOT>";
            var criteria = new ImportWinLossFeedbackInfoCriteria();
            var service = GetWinLossTransactionService();
            baseService.FetchMultipleAsync<WinLimitFeedBackInfo, BettypeInfo>(Arg.Do<ImportWinLossFeedbackInfoCriteria>(x => criteria = x)).Returns(winLimitReturn);

            // Act
            await service.ImportWinLimitFeedbackInfoAsync(cusWinLimit, headlines);

            // Assert

            Assert.Equal(XmlTemplate, criteria.xml);
        }

        [Fact]
        public async Task ImportWinLimitFeedbackInfoAsync_MaxWinLimitSettingNotNull_ReturnExpectedXML()
        {
            // Arrange
            var cusWinLimit = new List<CustomerWinLimit>
            {
                new CustomerWinLimit{
                    LogID = 1,
                    MaxWinLimitSetting = "<MaxWinLimitSetting Level1='1000' Level2='2000' Level3='5000' Level101='0.00' Level102='0.00' />",
                    ProductID = 1,
                    ProductGroup = "1",
                    Level = "1",
                    LevelID = 3,
                    ReachedTime = new DateTime(2020,11,13),
                    BettypeIDList = "1",
                    CustId = 1,
                    TotalWinAmt = 1000,
                    TotalWinAmt_RM = 1000
                }
            };
            var headlines = new List<GroupHeadline>
            {
                new GroupHeadline
                {
                    CustId = 1,
                    HeadlineId = 1,
                    HeadlineName = "1"
                }
            };
            var winLimit = new List<WinLimitFeedBackInfo>();
            var betTypes = new List<BettypeInfo>();
            var winLimitReturn = new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(winLimit, betTypes);
            var XmlTemplate = "<ROOT><r logid='1' custid='1' hl='1' hlname='1' related='1' product='1' group='1' level='1' " +
                                       "limitsetting='0' winamount='1000' winamountRM='1000' time='11/13/2020 12:00:00 AM' bettype='1'/></ROOT>";
            var criteria = new ImportWinLossFeedbackInfoCriteria();
            var service = GetWinLossTransactionService();
            baseService.FetchMultipleAsync<WinLimitFeedBackInfo, BettypeInfo>(Arg.Do<ImportWinLossFeedbackInfoCriteria>(x => criteria = x)).Returns(winLimitReturn);

            // Act
            await service.ImportWinLimitFeedbackInfoAsync(cusWinLimit, headlines);

            // Assert

            Assert.Equal(XmlTemplate, criteria.xml);
        }

        #endregion ImportWinLimitFeedbackInfoAsync

        [Theory]
        [InlineData(1, 100)]
        [InlineData(2, 200)]
        [InlineData(3, 300)]
        [InlineData(101, 400)]
        [InlineData(102, 500)]
        public void GetLimitSetting_WhenCalled_ReturnExpectedAmount(int levelID, int expect)
        {
            // Arrange
            var setting = new MaxWinLimitSetting
            {
                Level1 = 100,
                Level2 = 200,
                Level3 = 300,
                Level101 = 400,
                Level102 = 500
            };
            var service = GetWinLossTransactionService();

            // Act
            var actual = service.Public_GetLimitSetting(setting, levelID);

            // Assert
            Assert.Equal(expect, actual);
        }

        #region Helpers

        public class WinLossTransactionServiceTestable : WinLossTransactionService
        {
            public WinLossTransactionServiceTestable(
            IBaseService baseService)
            : base(baseService)
            {
            }

            public double Public_GetLimitSetting(MaxWinLimitSetting setting, int levelID)
            {
                return base.GetLimitSetting(setting, levelID);
            }
        }

        private WinLossTransactionServiceTestable GetWinLossTransactionService()
        {
            baseService = Substitute.For<IBaseService>();
            return Substitute.For<WinLossTransactionServiceTestable>(baseService);
        }

        #endregion Helpers
    }
}