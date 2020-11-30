namespace CRM.BackgroundJob.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
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

    public class ChatBotJobServiceTests
    {
        private ICRMLogService logService;
        private ISystemSettingService systemSettingService;
        private IChatBotTicketVoidingService ticketVoidingService;
        private ISendNotificationService sendNotificationService;
        private IChatBotCWLService chatBotCWLService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task PullMessageAndSendNotificationAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Constants.Enviroment_Local).Returns(setting);

            // Act
            await service.PullMessageAndSendNotificationAsync();

            // Assert
            logService.Received().LogInformation("Chat Bot Service is shutdown.");
        }

        [Fact]
        public async Task PullMessageAndSendNotificationAsync_ImportTicketInfosUnsuccessful_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var messages = fixture.Create<IEnumerable<Message>>();
            var voidingMessages = fixture.Create<IEnumerable<ChatBotVoidingMessage>>();
            var ticketInfos = fixture.Create<IEnumerable<ChatBotVoidingTicketInfo>>();
            var commandResult = new CommandResult { Code = 1 };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Constants.Enviroment_Local).Returns(setting);
            ticketVoidingService.GetVoidingMessageAsync().Returns(voidingMessages);
            ticketVoidingService.ImportVoidingMessageAsync(voidingMessages, setting.BatchSize).Returns(voidingMessages);
            ticketVoidingService.GetMessageInfoAsync(voidingMessages).Returns(messages);
            ticketVoidingService.GetTicketVoidingInfoAsync(voidingMessages).Returns(ticketInfos);
            ticketVoidingService.ImportTicketVoidingAsync(messages, ticketInfos, voidingMessages, Constants.Enviroment_Local).Returns(commandResult);

            // Act
            await service.PullMessageAndSendNotificationAsync();

            // Assert
            logService.Received().LogInformation(commandResult.Message);
        }

        [Fact]
        public async Task PullMessageAndSendNotificationAsync_ImportTicketInfosSuccessful_ExpectedCallEditVoidingMessageAsync()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var messages = fixture.Create<IEnumerable<Message>>();
            var voidingMessages = fixture.Create<IEnumerable<ChatBotVoidingMessage>>();
            var ticketInfos = fixture.Create<IEnumerable<ChatBotVoidingTicketInfo>>();
            var commandResult = new CommandResult { Code = 0 };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Constants.Enviroment_Local).Returns(setting);
            ticketVoidingService.GetVoidingMessageAsync().Returns(voidingMessages);
            ticketVoidingService.ImportVoidingMessageAsync(voidingMessages, setting.BatchSize).Returns(voidingMessages);
            ticketVoidingService.GetMessageInfoAsync(voidingMessages).Returns(messages);
            ticketVoidingService.GetTicketVoidingInfoAsync(voidingMessages).Returns(ticketInfos);
            ticketVoidingService.ImportTicketVoidingAsync(messages, ticketInfos, voidingMessages, Constants.Enviroment_Local).Returns(commandResult);

            // Act
            await service.PullMessageAndSendNotificationAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        [Fact]
        public async Task PullMessageCWLAndSendNotificationToHeadlineAsync_ServiceIsShutdown_ExpectedWriteLog()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = false };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Constants.Enviroment_Local).Returns(setting);

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
            var commandResult = new CommandResult { Code = 1};
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Constants.Enviroment_Local).Returns(setting);
            chatBotCWLService.GetChatbotCWLLogInfoAsync(Arg.Any<int>(), Arg.Any<int>()).Returns(cwlInfors);
            chatBotCWLService.ImportCWLLogInfoAsync(cwlInfors, Constants.Enviroment_Local).Returns(commandResult);

            // Act
            await service.PullMessageCWLAndSendNotificationToHeadlineAsync();

            // Assert
            logService.Received().LogInformation(commandResult.Message);
        }

        [Fact]
        public async Task PullMessageCWLAndSendNotificationToHeadlineAsync_ImportCWLLogInfoAsyncsuccessful_ExpectedToCallSendNotificationToLetstalk()
        {
            // Arrange
            var setting = new AbnormalBetSystemSetting { ServiceFlag = true };
            var cwlInfors = fixture.Create<IEnumerable<ChatBotCWLInfo>>();
            var commandResult = new CommandResult { Code = 0 };
            var service = GetService();
            systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Constants.Enviroment_Local).Returns(setting);
            chatBotCWLService.GetChatbotCWLLogInfoAsync(Arg.Any<int>(), Arg.Any<int>()).Returns(cwlInfors);
            chatBotCWLService.ImportCWLLogInfoAsync(cwlInfors, Constants.Enviroment_Local).Returns(commandResult);

            // Act
            await service.PullMessageCWLAndSendNotificationToHeadlineAsync();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        #region Helpers

        private ChatBotJobService GetService()
        {
            logService = Substitute.For<ICRMLogService>();
            systemSettingService = Substitute.For<ISystemSettingService>();
            ticketVoidingService = Substitute.For<IChatBotTicketVoidingService>();
            sendNotificationService = Substitute.For<ISendNotificationService>();
            chatBotCWLService = Substitute.For<IChatBotCWLService>();
            return new ChatBotJobService(logService, systemSettingService, ticketVoidingService, sendNotificationService, chatBotCWLService);
        }

        #endregion Helpers
    }
}