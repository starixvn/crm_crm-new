namespace CRM.UnitTests.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using CRM.Models.BotServices;
using CRM.Models.BotServices.Announcement;
using CRM.Services;
using Enum;
using Fanex.Caching;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

public class ChatBotSendMessageTests
{
    private readonly BotServiceSettings botServiceSettings;
    private readonly IHttpClientFactory httpClientFactory;
    private readonly ICacheService cacheService;
    private readonly ChatBotSendMessageService chatBotSendMessageService;

    public ChatBotSendMessageTests()
    {
        botServiceSettings = new BotServiceSettings
        {
            ServiceUrl = "http://bot.com/",
            AppId = "Id",
            Token = "1234aa",
            AuthenticatePath = "api/authenticate",
            ApiConfigs =
            [
                new()
                {
                    Channel = BotChannel.Letstalk, SendMultipleMessagePath = "api/multiple-notify",
                    SendSingleMessagePath = "api/single-notify",
                    SendMultipleAnnouncementPath = "api/multiple-announcement",
                    SendOnlyImagesMultiplePath = "api/only-images-multiple"
                },

                new()
                {
                    Channel = BotChannel.Telegram, SendMultipleMessagePath = "api/multiple-notify",
                    SendSingleMessagePath = "api/single-notify",
                    SendMultipleAnnouncementPath = "api/multiple-announcement",
                    SendOnlyImagesMultiplePath = "api/only-images-multiple"
                }
            ],
        };
        httpClientFactory = Substitute.For<IHttpClientFactory>();
        cacheService = Substitute.For<ICacheService>();
        chatBotSendMessageService = new ChatBotSendMessageService(botServiceSettings, httpClientFactory, cacheService);
    }

    [Fact]
    public async Task SendMultipleFormattedMessageAndAttachmentAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var botChannel = BotChannel.Letstalk;
        var notifications = new List<AnnouncementNotification>
        {
            new() { AnnouncementId = 1, Content = "Test message" }
        };
        var expectedResponse = new List<SendNotificationResult>
        {
            new() { AnnouncementId = 1, IsSuccessful = true }
        };
        var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(expectedResponse))
        };

        var httpMessageHandler = new MockHttpMessageHandler(responseMessage);
        var httpClient = new HttpClient(httpMessageHandler);

        httpClientFactory.CreateClient().Returns(httpClient);

        // Act
        var result = await chatBotSendMessageService.SendMultipleFormattedMessageAndAttachmentAsync(botChannel, notifications);

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.True(result.First().IsSuccessful);
    }

    [Fact]
    public async Task SendImageOnlyAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var botChannel = BotChannel.Telegram;
        var notifications = new List<AnnouncementNotification>
        {
            new() { AnnouncementId = 1, Content = "Test message" }
        };
        var expectedResponse = new List<SendNotificationResult>
        {
            new() { AnnouncementId = 1, IsSuccessful = true }
        };
        var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(expectedResponse))
        };

        var httpMessageHandler = new MockHttpMessageHandler(responseMessage);
        var httpClient = new HttpClient(httpMessageHandler);

        httpClientFactory.CreateClient().Returns(httpClient);

        // Act
        var result = await chatBotSendMessageService.SendImageOnlyAsync(botChannel, notifications);

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.True(result.First().IsSuccessful);
    }

    [Fact]
    public async Task SendImageOnlyAsync_WhenCalled_ReturnsUnAuthorized()
    {
        // Arrange
        var botChannel = BotChannel.Telegram;
        var notifications = new List<AnnouncementNotification>
        {
            new() { AnnouncementId = 1, Content = "Test message" }
        };
        var expectedResponse = new List<SendNotificationResult>
        {
            new() { AnnouncementId = 1, IsSuccessful = true }
        };
        var responseMessage = new HttpResponseMessage(HttpStatusCode.Unauthorized)
        {
            Content = new StringContent("Unauthorized")
        };

        var httpMessageHandler = new MockHttpMessageHandler(responseMessage);
        var httpClient = new HttpClient(httpMessageHandler);

        httpClientFactory.CreateClient().Returns(httpClient);

        await Assert.ThrowsAnyAsync<Exception>(async () =>
            await chatBotSendMessageService.SendImageOnlyAsync(botChannel, notifications));
        // Act
    }

    #region Helpers

    private class MockHttpMessageHandler(HttpResponseMessage responseMessage) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            if (request.RequestUri.AbsoluteUri.Contains("api/authenticate"))
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(JsonConvert.SerializeObject(new
                    {
                        accessToken = "abcdef",
                        expriedDate = DateTime.UtcNow.AddMinutes(5)
                    }))
                };
                return Task.FromResult(response);
            }
            return Task.FromResult(responseMessage);
        }
    }

    #endregion Helpers
}