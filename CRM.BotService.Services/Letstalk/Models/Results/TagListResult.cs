namespace CRM.BotService.Services.Models.Results
{
    using System.Collections.Generic;

    public class TagListResult : BaseResult
    {
        public List<string> Tags { get; set; }
    }
}