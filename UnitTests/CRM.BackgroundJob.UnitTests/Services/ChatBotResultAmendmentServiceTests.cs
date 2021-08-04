namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Criteria.ChatBot_ResultAmendment;
    using CRM.BackgroundJob.Models.ChatBotResulAmendment;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using NSubstitute;
    using Xunit;

    public class ChatBotResultAmendmentServiceTests
    {
        private  IBaseService baseService;
        private  ICommonFeedback commonFeedback;

        [Fact]
        public async Task GetChatBotResultAmendmentInfoAsync_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var settingResultAmendment = fixture.Create<AbnormalBetSystemSetting>();
            var ticketEvents = fixture.Create<IEnumerable<AmendmentResultTicketEvent>>();
            var ticketTransactions = fixture.Create<IEnumerable<AmendmentResultTransaction>>();
            var events = fixture.Create<IEnumerable<TicketEvent>>();
            var expected = new ValueTuple<IEnumerable<AmendmentResultTicketEvent>,IEnumerable<AmendmentResultTransaction>,IEnumerable<TicketEvent>>(ticketEvents, ticketTransactions, events);
            var service = GetService();
            baseService.FetchMultipleAsync<AmendmentResultTicketEvent, AmendmentResultTransaction, TicketEvent>(Arg.Any<GetChatBotResultAmendmentCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetChatBotResultAmendmentInfoAsync(settingResultAmendment);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetChatBotMessageInfoAsync_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var service = GetService();
            var criteria = new GetChatBotMsgCriteria();
            var expected = fixture.Create<IEnumerable<Message>>();
            baseService.GetDataAsync<Message>(Arg.Do<GetChatBotMsgCriteria>(x => criteria = x)).Returns(expected);
            const string Xml = "<root><r MessageID='1'/></root>";
            var ticketEvents = new List<TicketEvent> { new TicketEvent { MessageId = 1 } };

            // Act
            var actual = await service.GetChatBotMessageInfoAsync(ticketEvents);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(Xml, criteria.Messages);
        }

        //[Fact]
        //public async Task ImportProblemsAccountInfoAsync_WhenCalled_ReturnExpectedCommandResult()
        //{
        //    // Arrange
        //    var fixture = new Fixture();
        //    var service = GetService();
        //    var ticketEvents = fixture.Create<IEnumerable<AmendmentResultTicketEvent>>();
        //    var transactions = fixture.Create<IEnumerable<AmendmentResultTransaction>>();
        //    var transaction = transactions
        //    const string XmlTemplate = "<r TicketEventId='{0}' ProductId='{1}' EventDate='{2}' " +
        //         "SubmitDate='{3}' EventType='{4}' ActualResult='{5}' WrongResult='{6}' " +
        //         "MessageId='{7}' SportNameEN='{8}' SportNameSC='{9}' SportNameTH='{10}' " +
        //         "SportNameYN='{11}' HomeNameEN='{12}' HomeNameSC='{13}' HomeNameTH='{14}' " +
        //         "HomeNameYN='{15}' AwayNameEN='{16}' AwayNameSC='{17}' AwayNameTH='{18}' " +
        //         "AwayNameYN='{19}' LeagueNameEN='{20}' LeagueNameSC='{21}' LeagueNameTH='{22}' " +
        //         "LeagueNameYN='{23}' MatchCode='{24}' MatchInfoEN='{25}' MatchInfoSC='{26}' " +
        //         "MatchInfoTH='{27}' MatchInfoYN='{28}' Type='{29}'/>";

        //    const string xmlTemplateMessage = "<r TicketEventId='{0}' MessageId='{1}' Content_en='{2}' Content_cs='{3}' Content_th='{4}' Content_yn='{5}'/>";

        //    var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());

        //    commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.en_US).Returns("sportNameEN");
        //    var sportNameSC = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.zh_CN);
        //    var sportNameTH = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.th_TH);
        //    var sportNameYN = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.vi_VN);

        //    var leagueNameEN = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.en_US);
        //    var leagueNameSC = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.zh_CN);
        //    var leagueNameTH = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.th_TH);
        //    var leagueNameYN = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.vi_VN);

        //    var homeNameEN = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.en_US);
        //    var homeNameSC = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.zh_CN);
        //    var homeNameTH = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.th_TH);
        //    var homeNameYN = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.vi_VN);

        //    var awayNameEN = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.en_US);
        //    var awayNameSC = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.zh_CN);
        //    var awayNameTH = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.th_TH);
        //    var awayNameYN = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.vi_VN);

        //    var matchInfoEN = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.en_US);
        //    var matchInfoSC = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.zh_CN);
        //    var matchInfoTH = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.th_TH);
        //    var matchInfoYN = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.vi_VN);

        //    stringBuilder.AppendFormat(XmlTemplate,
        //            problemsAccount.LogId,
        //            problemsAccount.CustId,
        //            problemsAccount.UserName,
        //            problemsAccount.Recommend,
        //            problemsAccount.Mrecommend,
        //            problemsAccount.Srecommend,
        //            problemsAccount.CategoryId,
        //            'a',
        //            'b',
        //            'c',
        //            'd',
        //            problemsAccount.IsTest);
        //    stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
        //    var criteria = new ImportChatBotResultAmendmentCommand();

        //    var expected = fixture.Create<CommandResult>();
        //    baseService.ExecuteNonQueryAsync(Arg.Do<ImportChatBotResultAmendmentCommand>(x => criteria = x)).Returns(expected);

        //    // Act
        //    var actual = await service.ImportChatBotAmendmentResult(ticketEvents, Constants.DefaultEnvironment);

        //    // Assert
        //    Assert.Equal(expected, actual);
        //    Assert.Equal(stringBuilder.ToString(), criteria.XmlData);
        //    Assert.Equal(Constants.DefaultEnvironment, criteria.Environment);
        //    Assert.Equal(0, criteria.ErrCode);
        //    Assert.Null(criteria.ErrMsg);

        //}

        #region Helpers
        private ChatBotResultAmendmentService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            commonFeedback = Substitute.For<ICommonFeedback>();
            return new ChatBotResultAmendmentService(baseService, commonFeedback);
        }
        #endregion Helpers
    }
}
