namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.ChatBot_ResultAmendment;
    using CRM.BackgroundJob.Models.ChatBotResulAmendment;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;

    public interface IChatBotResultAmendmentService
    {
        Task<ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<TicketEvent>>> GetChatBotResultAmendmentInfoAsync(
            AbnormalBetSystemSetting settingResultAmendment);

        Task<IEnumerable<Message>> GetChatBotMessageInfoAsync(IEnumerable<TicketEvent> ticketEvents);

        Task<CommandResult> ImportChatBotAmendmentResultAsync(
            IEnumerable<AmendmentResultTicketEvent> ticketEvents,
            IEnumerable<AmendmentResultTransaction> transactions,
            IEnumerable<Message> messages,
            IEnumerable<TicketEvent> events,
            string Environment
        );
    }

    public class ChatBotResultAmendmentService : IChatBotResultAmendmentService
    {
        private readonly IBaseService baseService;
        private readonly ICommonFeedback commonFeedback;

        public ChatBotResultAmendmentService(IBaseService baseService, ICommonFeedback commonFeedback)
        {
            this.baseService = baseService;
            this.commonFeedback = commonFeedback;
        }

        public async Task<ValueTuple<IEnumerable<AmendmentResultTicketEvent>, IEnumerable<AmendmentResultTransaction>, IEnumerable<TicketEvent>>> GetChatBotResultAmendmentInfoAsync(
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

        public async Task<IEnumerable<Message>> GetChatBotMessageInfoAsync(IEnumerable<TicketEvent> ticketEvents)
        {
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            const string Xml = "<r MessageID='{0}'/>";
            foreach (var ticket in ticketEvents)
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

        public async Task<CommandResult> ImportChatBotAmendmentResultAsync(
            IEnumerable<AmendmentResultTicketEvent> ticketEvents,
            IEnumerable<AmendmentResultTransaction> transactions,
            IEnumerable<Message> messages,
            IEnumerable<TicketEvent> events,
            string Environment
            )
        {
            var stringBuilderEventData = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            var stringBuilderMessage = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());

            const string XmlTemplate = "<r TicketEventId='{0}' ProductId='{1}' EventDate='{2}' " +
                "SubmitDate='{3}' EventType='{4}' ActualResult='{5}' WrongResult='{6}' MessageId='{7}' " +
                "SportNameEN='{8}' SportNameSC='{9}' SportNameTH='{10}' SportNameYN='{11}' " +
                "HomeNameEN='{12}' HomeNameSC='{13}' HomeNameTH='{14}' HomeNameYN='{15}' " +
                "AwayNameEN='{16}' AwayNameSC='{17}' AwayNameTH='{18}' AwayNameYN='{19}' " +
                "LeagueNameEN='{20}' LeagueNameSC='{21}' LeagueNameTH='{22}' LeagueNameYN='{23}' MatchCode='{24}' " +
                "MatchInfoEN='{25}' MatchInfoSC='{26}' MatchInfoTH='{27}' MatchInfoYN='{28}' Type='{29}'/>";

            foreach (var transaction in transactions)
            {
                var sportNameEN = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.en_US);
                var sportNameSC = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.zh_CN);
                var sportNameTH = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.th_TH);
                var sportNameYN = commonFeedback.GetSportName(transaction.Sporttype.ToString(), Language.vi_VN);

                var leagueNameEN = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.en_US);
                var leagueNameSC = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.zh_CN);
                var leagueNameTH = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.th_TH);
                var leagueNameYN = commonFeedback.GetLeagueName(transaction.LeagueId.ToString(), Language.vi_VN);

                var homeNameEN = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.en_US);
                var homeNameSC = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.zh_CN);
                var homeNameTH = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.th_TH);
                var homeNameYN = commonFeedback.GetTeamName(transaction.HomeId.ToString(), Language.vi_VN);

                var awayNameEN = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.en_US);
                var awayNameSC = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.zh_CN);
                var awayNameTH = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.th_TH);
                var awayNameYN = commonFeedback.GetTeamName(transaction.AwayId.ToString(), Language.vi_VN);

                var matchInfoEN = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.en_US);
                var matchInfoSC = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.zh_CN);
                var matchInfoTH = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.th_TH);
                var matchInfoYN = commonFeedback.GetMatchCoddFormat(transaction.MatchCode, Language.vi_VN);

                stringBuilderEventData.AppendFormat(XmlTemplate,
                        transaction.TicketEventId, transaction.ProductId, transaction.EventDate,
                        transaction.SubmitDate, transaction.EventType, transaction.ActualResult,
                        transaction.WrongResult, transaction.MessageId, 
                        sportNameEN, sportNameSC, sportNameTH, sportNameYN, 
                        homeNameEN, homeNameSC, homeNameTH, homeNameYN,
                        awayNameEN, awayNameSC, awayNameTH, awayNameYN,
                        leagueNameEN, leagueNameSC, leagueNameTH, leagueNameYN, transaction.MatchCode,
                        matchInfoEN, matchInfoSC, matchInfoTH, matchInfoYN, transaction.Type
                        );
            }
            stringBuilderEventData.Append(Constants.EndRootTag.ToLowerInvariant());

            const string xmlTemplateMessage = "<r TicketEventId='{0}' MessageId='{1}' Content_en='{2}' Content_cs='{3}' Content_th='{4}' Content_yn='{5}'/>";

            foreach (var message in messages)
            {
                var TicketEventId = events.FirstOrDefault(x => x.MessageId == message.MessageId).TicketEventId;
                stringBuilderMessage.AppendFormat(
                    xmlTemplateMessage,
                    TicketEventId,
                    message.MessageId,
                    message.Content_en?.Trim().Replace("@@", string.Empty),
                    message.Content_cs?.Trim().Replace("@@", string.Empty),
                    message.Content_th?.Trim().Replace("@@", string.Empty),
                    message.Content_vn?.Trim().Replace("@@", string.Empty)
                    );
            }

            stringBuilderMessage.Append(Constants.EndRootTag.ToLowerInvariant());

            var criteria = new ImportChatBotResultAmendmentCommand
            {
                TicketData = ticketEvents.ToXML("root").ToString(),
                EventData = stringBuilderEventData.ToString(),
                MessageData = stringBuilderMessage.ToString(),
                Environment = Environment
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }
    }
}