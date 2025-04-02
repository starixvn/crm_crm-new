namespace CRM.Services.BotServices.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Models.ChatTypeMapping;
using CRM.ViewModels.ChatTypeMapping;

public interface ILetstalkApiService
{
    Task<LetstalkTelegramContact> GetPersonalDisplayNameAsync(long botId, string letstalkId);

    Task<LetsalkValidationModel> VerifyLetstalkOnGroup(long botId, string conversationGroupId, List<RecipientLetstalk> letstalkRecipients);
}