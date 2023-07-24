namespace CRM.BotService.Core.Services.Interfaces
{
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;

    public interface IBotCommonService
    {
        Task<CommandResult> WriteLogMessageAsync(WriteLogMessageCommand command);

        bool IsActiveChannel(BotChannel channel);

        Task<byte[]> ReadImageAsByteAsync(string imgUrl);
    }
}