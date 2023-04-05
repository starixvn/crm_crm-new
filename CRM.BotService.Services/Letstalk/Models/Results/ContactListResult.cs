namespace CRM.BotService.Services.Models.Results
{
    using System.Collections.Generic;

    public class ContactListResult : BaseResult
    {
        public List<Contact> Contacts { get; set; }
    }
}