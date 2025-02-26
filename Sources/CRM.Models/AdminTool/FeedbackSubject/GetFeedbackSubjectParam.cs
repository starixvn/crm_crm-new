namespace CRM.Models.FeedbackSubject
{
    public class GetFeedbackSubjectParam
    {
        public string Subject { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public bool? IsActive { get; set; }
        public int TotalRows { get; set; }
    }
}