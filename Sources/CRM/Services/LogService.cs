namespace CRM.Services;

using System;
using System.Threading.Tasks;
using Fanex.Data.Repository;
using Fanex.Logging.Extensions;
using Models;
using Newtonsoft.Json;
using NLog;
using NLog.Web;

public interface ICRMLogService
{
    Task ErrorMessageAsync(string error);

    Task ErrorAsync(CommandResult commandResult, ICriteria criteria);

    Task ErrorAsync(Exception exception, ICriteria criteria);

    Task ErrorAsync(Exception exception);

    void LogInformation(string message);
}

public class CRMLogService(Fanex.Logging.ILogger logger) : ICRMLogService
{
    private readonly Logger nlog = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

    public async Task ErrorMessageAsync(string error)
    {
        await logger.ErrorAsync(error);
    }

    public async Task ErrorAsync(Exception exception)
    {
        var logMessage = new LogMessage(exception.Message)
            .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
            .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
            .ToString();
        await logger.ErrorAsync(logMessage);
    }

    public async Task ErrorAsync(CommandResult commandResult, ICriteria criteria)
    {
        var logMessage = new LogMessage($"{commandResult.Code}: {commandResult.Message}")
            .AddMessage(JsonConvert.SerializeObject(criteria, Formatting.Indented))
            .ToString();
        await logger.ErrorAsync(logMessage);
    }

    public async Task ErrorAsync(Exception exception, ICriteria criteria)
    {
        var logMessage = new LogMessage(exception.Message)
            .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
            .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
            .AddMessage(JsonConvert.SerializeObject(criteria, Formatting.Indented))
            .ToString();
        await logger.ErrorAsync(logMessage);
    }

    public void LogInformation(string message)
    {
        nlog.Info(message);
    }
}