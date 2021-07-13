namespace CRM.Models.Feedback
{
    using System.Xml.Serialization;

    [XmlType("Product")]
    public class ProductSubProductBettypeSetting
    {
        [XmlAttribute("ProductID")]
        public int ProductId { get; set; }

        [XmlAttribute("SubProductID")]
        public int SubProductId { get; set; }

        [XmlAttribute("BettypeID")]
        public int BettypeId { get; set; }
    }
}