namespace CRM.Models.Report.FeedbackStatistic
{
    using System.Collections.Generic;
    public class FeedbackCategory: BaseModel
    {
        public IList<FeedbackSubcategory> FeedbackSubcategories { get; set; } = new List<FeedbackSubcategory>();

        public FeedbackSubcategory SubTotal { get; set; }
    }
}
