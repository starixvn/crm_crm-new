using System;
using System.Net.Http;
using CRM.BotService.Core.Models.Letstalk.BotConfig;
using CRM.BotService.Core.Services;
using Fanex.Caching;
using NSubstitute;
using Xunit;

public class LetstalkClientServiceTests
{
    private const string LetstalkCacheKey = "CRM-Letstalk-API-Token";
    private const string JsonContentType = "application/json";
    private const string PlainTextContentType = "text/plain";
    private const int ExpiredTokenPeriodInMiliseconds = 5000;
    private readonly LetstalkBotConfig botConfig;
    private readonly IHttpClientFactory clientFactory;
    private readonly ICacheService cacheService;
    private readonly LetstalkClientService letstalkClientService;

    public LetstalkClientServiceTests()
    {
        botConfig = new LetstalkBotConfig
        {
            ApiEndpoint = "http://test.com",
            ApiKey = "Key",
            BotAccountId = 1000,
            BotUserId = "@test",
            BusinessAccountType = 1,
            ChatKey = "ABC",
            ChatKeyVersion = 5,
            EncryptionMode = 2,
            SecureKey = "Secure"
        };
        cacheService = Substitute.For<ICacheService>();
        clientFactory = Substitute.For<IHttpClientFactory>();
        letstalkClientService = new LetstalkClientService(clientFactory, cacheService, botConfig);
    }

    [Fact]
    public void GetProfileAsync_AccountIdIsNullOrWhiteSpace_ThrowsArgumentNullException()
    {
        // Act & Assert
        Assert.ThrowsAsync<ArgumentNullException>(() => letstalkClientService.GetProfileAsync(string.Empty));
    }
}