namespace CRM.ViewModels.Feedback.MultipleLogs
{
    using System.Collections.Generic;
    using CRM.Models;
    using CRM.Models.Setting;

    public class CreateMultipleLogsViewModel
    {
        public IEnumerable<SettingRelation> Extensions { get; set; } = new List<SettingRelation>();
        public IEnumerable<Setting> CommunicationTools { get; set; } = new List<Setting>();
        public IEnumerable<Province> Provinces { get; set; } = new List<Province>();
        public IEnumerable<Setting> Statuses { get; set; } = new List<Setting>();
        public IEnumerable<SettingRelation> Roles { get; set; } = new List<SettingRelation>();
        public IEnumerable<SettingRelation> Responses { get; set; } = new List<SettingRelation>();
        public IEnumerable<Setting> Languages { get; set; } = new List<Setting>();
        public IEnumerable<Country> Countries { get; set; } = new List<Country>();
        public IEnumerable<Product> Products { get; set; } = new List<Product>();
        public IEnumerable<Product> SubProducts { get; set; } = new List<Product>();
        public IEnumerable<Product> Bettypes { get; set; } = new List<Product>();
        public IEnumerable<Setting> MainCategories { get; set; } = new List<Setting>();
        public IEnumerable<Setting> SubCategories { get; set; } = new List<Setting>();
        public Product ProductNA { get; set; }
        public Product SubProductNA { get; set; }
        public Product BettypeNA { get; set; }
        public SettingRelation ExtensionNA { get; set; }
    }
}