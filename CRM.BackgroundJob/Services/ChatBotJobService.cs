namespace Fanex.CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;
    using global::CRM.BackgroundJob.Models.ChatBotCTO;
    using global::CRM.BackgroundJob.Models.ChatBotCWL;
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
    }

    public class ChatBotJobService : IChatBotJobService
    {
        private readonly ICRMLogService logService;
        private readonly ISystemSettingService systemSettingService;
        private readonly IChatBotTicketVoidingService ticketVoidingService;
        private readonly ISendNotificationService sendNotificationService;
        private readonly IChatBotCWLService chatBotCWLService;
        private readonly string Environment;


        private const string DefaultEnviroment = Constants.DefaultEnviroment;

        public ChatBotJobService(
            ICRMLogService logService,
            ISystemSettingService systemSettingService,
            IChatBotTicketVoidingService ticketVoidingService,
            ISendNotificationService sendNotificationService,
            IChatBotCWLService chatBotCWLService,
            IConfiguration configuration,
            IChatBotCTOService chatBotCTOService)
        {
            this.logService = logService;
            this.systemSettingService = systemSettingService;
            this.ticketVoidingService = ticketVoidingService;
            this.sendNotificationService = sendNotificationService;
            this.chatBotCWLService = chatBotCWLService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnviroment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task PullMessageAndSendNotificationAsync()
        {
            AbnormalBetSystemSetting setting = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot, Environment);
            if (!setting.ServiceFlag)
            {
                logService.LogInformation("Chat Bot Service is shutdown.");
                return;
            }

            IEnumerable<ChatBotVoidingMessage> voidingMessages = await ticketVoidingService.GetVoidingMessageAsync();
            voidingMessages = await ticketVoidingService.ImportVoidingMessageAsync(voidingMessages, setting.BatchSize);
            IEnumerable<Message> messages = await ticketVoidingService.GetMessageInfoAsync(voidingMessages);
            IEnumerable<ChatBotVoidingTicketInfo> ticketInfos = await ticketVoidingService.GetTicketVoidingInfoAsync(voidingMessages);
            CommandResult commandResult = await ticketVoidingService.ImportTicketVoidingAsync(
                messages, 
                ticketInfos, 
                voidingMessages,
                Environment);
            if (commandResult.IsSuccessful)
            {
                await sendNotificationService.SendNotificationToLetstalk();
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
            AbnormalBetSystemSetting settingCTO = await systemSettingService.GetChatBotSystemSettingAsync(Constants.ServiceName_ChatBot_TOControl, Enviroment);
            if (!settingCTO.ServiceFlag)
            {
                logService.LogInformation("Chat Bot CWL Service is shutdown.");
                return;
            }
            IEnumerable<TOReachInfor> TOReachInfors = await chatBotCTOService.GetChatbotCTOSettingInfoAsync(settingCTO.LastLogId, settingCTO.BatchSize);
            IEnumerable<TOSMAInfor> TOSMAInfors = await chatBotCTOService.GetChatbotCTOSMAInfoAsync(TOReachInfors);
            CommandResult commandResult = await chatBotCTOService.ImportTOSMAInfoAsync(TOSMAInfors, Enviroment);
            if (commandResult.IsSuccessful)
            {
                await sendNotificationService.SendNotificationToLetstalk();
            }
            else
            {
                logService.LogInformation(commandResult.Message);
            }
        }
    }
}