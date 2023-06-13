namespace CRM.Letstalk.Services.Services
{
    using System;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Enum;
    using CRM.Letstalk.Client.Models;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Services.Constants;
    using CRM.Letstalk.Services.Models;
    using CRM.Letstalk.Services.Services.Interfaces;

    public class MonitorService : IMonitorService
    {
        private readonly MonitorSettings monitorSettings;
        private readonly Func<long, ILetstalkService> letstalkService;

        public MonitorService(MonitorSettings monitorSettings, Func<long, ILetstalkService> letstalkService)
        {
            this.monitorSettings = monitorSettings;
            this.letstalkService = letstalkService;
        }

        public async Task MonitorLetstalkService()
        {
            if (monitorSettings.Mode.Equals(MonitorMode.GetWebhook, StringComparison.InvariantCultureIgnoreCase))
            {
                await letstalkService(monitorSettings.BotId).GetWebhookAsync();
            }
            else
            {
                var listLetstalk = monitorSettings.LetstalkIds.Split(',');
                await letstalkService(monitorSettings.BotId).PushPersonalAsync(listLetstalk, new OutgoingMessage { MessageType = MessageTypeNumber.Text, Text = monitorSettings.Message });
            }
        }
    }
}