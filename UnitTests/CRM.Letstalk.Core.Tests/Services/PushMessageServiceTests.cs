namespace CRM.BotService.Core.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Models.Letstalk.Results;
    using CRM.BotService.Core.Services;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using NSubstitute;
    using NSubstitute.ExceptionExtensions;
    using Xunit;

    public class PushMessageServiceTests
    {
        private Func<long, ILetstalkClientService> letstalkClientService;
        private Func<long, ITelegramBotService> telegramBotService;
        private IBaseService baseService;
        private ICRMLogService logService;
        private List<BotChannelInfo> botChannels;

        [Fact]
        public async Task PushAsync_WhenChannelDeactived_ReturnExpectedErrorCodeAndErrMessage()
        {
            var service = GetService();
            foreach (var channel in botChannels)
            {
                channel.IsActive = false;
            }

            var actual = await service.PushAsync(FakeSimpleParam());

            Assert.NotNull(actual);
            Assert.False(actual.IsSuccessful);
            Assert.Equal(1, actual.ErrorCode);
            Assert.Equal("Channel Telegram is current inactivated", actual.ErrorMessage);
            Assert.True(actual.IsIgnoreRetry);
        }

        [Fact]
        public async Task PushAsync_WhenThrowException_WriteLogDB_AndReturnExpectedResult()
        {
            var service = GetService();
            var exception = new Exception("This is exception message");
            letstalkClientService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>())
                .Throws(exception);
            var actual = await service.PushAsync(FakeSimpleParam());

            Assert.NotNull(actual);
            Assert.Equal(1, actual.ErrorCode);
            Assert.False(actual.IsSuccessful);
            Assert.Equal(SendNotificationErrorMessage.BotServiceErrorMsg, actual.ErrorMessage);
            await baseService.Received().ExecuteNonQueryAsync(Arg.Any<WriteLogMessageCommand>());
            await logService.Received().ErrorAsync(Arg.Is(exception));
        }

        [Fact]
        public async Task PushAsync_LetstalkPersonal_BotBlocked_ReturnExpectedResult()
        {
            var service = GetService();
            letstalkClientService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>())
                .Returns(new PushMessageResult { BlockList = new List<string> { "ConversationId" } });
            var actual = await service.PushAsync(FakeSimpleParam());

            Assert.NotNull(actual);
            Assert.Equal(1, actual.ErrorCode);
            Assert.False(actual.IsSuccessful);
            Assert.True(actual.IsBlockedBot);
            Assert.Empty(actual.ErrorMessage);
            await letstalkClientService(Arg.Any<long>()).Received(1).PushPersonalAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>());
            await baseService.Received().ExecuteNonQueryAsync(Arg.Any<WriteLogMessageCommand>());
            await logService.DidNotReceive().ErrorAsync(Arg.Any<Exception>());
        }

        [Fact]
        public async Task PushAsync_LetstalkPersonal_WhenHaveSendImage_CallExpectedMethod()
        {
            var service = GetService();
            letstalkClientService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>())
                .Returns(new PushMessageResult { Status = 1 });
            var param = FakeSimpleParam();
            param.Images = new string[] { "a", "b", "c" };
            var actual = await service.PushAsync(param);

            Assert.NotNull(actual);
            Assert.True(actual.IsSuccessful);
            Assert.False(actual.IsBlockedBot);
            Assert.Empty(actual.ErrorMessage);
            await letstalkClientService(Arg.Any<long>()).Received(4).PushPersonalAsync(Arg.Is("ConversationId"), Arg.Any<OutgoingMessage>());
            await letstalkClientService(Arg.Any<long>()).DidNotReceive().PushRoomAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>());
            await baseService.Received().ExecuteNonQueryAsync(Arg.Any<WriteLogMessageCommand>());
            await logService.DidNotReceive().ErrorAsync(Arg.Any<Exception>());
        }

        [Fact]
        public async Task PushAsync_LetstalkGroup_Error_ReturnExpectedResult()
        {
            var service = GetService();
            letstalkClientService(Arg.Any<long>()).PushRoomAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>())
                .Returns(new PushMessageResult { FailList = new List<string> { "ConversationId" } });
            var param = FakeSimpleParam();
            param.ChatTypeId = 1;
            var actual = await service.PushAsync(param);

            Assert.NotNull(actual);
            Assert.Equal(1, actual.ErrorCode);
            Assert.False(actual.IsSuccessful);
            Assert.Equal(SendNotificationErrorMessage.BotServiceErrorMsg, actual.ErrorMessage);
            await letstalkClientService(Arg.Any<long>()).Received(1).PushRoomAsync(Arg.Is("ConversationId"), Arg.Any<OutgoingMessage>());
            await baseService.Received().ExecuteNonQueryAsync(Arg.Any<WriteLogMessageCommand>());
            await logService.DidNotReceive().ErrorAsync(Arg.Any<Exception>());
            logService.DidNotReceive().LogInformation(Arg.Any<string>());
        }

        [Fact]
        public async Task PushAsync_LetstalkGroup_WhenHaveSendImage_CallExpectedMethod()
        {
            var service = GetService();
            letstalkClientService(Arg.Any<long>()).PushRoomAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>())
                .Returns(new PushMessageResult { Status = 1 });
            var param = FakeSimpleParam();
            param.Images = new string[] { "a", "b", "c" };
            param.ChatTypeId = 1;
            var actual = await service.PushAsync(param);

            Assert.NotNull(actual);
            Assert.True(actual.IsSuccessful);
            Assert.Empty(actual.ErrorMessage);
            await letstalkClientService(Arg.Any<long>()).Received(4).PushRoomAsync(Arg.Is("ConversationId"), Arg.Any<OutgoingMessage>());
            await letstalkClientService(Arg.Any<long>()).DidNotReceive().PushPersonalAsync(Arg.Any<string>(), Arg.Any<OutgoingMessage>());
            await baseService.Received().ExecuteNonQueryAsync(Arg.Any<WriteLogMessageCommand>());
            await logService.DidNotReceive().ErrorAsync(Arg.Any<Exception>());
            logService.Received(3).LogInformation(Arg.Any<string>());
        }

        #region Helper

        private static NotificationMessage FakeSimpleParam() => new NotificationMessage
        {
            NotificationId = 1,
            AnnouncementId = 1,
            BotId = 1,
            Channel = BotChannel.Letstalk,
            ChatTypeId = 2,
            Content = "Message Test",
            ConversationGroupId = 1,
            ConversationId = "ConversationId"
        };

        private PushMessageService GetService()
        {
            letstalkClientService = Substitute.For<Func<long, ILetstalkClientService>>();
            telegramBotService = Substitute.For<Func<long, ITelegramBotService>>();
            baseService = Substitute.For<IBaseService>();
            logService = Substitute.For<ICRMLogService>();
            botChannels = new List<BotChannelInfo>
            {
                new BotChannelInfo {Name = BotChannel.Letstalk, IsActive = true},
                new BotChannelInfo {Name = BotChannel.Telegram, IsActive = true}
            };
            return new PushMessageService(letstalkClientService, telegramBotService, baseService, logService, botChannels);
        }

        #endregion Helper
    }
}