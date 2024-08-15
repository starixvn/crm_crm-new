
namespace CRM.BackgroundJob.UnitTests.Testable
{
    using CRM.BackgroundJob.Models.AbnormalBet;
    using CRM.BackgroundJob.Models.ProblemsAccount;
    using CRM.BackgroundJob.Models.AmendmentNotiFB;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;
    using System.Threading.Tasks;

    public class AutoFeedbackServiceTestable : AutoFeedbackService
    {
        public AutoFeedbackServiceTestable(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IJobRunningChecker jobRunningChecker,
            ISystemSettingService systemSettingService,
            IWinLossFeedbackService winLossService,
            ICRMLogService logService,
            ITOControlFeedbackService turnoverService,
            IAmendmentNotiFbService amendmentNotiFbService,
            IProblemsAccountFeedbackService problemsAccountFeedbackService,
            IFeedbackService feedbackService,
            ISynchronizeLicenseeService licenseeService,
            IVoidingSettledTicketsFeedbackService voidingSettledTicketsService,
            IArchivingDAService archivingDAService,
            ISendNotificationService sendNotificationService,
            IRefundSettledTicketService refundSettledTicketService,
            IVoidingBetIDService voidingBetIDService,
            IAbnormalBetService abnormalBetService,
            IAutoFbMessageNotificationCenterService autoFbMessageNotificationCenterService,
            IConfiguration configuration
            )
            : base(appSettings,
                jobRunningChecker,
                systemSettingService,
                winLossService,
                logService,
                turnoverService,
                amendmentNotiFbService,
                problemsAccountFeedbackService,
                feedbackService,
                licenseeService,
                voidingSettledTicketsService,
                archivingDAService,
                sendNotificationService,
                refundSettledTicketService,
                voidingBetIDService,
                abnormalBetService,
                autoFbMessageNotificationCenterService,
                configuration)
        {

        }

        public async Task Public_ProblemsAcccountRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, ProblemsAccountSetting problemsAccountSetting, string Environment)
        {
            await base.ProblemsAcccountRunJobByEnviromentAsync(isUAT, isRunningUAT,
                isRunningLive, problemsAccountSetting, Environment);
        }

        public async Task Public_ResultAmendmentRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, AmendmentNotiFbSetting resultAmendmentSetting, string Environment)
        {
            await base.ResultAmendmentRunJobByEnviromentAsync(isUAT, isRunningUAT,
                isRunningLive, resultAmendmentSetting, Environment);
        }

        public async Task Public_VoidingSettledTicketsRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, AmendmentNotiFbSetting resultAmendmentSetting, string Environment)
        {
            await base.VoidingSettledTicketsRunJobByEnviromentAsync(isUAT, isRunningUAT,
                isRunningLive, resultAmendmentSetting, Environment);
        }

        public async Task Public_AbnormalbetRunJobByEnviromentAsync(bool isUAT, bool isRunningUAT,
            bool isRunningLive, AbnormalBetSystemSetting setting, string Environment)
        {
            await base.AbnormalbetRunJobByEnviromentAsync(isUAT, isRunningUAT,
            isRunningLive, setting, Environment);
        }
    }
}
