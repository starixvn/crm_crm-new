namespace CRM.BackgroundJob.UnitTests.Services
{
    using System.Collections.Generic;
    using CRM.BackgroundJob.UnitTests.Testable;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Hangfire;
    using Hangfire.Common;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using Xunit;

    public class CustomWebHostServiceTests
    {
        private IRecurringJobManager recurringJob;
        private IJobRunningChecker jobRunningChecker;

        [Fact]
        public void OnStarted_WhenCalled_ExpectedRunJobs()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>();
            var service = MockService(jobSettings);

            // Act
            service.Public_OnStarted();

            // Assert
            jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForVoidingAbnormalBet);
            jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForWinLossLimit);
            jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForTurnoverControl);
            jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForProblemsAccount);
            jobRunningChecker.Received().ClearRunning(JobName.CreateFeedbackForResultAmendment);
            service.Received().Protected("RemoveRecurringJobs");
            service.Received().Protected("RunHangfireJobs");
        }


        [Fact]
        public void OnStopping_WhenCalled_ExpectedRemoveCurrentHangfireServer()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>();
            var service = MockService(jobSettings);

            // Act
            service.Public_OnStopping();

            // Assert
            service.Received().Protected("RemoveCurrentHangfireServer");
        }

        #region RunHangfireJobs

        [Fact]
        public void CheckEnabledJobAutoFeedback_EnabledCreateFeedbackForVoidingAbnormalBet_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "CreateFeedbackForVoidingAbnormalBet", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "CreateFeedbackForVoidingAbnormalBet").Returns(true);

            // Act
            service.Public_CheckEnabledJobAutoFeedback();

            // Assert
            recurringJob.Received().AddOrUpdate("Create Feedback For Voiding Abnormal Bet",
                Arg.Is<Job>(job => job.Method.Name == "CreateFeedbackForVoidingAbnormalBet"),
                "* * * * *",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobChatBot_EnabledPullMessageForChatBot_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "PullMessageForChatBot", CronExpression = "CronExpression", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "PullMessageForChatBot").Returns(true);
            service.Protected("GetCronExpression", "PullMessageForChatBot").Returns("CronExpression");

            // Act
            service.Public_CheckEnabledJobChatBot();

            // Assert
            recurringJob.Received().AddOrUpdate("Pull Message For Chat Bot",
                Arg.Is<Job>(job => job.Method.Name == "PullMessageForChatBotAsync"),
                "CronExpression",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobChatBot_EnabledPullMessageCWLForChatBot_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "PullMessageCWLForChatBot", CronExpression = "CronExpression", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "PullMessageCWLForChatBot").Returns(true);
            service.Protected("GetCronExpression", "PullMessageCWLForChatBot").Returns("CronExpression");

            // Act
            service.Public_CheckEnabledJobChatBot();

            // Assert
            recurringJob.Received().AddOrUpdate("Pull Message CWL For Chat Bot",
                Arg.Is<Job>(job => job.Method.Name == "PullMessageCWLForChatBotAsync"),
                "CronExpression",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobChatBot_EnabledPullMessageCTOForChatBot_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "PullMessageCTOForChatBot", CronExpression = "CronExpression", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "PullMessageCTOForChatBot").Returns(true);
            service.Protected("GetCronExpression", "PullMessageCTOForChatBot").Returns("CronExpression");

            // Act
            service.Public_CheckEnabledJobChatBot();

            // Assert
            recurringJob.Received().AddOrUpdate("Pull Message CTO For Chat Bot",
                Arg.Is<Job>(job => job.Method.Name == "PullMessageCTOForChatBotAsync"),
                "CronExpression",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobChatBot_EnabledPullMessageProblemAccountForChatBot_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "PullMessageProblemAccountForChatBot", CronExpression = "CronExpression", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "PullMessageProblemAccountForChatBot").Returns(true);
            service.Protected("GetCronExpression", "PullMessageProblemAccountForChatBot").Returns("CronExpression");

            // Act
            service.Public_CheckEnabledJobChatBot();

            // Assert
            recurringJob.Received().AddOrUpdate("Pull Message Problems Account For Chat Bot",
                Arg.Is<Job>(job => job.Method.Name == "PullMessageProblemsAccountForChatBotAsync"),
                "CronExpression",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobChatBot_EnabledScanAndSendLetstalkNotification_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "ScanAndSendLetstalkNotification", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "ScanAndSendLetstalkNotification").Returns(true);

            // Act
            service.Public_CheckEnabledJobChatBot();

            // Assert
            recurringJob.Received().AddOrUpdate("Scan and send Letstalk Notification",
                Arg.Is<Job>(job => job.Method.Name == "ScanAndSenLetstalkNotification"),
                "* * * * *",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobChatBot_EnabledMonitorLetstalkService_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "MonitorLetstalkService", CronExpression = "CronExpression", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "MonitorLetstalkService").Returns(true);
            service.Protected("GetCronExpression", "MonitorLetstalkService").Returns("CronExpression");

            // Act
            service.Public_CheckEnabledJobChatBot();

            // Assert
            recurringJob.Received().AddOrUpdate("Monitor Letstalk Service",
                Arg.Is<Job>(job => job.Method.Name == "MonitorLetstalkService"),
                "CronExpression",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobAutoFeedback_EnabledCreateFeedbackForWinLossLimit_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "CreateFeedbackForWinLossLimit", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "CreateFeedbackForWinLossLimit").Returns(true);

            // Act
            service.Public_CheckEnabledJobAutoFeedback();

            // Assert
            recurringJob.Received().AddOrUpdate("Create Feedback For Win Loss Limit",
                Arg.Is<Job>(job => job.Method.Name == "CreateFeedbackForWinLossLimit"),
                "* * * * *",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobAutoFeedback_EnabledCreateFeedbackForTurnoverControl_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "CreateFeedbackForTurnoverControl", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "CreateFeedbackForTurnoverControl").Returns(true);

            // Act
            service.Public_CheckEnabledJobAutoFeedback();

            // Assert
            recurringJob.Received().AddOrUpdate("Create Feedback For TurnOver Controll",
                Arg.Is<Job>(job => job.Method.Name == "CreateFeedbackForTurnoverControl"),
                "* * * * *",
                Arg.Any<RecurringJobOptions>());
        }

        [Fact]
        public void CheckEnabledJobAutoFeedback_EnabledCreateFeedbackForProblemsAccount_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "CreateFeedbackForProblemsAccount", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "CreateFeedbackForProblemsAccount").Returns(true);

            // Act
            service.Public_CheckEnabledJobAutoFeedback();

            // Assert
            recurringJob.Received().AddOrUpdate("Create Feedback For Problems Account",
                Arg.Is<Job>(job => job.Method.Name == "CreateFeedbackForProblemsAccount"),
                "* * * * *",
                Arg.Any<RecurringJobOptions>());
        }
        
         [Fact]
        public void CheckEnabledJobAutoFeedback_EnabledCreateFeedbackForResultAmendment_ExpectedAddRecurringJob()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "CreateFeedbackForResultAmendment", IsEnabled = true }
            };
            var service = MockService(jobSettings);
            service.Protected("IsEnabledJob", "CreateFeedbackForResultAmendment").Returns(true);

            // Act
            service.Public_CheckEnabledJobAutoFeedback();

            // Assert
            recurringJob.Received().AddOrUpdate("Create Feedback For Result Amendment",
                Arg.Is<Job>(job => job.Method.Name == "CreateFeedbackForResultAmendment"),
                "* * * * *",
                Arg.Any<RecurringJobOptions>());
        }



        #endregion RunHangfireJobs

        [Fact]
        public void IsEnabledJob_NotExistedJob_ReturnFalse()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>();
            var service = MockService(jobSettings);

            // Act
            var actual = service.Public_IsEnabledJob("");

            // Assert
            Assert.False(actual);
        }

        [Theory]
        [InlineData(false)]
        [InlineData(true)]
        public void GetCronExpression_ExistedJob_ReturnAsExpected(bool isEnabled)
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "JobName", CronExpression = "CronExpression", IsEnabled = isEnabled }
            };
            var service = MockService(jobSettings);

            // Act
            var actual = service.Public_IsEnabledJob("JobName");

            // Assert
            Assert.Equal(isEnabled, actual);
        }

        [Fact]
        public void GetCronExpression_NotExistedJob_ReturnEmpty()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>();
            var service = MockService(jobSettings);

            // Act
            var actual = service.Public_GetCronExpression("");

            // Assert
            Assert.Empty(actual);
        }

        [Fact]
        public void GetCronExpression_ExistedJob_ReturnExpectedCronExpression()
        {
            // Arrange
            var jobSettings = new List<HangfireJobSetting>
            {
                new HangfireJobSetting { JobName = "JobName", CronExpression = "CronExpression" }
            };
            var service = MockService(jobSettings);

            // Act
            var actual = service.Public_GetCronExpression("JobName");

            // Assert
            Assert.Equal("CronExpression", actual);
        }

        #region Helpers

        private CustomWebHostServiceTestable MockService(List<HangfireJobSetting> jobSettings)
        {
            recurringJob = Substitute.For<IRecurringJobManager>();
            jobRunningChecker = Substitute.For<IJobRunningChecker>();
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddTransient(option => recurringJob);
            serviceCollection.AddTransient(option => jobRunningChecker);
            serviceCollection.AddTransient(option => Options.Create(jobSettings));

            var host = Substitute.For<IWebHost>();
            host.Services.Returns(serviceCollection.BuildServiceProvider());
            return Substitute.For<CustomWebHostServiceTestable>(host);
        }

        #endregion Helpers
    }
}