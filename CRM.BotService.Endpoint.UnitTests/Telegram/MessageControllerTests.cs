using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoFixture;
using CRM.BotService.Core.Models;
using CRM.BotService.Core.Services;
using CRM.BotService.Core.Services.Interfaces;
using CRM.BotService.Endpoint.Controllers.Telegram;
using CRM.Core.Models.BotServices;
using CRM.Core.Services;
using CRM.Models.NotificationList;
using Fanex.Logging;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Telegram.Bot.Types;
using Xunit;

namespace CRM.BotService.Endpoint.UnitTests.Telegram
{
    public class MessageControllerTests
    {
        private ICRMLogService logService;
        private Func<long, ITelegramBotService> telegramBotService;
        private IBotCommonService botCommonService;
        private readonly Fixture fixture = new Fixture();

        [Fact]
        public async Task SendMessage_WhenCalled_ExpectCallExactFunction()
        {
            // Arrange
            var conversationInfo = fixture.Create<ConversationInfo>();
            _ = long.TryParse(conversationInfo.BotConversationId, out long botId);
            _ = long.TryParse(conversationInfo.ConversationId, out long chatId);
            var controller = GetController();
            // Act
            await controller.SendMessage(conversationInfo);

            // Assert
            await telegramBotService(botId).Received(1).SendTextMessageAsync(botId, chatId, conversationInfo.Message);
            logService.Received(2).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task SendMessage_WhenHasError_ExpectWriteLogError()
        {
            // Arrange
            var conversationInfo = fixture.Create<ConversationInfo>();
            _ = long.TryParse(conversationInfo.BotConversationId, out long botId);
            _ = long.TryParse(conversationInfo.ConversationId, out long chatId);
            var controller = GetController();
            telegramBotService(botId)
                .When(x => x.SendTextMessageAsync(botId, chatId, conversationInfo.Message))
                .Do(x => { throw new Exception("send to telegram fail"); });
            // Act
            await controller.SendMessage(conversationInfo);

            // Assert
            await logService.Received(1).ErrorMessageAsync(Arg.Any<string>());
        }

        [Fact]
        public async Task SendImage_WhenCalled_ExpectCallExactFunction()
        {
            // Arrange
            var conversationInfo = fixture.Create<ConversationInfo>();
            _ = long.TryParse(conversationInfo.BotConversationId, out long botId);
            _ = long.TryParse(conversationInfo.ConversationId, out long chatId);
            var controller = GetController();
            // Act
            await controller.SendImage(conversationInfo);

            // Assert
            await telegramBotService(botId).Received(1).SendImageAsync(botId, chatId, conversationInfo.ImageUrl);
            logService.Received(2).LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task SendImage_WhenHasError_ExpectWriteLogError()
        {
            // Arrange
            var conversationInfo = fixture.Create<ConversationInfo>();
            _ = long.TryParse(conversationInfo.BotConversationId, out long botId);
            _ = long.TryParse(conversationInfo.ConversationId, out long chatId);
            var controller = GetController();
            telegramBotService(botId)
                .When(x => x.SendImageAsync(botId, chatId, conversationInfo.ImageUrl))
                .Do(x => { throw new Exception("send to telegram fail"); });
            // Act
            await controller.SendImage(conversationInfo);

            // Assert
            await logService.Received(1).ErrorMessageAsync(Arg.Any<string>());
        }

        [Fact]
        public async Task SendMultipleMessage_WhenCalled_ExpectReturnResult()
        {
            // Arrange
            var notifications = fixture.Build<NotificationMessage>().CreateMany(1);
            var controller = GetController();
            var notification = notifications.First();
            botCommonService.IsActiveChannel(notification.ChannelId).Returns(true);
            var expected = new SendResult
            {
                NotificationId = notification.NotificationId,
                ConversationGroupId = notification.ConversationGroupId,
            };

            // Act
            var actual = await controller.SendMultipleMessage(notifications);
            var okObjectResult = actual as OkObjectResult;
            var actualResult = okObjectResult.Value as IEnumerable<SendResult>;
            var result = actualResult.First();
            // Assert
            logService.Received(5).LogInformation(Arg.Any<string>());
            Assert.Equal(result.NotificationId, expected.NotificationId);
            Assert.Equal(result.ConversationGroupId, expected.ConversationGroupId);
        }

        [Fact]
        public async Task SendMultipleMessage_WhenCalledInactiveChannel_ExpectCallExactFunction()
        {
            // Arrange
            var notifications = fixture.Build<NotificationMessage>().CreateMany(1);
            var controller = GetController();
            var expected = new SendResult
            {
                NotificationId = notifications.First().NotificationId,
                ConversationGroupId = notifications.First().ConversationGroupId,
                ErrorCode = 1,
                ErrorMessage = $"Channel {notifications.First().ChannelId} is current inactivated",
                IsIgnoreRetry = true
            };
            // Act
            var actual = await controller.SendMultipleMessage(notifications);
            var okObjectResult = actual as OkObjectResult;
            var actualResult = okObjectResult.Value as IEnumerable<SendResult>;
            var result = actualResult.First();
            // Assert
            logService.Received(4).LogInformation(Arg.Any<string>());
            Assert.Equal(result.NotificationId, expected.NotificationId);
            Assert.Equal(result.ConversationGroupId, expected.ConversationGroupId);
            Assert.Equal(result.ErrorCode, expected.ErrorCode);
            Assert.Equal(result.ErrorMessage, expected.ErrorMessage);
            Assert.Equal(result.IsIgnoreRetry, expected.IsIgnoreRetry);
        }

        [Fact]
        public async Task SendSingleMessage_WhenCalled_ExpectReturnResult()
        {
            // Arrange
            var notification = fixture.Create<NotificationMessage>();
            var controller = GetController();
            botCommonService.IsActiveChannel(notification.ChannelId).Returns(true);
            var expected = new SendResult
            {
                NotificationId = notification.NotificationId,
                ConversationGroupId = notification.ConversationGroupId,
            };

            // Act
            var actual = await controller.SendSingleMessage(notification);
            var okObjectResult = actual as OkObjectResult;
            var actualResult = okObjectResult.Value as SendResult;
            // Assert
            Assert.Equal(actualResult.NotificationId, expected.NotificationId);
            Assert.Equal(actualResult.ConversationGroupId, expected.ConversationGroupId);
        }

        #region helper

        private MessageController GetController()
        {
            logService = Substitute.For<ICRMLogService>();
            telegramBotService = Substitute.For<Func<long, ITelegramBotService>>();
            botCommonService = Substitute.For<IBotCommonService>();
            return new MessageController(
                logService,
                telegramBotService,
                botCommonService
            );
        }

        #endregion helper
    }
}