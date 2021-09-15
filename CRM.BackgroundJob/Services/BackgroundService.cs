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

        Task PullMessageResultAmendmentForChatBotAsync();

        Task ScanAndSenLetstalkNotification();

        Task MonitorLetstalkService();

        Task CreateFeedbackForWinLossLimit();

        Task CreateFeedbackForTurnoverControl();

        Task CreateFeedbackForProblemsAccount();
        
        Task CreateFeedbackForResultAmendment();

        Task SynchronizeNewLicenseeOICToSiteSetting();

        Task CreateFeedbackForVoidingSettledTickets();

    }

    public class BackgroundService : IBackgroundService
    {
        private readonly IMaintenanceService maintenanceService;
        private readonly IChatBotJobService chatBotJobService;
        private readonly ICRMLogService logService;
        private readonly ISendNotificationService sendNotificationService;
        private readonly IAutoFeedbackService autoFeedbackService;
        private readonly IMonitorService monitorService;

        private const string umTime = "UM time.";

        public BackgroundService(
            IMaintenanceService maintenanceService,
            IChatBotJobService chatBotJobService,
            ICRMLogService logService,
            ISendNotificationService sendNotificationService,
            IAutoFeedbackService autoFeedbackService,
            IMonitorService monitorService)
        {
            this.maintenanceService = maintenanceService;
            this.chatBotJobService = chatBotJobService;
            this.logService = logService;
            this.sendNotificationService = sendNotificationService;
            this.autoFeedbackService = autoFeedbackService;
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

                await autoFeedbackService.ExecuteJobAsync();
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
        public async Task PullMessageResultAmendmentForChatBotAsync()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await chatBotJobService.PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();
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

                await autoFeedbackService.WinLossExecuteJobAsync();
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

                await autoFeedbackService.TurnoverControlExecuteJobAsync();
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

                await autoFeedbackService.ProblemsAcccountExecuteJobAsync();
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

                await autoFeedbackService.ResultAmendmentExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }


        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task SynchronizeNewLicenseeOICToSiteSetting()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await autoFeedbackService.SynchronizeNewLicenseeOICExecuteJobAsync();
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
            }
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [Queue(QueuePriority.Critical)]
        public async Task CreateFeedbackForVoidingSettledTickets()
        {
            try
            {
                bool isUM = await CheckUM();
                if (isUM)
                {
                    logService.LogInformation(umTime);
                    return;
                }

                await autoFeedbackService.VoidingSettledTicketsExecuteJobAsync();
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