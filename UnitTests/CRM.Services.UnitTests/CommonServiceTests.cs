namespace CRM.Services.UnitTests;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Common;
using CRM.Extensions;
using CRM.Models;
using CRM.Models.Common;
using Enum;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

public class CommonServiceTests
{
    private IBaseService baseService;
    private IOptionsSnapshot<AppSettings> appSettings;
    private readonly IFixture fixture = new Fixture();

    private readonly AppSettings settingsValue = new()
    {
        ClientTimezone = 8,
        ServerTimezone = -4
    };

    [Fact]
    public async Task GetConversationBotAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var expected = fixture.Create<IEnumerable<BaseBotModel>>();
        baseService.GetDataAsync<BaseBotModel>(Arg.Any<GetConversationBotsCriteria>()).Returns(expected);

        // Action
        var result = await service.GetConversationBotAsync();

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task GetRecipientAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var criteria = fixture.Create<GetRecipientsCriteria>();
        var expected = fixture.Create<(IEnumerable<RecipientModel>, IEnumerable<BotInfo>)>();
        baseService.FetchMultipleAsync<RecipientModel, BotInfo>(criteria).Returns(expected);

        // Action
        var result = await service.GetRecipientAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task GetRecipientTypeAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var expected = fixture.Create<IEnumerable<BaseModel>>();
        baseService.GetDataAsync<BaseModel>(Arg.Any<GetRecipientTypesCriteria>()).Returns(expected);

        // Action
        var result = await service.GetRecipientTypeAsync();

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task GetSystemAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var expected = fixture.Create<IEnumerable<BaseModel>>();
        baseService.GetDataAsync<BaseModel>(Arg.Any<GetSystemsCriteria>()).Returns(expected);

        // Action
        var result = await service.GetSystemAsync();

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task GetHeadlineAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var criteria = fixture.Create<GetHeadlinesCriteria>();
        var expected = fixture.Create<IEnumerable<BaseModel>>();
        baseService.GetDataAsync<BaseModel>(criteria).Returns(expected);

        // Action
        var result = await service.GetHeadlineAsync(criteria);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void GetChatTypes_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var expected = Enum.GetValues(typeof(ChatType)).Cast<ChatType>()
            .Select(type => new BaseModel { Id = (int)type, Name = EnumHelper.GetDescription(type) });

        // Action
        var result = service.GetChatTypes();

        // Assert
        Assert.Equal(JsonConvert.SerializeObject(expected), JsonConvert.SerializeObject(result));
    }

    [Fact]
    public void GetMappingStatus_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var expected = Enum.GetValues(typeof(MappingStatus)).Cast<MappingStatus>()
            .Select(type => new BaseModel { Id = (int)type, Name = EnumHelper.GetDescription(type) });

        // Action
        var result = service.GetMappingStatus();

        // Assert
        Assert.Equal(JsonConvert.SerializeObject(expected), JsonConvert.SerializeObject(result));
    }

    [Fact]
    public async Task GetBotServicesAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var expected = fixture.Create<IEnumerable<BaseModel>>();
        baseService.GetDataAsync<BaseModel>(Arg.Any<GetBotServicesCriteria>()).Returns(expected);

        // Action
        var result = await service.GetBotServicesAsync();

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void ConvertToClientDateTime_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var date = new DateTime(2024, 1, 12, 20, 0, 0, DateTimeKind.Utc);
        var expected = date.Add(new TimeSpan(settingsValue.TimeSpan, 0, 0));

        // Action
        var result = service.ConvertToClientDateTime(date);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void ConvertToServerDateTime_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var date = fixture.Create<DateTime>();
        var expected = date.Subtract(new TimeSpan(settingsValue.TimeSpan, 0, 0));

        // Action
        var result = service.ConvertToServerDateTime(date);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void ConvertClientFromTimeToServerTime_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var clientFromTime = fixture.Create<DateTime>();
        var expected = clientFromTime.Date.Subtract(new TimeSpan(settingsValue.TimeSpan, 0, 0));

        // Action
        var result = service.ConvertClientFromTimeToServerTime(clientFromTime);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void ConvertClientToTimeToServerTime_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var clientToTime = fixture.Create<DateTime>();
        var endClientDate = service.GetEndOfDate(clientToTime);
        var expected = endClientDate.Subtract(new TimeSpan(settingsValue.TimeSpan, 0, 0));

        // Action
        var result = service.ConvertClientToTimeToServerTime(clientToTime);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void GetEndOfDate_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var date = fixture.Create<DateTime>();
        var expected = new DateTimeOffset(date.Year, date.Month, date.Day, 0, 0, 0, TimeSpan.Zero).AddDays(1).AddSeconds(-1).DateTime;

        // Action
        var result = service.GetEndOfDate(date);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void FirstDayOfMonth_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var dateTime = fixture.Create<DateTime>();
        var expected = new DateTimeOffset(dateTime.Year, dateTime.Month, 1, 0, 0, 0, TimeSpan.Zero).DateTime;

        // Action
        var result = service.FirstDayOfMonth(dateTime);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void LastDayOfMonth_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var service = GetService();
        var dateTime = fixture.Create<DateTime>();
        var expected = service.FirstDayOfMonth(dateTime).AddMonths(1).AddDays(-1);

        // Action
        var result = service.LastDayOfMonth(dateTime);

        // Assert
        Assert.Equal(expected, result);
    }

    private CommonService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        appSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
        appSettings.Value.Returns(settingsValue);
        return new CommonService(baseService, appSettings);
    }
}