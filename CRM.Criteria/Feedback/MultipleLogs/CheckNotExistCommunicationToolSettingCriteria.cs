namespace CRM.Criteria.Feedback.MultipleLogs
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using CRM.Models;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class CheckNotExistCommunicationToolSettingCriteria : CriteriaBase
    {
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
                    foreach (BaseModel customer in Customers)
                    {
                        xml.AppendFormat("<Cust CustID='{0}' Username='{1}' />", customer.Id, customer.Name);
                    }
                    xml.Append("</ROOT>");
                }

                return xml.ToString();
            }
        }

        [SpParam(SqlParamName = "Categorystr")]
        public string MainCategoryIds { get; set; }

        [SpParam(SqlParamName = "SubCategorystr")]
        public string SubCategoryIds { get; set; }

        public override string GetSettingKey() => "Acc_CRM_GuestFeedbackCheck_Multiple";

        public override bool IsValid() => true;
    }
}