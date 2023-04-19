namespace CRM.Services.BotServices.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Models.ChatTypeMapping;
    using CRM.ViewModels.ChatTypeMapping;

    public interface ILetstalkApiService
    {
        Task<LetstalkContact> GetPersonalDisplayNameAsync(int botId, string letstalkId);

        Task<LetsalkValidationModel> VerifyLetstalkOnGroup(int botId, string conversationGroupId, List<RecipientLetstalk> letstalkRecipients);
    }
}