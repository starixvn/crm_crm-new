namespace CRM.Models.PicAndHeadline
{
    using System;
    using System.Xml.Serialization;

    [Serializable]
    public class ConversationGroup
    {
        [XmlAttribute("Id")]
        public int Id { get; set; }

        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlAttribute("LetstalkID")]
        public string LetstalkID { get; set; }

        [XmlAttribute("ChatID")]
        public string ChatID { get; set; } = string.Empty;

        [XmlAttribute("Remark")]
        public string Remark { get; set; }

        [XmlAttribute("Active")]
        public bool Active { get; set; }

        [XmlAttribute("Deleted")]
        public bool Deleted { get; set; }
    }
}