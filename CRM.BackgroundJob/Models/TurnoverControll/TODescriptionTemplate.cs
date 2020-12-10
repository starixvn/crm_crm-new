namespace CRM.BackgroundJob.Models.TurnoverControll
{
    using System.Xml.Serialization;

    [XmlRoot("ROOT")]
    public class TODescriptionTemplate
    {
        [XmlElement("Description")]
        public Desctiption Desc { get; set; }
    }
    public class Desctiption
    {
        public string Header { get; set; }

        public string DescTemplate { get; set; }
    }
}
