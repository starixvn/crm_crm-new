namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Letstalk.Services.Services.Interfaces;
    using Fanex.CRM.BackgroundJob.Services;
    using NSubstitute;
    using ONEbook.UM.Models;
    using ONEbook.UM.Services;
    using Xunit;

    public class BackgroundServiceTests
    {
        private IMaintenanceService maintenanceService;
        private IChatBotJobService chatBotJobService;
        private ICRMLogService logService;
        private ISendNotificationService sendNotificationService;
        private IMonitorService monitorService;
        private IAutoFeedbackService autoFeedbackService;


        #region CreateFeedbackForVoidingAbnormalBet

        [Fact]
        public async Task CreateFeedbackForVoidingAbnormalBet_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.CreateFeedbackForVoidingAbnormalBet();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task CreateFeedbackForVoidingAbnormalBet_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForVoidingAbnormalBet();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task CreateFeedbackForVoidingAbnormalBet_WhenCalled_ExpectedCreateFeedback()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForVoidingAbnormalBet();

            // Assert
            await autoFeedbackService.Received().ExecuteJobAsync();
        }

        #endregion CreateFeedbackForVoidingAbnormalBet

        #region CreateFeedbackForWinLossLimit

        [Fact]
        public async Task CreateFeedbackForWinLossLimit_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.CreateFeedbackForWinLossLimit();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task CreateFeedbackForWinLossLimit_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForWinLossLimit();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task CreateFeedbackForWinLossLimit_WhenCalled_ExpectedCreateWinLossFeedback()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForWinLossLimit();

            // Assert
            await autoFeedbackService.Received().WinLossExecuteJobAsync();
        }

        #endregion CreateFeedbackForTurnoverControl

        #region CreateFeedbackForProblemsAccount

        [Fact]
        public async Task CreateFeedbackForProblemsAccount_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.CreateFeedbackForProblemsAccount();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task CreateFeedbackForProblemsAccount_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForProblemsAccount();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task CreateFeedbackForProblemsAccount_WhenCalled_ExpectedProblemsAcccountExecuteJobAsync()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForProblemsAccount();

            // Assert
            await autoFeedbackService.Received().ProblemsAcccountExecuteJobAsync();
        }

        #endregion CreateFeedbackForProblemsAccount

        #region CreateFeedbackForTurnoverControl

        [Fact]
        public async Task CreateFeedbackForTurnoverControl_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.CreateFeedbackForTurnoverControl();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task CreateFeedbackForTurnoverControl_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForTurnoverControl();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task CreateFeedbackForTurnoverControl_WhenCalled_ExpectedCreateFeedbackForTurnoverControl()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForTurnoverControl();

            // Assert
            await autoFeedbackService.Received().TurnoverControlExecuteJobAsync();
        }

        #endregion CreateFeedbackForTurnoverControl

        #region CreateFeedbackForResultAmendment

        [Fact]
        public async Task CreateFeedbackForResultAmendment_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.CreateFeedbackForResultAmendment();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task CreateFeedbackForResultAmendment_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForResultAmendment();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task CreateFeedbackForResultAmendment_WhenCalled_ExpectedCreateFeedbackForResultAmendment()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForResultAmendment();

            // Assert
            await autoFeedbackService.Received().ResultAmendmentExecuteJobAsync();
        }

        #endregion CreateFeedbackForResultAmendment

         #region SynchronizeNewLicenseeOICToSiteSetting

        [Fact]
        public async Task SynchronizeNewLicenseeOICToSiteSetting_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.SynchronizeNewLicenseeOICToSiteSetting();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task SynchronizeNewLicenseeOICToSiteSetting_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.SynchronizeNewLicenseeOICToSiteSetting();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task SynchronizeNewLicenseeOICToSiteSetting_WhenCalled_ExpectedCreateFeedbackForTurnoverControl()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.SynchronizeNewLicenseeOICToSiteSetting();

            // Assert
            await autoFeedbackService.Received().SynchronizeNewLicenseeOICExecuteJobAsync();
        }

        #endregion SynchronizeNewLicenseeOICToSiteSetting

        #region CreateFeedbackForVoidingSettledTickets

        [Fact]
        public async Task CreateFeedbackForVoidingSettledTickets_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.CreateFeedbackForVoidingSettledTickets();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task CreateFeedbackForVoidingSettledTickets_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForVoidingSettledTickets();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task CreateFeedbackForVoidingSettledTickets_WhenCalled_ExpectedCreateFeedbackForResultAmendment()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.CreateFeedbackForVoidingSettledTickets();

            // Assert
            await autoFeedbackService.Received().VoidingSettledTicketsExecuteJobAsync();
        }

        #endregion CreateFeedbackForVoidingSettledTickets

        #region PullMessageForChatBotAsync

        [Fact]
        public async Task PullMessageForChatBotAsync_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.PullMessageForChatBotAsync();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task PullMessageForChatBotAsync_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageForChatBotAsync();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task PullMessageForChatBotAsync_WhenCalled_ExpectedPullMessageAndSendNotification()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageForChatBotAsync();

            // Assert
            await chatBotJobService.Received().PullMessageAndSendNotificationAsync();
        }

        #endregion PullMessageForChatBotAsync

        #region PullMessageCWLForChatBotAsync

        [Fact]
        public async Task PullMessageCWLForChatBotAsync_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.PullMessageCWLForChatBotAsync();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task PullMessageCWLForChatBotAsync_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageCWLForChatBotAsync();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task PullMessageCWLForChatBotAsync_WhenCalled_ExpectedPullMessageAndSendNotification()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageCWLForChatBotAsync();

            // Assert
            await chatBotJobService.Received().PullMessageCWLAndSendNotificationToHeadlineAsync();
        }

        #endregion PullMessageForChatBotAsync

        #region PullMessageCTOForChatBotAsync

        [Fact]
        public async Task PullMessageCTOForChatBotAsync_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.PullMessageCTOForChatBotAsync();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task PullMessageCTOForChatBotAsync_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageCTOForChatBotAsync();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task PullMessageCTOForChatBotAsync_WhenCalled_ExpectedPullMessageAndSendNotification()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageCTOForChatBotAsync();

            // Assert
            await chatBotJobService.Received().PullMessageCTOAndSendNotificationToHeadlineAsync();
        }

        #endregion PullMessageCWLForChatBotAsync

        #region PullMessageProblemsAccountForChatBotAsync

        [Fact]
        public async Task PullMessageProblemsAccountForChatBotAsync_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.PullMessageProblemsAccountForChatBotAsync();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task PullMessageProblemsAccountForChatBotAsync_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageProblemsAccountForChatBotAsync();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task PullMessageProblemsAccountForChatBotAsync_WhenCalled_ExpectedPullMessageAndSendNotification()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageProblemsAccountForChatBotAsync();

            // Assert
            await chatBotJobService.Received().PullMessageProblemsAccountAndSendNotificationToHeadlineAsync();
        }

        #endregion PullMessageProblemsAccountForChatBotAsync

        #region PullMessageResultAmendmentForChatBotAsync

        [Fact]
        public async Task PullMessageResultAmendmentForChatBotAsync_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.PullMessageResultAmendmentForChatBotAsync();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task PullMessageResultAmendmentForChatBotAsync_IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageResultAmendmentForChatBotAsync();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task PullMessageResultAmendmentForChatBotAsync_WhenCalled_ExpectedPullMessageAndSendNotification()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.PullMessageResultAmendmentForChatBotAsync();

            // Assert
            await chatBotJobService.Received().PullMessageResultAmendmentAndSendNotificationToHeadlineAsync();
        }

        #endregion PullMessageResultAmendmentForChatBotAsync

        #region ScanAndSenLetstalkNotification

        [Fact]
        public async Task ScanAndSenLetstalkNotification_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            maintenanceService.When(x => x.GetUnderMaintenanceTimeAsync()).Throw(exception);

            // Act
            await service.ScanAndSenLetstalkNotification();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        [Fact]
        public async Task ScanAndSenLetstalkNotification__IsUnderMaintenance_ExpectedWriteLog()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = true };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.ScanAndSenLetstalkNotification();

            // Assert
            logService.Received().LogInformation("UM time.");
        }

        [Fact]
        public async Task ScanAndSenLetstalkNotification_WhenCalled_ExpectedSendNotification()
        {
            // Arrange
            var underMaintenanceTime = new UnderMaintenanceTime { IsUnderMaintenanceTime = false };
            var service = GetService();
            maintenanceService.GetUnderMaintenanceTimeAsync().Returns(underMaintenanceTime);

            // Act
            await service.ScanAndSenLetstalkNotification();

            // Assert
            await sendNotificationService.Received().SendNotificationToLetstalk();
        }

        #endregion ScanAndSenLetstalkNotification

        [Fact]
        public async Task MonitorLetstalkService_WhenCalled_ExpectedCallMonitorLetstalkService()
        {
            // Arrange
            var service = GetService();

            // Act
            await service.MonitorLetstalkService();

            // Assert
            await monitorService.Received().MonitorLetstalkService();
        }

        [Fact]
        public async Task MonitorLetstalkService_Exception_ExpectedWriteLog()
        {
            // Arrange
            var fixture = new Fixture();
            var exception = fixture.Create<Exception>();
            var service = GetService();
            monitorService.When(x => x.MonitorLetstalkService()).Throw(exception);

            // Act
            await service.MonitorLetstalkService();

            // Assert
            await logService.Received().ErrorAsync(exception);
        }

        #region Helpers

        private BackgroundService GetService()
        {
            maintenanceService = Substitute.For<IMaintenanceService>();
            chatBotJobService = Substitute.For<IChatBotJobService>();
            logService = Substitute.For<ICRMLogService>();
            sendNotificationService = Substitute.For<ISendNotificationService>();
            monitorService = Substitute.For<IMonitorService>();
            autoFeedbackService = Substitute.For<IAutoFeedbackService>();

            return new BackgroundService(
                maintenanceService,
                chatBotJobService,
                logService,
                sendNotificationService,
                autoFeedbackService,
                monitorService);
        }

        #endregion Helpers
    }
}