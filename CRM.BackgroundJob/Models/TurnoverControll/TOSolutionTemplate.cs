namespace CRM.BackgroundJob.Models.TurnoverControll
{
    using System.Xml.Serialization;

    [XmlRoot("ROOT")]
    public class TOSolutionTemplate
    {
        [XmlElement("SolutionEN")]
        public Solution SolutionEN { get; set; }
        [XmlElement("SolutionSC")]
        public Solution SolutionSC { get; set; }
        [XmlElement("SolutionYN")]
        public Solution SolutionYN { get; set; }
    }
    public class Solution
    {
        public string Header { get; set; }
        public string SolutionTemplate { get; set; }
        public string Footer { get; set; }
    }
}
