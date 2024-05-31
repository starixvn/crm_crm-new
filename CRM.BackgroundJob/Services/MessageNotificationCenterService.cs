namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using CRM.Core.Services;
    using Microsoft.Extensions.Configuration;
    using CRM.BackgroundJob.Criteria.PushResultAmendment;
    using Fanex.BotService.Client.Core.Services.Interfaces;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Enumerables;
    using CRM.BackgroundJob.Constants;
    using CRM.Core.Models;

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
            this.botService = botService;
            this.botSetting = botSetting;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task CaptureSettlementDataAsync()
        {
            try
            {
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
            try
            {
                var mncNotifications = await pushNotificationResultAmendmentService.GetPrepareNotificationAsync();
                if (!mncNotifications.Any())
                {
                    await pushNotificationResultAmendmentService.InsertCompleteResultAmendmentAsync();
                }
                else
                {
                    foreach (var item in mncNotifications)
                    {
                        var command = new GetMessageResultAmendmentCommand
                        {
                            NotificationID = item.NotificationID,
                            JSNotification = item.JSNotification
                        };
                        await pushNotificationResultAmendmentService.GetMessageResultAmendmentAsync(command);
                        await pushNotificationResultAmendmentService.EditPushNotificationResultAmendmentAsync(item.NotificationID, command.MessageID, "AfterInsMsg");
                        await pushNotificationResultAmendmentService.EditPushMessageResultAmendmentAsync(command.MessageID, "AfterUpdNoti");
                    }
                    await pushNotificationResultAmendmentService.InsertCompleteResultAmendmentAsync();
                }
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        public async Task GenerateLapNotificationAsync()
        {
            try
            {
                var settlementGenLap = await generateLapNotificationService.GetPrepareGenLapNotificationAsync();
                if (settlementGenLap.Any())
                {
                    foreach (var item in settlementGenLap)
                    {
                        item.RefValueEN = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.en_US);
                        item.RefValueCH = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.zh_TW);
                        item.RefValueCS = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.zh_CN);
                    }
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
                CommandResult commandResult = await sendNotificationCenterService.InsertNotificationAlertAsync();
                
                if (commandResult.IsSuccessful)
                {
                    var messages = await sendNotificationCenterService.GetNotificationAlertAsync();
                    
                    if (messages.Any())
                    {
                        foreach (var item in messages)
                        {
                            var conversationId = botSetting.ConversationConfigs.Find(x => x.Channel == BotChannel.Skype && x.BotName == BotName.NotificationAlert).ConversationId;
                            await botService.SendSkypeAsync(conversationId, item.Content);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                await logService.ErrorAsync(ex);
            }
        }
    }
}
