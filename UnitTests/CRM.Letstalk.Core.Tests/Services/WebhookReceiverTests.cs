namespace CRM.BotService.Core.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using CRM.Core.Services;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.BotService.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Http;
    using NSubstitute;
    using Xunit;
    using CRM.BotService.Core.Services;

    public class WebhookReceiverTests
    {
        private readonly IWebhookReceiver webhookReceiver;
        private readonly IJwtService jwtService;
        private readonly IEventHandler eventHandler;
        private readonly List<BotConfig> botConfigs;
        private readonly ICRMLogService logService;

        public WebhookReceiverTests()
        {
            jwtService = Substitute.For<IJwtService>();
            eventHandler = Substitute.For<IEventHandler>();
            logService = Substitute.For<ICRMLogService>();
            var func = Substitute.For<Func<string, IEventHandler>>();
            func(Arg.Any<string>()).Returns(eventHandler);

            botConfigs = new List<BotConfig>
            {
                new BotConfig { BotAccountId = 1000, SecureKey = "SecureKey" }
            };
            webhookReceiver = new WebhookReceiver(jwtService, logService, func, botConfigs);
        }

        [Fact]
        public void ReceiveAsync_WhenCallWithInValidBotId_ThrowsKeyNotFoundException()
        {
            Assert.ThrowsAsync<ArgumentNullException>(() => webhookReceiver.ReceiveAsync(Arg.Any<HttpRequest>(), 1001));
        }
    }
}