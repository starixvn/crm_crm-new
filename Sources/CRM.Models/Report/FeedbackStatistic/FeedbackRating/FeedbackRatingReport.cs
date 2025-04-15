namespace CRM.Models.Report.FeedbackStatistic.FeedbackRating;

using System.Collections.Generic;

public class FeedbackRatingReport
{
    public string Title { get; set; }
    public int TotalItems { get; set; }
    public List<string> ColumnNames { get; set; }
    public List<FeedbackRatingRecord> Records { get; set; }
}