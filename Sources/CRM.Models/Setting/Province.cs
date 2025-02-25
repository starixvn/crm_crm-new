namespace CRM.Models.Setting
{
    public class Province
    {
        public int ProvinceId { get; set; }

        public string ProvinceName { get; set; }

        public bool IsActive { get; set; }

        public int DisplayOrder { get; set; }

        public int CountryId { get; set; }
    }
}