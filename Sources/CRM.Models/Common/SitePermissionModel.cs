namespace CRM.Models.Common
{
    public class SitePermissionModel
    {
        public int SiteID { get; set; }

        public string SiteName { get; set; }

        public bool IsLicensee { get; set; }

        public bool IsActive { get; set; }

        public string SiteLabel { get; set; }

        public int SiteOffer { get; set; }
    }
}
