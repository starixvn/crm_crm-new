namespace CRM.Core.Services
{
    using System;
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using Fanex.Data.Repository;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.Database;
    using Newtonsoft.Json;
    using NLog;
    using NLog.Web;

    public interface ICRMLogService
    {
        Task ErrorAsync(Exception exception);

        Task ErrorMessageAsync(string error);

        Task ErrorAsync(CommandResult commandResult, ICriteria criteria);

        Task ErrorAsync(Exception exception, ICriteria criteria);

        void LogInformation(string message);

        void LogFileError(Exception exception);
    }

    public class CRMLogService : ICRMLogService
    {
        private readonly Fanex.Logging.ILogger logger;
        private readonly Logger nlog = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

        public CRMLogService(
            Fanex.Logging.ILogger logger)
        {
            this.logger = logger;
        }

        public async Task ErrorAsync(Exception exception)
        {
            var logMessage = new LogMessage(exception.Message)
                       .AddSection("Database Info", DatabaseInfoGetters.GetDbExceptionInfo(exception))
                       .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
                       .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
                       .ToString();
            await logger.ErrorAsync(logMessage);
        }

        public async Task ErrorMessageAsync(string error)
        {
            await logger.ErrorAsync(error);
        }

        public async Task ErrorAsync(CommandResult commandResult, ICriteria criteria)
        {
            var logMessage = new LogMessage(string.Format("{0}: {1}", commandResult.Code, commandResult.Message))
                       .AddMessage(JsonConvert.SerializeObject(criteria, Formatting.Indented))
                       .ToString();
            await logger.ErrorAsync(logMessage);
        }

        public async Task ErrorAsync(Exception exception, ICriteria criteria)
        {
            var logMessage = new LogMessage(exception.Message)
                      .AddSection("Database Info", DatabaseInfoGetters.GetDbExceptionInfo(exception))
                      .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
                      .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
                      .AddMessage(JsonConvert.SerializeObject(criteria, Formatting.Indented))
                      .ToString();
            await logger.ErrorAsync(logMessage);
        }

        public void LogFileError(Exception exception)
        {
            nlog.Error(exception);
        }

        public void LogInformation(string message)
        {
            nlog.Info(message);
        }
    }
}