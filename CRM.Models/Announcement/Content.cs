using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Core.Extensions.XML;

namespace CRM.Models.Announcement
{
    [Serializable]
    [XMLName("Content")]
    public class Content
    {
        [XMLName("LanguageId")]
        public string LanguageId { get; set; }
        [XMLName("Value")]
        public string Value { get; set; }
    }
}
