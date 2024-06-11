namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.AutoFbResultAmendment;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Core.Services;

    public interface IAutoFbResultAmendmentService
    {
        Task<IEnumerable<MessageInfoID>> GetMsgInfoResultAmendmentAsync(int lastMsgTargetId, int batchSize);

        Task<(CommandResult commandResult, ImportResultAmendmentCommand command)> ImportResultAmendmentAsync(IEnumerable<MessageInfoID> messages, string environment);
    }

    public class AutoFbResultAmendmentService : IAutoFbResultAmendmentService
    {
        private readonly IBaseService baseService;

        public AutoFbResultAmendmentService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<MessageInfoID>> GetMsgInfoResultAmendmentAsync(int lastMsgTargetId, int batchSize)
        {
            var criteria = new GetMsgInfoResultAmendmentCriteria
            {
                LastMsgTargetId = lastMsgTargetId,
                BatchSize = batchSize
            };
            return await baseService.GetDataAsync<MessageInfoID>(criteria);
        }

        public async Task<(CommandResult commandResult, ImportResultAmendmentCommand command)> ImportResultAmendmentAsync(IEnumerable<MessageInfoID> messages, string environment)
        {
            var command = new ImportResultAmendmentCommand
            {
                MsgInfo = messages.ToXML("root").ToString(),
                Environment = environment
            };
            var commandResult = await baseService.ExecuteNonQueryAsync(command);
            return (commandResult, command);
        }
    }
}
