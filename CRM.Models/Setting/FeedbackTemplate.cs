namespace CRM.Models.Setting
{
    using System;

    [Serializable]
    public class FeedbackTemplate
    {
        public int TemplateId { get; set; }

        public string Subject { get; set; }

        public bool IsActive { get; set; }
    }
}
