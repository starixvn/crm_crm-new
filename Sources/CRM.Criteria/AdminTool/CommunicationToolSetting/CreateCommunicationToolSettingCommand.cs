namespace CRM.Criteria.AdminTool.CommunicationToolSetting;

using System.Collections.Generic;
using System.Text;
using CRM.Models;
using Fanex.Data;

public class CreateCommunicationToolSettingCommand : BaseNonQueryCommand
{
    public int UserId { get; set; }
    public string IP { get; set; }

    [SpParam(SqlParamName = "Category")]
    public string CategoryIds { get; set; }

    [SpParam(SqlParamName = "SubCategory")]
    public string SubCategoryIds { get; set; }

    [SpParam(SqlParamName = "Comm")]
    public string CommunicationIds { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<BaseModel> Customers { get; set; } = new List<BaseModel>();

    [SpParam(SqlParamName = "ListCustId")]
    public string CustomerXml
    {
        get
        {
            var xml = new StringBuilder("<ROOT>");
            foreach (var cust in Customers)
            {
                xml.AppendFormat("<Cust CustID='{0}' Username='{1}' />", cust.Id, cust.Name);
            }
            xml.Append("</ROOT>");
            return xml.ToString();
        }
    }

    public override string GetSettingKey() => "Acc_CRM_DefaultCommToolIns";

    public override bool IsValid() => true;
}