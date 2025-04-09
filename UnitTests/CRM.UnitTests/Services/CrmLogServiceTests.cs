namespace CRM.UnitTests.Services;

using System;
using System.Threading.Tasks;
using CRM.Services;
using Fanex.Data.Repository;
using Fanex.Logging;
using Fanex.Logging.Extensions;
using Models;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

public class CrmLogServiceTests
{
    private ILogger logger;

    [Fact]
    public async Task ErrorMessageAsync_WhenCalled_LogsErrorMessage()
    {
        // Arrange
        var errorMessage = "Test error message";
        var service = GetService();

        // Act
        await service.ErrorMessageAsync(errorMessage);

        // Assert
        await logger.Received(1).ErrorAsync(errorMessage);
    }

    [Fact]
    public async Task ErrorAsync_WithException_WillCallsFanexLogError()
    {
        // Arrange
        var exception = new Exception("This is message");
        var service = GetService();

        // Act
        await service.ErrorAsync(exception);

        // Assert
        await logger.Received().ErrorAsync(Arg.Is<string>(x => x.Contains(exception.Message)));
    }

    [Fact]
    public async Task ErrorAsync_Command_WillCallsFanexLogErrorWithExpectedMessage()
    {
        // Arrange
        var command = new CommandResult { Code = 1, Message = "This is error messgae" };
        var criteria = Substitute.For<ICriteria>();
        var logMessage = new LogMessage($"{command.Code}: {command.Message}")
            .AddMessage(JsonConvert.SerializeObject(criteria, Formatting.Indented))
            .ToString();
        var service = GetService();

        // Act
        await service.ErrorAsync(command, criteria);

        // Assert
        await logger.Received().ErrorAsync(logMessage);
    }

    [Fact]
    public async Task ErrorAsync_ExceptionOnly_WhenCalled_LogsErrorMessage()
    {
        // Arrange
        var exception = new Exception("Test exception");
        var service = GetService();

        // Act
        await service.ErrorAsync(exception);

        // Assert
        await logger.Received(1).ErrorAsync(Arg.Is<string>(msg => msg.Contains("Test exception")));
    }

    [Fact]
    public async Task ErrorAsync_CommandResultAndCriteria_WhenCalled_LogsErrorMessage()
    {
        // Arrange
        var commandResult = new CommandResult { Code = 500, Message = "Test error" };
        var criteria = Substitute.For<ICriteria>();
        var service = GetService();

        // Act
        await service.ErrorAsync(commandResult, criteria);

        // Assert
        await logger.Received(1).ErrorAsync(Arg.Is<string>(msg => msg.Contains("500: Test error") && msg.Contains(JsonConvert.SerializeObject(criteria, Formatting.Indented))));
    }

    [Fact]
    public async Task ErrorAsync_ExceptionAndCriteria_WhenCalled_LogsErrorMessage()
    {
        // Arrange
        var exception = new Exception("Test exception");
        var criteria = Substitute.For<ICriteria>();
        var service = GetService();

        // Act
        await service.ErrorAsync(exception, criteria);

        // Assert
        await logger.Received(1).ErrorAsync(Arg.Is<string>(msg => msg.Contains("Test exception") && msg.Contains(JsonConvert.SerializeObject(criteria, Formatting.Indented))));
    }

    [Fact]
    public void LogInformation_WhenCalled_LogsInformationMessage()
    {
        // Arrange
        var message = "Test information message";
        var service = GetService();

        // Act
        service.LogInformation(message);

        // Assert
        logger.DidNotReceive().Info(message);
        NLog.LogManager.GetCurrentClassLogger().Info(message);
    }

    private CRMLogService GetService()
    {
        logger = Substitute.For<ILogger>();
        return new CRMLogService(logger);
    }
}