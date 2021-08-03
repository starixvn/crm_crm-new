namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.ChatBot_ResultAmendment;
    using CRM.BackgroundJob.Models.ChatBotResulAmendment;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;

    public interface IChatBotResultAmendmentService
    {
        Task<ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<TicketEvent>>> GetChatBotResultAmendmentInfo(
            AbnormalBetSystemSetting settingResultAmendment);

        Task<IEnumerable<Message>> GetChatBotMessageInfo(IEnumerable<TicketEvent> ticketEvents);
    }

    public class ChatBotResultAmendmentService: IChatBotResultAmendmentService
    {
        private readonly IBaseService baseService;

        public ChatBotResultAmendmentService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>,IEnumerable<TicketEvent>>> GetChatBotResultAmendmentInfo(
            AbnormalBetSystemSetting settingResultAmendment
            )
        {
            var criteria = new GetChatBotResultAmendmentCriteria
            {
                BatchSize = settingResultAmendment.BatchSize,
                SubmitDate = settingResultAmendment.SubmitDate,
                Seq = settingResultAmendment.Seq
            };
            return await baseService.FetchMultipleAsync<AmendmentResultTicketEvent, AmendmentResultTransaction, TicketEvent>(criteria);
        }

        public async Task<IEnumerable<Message>> GetChatBotMessageInfo(IEnumerable<TicketEvent> ticketEvents)
        {
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            const string Xml = "<r MessageID='{0}></r>";
            foreach(var ticket in ticketEvents)
            {
                stringBuilder.AppendFormat(Xml, ticket.MessageId);

            }
            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new GetChatBotMsgCriteria
            {
                Messages = stringBuilder.ToString()
            };
            return await baseService.GetDataAsync<Message>(criteria);
        }
    }
}
