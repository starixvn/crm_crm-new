namespace Fanex.CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Models;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Configuration;

    public interface IFeedbackTicketVoidingService
    {
        Task<ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>>> GetTicketVoidingInfoAsync(
               IEnumerable<VoidingMessageUserName> voidingMessageUserNames,
               AbnormalBetSystemSetting setting);

        Task<ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>>> ImportTicketVoidingInfoAsync(
            IEnumerable<VoidingMessageUserName> voidingMessageUserNames,
            IEnumerable<MatchInfo> matchInfos,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SiteSettingMapping> siteSettingMappings,
            IEnumerable<GroupHeadline> headlines,
            CustomerInfo licenseeInfo);

        Task<CommandResult> EditFeedbackInfoAsync(
            int messageId,
            IEnumerable<int> requestIds,
            IEnumerable<int> custIds,
            string status,
            string description);
    }

    public class FeedbackTicketVoidingService : IFeedbackTicketVoidingService
    {
        private readonly IBaseService baseService;
        private readonly IMessageService messageService;
        private readonly ICRMLogService logService;
        private readonly string Environment;

        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public FeedbackTicketVoidingService(
            IBaseService baseService,
            IMessageService messageService,
            ICRMLogService logService,
            IConfiguration configuration)
        {
            this.baseService = baseService;
            this.messageService = messageService;
            this.logService = logService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task<ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>>> GetTicketVoidingInfoAsync(
               IEnumerable<VoidingMessageUserName> voidingMessageUserNames,
               AbnormalBetSystemSetting setting)
        {
            const string XmlTemplate = "<r MsgID='{0}' ReqID='{1}' UsernameList='{2}' CustIdList='{3}' />";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);

            foreach (var voidingMessageUserName in voidingMessageUserNames)
            {
                stringBuilder.AppendFormat(XmlTemplate,
                    voidingMessageUserName.MessageId,
                    voidingMessageUserName.RequestId,
                    voidingMessageUserName.UsernameList,
                    voidingMessageUserName.CustIdList
                    );
            }

            stringBuilder.Append(Constants.EndRootTag);

            var criteria = new GetAbnormalTicketInfoCriteria
            {
                MessageIds = stringBuilder.ToString(),
                ConfigUAT = setting.ConfigUAT,
                ConfigPRO = setting.ConfigPRO,
                Environment = Environment
            };
            var ticketInfo = await baseService.FetchMultipleAsync<MatchInfo, TransactionInfo>(criteria);

            var messageIds = ticketInfo.Item1.Where(x => !ticketInfo.Item2.Any(y => x.MessageId == y.MessageId)).Select(x => x.MessageId).ToList();
            if (messageIds.Any())
            {
                var messages = voidingMessageUserNames.Where(x => messageIds.Any(y => x.MessageId == y));
                await messageService.EditStatusVoidingMessageAsync(messages, Environment);
                logService.LogInformation(string.Format("Don't have ticket info: {0}", string.Join(",", messageIds)));
            }

            IEnumerable<MatchInfo> matchInfos = ticketInfo.Item1.Where(x => ticketInfo.Item2.Any(y => x.MessageId == y.MessageId)).ToList();
            return new ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>>(matchInfos, ticketInfo.Item2);
        }

        public async Task<ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>>> ImportTicketVoidingInfoAsync(
            IEnumerable<VoidingMessageUserName> voidingMessageUserNames,
            IEnumerable<MatchInfo> matchInfos,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SiteSettingMapping> siteSettingMappings,
            IEnumerable<GroupHeadline> headlines,
            CustomerInfo licenseeInfo)
        {
            logService.LogInformation("Abnormal Bet - Begin import ticket info");
            var xml = GetXmlImportTicketFeedback(matchInfos, transactionInfos, siteSettingMappings, headlines, licenseeInfo);

            var criteria = new ImportFeedbackInfoCriteria
            {
                Xml = xml,
                Environment = Environment
            };
            var feedbackInfos = await baseService.GetDataAsync<AutoFeedbackInfo>(criteria);

            var messageIds = matchInfos.Where(x => !feedbackInfos.Any(y => y.MessageId == x.MessageId)).Select(x => x.MessageId).ToList();
            if (messageIds.Any())
            {
                var messages = voidingMessageUserNames.Where(x => messageIds.Any(y => x.MessageId == y));
                await messageService.EditStatusVoidingMessageAsync(messages, Environment);
                logService.LogInformation(string.Format("Abnormal Bet - Don't have ticket info or created: {0}", string.Join(",", messageIds)));
            }

            matchInfos = matchInfos.Where(x => feedbackInfos.Any(y => y.MessageId == x.MessageId) && x.MessageId != 0);
            transactionInfos = transactionInfos.Where(x => feedbackInfos.Any(y => y.MessageId == x.MessageId && y.CustId == x.CustId) && x.MessageId != 0);
            logService.LogInformation("Abnormal Bet - End import ticket info");
            return new ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>>(matchInfos, transactionInfos);
        }

        protected internal virtual string GetXmlImportTicketFeedback(
            IEnumerable<MatchInfo> matchInfos,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SiteSettingMapping> siteSettingMappings,
            IEnumerable<GroupHeadline> headlines,
            CustomerInfo licenseeInfo)
        {
            const string XmlTemplate = "<r msgid='{0}' reqid='{1}' custid='{2}' hl='{3}' related='{4}' event='{5}' IssueTypeId='{6}' />";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            var transactionInfosDistinct = transactionInfos.Select(x => new
            {
                x.CustId,
                x.MessageId,
                x.RequestId,
                x.Username,
                x.IsDeposit,
                x.Site
            }).Distinct();
            foreach (var transaction in transactionInfosDistinct)
            {
                var matchInfo = matchInfos.FirstOrDefault(x => x.MessageId == transaction.MessageId);
                var headlineId = 0;
                var relatedCustId = 0;

                if (transaction.IsDeposit)
                {
                    SiteSettingMapping licenseeManager = GetLicenseeManager(siteSettingMappings, transaction.Site);
                    headlineId = licenseeInfo.CustId;
                    relatedCustId = licenseeManager != null ? licenseeManager.LicenseeManagerId : 0;
                }
                else
                {
                    GroupHeadline headline = headlines.FirstOrDefault(x => x.CustId == transaction.CustId);
                    headlineId = headline != null ? headline.HeadlineId : 0;
                    relatedCustId = transaction.CustId;
                }

                stringBuilder.AppendFormat(XmlTemplate,
                    transaction.MessageId,
                    transaction.RequestId,
                    transaction.CustId,
                    headlineId,
                    relatedCustId,
                    string.Format("{0} -vs- {1}", HttpUtility.HtmlEncode(matchInfo?.HomeName), HttpUtility.HtmlEncode(matchInfo?.AwayName)),
                    matchInfo?.IssueTypeId);
            }

            stringBuilder.Append(Constants.EndRootTag);
            return stringBuilder.ToString();
        }

        public async Task<CommandResult> EditFeedbackInfoAsync(
            int messageId,
            IEnumerable<int> requestIds,
            IEnumerable<int> custIds,
            string status,
            string description)
        {
            var criteria = new EditFeedbackInfoCommand
            {
                MessageId = messageId,
                RequestIds = string.Join(",", requestIds),
                CustIds = string.Join(",", custIds),
                Status = status,
                Description = description
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }

        private static SiteSettingMapping GetLicenseeManager(IEnumerable<SiteSettingMapping> siteSettingMappings, string site)
        {
            return siteSettingMappings.FirstOrDefault(x => !string.IsNullOrWhiteSpace(x.SettingSource)
                       && x.SettingSource.Equals(site, StringComparison.OrdinalIgnoreCase));
        }
    }
}