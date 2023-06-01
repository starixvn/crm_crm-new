namespace CRM.Services.BotServices.Interfaces
{
    using System.Threading.Tasks;
    using CRM.Models.ChatTypeMapping;

    public interface ITelegramApiService
    {
        Task<LetstalkTelegramContact> GetPersonalDisplayNameAsync(long botId, long chatId);

        Task<LetstalkTelegramContact> GetGroupDisplayNameAsync(long botId, long chatId);
    }
}