namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using CRM.Core.Enumerables;
    using CRM.Core.Services;
    using Fanex.BotService.Client.Core.Services.Interfaces;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Configuration;

    public interface IMessageNotificationCenterService
    {
        Task CaptureSettlementDataAsync();

        Task GenerateResultAmendmentAsync();

        Task PushNotificationResultAmendmentAsync();

        Task GenerateLapNotificationAsync();

        Task SendNotificationCenter();
    }

    public class MessageNotificationCenterService : IMessageNotificationCenterService
    {
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly ICaptureSettlementDataService captureSettlementDataService;
        private readonly IGenerateResultAmendmentService generateResultAmendmentService;
        private readonly IPushNotificationResultAmendmentService pushNotificationResultAmendmentService;
        private readonly IGenerateLapNotificationService generateLapNotificationService;
        private readonly ISendNotificationCenterService sendNotificationCenterService;
        private readonly ISystemSettingService systemSettingService;
        private readonly IBotService botService;
        private readonly BotServiceSetting botSetting;
        private readonly string Environment;

        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public MessageNotificationCenterService(
            ICRMLogService logService,
            IConfiguration configuration,
            ICommonFeedback commonFeedback,
            ICaptureSettlementDataService captureSettlementDataService,
            IGenerateResultAmendmentService generateResultAmendmentService,
            IPushNotificationResultAmendmentService pushNotificationResultAmendmentService,
            IGenerateLapNotificationService generateLapNotificationService,
            ISendNotificationCenterService sendNotificationCenterService,
            ISystemSettingService systemSettingService,
            IBotService botService,
            BotServiceSetting botSetting
        )
        {
            this.logService = logService;
            this.commonFeedback = commonFeedback;
            this.captureSettlementDataService = captureSettlementDataService;
            this.generateResultAmendmentService = generateResultAmendmentService;
            this.pushNotificationResultAmendmentService = pushNotificationResultAmendmentService;
            this.generateLapNotificationService = generateLapNotificationService;
            this.sendNotificationCenterService = sendNotificationCenterService;
            this.systemSettingService = systemSettingService;
            this.botService = botService;
            this.botSetting = botSetting;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task CaptureSettlementDataAsync()
        {
            try
            {
                var serviceFlag = await systemSettingService.GetSystemSettingNotificationAsync(Environment);
                if (!serviceFlag)
                {
                    logService.LogInformation("Service Capture Settlement is shutdown.");
                    return;
                }

                var initSiteDbConfigs = await captureSettlementDataService.GetInitialSiteDbConfigsAsync(Environment);
                if (initSiteDbConfigs.Any())
                {
                    foreach (var item in initSiteDbConfigs)
                    {
                        var sessionResultHistorys = await captureSettlementDataService.GetSessionByDateAsync(item);
                        var sessionResultHistory = sessionResultHistorys.FirstOrDefault();

                        if (sessionResultHistory != null)
                        {
                            await captureSettlementDataService.InsertDataLoadAsync(sessionResultHistory.Environment, sessionResultHistory.JSSettlResultHist);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        private string GetResourceRemotingRef(string type, string id, string languageCode)
        {
            return type switch
            {
                "LeagueID" => commonFeedback.GetLeagueName(id, languageCode),
                "SportType" => commonFeedback.GetSportName(id, languageCode),
                "TeamID" => commonFeedback.GetTeamName(id, languageCode),
                "ResourceCricket" => commonFeedback.GetResourceCricketName(id, languageCode),
                "ResultSettlement" => commonFeedback.GetResultSettlementName(id, languageCode),
                _ => string.Empty
            };
        }

        public async Task GenerateResultAmendmentAsync()
        {
            try
            {
                var serviceFlag = await systemSettingService.GetSystemSettingNotificationAsync(Environment);
                if (!serviceFlag)
                {
                    logService.LogInformation("Service Generate ResultAmendment is shutdown.");
                    return;
                }

                var settlementGen = await generateResultAmendmentService.GetPrepareGenNotificationAsync(Environment);
                if (settlementGen.Any())
                {
                    foreach (var item in settlementGen)
                    {
                        item.RefValueEN = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.en_US);
                        item.RefValueCH = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.zh_TW);
                        item.RefValueCS = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.zh_CN);
                    }
                    await generateResultAmendmentService.InsertGenResultAmendmentAsync(Environment, settlementGen);
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        public async Task PushNotificationResultAmendmentAsync()
        {
            var serviceFlag = await systemSettingService.GetSystemSettingNotificationAsync(Environment);
            if (!serviceFlag)
            {
                logService.LogInformation("Service Push Notification ResultAmendment is shutdown.");
                return;
            }
            await pushNotificationResultAmendmentService.PushNotificationMessageAsync();
        }

        public async Task GenerateLapNotificationAsync()
        {
            try
            {
                var serviceFlag = await systemSettingService.GetSystemSettingNotificationAsync(Environment);
                if (!serviceFlag)
                {
                    logService.LogInformation("Service Generate Lap Notification is shutdown.");
                    return;
                }

                var settlementGenLap = await generateLapNotificationService.GetPrepareGenLapNotificationAsync();
                if (settlementGenLap.Any())
                {
                    await generateLapNotificationService.InsertGenLapResultAmendmentAsync(settlementGenLap);
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        public async Task SendNotificationCenter()
        {
            try
            {
                await sendNotificationCenterService.InsertNotificationAlertAsync();
                var messages = await sendNotificationCenterService.GetNotificationAlertAsync();

                if (messages.Any())
                {
                    await ProcessNotificationItemAsync(messages);
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        private async Task ProcessNotificationItemAsync(IEnumerable<MessageBotInfo> messages)
        {
            foreach (var item in messages)
            {
                if (!string.IsNullOrWhiteSpace(item.Content))
                {
                    var conversationConfigs = botSetting.ConversationConfigs
                        .FindAll(config => config.DisplayName == item.ChatGroupID).ToList();

                    await ProcessMessagesAsync(conversationConfigs, item.Content, item.IsTest);
                }
            }
        }

        private async Task ProcessMessagesAsync(List<ConversationConfig> conversationConfigs, string content, byte isTest)
        {
            if (conversationConfigs.Any())
            {
                if (isTest == 0)
                {
                    await ProcessSendRealTestMessagesAsync(conversationConfigs, content);
                }
                else if (isTest == 1)
                {
                    await ProcessSendOnlyTestMessagesAsync(conversationConfigs, content);
                }
            }
        }

        private async Task ProcessSendRealTestMessagesAsync(List<ConversationConfig> conversationConfigs, string content)
        {
            foreach (var conversationConfig in conversationConfigs)
            {
                if (conversationConfig.DisplayName == Constants.SYS_IT)
                {
                    await logService.ErrorMessageAsync(content);
                }
                else
                {
                    await botService.SendSkypeAsync(conversationConfig.ConversationId, content);
                }
            }
        }

        private async Task ProcessSendOnlyTestMessagesAsync(List<ConversationConfig> conversationConfigs, string content)
        {
            foreach (var conversationConfig in conversationConfigs)
            {
                if (conversationConfig.IsOnlySendTest)
                {
                    await botService.SendSkypeAsync(conversationConfig.ConversationId, content);
                }
            }
        }
    }
}
