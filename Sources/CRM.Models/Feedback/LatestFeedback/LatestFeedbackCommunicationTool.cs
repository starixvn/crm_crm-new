namespace CRM.Models.Feedback.LatestFeedback
{
    public class LatestFeedbackCommunicationTool
    {
        public int FeedbackID { get; set; }
        public int CustID { get; set; }
        public bool isHeadline { get; set; }
        public string PicInfo { get; set; }
        public int CommunicationID { get; set; }
        public string CommunicationName { get; set; }
        public string CommunicationValue { get; set; }
    }
}
