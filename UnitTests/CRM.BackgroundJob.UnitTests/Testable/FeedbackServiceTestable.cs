namespace CRM.BackgroundJob.UnitTests.Testable
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public class FeedbackServiceTestable : FeedbackService
    {
        public FeedbackServiceTestable(IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            IMessageService messageService,
            ICustomerService customerService,
            ICRMLogService logService,
            IFeedbackTicketVoidingService ticketVoidingService,
            ICommonFeedback commonFeedback)
            : base(appSettings,
                baseService,
                settingService,
                messageService,
                customerService,
                logService,
                ticketVoidingService,
                commonFeedback)
        {
        }

        public async Task Public_CreateFeedbackForCreditDepositSiteAsync(
            IEnumerable<Message> messages,
            ValueTuple<IEnumerable<MatchInfo>, IEnumerable<TransactionInfo>> ticketInfo,
            IEnumerable<VoidingMessageUserName> messagesImportCombineDistinct,
            string JobStatusNameEnv,
            string LastRuntimeNameEnv)
        {
            await base.CreateFeedbackForCreditDepositSiteAsync(messages, ticketInfo, messagesImportCombineDistinct, JobStatusNameEnv, LastRuntimeNameEnv);
        }

        public async Task Public_CreateFeedbackForCreditSiteAsync(
            Message message,
            MatchInfo matchInfo,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<GroupHeadline> headlines,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            await base.CreateFeedbackForCreditSiteAsync(message, matchInfo, transactionInfos, headlines, settings, settingMappings);
        }

        public async Task Public_CreateFeedbackForCreditSiteByBatchAsync(
            GroupHeadline headline,
            IEnumerable<int> relatedCustomerIds,
            Message message,
            MatchInfo matchInfo,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings,
            CreateMutipleFeedbackCommand criteria)
        {
            await base.CreateFeedbackForCreditSiteByBatchAsync(
                headline,
                relatedCustomerIds,
                message,
                matchInfo,
                transactionInfos,
                settings,
                settingMappings,
                criteria);
        }

        public async Task Public_CreateFeedbackForDepositSiteAsync(
            CustomerInfo licenseeInfo,
            Message message,
            MatchInfo matchInfo,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            await base.CreateFeedbackForDepositSiteAsync(licenseeInfo, message, matchInfo, transactionInfos, settings, settingMappings);
        }

        public async Task Public_CreateFeedbackForDepositByBatchAsync(
            CustomerInfo licenseeInfo,
            Message message,
            IEnumerable<TransactionInfo> transactionInfos,
            DateTime feedbackDate,
            string communicationTool,
            CreateFeedbackCommand criteria)
        {
            await base.CreateFeedbackForDepositByBatchAsync(licenseeInfo, message, transactionInfos, feedbackDate, communicationTool, criteria);
        }

        public void Public_GetLicenseeManager(
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SiteSettingMapping> siteSettingMappings)
        {
            base.GetLicenseeManager(transactionInfos, siteSettingMappings);
        }

        public SettingItem Public_GetCommunicationTool(IEnumerable<SettingItem> settings)
        {
            return base.GetCommunicationTool(settings);
        }

        public string Public_GetProductXml(
            MatchInfo matchInfo,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetProductXml(matchInfo, transactionInfos, settings, settingMappings);
        }

        public SettingItem Public_GetSportsbookProduct(IEnumerable<SettingItem> settings)
        {
            return base.GetSportsbookProduct(settings);
        }

        public IList<SettingItem> Public_GetSubProduct(
            int productId,
            MatchInfo matchInfo,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetSubProduct(productId, matchInfo, settings, settingMappings);
        }

        public IList<SettingItem> Public_GetBettype(
            IEnumerable<int> subProducts,
            IEnumerable<TransactionInfo> transactionInfos,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetBettype(subProducts, transactionInfos, settings, settingMappings);
        }

        public Tuple<int, int, string> Public_GetCategorySubCategory(IEnumerable<SettingItem> settings, int IssueTypeId)
        {
            return base.GetCategorySubCategory(settings, IssueTypeId);
        }

        public string Public_GetRelatedCustomerXml(int headlineId, IEnumerable<TransactionInfo> transactionInfos, int IssueTypeId)
        {
            return base.GetRelatedCustomerXml(headlineId, transactionInfos, IssueTypeId);
        }

        public string Public_GetAutoField(
            DateTime feedbackDate,
            string communicationTool,
            IEnumerable<string> licenseeManagers)
        {
            return base.GetAutoField(feedbackDate, communicationTool, licenseeManagers);
        }

        public string Public_GetDescriptionForDepositeSite(int messageId, string requestIds)
        {
            return base.GetDescriptionForDepositeSite(messageId, requestIds);
        }

        public string Public_GetDescriptionForCreditSite(int messageId, string requestIds, MatchInfo matchInfo, IEnumerable<TransactionInfo> transactionInfos)
        {
            return base.GetDescriptionForCreditSite(messageId, requestIds, matchInfo, transactionInfos);
        }

        public string Public_GetSolution(Message message)
        {
            return base.GetSolution(message);
        }

        public string Public_GetSolutionForCreditSite(Message message, IEnumerable<TransactionInfo> transactionInfos)
        {
            return base.GetSolutionForCreditSite(message, transactionInfos);
        }
    }
}