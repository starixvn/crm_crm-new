namespace CRM.Models.Feedback.LatestFeedback;

public class GetLatestFeedbackParam
{
    public int Top { get; set; }
    public int CustID { get; set; }
    public string UserName { get; set; }
}