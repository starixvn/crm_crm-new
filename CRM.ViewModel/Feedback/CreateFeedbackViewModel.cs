namespace CRM.ViewModels.Feedback
{
    using System.Collections.Generic;
    using CRM.Models;
    using CRM.Models.Setting;

    public class CreateFeedbackViewModel
    {
        public IEnumerable<SettingRelation> Extensions { get; set; } = new List<SettingRelation>();
        public IEnumerable<Setting> CommunicationTools { get; set; } = new List<Setting>();
        public IEnumerable<FeedbackStatus> Statuses { get; set; } = new List<FeedbackStatus>();
        public IEnumerable<SettingRelation> Responses { get; set; } = new List<SettingRelation>();
        public IEnumerable<Language> Languages { get; set; } = new List<Language>();
        public IEnumerable<Country> Countries { get; set; } = new List<Country>();
        public IEnumerable<Product> Products { get; set; } = new List<Product>();
        public IEnumerable<Product> SubProducts { get; set; } = new List<Product>();
        public IEnumerable<Product> Bettypes { get; set; } = new List<Product>();
        public IEnumerable<Setting> MainCategories { get; set; } = new List<Setting>();
        public IEnumerable<Setting> SubCategories { get; set; } = new List<Setting>();
        public IEnumerable<SettingRelation> Roles { get; set; } = new List<SettingRelation>();
        public IEnumerable<SettingRelation> Titles { get; set; } = new List<SettingRelation>();
        public IEnumerable<BaseModel> LicenseeTypes { get; set; } = new List<BaseModel>();
        public IEnumerable<SiteInfo> Sites { get; set; } = new List<SiteInfo>();
        public IEnumerable<Setting> PeriodTypes { get; set; } = new List<Setting>();
        public Product ProductNA { get; set; }
        public Product SubProductNA { get; set; }
        public Product BettypeNA { get; set; }
        public SettingRelation ExtensionNA { get; set; }
        public Setting CommunicationToolNA { get; set; }
        public Setting SubCategoryNA { get; set; }
    }
}