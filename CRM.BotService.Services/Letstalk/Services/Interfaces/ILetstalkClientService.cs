namespace CRM.BotService.Services.Letstalk.Services.Interfaces
{
    using CRM.BotService.Services.Models;
    using CRM.BotService.Services.Models.Results;

    public interface ILetstalkClientService
    {
        Task<PushMessageResult> PushPersonalAsync(string letstalkId, OutgoingMessage message, bool isForcePush = true);

        Task<PushMessageResult> PushPersonalAsync(IEnumerable<string> accountIds, OutgoingMessage message, bool isForcePush = true);

        Task<PushMessageResult> PushRoomAsync(string roomId, OutgoingMessage message);

        Task<PushMessageResult> PushRoomAsync(IEnumerable<string> roomTokenList, OutgoingMessage message);

        Task<(Contact, bool)> GetProfileAsync(string accountId);

        Task<RoomData> GetChatRoomData(string roomToken);

        Task<string> GetWebhookAsync();

        Task<BaseResult> SetWebhookAsync(string url);

        Task<BaseResult> ChangeDisplayNameAsync(string botName);

        Task<IList<string>> GetBotContactList();

        Task<IList<string>> GetChatRoomList();
    }
}