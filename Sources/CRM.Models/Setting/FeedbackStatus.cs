namespace CRM.Models.Setting
{
    public class FeedbackStatus
    {
        public int StatusId { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
}