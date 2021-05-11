namespace CRM.BackgroundJob.Models.ProblemsAccount
{
    using System.Xml.Serialization;

    [XmlRoot("ROOT")]
    public class SolutionTemplate
    {
        public string SolutionEN { get; set; }
        public string SolutionSC { get; set; }
        public string SolutionYN { get; set; }
    }
}
