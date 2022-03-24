
namespace CRM.Models.Report.FeedbackStatistic
{
    using System.Collections.Generic;
    using System.Linq;

    public class FeedbackSubcategory
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IList<int> Resolves { get; set; }

        public int Total
        {
            get
            {
                return Resolves == null || Resolves.Count == 0 ? 0 : Resolves.Sum();
            }
        }
    }
}
