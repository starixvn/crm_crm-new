namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using CRM.Core.Services;
    using Microsoft.Extensions.Configuration;

    public interface IMessageNotificationCenterService
    {
        Task CaptureSettlementDataAsync();

        Task GenerateResultAmendmentAsync();
    }

    public class MessageNotificationCenterService : IMessageNotificationCenterService
    {
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly ICaptureSettlementDataService captureSettlementDataService;
        private readonly IGenerateResultAmendmentService generateResultAmendmentService;
        private readonly string Environment;

        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public MessageNotificationCenterService(
            ICRMLogService logService,
            IConfiguration configuration,
            ICommonFeedback commonFeedback,
            ICaptureSettlementDataService captureSettlementDataService,
            IGenerateResultAmendmentService generateResultAmendmentService
        )
        {
            this.logService = logService;
            this.commonFeedback = commonFeedback;
            this.captureSettlementDataService = captureSettlementDataService;
            this.generateResultAmendmentService = generateResultAmendmentService;
            Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task CaptureSettlementDataAsync()
        {
            try
            {
                var initSiteDbConfigs = await captureSettlementDataService.GetInitialSiteDbConfigsAsync(Environment);
                if (!initSiteDbConfigs.Any())
                {
                    logService.LogInformation("Capture Settlement - Service is shutdown.");
                    return;
                }
                foreach (var item in initSiteDbConfigs)
                {
                    var sessionResultHistory = await captureSettlementDataService.GetSessionByDateAsync(Environment, item.FDTime, item.SiteDBGroupID);
                    await captureSettlementDataService.InsertDataLoadAsync(sessionResultHistory.Environment, sessionResultHistory.JSSettlResultHist);
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
                _ => string.Empty
            };
        }

        public async Task GenerateResultAmendmentAsync()
        {
            try
            {
                var settlementGen = await generateResultAmendmentService.GetPrepareGenNotificationAsync(Environment);
                if (!settlementGen.Any())
                {
                    logService.LogInformation("Generate Result Amendment Notification - Service is shutdown.");
                    return;
                }
                foreach (var item in settlementGen)
                {
                    item.RefValueEN = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.en_US);
                    item.RefValueCH = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.zh_TW);
                    item.RefValueCS = GetResourceRemotingRef(item.RefId1, item.RefId2, Language.zh_CN);
                }
                await generateResultAmendmentService.InsertGenResultAmendmentAsync(Environment, settlementGen);
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }
    }
}
