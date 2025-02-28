namespace CRM.Criteria.Feedback.MultipleLogs;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CRM.Models;
using CRM.Models.Feedback;
using CRM.Models.Feedback.MultipleLogs;
using Extensions.XML;
using Fanex.Data;
using Newtonsoft.Json;

public class CreateMultipleLogsCommand : BaseNonQueryCommand
{
    public string Subject { get; set; }
    public int CreatorId { get; set; }
    public int UserId { get; set; }
    public string IP { get; set; } = string.Empty;

    [SpParam(SqlParamName = "feedbackdate")]
    public DateTime StartTime { get; set; }

    [SpParam(SqlParamName = "resolutiondate")]
    public DateTime EndTime { get; set; }

        [SpParam(AllowNull = true)]
        public DateTime? FirstResponseTime { get; set; }

    [SpParam(SqlParamName = "stationid")]
    public string ExtensionIds { get; set; }

    public int ResponseId { get; set; }
    public int StatusId { get; set; }

    [SpParam(SqlParamName = "description")]
    public string Remark { get; set; }

    public string Solution { get; set; }
    public bool IsReviewed { get; set; }
    public string Review { get; set; }
    public int? ReviewerId { get; set; }
    public string AutoField { get; set; }

    // use in case apply default communication tool
    public string AutoField1 { get; set; }

    public string AutoField2 { get; set; }
    public string AutoField3 { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<ProductSubProductBettypeSetting> Products { get; set; } = new List<ProductSubProductBettypeSetting>();

    [SpParam(SqlParamName = "product")]
    public string ProductXml => Products.Any() ? Products.ToXML("ROOT").ToString() : string.Empty;

    [SpParam(Ignored = true)]
    public IEnumerable<CategorySubCategorySetting> Categories { get; set; } = new List<CategorySubCategorySetting>();

    [SpParam(SqlParamName = "category")]
    public string CategoryXml => Categories.Any() ? Categories.DistinctBy(x => new { x.MainCategoryId, x.SubCategoryId }).ToXML("ROOT").ToString() : string.Empty;

    [SpParam(SqlParamName = "Categorystr")]
    public string MainCategoryIds { get; set; }

    [SpParam(SqlParamName = "SubCategorystr")]
    public string SubCategoryIds { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<BaseModel> Customers { get; set; } = new List<BaseModel>();

    [SpParam(SqlParamName = "ListCustId")]
    public string CustomerXml
    {
        get
        {
            var xml = new StringBuilder();
            if (Customers.Any())
            {
                xml.Append("<ROOT>");
                foreach (var cust in Customers)
                {
                    xml.AppendFormat("<Cust CustId='{0}' Username='{1}' />", cust.Id, cust.Name);
                }
                xml.Append("</ROOT>");
            }

            return xml.ToString();
        }
    }

    [SpParam(SqlParamName = "IsCheckedDefaultComm")]
    public bool IsUseDefaultCommunicationTool { get; set; }

    [SpParam(SqlParamName = "CommunicationId")]
    public string CommunicationToolIds { get; set; }

    public int? NoInquiries { get; set; }

    [SpParam(Ignored = true)]
    [JsonProperty("RelatedCustomerList")]
    public IEnumerable<VerifyRelatedCustomerResult> RelatedCustomers { get; set; } = new List<VerifyRelatedCustomerResult>();

    [SpParam(SqlParamName = "RelatedCustomers")]
    public string RelatedCustomerXml => RelatedCustomers.Any() ? RelatedCustomers.ToXML("ROOT").ToString() : string.Empty;

    public int LanguageId { get; set; }
    public string CountryName { get; set; }

    public int Rating { get; set; }

    public override string GetSettingKey() => "Acc_CRM_NewManualFeedback_FeedbackIns_Multiple";

    public override bool IsValid() => true;
}