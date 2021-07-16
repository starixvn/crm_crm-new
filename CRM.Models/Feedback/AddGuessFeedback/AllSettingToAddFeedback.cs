
namespace CRM.Models.Feedback.AddGuessFeedback
{
    using CRM.Models.Setting;
    using System;
    using System.Collections.Generic;

    [Serializable]
    public class AllSettingToAddFeedback
    {
        public IEnumerable<SettingRelation> Extensions { get; set; }

        public IEnumerable<Country> Countries { get; set; }

        public IEnumerable<Province> Provinces { get; set; }

        public IEnumerable<Setting> CommunicationTools { get; set; }

        public IEnumerable<Setting> Languages { get; set; }

        public IEnumerable<Setting> MainCategories { get; set; }

        public IEnumerable<Setting> SubCategories { get; set; }

        public IEnumerable<Product> Products { get; set; }

        public IEnumerable<Product> SubProducts { get; set; }

        public IEnumerable<Product> Bettypes { get; set; }

        public IEnumerable<SiteSetting> Sites { get; set; }

        public IEnumerable<SettingRelation> Responses { get; set; }

        public IEnumerable<FeedbackStatus> Status { get; set; }

        public IEnumerable<SettingRelation> Titles { get; set; }

        public IEnumerable<SettingRelation> Roles { get; set; }

        public IEnumerable<BaseModel> LicenseeType { get; set; }

        public Product ProductNA { get; set; }

        public Product SubProductNA { get; set; }

        public Product BettypeNA { get; set; }

        public SettingRelation ExtensionNA { get; set; }
    }
}
