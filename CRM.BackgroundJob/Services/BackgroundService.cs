namespace Fanex.CRM.BackgroundJob.Services
{
    using System;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using global::CRM.Core.Services;
    using global::CRM.Letstalk.Services.Services.Interfaces;
    using Hangfire;
    using ONEbook.UM.Services;

    public interface IBackgroundService
    {
        Task CreateFeedbackForVoidingAbnormalBet();

        Task PullMessageForChatBotAsync();

        Task PullMessageCWLForChatBotAsync();

        Task PullMessageCTOForChatBotAsync();

        Task PullMessageProblemsAccountForChatBotAsync();

        Task ScanAndSenLetstalkNotification();

        Task MonitorLetstalkService();

        Task CreateFeedbackForWinLossLimit();

        Task CreateFeedbackForTurnoverControl();

        Task CreateFeedbackForProblemsAccount();
        
        Task CreateFeedbackForResultAmendment();

    }

    public class BackgroundService : IBackgroundService
    {
        private readonly IMaintenanceService maintenanceService;
        private readonly IChatBotJobService chatBotJobService;
        private readonly ICRMLogService logService;
        private readonly ISendNotificationService sendNotificationService;
        private readonly IAutoFeedbackService winLossService;
        private readonly IMonitorService monitorService;

        private const string umTime = "UM time.";

        public BackgroundService(
            IMaintenanceService maintenanceService,
            IChatBotJobService chatBotJobService,
            ICRMLogService logService,
            ISendNotificationService sendNotificationService,
            IAutoFeedbackService winLossService,
            IMonitorService monitorService)
        {
            this.maintenanceService = maintenanceService;
            this.chatBotJobService = chatBotJobService;
            this.logService = logService;
            this.sendNotificationService = sendNotificationService;
            this.winLossService = winLossService;
            this.monitorService = monitorService;
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task CreateFeedbackForVoidingAbnormalBet()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await winLossService.ExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task PullMessageForChatBotAsync()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await chatBotJobService.PullMessageAndSendNotificationAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task PullMessageCWLForChatBotAsync()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await chatBotJobService.PullMessageCWLAndSendNotificationToHeadlineAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task PullMessageCTOForChatBotAsync()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await chatBotJobService.PullMessageCTOAndSendNotificationToHeadlineAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task PullMessageProblemsAccountForChatBotAsync()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await chatBotJobService.PullMessageProblemsAccountAndSendNotificationToHeadlineAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task ScanAndSenLetstalkNotification()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await sendNotificationService.SendNotificationToLetstalk();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Default)]
        public async Task MonitorLetstalkService()
        {
            try
            {
                await monitorService.MonitorLetstalkService();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task CreateFeedbackForWinLossLimit()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await winLossService.WinLossExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task CreateFeedbackForTurnoverControl()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await winLossService.TurnoverControlExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task CreateFeedbackForProblemsAccount()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await winLossService.ProblemsAcccountExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }
        
        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task CreateFeedbackForResultAmendment()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await winLossService.ResultAmendmentExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }


        private async Task<bool> CheckUM()
        {
            var maintanceTime = await maintenanceService.GetUnderMaintenanceTimeAsync();
            return maintanceTime.IsUnderMaintenanceTime;
        }
    }
}