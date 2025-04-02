namespace CRM.Models.Report.DeletedFeedbackStatistic;

using System.Collections.Generic;

public class DeletedFeedbackByHandler
{
    public string Handler { get; set; }

    public IEnumerable<DeletedFeedbackStatistic> DeletedFeedbacks { get; set; }
}