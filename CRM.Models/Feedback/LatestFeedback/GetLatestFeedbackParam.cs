namespace CRM.Models.LatestFeedback
{
    public class GetLatestFeedbackParam
    {
        public int CustId { get; set; }

        public string Username { get; set; }

        public int Top { get; set; }
    }
}