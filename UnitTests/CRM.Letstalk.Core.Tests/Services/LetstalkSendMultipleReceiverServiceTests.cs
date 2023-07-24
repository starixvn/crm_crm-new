namespace CRM.BotService.Core.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Models.Letstalk.Results;
    using CRM.BotService.Core.Services;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices.Announcement;
    using CRM.Core.Services;
    using NSubstitute;
    using NSubstitute.ExceptionExtensions;
    using Xunit;

    public class LetstalkSendMultipleReceiverServiceTests
    {
        private ICRMLogService logService;
        private IBotCommonService botCommonService;
        private Func<long, ILetstalkClientService> letstalkService;

        [Fact]
        public async Task SendFornattedTextAndImagesAsync_SendSuccessContenAndImage_WillCallExpectedServices()
        {
            var service = GetService();
            var data = FakeNotification();

            letstalkService(Arg.Any<long>()).PushRoomAsync(Arg.Any<List<string>>(), Arg.Any<OutgoingMessage>()).Returns(new PushMessageResult { Status = 1 });
            letstalkService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<List<string>>(), Arg.Any<OutgoingMessage>()).Returns(new PushMessageResult { Status = 1 });

            //Actual
            var actual = await service.SendFornattedTextAndImagesAsync(data);

            //Expected
            await botCommonService.Received(8).WriteLogMessageAsync(Arg.Any<WriteLogMessageCommand>());

            Assert.Equal(data.Count, actual.Count());
        }

        [Fact]
        public async Task SendFornattedTextAndImagesAsync_SendImageThrowsException_ReturnExpectedResult()
        {
            var service = GetService();
            var data = FakeNotification();

            letstalkService(Arg.Any<long>()).PushRoomAsync(Arg.Any<List<string>>(), Arg.Is<OutgoingMessage>(x => x.MessageType == NotificationMessageType.Html)).Returns(new PushMessageResult { Status = 1 });
            letstalkService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<List<string>>(), Arg.Is<OutgoingMessage>(x => x.MessageType == NotificationMessageType.Html)).Returns(new PushMessageResult { Status = 1 });

            letstalkService(Arg.Any<long>()).PushRoomAsync(Arg.Any<List<string>>(), Arg.Is<OutgoingMessage>(x => x.MessageType == NotificationMessageType.Image)).Throws(new Exception());
            letstalkService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<List<string>>(), Arg.Is<OutgoingMessage>(x => x.MessageType == NotificationMessageType.Image)).Throws(new Exception());

            //Actual
            var actual = await service.SendFornattedTextAndImagesAsync(data);

            //Expected
            await botCommonService.Received(8).WriteLogMessageAsync(Arg.Any<WriteLogMessageCommand>());

            Assert.Equal(data.Count, actual.Count());
            Assert.Contains(actual, i => !i.IsSuccessful);
        }

        [Fact]
        public async Task SendFornattedTextAndImagesAsync_SendLetstalkThrowException_StillReturnExpectedResult()
        {
            var service = GetService();
            var data = FakeNotification();

            letstalkService(Arg.Any<long>()).PushRoomAsync(Arg.Any<List<string>>(), Arg.Any<OutgoingMessage>()).Throws(new Exception());
            letstalkService(Arg.Any<long>()).PushPersonalAsync(Arg.Any<List<string>>(), Arg.Any<OutgoingMessage>()).Throws(new Exception());
            //Actual
            var actual = await service.SendFornattedTextAndImagesAsync(data);

            //Expected
            await botCommonService.Received(4).WriteLogMessageAsync(Arg.Any<WriteLogMessageCommand>());
            await letstalkService(Arg.Any<long>()).DidNotReceive().PushRoomAsync(Arg.Any<List<string>>(), Arg.Is<OutgoingMessage>(x => x.MessageType == NotificationMessageType.Image));
            await letstalkService(Arg.Any<long>()).DidNotReceive().PushPersonalAsync(Arg.Any<List<string>>(), Arg.Is<OutgoingMessage>(x => x.MessageType == NotificationMessageType.Image));

            Assert.Equal(data.Count, actual.Count());
            Assert.Contains(actual, i => !i.IsSuccessful);
        }

        private static List<AnnouncementNotification> FakeNotification()
        => new List<AnnouncementNotification>
            {
                new AnnouncementNotification {BotId = 1, AnnouncementId = 1, ChatTypeId = ChatType.Group,  Content="1", Images = new List<string> {"1" }, ConversationGroupId =1, ConversationId ="abc"},
                new AnnouncementNotification {BotId = 1, AnnouncementId = 2, ChatTypeId = ChatType.Group,  Content="1", Images = new List<string> {"1" }, ConversationGroupId =2, ConversationId ="def"},
                new AnnouncementNotification {BotId = 1, AnnouncementId = 1, ChatTypeId = ChatType.Personal,  Content="1", Images = new List<string> {"1" }, ConversationGroupId =3, ConversationId ="agh"},
                new AnnouncementNotification {BotId = 1, AnnouncementId = 1, ChatTypeId = ChatType.Personal,  Content="1", Images = new List<string> {"1" }, ConversationGroupId =4, ConversationId ="asc"},
                new AnnouncementNotification {BotId = 1, AnnouncementId = 2, ChatTypeId = ChatType.Personal,  Content="1", Images = new List<string> {"1" }, ConversationGroupId =5, ConversationId ="uhj"},
                new AnnouncementNotification {BotId = 1, AnnouncementId = 1, ChatTypeId = ChatType.Personal,  Content="1", Images = new List<string> {"1" }, ConversationGroupId =6, ConversationId ="1bcs"}
            };

        private LetstalkSendMultipleReceiverService GetService()
        {
            logService = Substitute.For<ICRMLogService>();
            botCommonService = Substitute.For<IBotCommonService>();
            letstalkService = Substitute.For<Func<long, ILetstalkClientService>>();
            return new LetstalkSendMultipleReceiverService(botCommonService, logService, letstalkService);
        }
    }
}