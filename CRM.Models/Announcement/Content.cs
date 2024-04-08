namespace CRM.Models.Announcement
{
    using System;
    using CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("Content")]
    public class Content
    {
        [XMLName("LanguageId")]
        public int LanguageId { get; set; }
        [XMLName("Value")]
        public string Value { get; set; }
        [XMLName("FileName")]
        public string FileName { get; set; }
    }
}
