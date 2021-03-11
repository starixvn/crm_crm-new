namespace CRM.BackgroundJob.Models.ResultAmendment
{
    using System.Xml.Serialization;

    [XmlRoot("ROOT")]
    public class AmendmentSolutionTemplate
    {
        public string SportsbookEN { get; set; }
        public string SportsbookSC { get; set; }
        public string SportsbookYN { get; set; }

        public string VirtualSports2EN { get; set; }
        public string VirtualSports2SC { get; set; }
        public string VirtualSports2YN { get; set; }

        public string VirtualSportsEN { get; set; }
        public string VirtualSportsSC { get; set; }
        public string VirtualSportsYN { get; set; }

        public string NumberGameEN { get; set; }
        public string NumberGameSC { get; set; }
        public string NumberGameYN { get; set; }
    }
}
