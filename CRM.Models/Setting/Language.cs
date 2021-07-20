namespace CRM.Models.Setting
{
    public class Language
    {
        public int LanguageId { get; set; }

        public string Name { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsActive { get; set; }
    }
}
