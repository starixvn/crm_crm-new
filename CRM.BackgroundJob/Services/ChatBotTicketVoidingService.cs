namespace Fanex.CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using Fanex.CRM.BackgroundJob.Criteria.ChatBot;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;
    using global::CRM.Core.Extensions.XML;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using System;
    using global::CRM.BackgroundJob.Models.ChatBot;
    using global::CRM.BackgroundJob.Criteria.ChatBot;

    public interface IChatBotTicketVoidingService
    {
        Task<ValueTuple<IEnumerable<ChatBotVoidingMessage>, IEnumerable<ChatBotVoidingHistory>>> GetVoidingMessageAsync();
        Task<IEnumerable<ChatBotVoidingHistory>> ImportVoidingMessageHistoryCheckAsync(IEnumerable<ChatBotVoidingHistory> voidingMessagesHis);

        Task<IEnumerable<ChatBotUserNameList>> GetChatBotAbnormalAccountGetUsernameList(IEnumerable<ChatBotVoidingHistory> voidingHis);

        Task<CommandResult> ImportVoidingMessageAsync(IEnumerable<ChatBotVoidingMessage> voidingMessages, IEnumerable<ChatBotUserNameList> userNames);

        Task<IEnumerable<ChatBotUserNameList>> GetImportMessageByBatchSize(int batchSize);

        Task<CommandResult> EditVoidingMessageAsync(IEnumerable<ChatBotVoidingMessage> voidingMessages);

        Task<IEnumerable<Message>> GetMessageInfoAsync(IEnumerable<ChatBotVoidingMessage> voidingMessages);

        Task<ValueTuple<IEnumerable<ChatBotVoidingTicketInfo>, IEnumerable<ChatBotUserNameList>>> GetTicketVoidingInfoAsync(
            IEnumerable<ChatBotUserNameList> userNames,
            string environment,
            bool IncludeUUSCurrency
            );

        Task<CommandResult> ImportTicketVoidingAsync(
            IEnumerable<Message> messages,
            IEnumerable<ChatBotVoidingTicketInfo> ticketInfos,
            IEnumerable<ChatBotUserNameList> userNames,
            string Environment = Constants.DefaultEnvironment);
    }

    public class ChatBotTicketVoidingService : IChatBotTicketVoidingService
    {
        private readonly IBaseService baseService;

        public ChatBotTicketVoidingService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<ValueTuple<IEnumerable<ChatBotVoidingMessage>, IEnumerable<ChatBotVoidingHistory>>> GetVoidingMessageAsync()
        {
            var criteria = new GetChatBotVoidingMessageCriteria();
            return await baseService.FetchMultipleAsync<ChatBotVoidingMessage, ChatBotVoidingHistory>(criteria);
        }

        public async Task<IEnumerable<ChatBotVoidingHistory>>ImportVoidingMessageHistoryCheckAsync(
           IEnumerable<ChatBotVoidingHistory> voidingMessagesHis
            )
        {
            var criteria = new GetVoidingMessageHistoryCheckCriteria
            {
                Messages = voidingMessagesHis.ToXML("root").ToString(),
            };
            return await baseService.GetDataAsync<ChatBotVoidingHistory>(criteria);
        }

        public async Task<IEnumerable<ChatBotUserNameList>> GetChatBotAbnormalAccountGetUsernameList(
           IEnumerable<ChatBotVoidingHistory> voidingHis
            )
        {
            var criteria = new GetChatBotAbnormalAccountGetUsernameListCriteria
            {
                Messages = voidingHis.ToXML("root").ToString(),
            };
            return await baseService.GetDataAsync<ChatBotUserNameList>(criteria);
        }


        public async Task<CommandResult> ImportVoidingMessageAsync(IEnumerable<ChatBotVoidingMessage> voidingMessages, IEnumerable<ChatBotUserNameList> userNames)
        {
            const string XmlTemplate = "<r MessageID='{0}' RequestID='{1}' UsernameList='{2}' CustIdList='{3}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());

            foreach (var message in voidingMessages)
            {
                ChatBotUserNameList userName = userNames.FirstOrDefault(x => x.MessageId == message.MessageId && x.RequestId == message.RequestId);

                stringBuilder.AppendFormat(XmlTemplate,
                    message.MessageId,
                    message.RequestId,
                    userName?.UsernameList,
                    userName?.CustIdList);
            }
            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new ImportChatBotVoidingMessageCriteria
            {
                Messages = stringBuilder.ToString(),
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }

        public async Task<IEnumerable<ChatBotUserNameList>> GetImportMessageByBatchSize(int batchSize)
        {
            var criteria = new GetImportMessageCriteria
            {
                BatchSize = batchSize
            };
            return await baseService.GetDataAsync<ChatBotUserNameList>(criteria);
        }

        public async Task<CommandResult> EditVoidingMessageAsync(IEnumerable<ChatBotVoidingMessage> voidingMessages)
        {
            var criteria = new EditChatBotVoidingMessageCommand
            {
                Messages = voidingMessages.ToXML("root").ToString()
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }

        public async Task<IEnumerable<Message>> GetMessageInfoAsync(IEnumerable<ChatBotVoidingMessage> voidingMessages)
        {
            var criteria = new GetChatBotMessageInfoCriteria
            {
                Messages = voidingMessages.ToXML("root").ToString()
            };
            var messages = await baseService.GetDataAsync<Message>(criteria);
            foreach (Message message in messages)
            {
                message.Content_en = message.Content_en?.Trim().Replace("@@", string.Empty);
                message.Content_cs = message.Content_cs?.Trim().Replace("@@", string.Empty);
                message.Content_th = message.Content_th?.Trim().Replace("@@", string.Empty);
                message.Content_vn = message.Content_vn?.Trim().Replace("@@", string.Empty);
            }

            return messages;
        }

        public async Task<ValueTuple<IEnumerable<ChatBotVoidingTicketInfo>, IEnumerable<ChatBotUserNameList>>> GetTicketVoidingInfoAsync(
            IEnumerable<ChatBotUserNameList> userNames,
            string environment,
            bool IncludeUUSCurrency
            )
        {
            var criteria = new GetChatBotTicketVoidingInfoCriteria
            {
                Messages = userNames.ToXML("root").ToString(),
                Environment = environment,
                IncludeUUSCurrency = IncludeUUSCurrency
            };
            return await baseService.FetchMultipleAsync<ChatBotVoidingTicketInfo, ChatBotUserNameList>(criteria);
        }

        public async Task<CommandResult> ImportTicketVoidingAsync(
            IEnumerable<Message> messages,
            IEnumerable<ChatBotVoidingTicketInfo> ticketInfos,
            IEnumerable<ChatBotUserNameList> userNames,
            string Environment = Constants.DefaultEnvironment)
        {
            const string XmlTemplate = "<r MessageID='{0}' Username='{1}' CustId='{2}' " +
                "Recommend='{3}' Mrecommend='{4}' Srecommend='{5}' IsTest='{6}' " +
                "Content_en='{7}' Content_cs='{8}' Content_th='{9}' Content_vn='{10}' Type='{11}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            const string messageTemplate = "<r MessageID='{0}' RequestID='{1}' UsernameList='{2}'/>";
            var messageStringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            foreach (ChatBotVoidingTicketInfo ticketInfo in ticketInfos)
            {
                Message message = messages.FirstOrDefault(x => x.MessageId == ticketInfo.MessageId);
                stringBuilder.AppendFormat(XmlTemplate,
                    ticketInfo.MessageId,
                    ticketInfo.Username,
                    ticketInfo.CustId,
                    ticketInfo.Recommend,
                    ticketInfo.Mrecommend,
                    ticketInfo.Srecommend,
                    ticketInfo.IsTest,
                    HttpUtility.HtmlEncode(message?.Content_en),
                    HttpUtility.HtmlEncode(message?.Content_cs),
                    HttpUtility.HtmlEncode(message?.Content_th),
                    HttpUtility.HtmlEncode(message?.Content_vn),
                    ticketInfo.Type
             );
            }

            foreach(ChatBotUserNameList userName in userNames)
            {
                messageStringBuilder.AppendFormat(messageTemplate, userName.MessageId, userName.RequestId, userName.UsernameList);
            }

            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            messageStringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new ImportChatBotTicketVoidingInfoCommand
            {
                XmlData = stringBuilder.ToString(),
                Environment = Environment,
                Messages = messageStringBuilder.ToString()
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }
    }
}