namespace Fanex.CRM.BackgroundJob.Constants
{
    public static class HangfireJobName
    {
        public const string CreateFeedbackForVoidingAbnormalBet = "CreateFeedbackForVoidingAbnormalBet";
        public const string PullMessageForChatBot = "PullMessageForChatBot";
        public const string PullMessageCWLForChatBot = "PullMessageCWLForChatBot";
        public const string ScanAndSendLetstalkNotification = "ScanAndSendLetstalkNotification";
        public const string MonitorLetstalkService = "MonitorLetstalkService";
        public const string CreateFeedbackForWinLossLimit = "CreateFeedbackForWinLossLimit";
        public const string CreateFeedbackForTurnoverControl = "CreateFeedbackForTurnoverControl";
    }
}