namespace CRM.Services.BotServices.Interfaces;

using System.Threading.Tasks;
using CRM.Models.ChatTypeMapping;
using CRM.ViewModels.ChatTypeMapping;

public interface ITelegramApiService
{
    Task<LetstalkTelegramContact> GetPersonalDisplayNameAsync(long botId, long chatId);

    Task<LetstalkTelegramContact> GetGroupDisplayNameAsync(long botId, long chatId);

    Task<TelegramValidationModel> VerifyTelegramInGroup(TelegramVerificationViewModel model);
}