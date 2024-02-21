namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.MessageNotificationCenter;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Services;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    public interface IMessageNotificationCenterService
    {
        Task CaptureSettlementDataAsync();
    }


    public class MessageNotificationCenterService : IMessageNotificationCenterService
    {
        private readonly ICRMLogService logService;
        private readonly ICaptureSettlementDataService captureSettlementDataService;
        private readonly string Environment;

        private const string DefaultEnvironment = Constants.DefaultEnvironment;

        public MessageNotificationCenterService(
            ICRMLogService logService,
            IConfiguration configuration,
            ICaptureSettlementDataService captureSettlementDataService
        )
        {
            this.logService = logService;
            this.captureSettlementDataService = captureSettlementDataService;
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
    }
}
