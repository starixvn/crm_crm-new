namespace CRM.BackgroundJob.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Criteria.ChatBotCWL;
    using CRM.BackgroundJob.Models.ChatBotCWL;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.RemotingRef;
    using NSubstitute;
    using Xunit;

    public class ChatBotCWLServiceTests
    {
        private IBaseService baseService;
        private IRemotingRefService remotingRefService;

        [Fact]
        public async Task GetChatbotCWLLogInfoAsync_WhenCalled_ReturnCWLInfors()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<ChatBotCWLInfo>>();
            var service = GetService();
            baseService.GetDataAsync<ChatBotCWLInfo>(Arg.Any<GetCWLInfoByLogIdCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetChatbotCWLLogInfoAsync(0, 10);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task ImportCWLLogInfoAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var service = GetService();
            var cWLInfos = new List<ChatBotCWLInfo>
            {
                fixture.Create<ChatBotCWLInfo>()
            };

            const string XmlTemplate = "<r LogId='{0}' CustId='{1}' CurrencyName='{2}' " +
                "Username='{3}' Recommend='{4}' Mrecommend='{5}' Srecommend='{6}' " +
                "Winloss='{7}' ProductNameEN='{8}' ProductNameSC='{9}' ProductNameTH='{10}' " +
                "ProductNameVN='{11}' LevelId='{12}' GroupId='{13}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());

            var productEN = service.GetProductName(Arg.Any<string>(),"en-US").Returns("a");
            var productSC = service.GetProductName(Arg.Any<string>(), "zh-CN").Returns("b");
            var productTH = service.GetProductName(Arg.Any<string>(), "th-TH").Returns("c");
            var productVN = service.GetProductName(Arg.Any<string>(), "vi-VN").Returns("d");
            var cWLInfo = cWLInfos.First();
            stringBuilder.AppendFormat(XmlTemplate,
                    cWLInfo.LogId,
                    cWLInfo.CustId,
                    cWLInfo.CurrencyName,
                    cWLInfo.Username,
                    cWLInfo.Recommend,
                    cWLInfo.Mrecommend,
                    cWLInfo.Srecommend,
                    cWLInfo.Winloss,
                    "a",
                    "b",
                    "c",
                    "d",
                    cWLInfo.LevelId,
                    cWLInfo.GroupId);
            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new ImportCWLLogInfoCommand();

            var expected = fixture.Create<CommandResult>();
            baseService.ExecuteNonQueryAsync(Arg.Do<ImportCWLLogInfoCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.ImportCWLLogInfoAsync(cWLInfos, Constants.DefaultEnviroment);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(stringBuilder.ToString(), criteria.XmlData);
            Assert.Equal(Constants.DefaultEnviroment, criteria.Environment);
            Assert.Equal(0, criteria.ErrCode);
            Assert.Equal(null, criteria.ErrMsg);

        }

        #region Helpers

        private ChatBotCWLService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            remotingRefService = Substitute.For<IRemotingRefService>();
            return new ChatBotCWLService(baseService, remotingRefService);
        }

        #endregion Helpers
    }
}
