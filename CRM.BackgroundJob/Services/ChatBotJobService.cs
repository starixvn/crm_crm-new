namespace Fanex.CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;
    using global::CRM.BackgroundJob.Models.ChatBot;
    using global::CRM.BackgroundJob.Models.ChatBotCTO;
    using global::CRM.BackgroundJob.Models.ChatBotCWL;
    using global::CRM.BackgroundJob.Models.ChatBotProblemsAccount;
    using global::CRM.BackgroundJob.Services;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using global::CRM.Letstalk.Services.Services.Interfaces;
    using Microsoft.Extensions.Configuration;

    public interface IChatBotJobService
    {
        Task PullMessageAndSendNotificationAsync();
        Task PullMessageCWLAndSendNotificationToHeadlineAsync();
        Task PullMessageCTOAndSendNotificationToHeadlineAsync();
        Task PullMessageProblemsAccountAndSendNotificationToHeadlineAsync();
        Task PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();
    }

    public class ChatBotJobService : IChatBotJobService
    {
        private readonly ICRMLogService logService;
        private readonly ISystemSettingService systemSettingService;
        private readonly IChatBotTicketVoidingService ticketVoidingService;
        private readonly ISendNotificationService sendNotificationService;
        private readonly IChatBotCWLService chatBotCWLService;
        private readonly IChatBotCTOService chatBotCTOService;
        private readonly IChatBotProblemAccountService chatBotProblemAccountService;
        private readonly IChatBotResultAmendmentService chatBotResultAmendmentService;
        private readonly string Environment;

        private const string DefaultEnvironment = Constants.DefaultEnvironment;

#pragma warning disable S107 // Methods should not have too many parameters
        public ChatBotJobService(
            ICRMLogService logService,
            ISystemSettingService systemSettingService,
            IChatBotTicketVoidingService ticketVoidingService,
            ISendNotificationService sendNotificationService,
            IChatBotCWLService chatBotCWLService,
            IConfiguration configuration,
            IChatBotCTOService chatBotCTOService,
            IChatBotProblemAccountService chatBotProblemAccountService,
            IChatBotResultAmendmentService chatBotResultAmendmentService)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.logService = logService;
            this.systemSettingService = systemSettingService;
            this.ticketVoidingService = ticketVoidingService;
            this.sendNotificationService = sendNotificationService;
            this.chatBotCWLService = chatBotCWLService; 
            this.chatBotCTOService = chatBotCTOService;
            this.chatBotProblemAccountService = chatBotProblemAccountService;
            this.chatBotResultAmendmentService = chatBotResultAmendmentService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task PullMessageAndSendNotificationAsync()
        {
            AbnormalBetSystemSetting setting = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Environment);
            if (!setting.ServiceFlag)
            {
                logService.LogInformation("Chat Bot Service is shutdown.");
                return;
            }

            var voidingInfo = await ticketVoidingService.GetVoidingMessageAsync();
            IEnumerable<ChatBotVoidingMessage> voidingMessages = voidingInfo.Item1;
            var voidingHis = await ticketVoidingService.ImportVoidingMessageHistoryCheckAsync(voidingInfo.Item2);
            var userNameList = Enumerable.Empty<ChatBotUserNameList>();
            if (voidingHis.Any() && voidingInfo.Item2.Any())
            {
                userNameList = await ticketVoidingService.GetChatBotAbnormalAccountGetUsernameList(voidingHis);
            }
            CommandResult commandResult = await ticketVoidingService.ImportVoidingMessageAsync(voidingMessages, userNameList);
            if (commandResult.IsSuccessful)
            {
                var messageImport = await ticketVoidingService.GetImportMessageByBatchSize(setting.BatchSize);
                IEnumerable<Message> messages = await ticketVoidingService.GetMessageInfoAsync(messageImport);
                var ticketInfos = await ticketVoidingService.GetTicketVoidingInfoAsync(messageImport, Environment, setting.IncludeUUSCurrency);
                CommandResult commandResultImportTicket = await ticketVoidingService.ImportTicketVoidingAsync(
                    messages,
                    ticketInfos.Item1,
                    ticketInfos.Item2,
                    Environment);
                if (commandResultImportTicket.IsSuccessful)
                {
                    logService.LogInformation("Successful!!!");
                    await sendNotificationService.SendNotificationToLetstalk();
                }
                else
                {
                    logService.LogInformation(commandResultImportTicket.Message);
                }
            }
            else
            {
                logService.LogInformation(commandResult.Message);
            }
        }

        public async Task PullMessageCWLAndSendNotificationToHeadlineAsync()
        {
            AbnormalBetSystemSetting setting = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_CWL, Environment);
            if (!setting.ServiceFlag)
            {
                logService.LogInformation("Chat Bot CWL Service is shutdown.");
                return;
            }
            IEnumerable<ChatBotCWLInfo> cwlInfors = await chatBotCWLService.GetChatbotCWLLogInfoAsync(setting.LastLogId, setting.BatchSize);
            CommandResult commandResult = await chatBotCWLService.ImportCWLLogInfoAsync(cwlInfors, Environment);
            if (commandResult.IsSuccessful)
            {
                await sendNotificationService.SendNotificationToLetstalk();
            }
            else
            {
                logService.LogInformation(commandResult.Message);
            }
        }

        public async Task PullMessageCTOAndSendNotificationToHeadlineAsync()
        {
            AbnormalBetSystemSetting settingCTO = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_TOControl, Environment);
            if (!settingCTO.ServiceFlag)
            {
                logService.LogInformation("Chat Bot CTO Service is shutdown.");
                return;
            }
            IEnumerable<TOReachInfor> tOReachInfors = await chatBotCTOService.GetChatbotCTOSettingInfoAsync(settingCTO.LastLogId, settingCTO.BatchSize);
            IEnumerable<TOSMAInfor> tOSMAInfors = await chatBotCTOService.GetChatbotCTOSMAInfoAsync(tOReachInfors);
            CommandResult commandResult = await chatBotCTOService.ImportTOSMAInfoAsync(tOSMAInfors, Environment);
            if (commandResult.IsSuccessful)
            {
                await sendNotificationService.SendNotificationToLetstalk();
            }
            else
            {
                logService.LogInformation(commandResult.Message);
            }
        }

        public async Task PullMessageProblemsAccountAndSendNotificationToHeadlineAsync()
        {
            AbnormalBetSystemSetting settingProblemsAccount = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ProblemAccounts, Environment);
            if (!settingProblemsAccount.ServiceFlag)
            {
                logService.LogInformation("Chat Bot Problems Account Service is shutdown.");
                return;
            }
            IEnumerable<ChatBotProblemsAccountInfor> problemsAcountInfors = await chatBotProblemAccountService.GetChatbotProblemAccountInfoAsync(
                settingProblemsAccount.LastLogId, settingProblemsAccount.BatchSize);
            CommandResult commandResult = await chatBotProblemAccountService.ImportProblemsAccountInfoAsync(problemsAcountInfors, Environment);
            if (commandResult.IsSuccessful)
            {
                await sendNotificationService.SendNotificationToLetstalk();
            }
            else
            {
                logService.LogInformation(commandResult.Message);
            }
        }

        public async Task PullMessageResultAmendmentAndSendNotificationToHeadlineAsync()
        {
            AbnormalBetSystemSetting settingResultAmendment = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_ResultAmendment, Environment);
            if (!settingResultAmendment.ServiceFlag)
            {
                logService.LogInformation("Chat Bot Result Amendment Service is shutdown.");
                return;
            }

            var resultAmendmentInfo = await chatBotResultAmendmentService.GetChatBotResultAmendmentInfo(settingResultAmendment);
            var messages = Enumerable.Empty<Message>();
            if (resultAmendmentInfo.Item3.Any())
            {
                messages = await chatBotResultAmendmentService.GetChatBotMessageInfo(resultAmendmentInfo.Item3);
            }

        }
    }
}