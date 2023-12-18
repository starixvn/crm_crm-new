namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.VoidingBetID;
    using CRM.BackgroundJob.Models.VoidingBetID;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Core.Services;

    public interface IVoidingBetIDService
    {
        Task<IEnumerable<MessageVoidBetID>> GetMessageVoidBetIDAsync(int lastMsgTargetId, int batchSize);

        Task<ValueTuple<IEnumerable<MessageVoidBetID>, int>> CleanMessageVoidBetIDAsync(IEnumerable<MessageVoidBetID> messages);

        Task<ValueTuple<CommandResult, ImportVoidBetIDCommand>> ImportVoidBetIDAsync(IEnumerable<MessageVoidBetID> messages, string environment, int maxMsgTargetId);
    }

    public class VoidingBetIDService : IVoidingBetIDService
    {
        private readonly IBaseService baseService;

        public VoidingBetIDService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<MessageVoidBetID>> GetMessageVoidBetIDAsync(int lastMsgTargetId, int batchSize)
        {
            var criteria = new GetMessageVoidByBetIDCriteria
            {
                LastMsgTargetId = lastMsgTargetId,
                BatchSize = batchSize
            };
            return await baseService.GetDataAsync<MessageVoidBetID>(criteria);
        }

        public async Task<ValueTuple<IEnumerable<MessageVoidBetID>, int>> CleanMessageVoidBetIDAsync(IEnumerable<MessageVoidBetID> messages)
        {
            var criteria = new CleanMessageVoidByBetIDCriteria
            {
                Messages = messages.ToXML("root").ToString()
            };
            var cleanMessage = await baseService.GetDataAsync<MessageVoidBetID>(criteria);
            return new ValueTuple<IEnumerable<MessageVoidBetID>, int>(cleanMessage, criteria.MAXMsgTargetId);
        }

        public async Task<ValueTuple<CommandResult, ImportVoidBetIDCommand>> ImportVoidBetIDAsync(IEnumerable<MessageVoidBetID> messages, string environment, int maxMsgTargetId)
        {
            var command = new ImportVoidBetIDCommand
            {
                Messages = messages.ToXML("root").ToString(),
                Environment = environment,
                MAXMsgTargetId = maxMsgTargetId
            };
            var commandResult = await baseService.ExecuteNonQueryAsync(command);
            return new ValueTuple<CommandResult, ImportVoidBetIDCommand>(commandResult, command);
        }
    }
}
