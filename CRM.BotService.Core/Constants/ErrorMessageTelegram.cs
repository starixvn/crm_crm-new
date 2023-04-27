namespace CRM.BotService.Core.Constants
{
    public static class ErrorMessageTelegram
    {
        public const string MessageIsTooLong = "Message content length exceeds limitation (4096 characters).";
        public const string DisableChannelErrorMessage = "Chatbot service has been stopped due to turning off the configuration by admin.";
        public const string DuplicatedErrorMessage = "Error occurred due to duplicate content in a pre-defined period of time.";
        public const string GroupChatDeleted = "The Group chat has been deleted by Admin user.";
        public const string BlockBot = "Bot was blocked by the user.";
    }
}
