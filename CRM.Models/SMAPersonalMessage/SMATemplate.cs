
namespace CRM.Models.SMAPersonalMessage
{
    using System;
    using CRM.Core.Extensions.XML;
    using System.Xml.Serialization;

    [Serializable]
    [XMLName("Content")]
    public class SMATemplate
    {
        [XMLName("Value")]
        public string Content { get; set; }
    }
}
