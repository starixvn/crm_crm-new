namespace CRM.Services.UnitTests;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Announcement;
using CRM.Models.Announcement;
using CRM.Services.HeadlineNotification;
using Interfaces;
using Models;
using NSubstitute;
using Xunit;

public class AnnouncementServiceTests
{
    private IBaseService baseService;
    private ICommonService commonService;
    private readonly Fixture fixture = new();

    [Fact]
    public async Task GetAnnouncementAsync_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var service = GetService();

        var clientdate = fixture.Create<DateTime>();
        var serverDate = fixture.Create<DateTime>();
        var criteria = fixture.Create<GetAnnouncementCriteria>();
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(serverDate);
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(serverDate);
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientdate);
        var announcements = fixture.Create<IEnumerable<AnnouncementInfo>>();

        baseService.GetDataAsync<AnnouncementInfo>(Arg.Do<GetAnnouncementCriteria>(x => criteria = x)).Returns(announcements);

        foreach (var announcement in announcements) {
            announcement.SendDateString = clientdate.ToString("MMM dd, yyyy");
            announcement.SendTimeString = clientdate.ToString("hh:mm:ss tt");
            announcement.CreatedTime = clientdate;
        }

        // Act
        var actual = await service.GetAnnouncementAsync(criteria);

        // Assert
        Assert.Equal(announcements, actual);
    }

    [Fact]
    public async Task NewAnnouncementAsync_SendImmediately_ReturnExpectedData()
    {
        // Arrange
        var service = GetService();

        var date = fixture.Create<DateTime>();
        var command = new CreateAnnouncementCommand
        {
            SendDate = date,
            SendImmediately = true,
        };

        var commandResult = fixture.Create<CommandResult>();
        baseService.ExecuteNonQueryAsync(Arg.Do<CreateAnnouncementCommand>(x => command = x)).Returns(commandResult);


        // Act
        var actual = await service.NewAnnouncementAsync(command);

        // Assert
        Assert.Equal(command.SendDate, date);
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task NewAnnouncementAsync_SendImmediatelyIsFalse_ReturnExpectedData()
    {
        // Arrange
        var service = GetService();

        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(clientDate);
        var command = new CreateAnnouncementCommand
        {
            SendDate = date,
            SendImmediately = false,
        };

        var commandResult = fixture.Create<CommandResult>();
        baseService.ExecuteNonQueryAsync(Arg.Do<CreateAnnouncementCommand>(x => command = x)).Returns(commandResult);


        // Act
        var actual = await service.NewAnnouncementAsync(command);

        // Assert
        Assert.Equal(command.SendDate, clientDate);
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task EditAnnouncementAsync_SendImmediately_ReturnExpectedCommandResult()
    {
        // Arrange
        var service = GetService();

        var date = fixture.Create<DateTime>();
        var command = new EditAnnouncementCommand
        {
            SendDate = date,
            SendImmediately = true,
        };

        var commandResult = fixture.Create<CommandResult>();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditAnnouncementCommand>(x => command = x)).Returns(commandResult);


        // Act
        var actual = await service.EditAnnouncementAsync(command);

        // Assert
        Assert.Equal(command.SendDate, date);
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task EditAnnouncementAsync_SendImmediatelyIsFalse_ReturnExpectedCommandResult()
    {
        // Arrange
        var service = GetService();

        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(clientDate);
        var command = new EditAnnouncementCommand
        {
            SendDate = date,
            SendImmediately = false,
        };

        var commandResult = fixture.Create<CommandResult>();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditAnnouncementCommand>(x => command = x)).Returns(commandResult);


        // Act
        var actual = await service.EditAnnouncementAsync(command);

        // Assert
        Assert.Equal(command.SendDate, clientDate);
        Assert.Equal(commandResult, actual);
    }


    [Fact]
    public async Task CancelAnnouncementAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        // Arrange
        var service = GetService();

        var command = fixture.Create<CancelAnnouncementCommand>();
        var commandResult = fixture.Create<CommandResult>();
        baseService.ExecuteNonQueryAsync(Arg.Do<CancelAnnouncementCommand>(x => command = x)).Returns(commandResult);


        // Act
        var actual = await service.CancelAnnouncementAsync(command);

        // Assert
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task GetContentByIdAsync_WhenCalled_ReturnExpectedTupe()
    {
        //Arrange
        var service = GetService();
        var criteria = fixture.Create<GetContentByIdCriteria>();
        var announcements = fixture.Create<IEnumerable<AnnouncementDetail>>();
        var contents = fixture.Create<IEnumerable<ContentInfo>>();

        var tuple = (announcements, contents);
        baseService.FetchMultipleAsync<AnnouncementDetail, ContentInfo>(Arg.Do<GetContentByIdCriteria>(x => criteria = x)).Returns(tuple);

        //Act
        var actual = await service.GetContentByIdAsync(1);

        //Assert
        Assert.Equal(tuple, actual);
    }

    [Fact]
    public async Task GetAnnouncementTemplateAsync_WhenCalled_ReturnExpectedTupe()
    {
        //Arrange
        var service = GetService();
        var criteria = fixture.Create<GetAnnouncementTemplateCriteria>();
        var notificationTemplates = fixture.Create<IEnumerable<NotificationTemplate>>();
        var contentLanguages = fixture.Create<IEnumerable<ContentLanguage>>();

        var tuple = (notificationTemplates, contentLanguages);
        baseService.FetchMultipleAsync<NotificationTemplate, ContentLanguage>(Arg.Do<GetAnnouncementTemplateCriteria>(x => criteria = x)).Returns(tuple);

        //Act
        var actual = await service.GetAnnouncementTemplateAsync();

        //Assert
        Assert.Equal(tuple, actual);
    }

    [Fact]
    public async Task ValidateAnnouncementAsync_WhenCalled_ReturnMessageFalse()
    {
        //Arrange
        var service = GetService();

        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(clientDate);
        var command = new ValidateAnnouncementCommand
        {
            SendDate = date,
            SendImmediately = false,
        };

        var announcements = fixture.Create<IEnumerable<AnnouncementDetail>>();
        var commandResult = fixture.Create<CommandResult>();

        var tuple = (announcements, commandResult);
        baseService.ExecuteNonQueryAsync(Arg.Do<ValidateAnnouncementCommand>(x => command = x)).Returns(commandResult);
        baseService.GetDataAsync<AnnouncementDetail>(Arg.Do<ValidateAnnouncementCommand>(x => command = x)).Returns(announcements);

        //Act
        var actual = await service.ValidateAnnouncementAsync(command);

        //Assert
        Assert.Equal(tuple.commandResult, actual.Item2);
    }

    [Fact]
    public async Task ValidateAnnouncementAsync_WhenCalled_ReturnExpectedTupe()
    {
        //Arrange
        var service = GetService();

        var date = fixture.Create<DateTime>();
        var clientDate = fixture.Create<DateTime>();
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(clientDate);
        var command = new ValidateAnnouncementCommand
        {
            SendDate = date,
            SendImmediately = false,
        };

        var announcements = fixture.Create<IEnumerable<AnnouncementDetail>>();
        var commandResult = fixture.Create<CommandResult>();
        commandResult.Code = 0;

        var tuple = (announcements, commandResult);
        baseService.ExecuteNonQueryAsync(Arg.Do<ValidateAnnouncementCommand>(x => command = x)).Returns(commandResult);
        baseService.GetDataAsync<AnnouncementDetail>(Arg.Do<ValidateAnnouncementCommand>(x => command = x)).Returns(announcements);

        //Act
        var actual = await service.ValidateAnnouncementAsync(command);

        //Assert
        Assert.Equal(tuple.announcements, actual.Item1);
        Assert.Equal(tuple.commandResult, actual.Item2);
    }

    #region Helpers

    private AnnouncementService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();
        return new AnnouncementService(baseService, commonService);
    }

    #endregion Helpers
}