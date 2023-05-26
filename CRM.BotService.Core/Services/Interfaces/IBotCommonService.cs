namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;

    public interface IBotCommonService
    {
        Task WriteLogMessageAsyns(int notificationId, long botId, string conversationId, string content, bool isSuccess, bool isBotBlocked, string errMsg);

        bool IsActiveChannel(BotChannel channel);
    }
}