namespace CRM.Models.Report.FeedbackStatistic.FeedbackRating;

public class FeedbackRatingRecord
{
    public BaseModel ColumnData { get; set; }
    public int Excellent { get; set; }
    public int Good { get; set; }
    public int Neutral { get; set; }
    public int Poor { get; set; }
    public int VeryPoor { get; set; }
}