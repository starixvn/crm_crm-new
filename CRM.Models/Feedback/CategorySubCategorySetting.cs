namespace CRM.Models.Feedback
{
    using System.Xml.Serialization;

    [XmlType("Category")]
    public class CategorySubCategorySetting
    {
        [XmlAttribute("MainCategoryID")]
        public int MainCategoryId { get; set; }

        [XmlAttribute("SubCategoryID")]
        public int SubCategoryId { get; set; }
    }
}