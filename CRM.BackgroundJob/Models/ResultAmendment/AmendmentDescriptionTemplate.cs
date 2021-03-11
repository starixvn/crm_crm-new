namespace CRM.BackgroundJob.Models.ResultAmendment
{
    using System.Xml.Serialization;

    [XmlRoot("ROOT")]
    public class AmendmentDescriptionTemplate
    {
        public string SportsbookVsVirtualSports2 { get; set; }
        public string VirtualSports180186 { get; set; }
        public string VirtualSports181To185 { get; set; }
        public string NumberGame { get; set; }
    }
}
