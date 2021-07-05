namespace CRM.BackgroundJob.Models.ChatBot
{
    using Fanex.CRM.BackgroundJob.Models.ChatBot;

    public class ChatBotUserNameList: ChatBotVoidingMessage
    {
        public string UsernameList { get; set; }
        public string CustIdList { get; set; }
    }
}
