namespace CRM.Letstalk.Client.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Constants;
    using CRM.Letstalk.Client.Models.Results;
    using CRM.Letstalk.Client.Services;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Client.Tests.Helper;
    using Newtonsoft.Json;
    using NSubstitute;
    using Xunit;

    public class HttpClientServiceTests
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IJwtService jwtService;
        private readonly BotConfig botConfig;
        private readonly HttpClientService httpClientService;
        private readonly Fixture fixture;

        public HttpClientServiceTests()
        {
            httpClientFactory = Substitute.For<IHttpClientFactory>();
            jwtService = Substitute.For<IJwtService>();
            fixture = new Fixture();
            botConfig = new BotConfig
            {
                ApiKey = "TestAPI",
                ApiEndpoint = "http://abc.com",
                SecureKey = "SecureKey"
            };
            httpClientService = new HttpClientService(httpClientFactory, jwtService, botConfig);
        }

        [Fact]
        public void ExecuteGetAsync_InvalidEndPoint_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.ThrowsAsync<ArgumentNullException>(() => httpClientService.ExecuteGetAsync<object>(string.Empty));
        }

        [Fact]
        public async Task ExecuteGetAsync_ValidEndPoint_CallsHttpClientExecuteAsyncAndReturnCorrectType()
        {
            // Arrange
            var endPoint = "endpoint";

            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonConvert.SerializeObject(fixture.Create<object>()))
            };

            httpClientFactory.CreateClient(Arg.Any<string>()).Returns(new HttpClient(new MockHttpMessageHandler(response)));

            // Act
            var result = await httpClientService.ExecuteGetAsync<RoomResult>(endPoint);

            // Assert
            httpClientFactory.Received().CreateClient(Arg.Is(HttpClientName.DefaultHttpClientWithProxy));
            Assert.IsType<RoomResult>(result);
        }

        [Fact]
        public void ExecutePostAsync_InvalidEndPoint_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.ThrowsAsync<ArgumentNullException>(
                () => httpClientService.ExecutePostAsync<object>(string.Empty, new Dictionary<string, object>()));
        }

        [Fact]
        public async Task ExecutePostAsync_ValidEndPoint_EcryptDataAndReturnExpectedResultType()
        {
            // Arrange
            var endPoint = "endpoint";
            var expectResult = fixture.Create<BaseResult>();
            var encodedData = fixture.Create<string>();
            var data = fixture.Create<IDictionary<string, object>>();
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(JsonConvert.SerializeObject(expectResult))
            };

            httpClientFactory.CreateClient(Arg.Any<string>()).Returns(new HttpClient(new MockHttpMessageHandler(response)));
            jwtService.Encode(Arg.Is(botConfig.SecureKey), Arg.Is(data)).Returns(encodedData);
            // Act
            var result = await httpClientService.ExecutePostAsync<BaseResult>(endPoint, data);

            // Assert
            jwtService.Received(1).Encode("SecureKey", data);
            Assert.IsType<BaseResult>(result);
            Assert.Equal(JsonConvert.SerializeObject(expectResult), JsonConvert.SerializeObject(result));
        }

        [Fact]
        public void ExecutePutAsync_InvalidEndPoint_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.ThrowsAsync<ArgumentNullException>(
                () => httpClientService.ExecutePutAsync<object>(string.Empty, new Dictionary<string, object>()));
        }

        [Fact]
        public void ExecuteDeleteAsync_InvalidEndPoint_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.ThrowsAsync<ArgumentNullException>(
                () => httpClientService.ExecuteDeleteAsync<object>(string.Empty, new Dictionary<string, object>()));
        }
    }
}