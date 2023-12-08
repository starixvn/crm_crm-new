using System;
using CRM.Core.Extensions.XML;

namespace CRM.Models.Announcement
{
    [Serializable]
    [XMLName("Content")]
    public class Content
    {
        [XMLName("LanguageId")]
        public int LanguageId { get; set; }
        [XMLName("Value")]
        public string Value { get; set; }
    }
}
