namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Core.Extensions.Xml;
    using CRM.BackgroundJob.Core.Models;
    using CRM.BackgroundJob.Core.Services;
    using CRM.BackgroundJob.Criteria.ChatBotRebateRetention;
    using CRM.BackgroundJob.Models.ChatBotRebateRetention;

    public interface IChatBotRebateRetentionService
    {
        Task<(IEnumerable<ChatBotRebateRetentionInfo>, IEnumerable<string>)> GetRebateRetentionInfoAsync(string lastLogSid);

        Task<(CommandResult, ImportRebateRetentionCommand)> ImportRebateRetentionCommand(IEnumerable<ChatBotRebateRetentionInfo> rrMessages, IEnumerable<string> newLogSIDs);
    }

    public class ChatBotRebateRetentionService : IChatBotRebateRetentionService
    {
        private readonly IBaseService baseService;

        public ChatBotRebateRetentionService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<(IEnumerable<ChatBotRebateRetentionInfo>, IEnumerable<string>)> GetRebateRetentionInfoAsync(string lastLogSid)
        {
            var criteria = new GetRebateRetentionInfoCriteria
            {
                LastLogSID = lastLogSid
            };
            return await baseService.FetchMultipleAsync<ChatBotRebateRetentionInfo, string>(criteria);
        }

        public async Task<(CommandResult, ImportRebateRetentionCommand)> ImportRebateRetentionCommand(IEnumerable<ChatBotRebateRetentionInfo> rrMessages, IEnumerable<string> newLogSIDs)
        {
            var command = new ImportRebateRetentionCommand
            {
                XmlData = rrMessages.ToXML("root").ToString(),
                NewLogSID = newLogSIDs.FirstOrDefault()
            };
            var commandResult = await baseService.ExecuteNonQueryAsync(command);
            return (commandResult, command);
        }
    }
}
