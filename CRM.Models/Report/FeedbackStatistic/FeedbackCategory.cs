namespace CRM.Models.Report.FeedbackStatistic
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    public class FeedbackCategory: BaseModel
    {
        public IList<FeedbackSubcategory> FeedbackSubcategories { get; set; }

        public FeedbackSubcategory SubTotal { get; set; }
    }
}
