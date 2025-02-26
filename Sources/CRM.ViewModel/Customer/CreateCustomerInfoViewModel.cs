namespace CRM.ViewModels.Customer
{
    using System.Collections.Generic;
    using CRM.Models;
    using CRM.Models.Setting;

    public class CreateCustomerInfoViewModel
    {
        public IEnumerable<Country> Countries { get; set; } = new List<Country>();
        public IEnumerable<Language> Languages { get; set; } = new List<Language>();
        public IEnumerable<BaseModel> LicenseeTypes { get; set; } = new List<BaseModel>();
        public IEnumerable<SiteInfo> Sites { get; set; } = new List<SiteInfo>();
        public IEnumerable<SettingRelation> Titles { get; set; } = new List<SettingRelation>();
        public IEnumerable<SettingRelation> Roles { get; set; } = new List<SettingRelation>();
    }
}
