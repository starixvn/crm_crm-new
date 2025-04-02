namespace CRM.Models.Report.FeedbackStatistic;

using System.Collections.Generic;

public class FeedbackStatisticInfo: BaseModel
{
    public string Title { get; set; }

    public IList<BaseModel> Usernames { get; set; } = new List<BaseModel>();

    public int TotalItems { get; set; }

    public IList<FeedbackCategory> FeedbackCategories { get; set; } = new List<FeedbackCategory>();

    public int[] GrandTotals { get; set; }
}