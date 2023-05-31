namespace CRM.BotService.Core.Tests.Services
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;
    using NSubstitute;
    using Telegram.Bot.Types.Enums;
    using Xunit;
    using System.Net;
    using System.Threading;
    using CRM.Core.Models.BotServices;
    using CRM.BotService.Core.Criteria;
    using System;

    public class TelegramBotServiceTests
    {
        private IList<TelegramBotConfigurations> botConfigurations;
        private ICRMLogService logService;
        private IBotCommonService botCommonService;

        private IHttpClientFactory httpClientFactory;

        private IFixture fixture = new Fixture();

        [Fact]
        public async Task SendTextMessageAsync_WhenCalled_ReturnsExactMessage()
        {
            // Arrange
            var botId = 12345678;
            var chatId = 987654321;
            var parseMode = ParseMode.Html;
            var service = GetService();
            // Act
            var result = await service.SendTextMessageAsync(botId, chatId, "messsage content", parseMode);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("message reponse!", result.Text);
        }

        [Fact]
        public async Task SendImageAsync_WhenCalled_ReturnsExactMessage()
        {
            // Arrange
            var botId = 12345678;
            var chatId = 987654321;
            var service = GetService();
            // Act
            var result = await service.SendImageAsync(botId, chatId, "urlImage");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("message reponse!", result.Text);
        }

        [Fact]
        public async Task SendNotifyAysnc_WhenCalled_ShouldCallExactFunction()
        {
            // Arrange
            var result = new SendResult();
            var notificationMessage = new NotificationMessage
            {
                Content = "Content",
                ConversationId = "1234",
                BotId = 12345678,
                Images = new string[] { "imgUrl" }
            };
            var service = GetService();
            // Act
            await service.SendNotifyAysnc(notificationMessage, result);

            // Assert
            logService.Received(4).LogInformation(Arg.Any<string>());
            await botCommonService.Received().WriteLogMessageAsyns(Arg.Any<WriteLogMessageCommand>());
            result.ErrorCode = 0;
        }

        [Fact]
        public async Task SendNotifyAysnc_NullObject_ShouldExpectedWriteLog()
        {
            // Arrange
            var result = new SendResult();
            var notificationMessage = new NotificationMessage
            {
                ConversationId = "1234",
                BotId = 12345678,
                Images = new string[] { "imgUrl" }
            };
            var service = GetService();
            // Act
            await service.SendNotifyAysnc(notificationMessage, result);

            // Assert
            logService.Received(3).LogInformation(Arg.Any<string>());
            await botCommonService.Received(1).WriteLogMessageAsyns(Arg.Any<WriteLogMessageCommand>());
            result.ErrorCode = 1;
        }

        [Fact]
        public async Task SendImageAsync_WhenCalled_ShouldCallExactFunction()
        {
            // Arrange
            var result = new SendResult();
            var notificationMessage = new NotificationMessage
            {
                Content = "Content",
                ConversationId = "1234",
                BotId = 12345678,
                Images = new string[] { "imgUrl" }
            };
            var service = GetService();
            // Act
            await service.SendImageAsync(notificationMessage, result);

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await botCommonService.Received(1).WriteLogMessageAsyns(Arg.Any<WriteLogMessageCommand>());
            result.ErrorCode = 0;
        }

        [Fact]
        public async Task SendImageAsync_NullObject_ShouldExpectedWriteLog()
        {
            // Arrange
            var result = new SendResult();
            var notificationMessage = new NotificationMessage
            {
                ConversationId = "1234",
                BotId = 12345678,
                Images = new string[] { "imgUrl" }
            };
            var service = GetService();
            // Act
            await service.SendImageAsync(notificationMessage, result);

            // Assert
            logService.Received(2).LogInformation(Arg.Any<string>());
            await botCommonService.Received(1).WriteLogMessageAsyns(Arg.Any<WriteLogMessageCommand>());
            result.ErrorCode = 1;
        }

        [Fact]
        public async Task WriteLogCommandAsync_WhenCalled_ShouldCallExactFunction()
        {
            // Arrange
            var result = fixture.Create<SendResult>();
            var notificationMessage = fixture.Create<NotificationMessage>();
            var service = GetService();
            // Act
            await service.WriteLogCommandAsync(notificationMessage, result);

            // Assert
            await botCommonService.Received(1).WriteLogMessageAsyns(Arg.Any<WriteLogMessageCommand>());
        }

        [Theory]
        [InlineData("Message is too long", true, false, ErrorMessageTelegram.MessageIsTooLong)]
        [InlineData("bot was kicked from the supergroup chat", true, false, ErrorMessageTelegram.GroupChatDeleted)]
        [InlineData("bot was kicked from the group chat", true, false, ErrorMessageTelegram.GroupChatDeleted)]
        [InlineData("chat not found", true, false, ErrorMessageTelegram.GroupChatDeleted)]
        [InlineData("bot was blocked by the user", true, true, ErrorMessageTelegram.BlockBot)]
        public void GetSendMessageResult_HandleException_ExpectReturnExactResult(string exMessage, bool isIgnoreRetry, bool isBlockedBot, string errorMessage)
        {
            // Arrange
            var exception = new Exception(exMessage);
            var sendResult = new SendResult();
            var service = GetService();
            // Act
            service.GetSendMessageResult(sendResult, exception);

            // Assert
            Assert.Equal(errorMessage, sendResult.ErrorMessage);
            Assert.Equal(isIgnoreRetry, sendResult.IsIgnoreRetry);
            Assert.Equal(isBlockedBot, sendResult.IsBlockedBot);
            Assert.Equal(1, sendResult.ErrorCode);
        }

        #region Helpers

        private TelegramBotService GetService()
        {
            httpClientFactory = Substitute.For<IHttpClientFactory>();
            var mockHttpMessageHandler = Substitute.For<HttpMessageHandler>();
            string jsonResponse = @"{
            ""ok"": true,
            ""result"": {
                    ""message_id"": 12345,
                    ""from"": {
                    ""id"": 67890,
                    ""is_bot"": false,
                    ""first_name"": ""John"",
                    ""last_name"": ""Doe"",
                    ""username"": ""johndoe"",
                    ""language_code"": ""en""
                    },
                    ""chat"": {
                    ""id"": 123456789,
                    ""first_name"": ""John"",
                    ""last_name"": ""Doe"",
                    ""username"": ""johndoe"",
                    ""type"": ""private""
                    },
                    ""date"": 1652030400,
                    ""text"": ""message reponse!""
            }
            }";

            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(jsonResponse)
            };
            mockHttpMessageHandler.Protected("SendAsync", Arg.Any<HttpRequestMessage>(), Arg.Any<CancellationToken>()).Returns(Task.FromResult(response));
            botConfigurations = new List<TelegramBotConfigurations>()
            {
                new TelegramBotConfigurations
                {
                    BotId = 12345678,
                    Token = "Token",
                    Domain="Domain/",
                }
            };
            var client = new HttpClient(mockHttpMessageHandler);
            httpClientFactory.CreateClient(NamedHttpClients.ProxiedClient).Returns(client);

            var botConfig = Substitute.For<List<TelegramBotConfigurations>>();
            botConfig.AddRange(botConfigurations);
            botCommonService = Substitute.For<IBotCommonService>();
            logService = Substitute.For<ICRMLogService>();
            return Substitute.For<TelegramBotService>(httpClientFactory, botConfig, logService, botCommonService);
        }

        #endregion Helpers
    }
}