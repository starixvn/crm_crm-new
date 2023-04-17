namespace CRM.ViewModels.ChatTypeMapping
{
    using System.Collections.Generic;
    using CRM.Models.ChatTypeMapping;

    public class RecipientLetstalk
    {
        public int RecipientId { get; set; }

        public string RecipientName { get; set; }

        public List<LetstalkAccountInGroup> Letstalks { get; set; }
    }
}