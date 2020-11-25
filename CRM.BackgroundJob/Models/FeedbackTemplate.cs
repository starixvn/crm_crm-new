namespace CRM.BackgroundJob.Models
{
    using System.Collections.Generic;
    using System.Xml.Serialization;

    [XmlRoot("ROOT")]
    public class FeedbackTemplate
    {
        [XmlElement("Feedback")]
        public List<Template> Templates { get; set; }
    }

    public class Template
    {
        [XmlElement("RNGTemplateENYN")]
        public string RNGTemplateENYN { get; set; }

        [XmlElement("RNGTemplateENSC")]
        public string RNGTemplateENSC { get; set; }

        [XmlElement("YellowTemplateENYN")]
        public string YellowTemplateENYN { get; set; }

        [XmlElement("YellowTemplateENSC")]
        public string YellowTemplateENSC { get; set; }

        [XmlElement("RedTemplateENYN")]
        public string RedTemplateENYN { get; set; }

        [XmlElement("RedTemplateENSC")]
        public string RedTemplateENSC { get; set; }

        [XmlElement("GreyTemplateENYN")]
        public string GreyTemplateENYN { get; set; }

        [XmlElement("GreyTemplateENSC")]
        public string GreyTemplateENSC { get; set; }

        [XmlElement("BlackTemplateYN")]
        public string BlackTemplateYN { get; set; }

        [XmlElement("BlackTemplateSC")]
        public string BlackTemplateSC { get; set; }
    }
}
