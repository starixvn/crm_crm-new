namespace CRM.Models.Feedback
{
    public class FeedbackSettingRelation
    {
        public int FeedbackId { get; set; }

        public string SettingType { get; set; }

        public int SettingId { get; set; }

        public int SubSettingId { get; set; }

        public int SubSettingIdLevel3 { get; set; }
    }
}
