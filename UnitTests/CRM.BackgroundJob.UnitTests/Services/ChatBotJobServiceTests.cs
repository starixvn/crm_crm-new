namespace CRM.BackgroundJob.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using Microsoft.Extensions.Configuration;
    using CRM.BackgroundJob.Models.ChatBotCWL;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Letstalk.Services.Services.Interfaces;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;
    using Fanex.CRM.BackgroundJob.Services;
    using NSubstitute;
    using Xunit;
    using CRM.BackgroundJob.Models.ChatBotCTO;
    using CRM.BackgroundJob.Models.ChatBotProblemsAccount;
    using System;
    using CRM.BackgroundJob.Models.ChatBot;
    using CRM.BackgroundJob.Models.ChatBotResulAmendment;
    using System.Linq;
    using Fanex.CRM.BackgroundJob.Criteria.ChatBot;
    using CRM.BackgroundJob.Criteria.ChatBot_CTO;
    using CRM.BackgroundJob.Criteria.ChatBotCWL;
    using CRM.BackgroundJob.Criteria.ChatbotProblemAccount;
    using CRM.BackgroundJob.Criteria.ChatBot_ResultAmendment;
    using CRM.BackgroundJob.Criteria.ChatBot;
    using CRM.BackgroundJob.Criteria.ChatBot_ArchivingDA;

    public class ChatBotJobServiceTests
    {
        private ICRMLogService logService;
        private ISystemSettingService systemSettingService;
        private IChatBotTicketVoidingService ticketVoidingService;
        private ISendNotificationService sendNotificationService;
        private IChatBotCWLService chatBotCWLService;
        private IConfiguration configuration;
        private IChatBotCTOService chatBotCTOService;
        private IChatBotProblemAccountService chatBotProblemAccountService;
        private IChatBotResultAmendmentService chatBotResultAmendmentService;
        private IChatBotArchivingDAService chatBotArchivingDAService;

        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task PullMessageAndSendNotificationAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Constants.DefaultEnvironment).Returns(setting);

            // Act
            await service.PullMessageAndSendNotificationAsync();

            // Assert
            logService.Received().LogInformation("ChatBot - AbnormalBets Service is shutdown.");
        }

        [Fact]
        public async Task PullMessageAndSendNotificationAsync_ImportTicketInfosUnsuccessful_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var voidingMessages = fixture.Create<IEnumerable<ChatBotVoidingMessage>>();
            var voidingHis = fixture.Create<IEnumerable<ChatBotVoidingHistory>>();
            var userNameList = fixture.Create<IEnumerable<ChatBotUserNameList>>();
            var voidingMessagesHis = fixture.Create<IEnumerable<ChatBotVoidingHistory>>();
            var voidingInfo = new ValueTuple<IEnumerable<ChatBotVoidingMessage>, IEnumerable<ChatBotVoidingHistory>>(voidingMessages, voidingMessagesHis);
            var commandResult = new CommandResult { Code = 1 };
            var criteria = fixture.Create<ImportChatBotVoidingMessageCriteria>();
            var valueTupe = new ValueTuple<CommandResult, ImportChatBotVoidingMessageCriteria>(commandResult, criteria);

            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Constants.DefaultEnvironment).Returns(setting);
            ticketVoidingService.GetVoidingMessageAsync().Returns(voidingInfo);
            ticketVoidingService.ImportVoidingMessageHistoryCheckAsync(voidingInfo.Item2).Returns(voidingHis);
            ticketVoidingService.GetChatBotAbnormalAccountUsernameAsync(
                Arg.Any<GetChatBotAbnormalAccountGetUsernameListCriteria>()
            ).Returns(userNameList);
            ticketVoidingService.ImportVoidingMessageAsync(voidingMessages, userNameList).Returns(valueTupe);

            // Act
            await service.PullMessageAndSendNotificationAsync();

            // Assert
            logService.Received().LogInformation(valueTupe.Item1.Message);
            await logService.Received().ErrorAsync(valueTupe.Item1, valueTupe.Item2);
        }

        [Fact]
        public async Task PullMessageAndSendNotificationAsync_ImportTicketInfosSuccessfulNotExistEnvironment_ExpectedCallEditVoidingMessageAsync()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true, BatchSize = 10, IncludeUUSCurrency = true };
            var messages = fixture.Create<IEnumerable<Message>>();
            var voidingMessages = fixture.Create<IEnumerable<ChatBotVoidingMessage>>();
            var voidingHis = fixture.Create<IEnumerable<ChatBotVoidingHistory>>();
            var userNameList = fixture.Create<IEnumerable<ChatBotUserNameList>>();
            var messageImport = fixture.Create<IEnumerable<ChatBotUserNameList>>();
            var voidingMessagesImport = fixture.Create<IEnumerable<VoidingMessage>>();
            var voidingMessagesHis = fixture.Create<IEnumerable<ChatBotVoidingHistory>>();
            var voidingInfo = new ValueTuple<IEnumerable<ChatBotVoidingMessage>, IEnumerable<ChatBotVoidingHistory>>(voidingMessages, voidingMessagesHis);
            var ticketInfo = fixture.Create<IEnumerable<ChatBotVoidingTicketInfo>>();
            var ticketInfoValueTupe = new ValueTuple<IEnumerable<ChatBotVoidingTicketInfo>, IEnumerable<VoidingMessage>>(ticketInfo, voidingMessagesImport);
            var commandResult = new CommandResult { Code = 0 };
            var criteria = fixture.Create<ImportChatBotVoidingMessageCriteria>();
            var valueTupe = new ValueTuple<CommandResult, ImportChatBotVoidingMessageCriteria>(commandResult, criteria);
            var commandResultImportTicket = new CommandResult { Code = 0 };
            var criteriaVoiding = fixture.Create<ImportChatBotTicketVoidingInfoCommand>();
            var valueTupeImportVoiding = new ValueTuple<CommandResult, ImportChatBotTicketVoidingInfoCommand>(commandResultImportTicket, criteriaVoiding);

            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Constants.DefaultEnvironment).Returns(setting);
            ticketVoidingService.GetVoidingMessageAsync().Returns(voidingInfo);
            ticketVoidingService.ImportVoidingMessageHistoryCheckAsync(voidingInfo.Item2).Returns(voidingHis);
            ticketVoidingService.GetChatBotAbnormalAccountUsernameAsync(
                Arg.Any<GetChatBotAbnormalAccountGetUsernameListCriteria>()
            ).Returns(userNameList);
            ticketVoidingService.ImportVoidingMessageAsync(voidingMessages, userNameList).Returns(valueTupe);
            ticketVoidingService.GetImportMessageByBatchSize(setting.BatchSize).Returns(messageImport);
            ticketVoidingService.GetMessageInfoAsync(messageImport).Returns(messages);
            ticketVoidingService.GetTicketVoidingInfoAsync(messageImport, Constants.DefaultEnvironment, setting.IncludeUUSCurrency).Returns(ticketInfoValueTupe);
            ticketVoidingService.ImportTicketVoidingAsync(messages, ticketInfoValueTupe.Item1, ticketInfoValueTupe.Item2, Constants.DefaultEnvironment).Returns(valueTupeImportVoiding);

            // Act
            await service.PullMessageAndSendNotificationAsync();

            // Assert
            logService.Received().LogInformation("Import ChatBot - AbnormalBets Successful!!!");
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }


        [Fact]
        public async Task PullMessageCTOAndSendNotificationToHeadlineAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_TOControl, Constants.DefaultEnvironment).Returns(setting);

            // Act
            await service.PullMessageCTOAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation("Chat Bot CTO Service is shutdown.");
        }

        [Fact]
        public async Task PullMessageCTOAndSendNotificationToHeadlineAsync_ImportTOSMAInfoAsyncUnsuccessful_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var tOReachInfors = fixture.Create<IEnumerable<TOReachInfor>>();
            var tOSMAInfors = fixture.Create<IEnumerable<TOSMAInfor>>();

            var commandResult = new CommandResult { Code = 1 };
            var criteria = fixture.Create<TOControlImportCommand>();
            var valueTupe = new ValueTuple<CommandResult, TOControlImportCommand>(commandResult, criteria);

            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_TOControl, Constants.DefaultEnvironment).Returns(setting);
            chatBotCTOService.GetChatbotCTOSettingInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(tOReachInfors);
            chatBotCTOService.GetChatbotCTOSMAInfoAsync(Arg.Any<IEnumerable<TOReachInfor>>()).Returns(tOSMAInfors);

            chatBotCTOService.ImportTOSMAInfoAsync(tOSMAInfors, Constants.DefaultEnvironment).Returns(valueTupe);

            // Act
            await service.PullMessageCTOAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation(valueTupe.Item1.Message);
            await logService.Received().ErrorAsync(valueTupe.Item1, valueTupe.Item2);
        }

        [Fact]
        public async Task PullMessageCTOAndSendNotificationToHeadlineAsync_ImportCWLLogInfoAsyncsuccessful_ExpectedToCallSendNotificationToLetstalk()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var tOReachInfors = fixture.Create<IEnumerable<TOReachInfor>>();
            var tOSMAInfors = fixture.Create<IEnumerable<TOSMAInfor>>();

            var commandResult = new CommandResult { Code = 0 };
            var criteria = fixture.Create<TOControlImportCommand>();
            var valueTupe = new ValueTuple<CommandResult, TOControlImportCommand>(commandResult, criteria);
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_TOControl, Constants.DefaultEnvironment).Returns(setting);
            chatBotCTOService.GetChatbotCTOSettingInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(tOReachInfors);
            chatBotCTOService.GetChatbotCTOSMAInfoAsync(Arg.Any<IEnumerable<TOReachInfor>>()).Returns(tOSMAInfors);

            chatBotCTOService.ImportTOSMAInfoAsync(tOSMAInfors, Constants.DefaultEnvironment).Returns(valueTupe);

            // Act
            await service.PullMessageCTOAndSendNotificationToHeadlineAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        [Fact]
        public async Task PullMessageCWLAndSendNotificationToHeadlineAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Constants.DefaultEnvironment).Returns(setting);

            // Act
            await service.PullMessageCWLAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation("Chat Bot CWL Service is shutdown.");
        }

        [Fact]
        public async Task PullMessageCWLAndSendNotificationToHeadlineAsync_ImportCWLLogInfoAsyncUnsuccessful_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var cwlInfors = fixture.Create<IEnumerable<ChatBotCWLInfo>>();
            var commandResult = new CommandResult { Code = 1 };
            var criteria = fixture.Create<ImportCWLLogInfoCommand>();
            var valueTupe = new ValueTuple<CommandResult, ImportCWLLogInfoCommand>(commandResult, criteria);
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Constants.DefaultEnvironment).Returns(setting);
            chatBotCWLService.GetChatbotCWLLogInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(cwlInfors);
            chatBotCWLService.ImportCWLLogInfoAsync(cwlInfors, Constants.DefaultEnvironment).Returns(valueTupe);

            // Act
            await service.PullMessageCWLAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation(valueTupe.Item1.Message);
            await logService.Received().ErrorAsync(valueTupe.Item1, valueTupe.Item2);
        }

        [Fact]
        public async Task PullMessageCWLAndSendNotificationToHeadlineAsync_ImportCWLLogInfoAsyncsuccessful_ExpectedToCallSendNotificationToLetstalk()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var cwlInfors = fixture.Create<IEnumerable<ChatBotCWLInfo>>();
            var commandResult = new CommandResult { Code = 0 };
            var criteria = fixture.Create<ImportCWLLogInfoCommand>();
            var valueTupe = new ValueTuple<CommandResult, ImportCWLLogInfoCommand>(commandResult, criteria);
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Constants.DefaultEnvironment).Returns(setting);
            chatBotCWLService.GetChatbotCWLLogInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(cwlInfors);
            chatBotCWLService.ImportCWLLogInfoAsync(cwlInfors, Constants.DefaultEnvironment).Returns(valueTupe);

            // Act
            await service.PullMessageCWLAndSendNotificationToHeadlineAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }


        [Fact]
        public async Task PullMessageProblemsAccountAndSendNotificationToHeadlineAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ProblemAccounts, Constants.DefaultEnvironment).Returns(setting);

            // Act
            await service.PullMessageProblemsAccountAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation("Chat Bot Problems Account Service is shutdown.");
        }

        [Fact]
        public async Task PullMessageProblemsAccountAndSendNotificationToHeadlineAsync_ImportProblemsAccountInfoAsyncUnsuccessful_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var problemsAcountInfors = fixture.Create<IEnumerable<ChatBotProblemsAccountInfor>>();

            var commandResult = new CommandResult { Code = 1 };
            var criteria = fixture.Create<ProblemsAccountImportCommand>();
            var valueTupe = new ValueTuple<CommandResult, ProblemsAccountImportCommand>(commandResult, criteria);

            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ProblemAccounts, Constants.DefaultEnvironment).Returns(setting);
            chatBotProblemAccountService.GetChatbotProblemAccountInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(problemsAcountInfors);

            chatBotProblemAccountService.ImportProblemsAccountInfoAsync(problemsAcountInfors, Constants.DefaultEnvironment).Returns(valueTupe);

            // Act
            await service.PullMessageProblemsAccountAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation(valueTupe.Item1.Message);
            await logService.Received().ErrorAsync(valueTupe.Item1, valueTupe.Item2);
        }

        [Fact]
        public async Task PullMessageProblemsAccountAndSendNotificationToHeadlineAsync_ImportProblemsAccountInfoAsyncSuccessful_ExpectedToCallSendNotificationToLetstalk()
        {
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var problemsAcountInfors = fixture.Create<IEnumerable<ChatBotProblemsAccountInfor>>();

            var commandResult = new CommandResult { Code = 0 };
            var criteria = fixture.Create<ProblemsAccountImportCommand>();
            var valueTupe = new ValueTuple<CommandResult, ProblemsAccountImportCommand>(commandResult, criteria);

            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ProblemAccounts, Constants.DefaultEnvironment).Returns(setting);
            chatBotProblemAccountService.GetChatbotProblemAccountInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(problemsAcountInfors);

            chatBotProblemAccountService.ImportProblemsAccountInfoAsync(problemsAcountInfors, Constants.DefaultEnvironment).Returns(valueTupe);

            // Act
            await service.PullMessageProblemsAccountAndSendNotificationToHeadlineAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        [Fact]
        public async Task PullMessageResultAmendmentAndSendNotificationToHeadlineAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ResultAmendment, Constants.DefaultEnvironment).Returns(setting);

            // Act
            await service.PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation("Chat Bot Result Amendment Service is shutdown.");
        }

        [Fact]
        public async Task PullMessageResultAmendmentAndSendNotificationToHeadlineAsync_ImportMessageVoidSettledAsyncIsFail_ExpectLogInfo()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var voidingMesssageSettled = fixture.Create<IEnumerable<MessageVoidSettled>>();
            var voidingMessageCheck = fixture.Create<IEnumerable<MessageVoidSettled>>();
            var settledTicket = fixture.Create<IEnumerable<MessageVoidSettled>>();
            var commandMessage = new CommandResult { Code = 1 };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ResultAmendment, Constants.DefaultEnvironment).Returns(setting);
            chatBotResultAmendmentService.GetChatBotMessageVoidSettledAsync().Returns(voidingMesssageSettled);
            chatBotResultAmendmentService.GetVoidingMessasgeCheckAsync(voidingMesssageSettled, "LIVE").Returns(voidingMessageCheck);
            chatBotResultAmendmentService.VoidingMessageGetSettledTicketAsync(voidingMessageCheck).Returns(settledTicket);

            chatBotResultAmendmentService.ImportMessageVoidSettledAsync(settledTicket).Returns(commandMessage);

            // Act
            await service.PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation("Import Messages Settled Fail!!!");
        }

        [Fact]
        public async Task PullMessageResultAmendmentAndSendNotificationToHeadlineAsync_ImportChatBotAmendmentResultAsyncUnsuccessful_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true, BatchSizeGetMsg = 10 };
            var targetMessages = fixture.Create<IEnumerable<TargetMessage>>();
            var targetMessageInfos = fixture.Create<IEnumerable<TargetMessageInfo>>();
            var messageId = new List<int>();
            var messages = Enumerable.Empty<Message>();
            var voidingMessageInfo = new ValueTuple<IEnumerable<int>, IEnumerable<TargetMessage>, IEnumerable<TargetMessageInfo>>(messageId, targetMessages, targetMessageInfos);
            var voidingMesssageSettled = fixture.Create<IEnumerable<MessageVoidSettled>>();
            var ticketEvents = fixture.Create<IEnumerable<AmendmentResultTicketEvent>>();
            var transactions = fixture.Create<IEnumerable<AmendmentResultTransaction>>();
            var valueTupe = new ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<int>>(ticketEvents, transactions, messageId);
            var resultAmendmentInfo = new ValueTuple<ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<int>>, string>(valueTupe, "ServerName");
            var commandMessage = new CommandResult { Code = 0 };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ResultAmendment, Constants.DefaultEnvironment).Returns(setting);
            chatBotResultAmendmentService.GetChatBotMessageVoidSettledAsync().Returns(voidingMesssageSettled);
            chatBotResultAmendmentService.ImportMessageVoidSettledAsync(voidingMesssageSettled).Returns(commandMessage);
            chatBotResultAmendmentService.GetChatbotMessageVoidSettledInfoAsync(setting.BatchSizeGetMsg).Returns(voidingMessageInfo);
            chatBotResultAmendmentService.GetChatBotResultAmendmentInfoAsync(setting).Returns(resultAmendmentInfo);
            var commandResult = new CommandResult { Code = 1 };
            var criteria = fixture.Create<ImportChatBotResultAmendmentCommand>();
            var valueTupeAmendment = new ValueTuple<CommandResult, ImportChatBotResultAmendmentCommand>(commandResult, criteria);

            chatBotResultAmendmentService.ImportChatBotAmendmentResultAsync(
                    resultAmendmentInfo.Item1.Item1, resultAmendmentInfo.Item1.Item2, messages,
                    voidingMessageInfo.Item2, voidingMessageInfo.Item3, Constants.DefaultEnvironment, resultAmendmentInfo.Item2
                   ).Returns(valueTupeAmendment);
            // Act
            await service.PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());
            await logService.Received().ErrorAsync(valueTupeAmendment.Item1, valueTupeAmendment.Item2);
        }

        [Fact]
        public async Task PullMessageResultAmendmentAndSendNotificationToHeadlineAsync_ImportChatBotAmendmentResultAsyncSuccessful_ExpectedToCallSendNotificationToLetstalk()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true, BatchSizeGetMsg = 10 };
            var targetMessages = fixture.Create<IEnumerable<TargetMessage>>();
            var targetMessageInfos = fixture.Create<IEnumerable<TargetMessageInfo>>();
            var messageId = new List<int>();
            var messages = Enumerable.Empty<Message>();
            var voidingMessageInfo = new ValueTuple<IEnumerable<int>, IEnumerable<TargetMessage>, IEnumerable<TargetMessageInfo>>(messageId, targetMessages, targetMessageInfos);
            var voidingMesssageSettled = fixture.Create<IEnumerable<MessageVoidSettled>>();
            var ticketEvents = fixture.Create<IEnumerable<AmendmentResultTicketEvent>>();
            var transactions = fixture.Create<IEnumerable<AmendmentResultTransaction>>();
            var valueTupe = new ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<int>>(ticketEvents, transactions, messageId);
            var resultAmendmentInfo = new ValueTuple<ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<int>>, string>(valueTupe, "ServerName");
            var commandMessage = new CommandResult { Code = 0 };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ResultAmendment, Constants.DefaultEnvironment).Returns(setting);
            chatBotResultAmendmentService.GetChatBotMessageVoidSettledAsync().Returns(voidingMesssageSettled);
            chatBotResultAmendmentService.ImportMessageVoidSettledAsync(voidingMesssageSettled).Returns(commandMessage);
            chatBotResultAmendmentService.GetChatbotMessageVoidSettledInfoAsync(setting.BatchSizeGetMsg).Returns(voidingMessageInfo);
            chatBotResultAmendmentService.GetChatBotResultAmendmentInfoAsync(setting).Returns(resultAmendmentInfo);
            var commandResult = new CommandResult { Code = 0 };
            var criteria = fixture.Create<ImportChatBotResultAmendmentCommand>();
            var valueTupeAmendment = new ValueTuple<CommandResult, ImportChatBotResultAmendmentCommand>(commandResult, criteria);
            chatBotResultAmendmentService.ImportChatBotAmendmentResultAsync(
                    resultAmendmentInfo.Item1.Item1, resultAmendmentInfo.Item1.Item2, messages,
                    voidingMessageInfo.Item2, voidingMessageInfo.Item3, Constants.DefaultEnvironment, resultAmendmentInfo.Item2
                   ).Returns(valueTupeAmendment);
            // Act
            await service.PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        [Fact]
        public async Task PullMessagArchivingDAAndSendNotificationToHeadlineAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ArchivedAccounts, Constants.DefaultEnvironment).Returns(setting);

            // Act
            await service.PullMessagArchivingDAAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation("Chat Bot Archiving Dormant Accounts Service is shutdown.");
        }

        [Fact]
        public async Task PullMessagArchivingDAAndSendNotificationToHeadlineAsync_ImportArchivedAccountsAsyncSuccessful_ExpectedToCallSendNotificationToLetstalk()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true, LastLogId = 1, BatchSize = 3000 };
            var command = fixture.Create<ImportArchivedAccountsCommand>();
            var commandResult = new CommandResult { Code = 0 };
            var valueTupe = new ValueTuple<CommandResult, ImportArchivedAccountsCommand>(commandResult, command);
            var archivingDAInfors = fixture.Create<IEnumerable<ChatbotArchivingDAInfor>>();
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ArchivedAccounts, Constants.DefaultEnvironment).Returns(setting);
            chatBotArchivingDAService.GetChatbotArchivingDASettingInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(archivingDAInfors);
            chatBotArchivingDAService.ImportArchivedAccountsAsync(archivingDAInfors, Constants.DefaultEnvironment).Returns(valueTupe);
            // Act
            await service.PullMessagArchivingDAAndSendNotificationToHeadlineAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        [Fact]
        public async Task PullMessagArchivingDAAndSendNotificationToHeadlineAsync_ImportArchivedAccountsAsyncIsFail_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true, LastLogId = 1, BatchSize = 3000 };
            var command = fixture.Create<ImportArchivedAccountsCommand>();
            var commandResult = new CommandResult { Code = 1 };
            var valueTupe = new ValueTuple<CommandResult, ImportArchivedAccountsCommand>(commandResult, command);
            var archivingDAInfors = fixture.Create<IEnumerable<ChatbotArchivingDAInfor>>();
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ArchivedAccounts, Constants.DefaultEnvironment).Returns(setting);
            chatBotArchivingDAService.GetChatbotArchivingDASettingInfoAsync(Arg.Any<long>(), Arg.Any<int>()).Returns(archivingDAInfors);
            chatBotArchivingDAService.ImportArchivedAccountsAsync(archivingDAInfors, Constants.DefaultEnvironment).Returns(valueTupe);
            // Act
            await service.PullMessagArchivingDAAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received(1).LogInformation(Arg.Any<string>());
            await logService.Received().ErrorAsync(valueTupe.Item1, valueTupe.Item2);
        }


        #region Helpers

        private ChatBotJobService GetService()
        {
            logService = Substitute.For<ICRMLogService>();
            systemSettingService = Substitute.For<ISystemSettingService>();
            ticketVoidingService = Substitute.For<IChatBotTicketVoidingService>();
            sendNotificationService = Substitute.For<ISendNotificationService>();
            chatBotCWLService = Substitute.For<IChatBotCWLService>();
            configuration = Substitute.For<IConfiguration>();
            chatBotCTOService = Substitute.For<IChatBotCTOService>();
            chatBotProblemAccountService = Substitute.For<IChatBotProblemAccountService>();
            chatBotResultAmendmentService = Substitute.For<IChatBotResultAmendmentService>();
            chatBotArchivingDAService = Substitute.For<IChatBotArchivingDAService>();
            return new ChatBotJobService(logService,
                systemSettingService,
                ticketVoidingService,
                sendNotificationService,
                chatBotCWLService,
                configuration,
                chatBotCTOService,
                chatBotProblemAccountService,
                chatBotResultAmendmentService,
                chatBotArchivingDAService);
        }

        #endregion Helpers
    }
}