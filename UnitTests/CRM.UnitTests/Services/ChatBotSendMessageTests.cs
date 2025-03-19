namespace CRM.UnitTests.Services;

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using CRM.Services;
using Enum;
using Fanex.Caching;
using Helpers;
using Models.BotServices;
using Newtonsoft.Json;
using NSubstitute;

public class ChatBotSendMessageTests
{
    private BotServiceSettings botServiceSettings;
    private IHttpClientFactory httpClientFactory;
    private ICacheService cacheService;

    private static NotificationMessage FakeNotificationMessage() => new()
    {
        NotificationId = 1,
        ConversationGroupId = 1,
        BotId = 1,
        ChannelId = BotChannel.Letstalk
    };

    private static IEnumerable<NotificationMessage> FakeListNotificationMessage()
    {
        return new List<NotificationMessage>
        {
            new() {NotificationId = 1, ConversationGroupId = 1, BotId = 1, ChannelId = BotChannel.Letstalk},
            new() {NotificationId = 2, ConversationGroupId = 2, BotId = 1, ChannelId = BotChannel.Letstalk},
            new() {NotificationId = 3, ConversationGroupId = 3, BotId = 2, ChannelId = BotChannel.Telegram},
            new() {NotificationId = 4, ConversationGroupId = 4, BotId = 2, ChannelId = BotChannel.Telegram}
        };
    }

    #region Helpers

    private void FakeHttpClientResponse(HttpStatusCode status = HttpStatusCode.OK)
    {
        var fakeResult = FakeListSendResult();
        var signeReult = new SendResult { NotificationId = 100, ConversationGroupId = 100, ErrorCode = 0, IsBlockedBot = false, IsIgnoreRetry = false };
        var fakeTokenReult = new
        {
            accessToken = "token",
            expriedDate = new DateTime(2100, 1, 1)
        };
        var httpClientFake = new Dictionary<string, HttpResponseMessage>
        {
            { botServiceSettings.ServiceUrl + "api/authenticate", new HttpResponseMessage(status) { Content = new StringContent(JsonConvert.SerializeObject(fakeTokenReult))} },
            { botServiceSettings.ServiceUrl + "api/multiple-notify", new HttpResponseMessage(status) { Content = new StringContent(JsonConvert.SerializeObject(fakeResult))} },
            { botServiceSettings.ServiceUrl + "api/single-notify", new HttpResponseMessage(status) { Content = new StringContent(JsonConvert.SerializeObject(signeReult))} },
        };
        httpClientFactory.CreateClient().Returns(new HttpClient(new MockHttpMessageHandler(httpClientFake)));
    }

    private static IEnumerable<SendResult> FakeListSendResult()
    {
        return new List<SendResult>
        {
            new() {NotificationId = 1, ConversationGroupId = 1, ErrorCode = 0, IsBlockedBot = false, IsIgnoreRetry = false},
            new() {NotificationId = 2, ConversationGroupId = 2, ErrorCode = 0, IsBlockedBot = true, IsIgnoreRetry = true},
            new() {NotificationId = 3, ConversationGroupId = 3, ErrorCode = 1, IsBlockedBot = false, IsIgnoreRetry = false},
            new() {NotificationId = 4, ConversationGroupId = 4, ErrorCode = 1, IsBlockedBot = true, IsIgnoreRetry = true}
        };
    }

    private ChatBotSendMessageService GetService()
    {
        botServiceSettings = new BotServiceSettings
        {
            ServiceUrl = "http://bot.com/",
            AppId = "Id",
            Token = "1234aa",
            AuthenticatePath = "api/authenticate",
            ApiConfigs =
            [
                new ApiConfig
                {
                    Channel = BotChannel.Letstalk, SendMultipleMessagePath = "api/multiple-notify",
                    SendSingleMessagePath = "api/single-notify"
                },
                new ApiConfig
                {
                    Channel = BotChannel.Telegram, SendMultipleMessagePath = "api/multiple-notify",
                    SendSingleMessagePath = "api/single-notify"
                }
            ],
        };
        httpClientFactory = Substitute.For<IHttpClientFactory>();
        cacheService = Substitute.For<ICacheService>();
        return new ChatBotSendMessageService(botServiceSettings, httpClientFactory, cacheService);
    }

    #endregion Helpers
}