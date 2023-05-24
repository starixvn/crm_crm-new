namespace CRM.BackgroundJob.Services
{
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.HealthCheck;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;

    public interface IBotHealthCheckService
    {
        Task LetstalkBotMonitorAsync();
    }

    public class BotHealthCheckService : IBotHealthCheckService
    {
        private readonly IChatBotSendMessageService chatBotSendMessageService;
        private readonly LetstalkHealthCheckSettings healthCheckSettings;

        public BotHealthCheckService(IChatBotSendMessageService chatBotSendMessageService, LetstalkHealthCheckSettings healthCheckSettings)
        {
            this.chatBotSendMessageService = chatBotSendMessageService;
            this.healthCheckSettings = healthCheckSettings;
        }

        public async Task LetstalkBotMonitorAsync()
        {
            var notificationMsg = new NotificationMessage
            {
                BotId = healthCheckSettings.BotId,
                ChannelId = BotChannel.Letstalk,
                ChatTypeId = (int)ChatType.Personal,
                ConversationId = healthCheckSettings.LetstalkId,
                Content = healthCheckSettings.Message
            };

            await chatBotSendMessageService.SendSingleMessageAsync(notificationMsg);
        }
    }
}