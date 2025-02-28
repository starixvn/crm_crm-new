namespace CRM.Criteria.Feedback;

using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Models.Feedback;
using Extensions.XML;
using Fanex.Data;
using Fanex.Data.Repository;

public class CheckFeedbackDuplicationCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public DateTime StartTime { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<CategorySubCategorySetting> Categories { get; set; } = new List<CategorySubCategorySetting>();

    [SpParam(SqlParamName = "Category")]
    public string CategoryXml => Categories.Any() ? Categories.ToXML("ROOT").ToString() : string.Empty;

    public int TimeSpan { get; } = 12;

    public int FeedbackId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_FeedbackDoubleCheck";

    public override bool IsValid() => true;
}