namespace CRM.Criteria.AdminTool.CommunicationToolSetting;

using Fanex.Data;
using Models;

public class EditCommunicationToolSettingCommand : BaseNonQueryCommand
{
    public int UserId { get; set; }
    public string IP { get; set; }

    public int DefaultCommId { get; set; }

    [SpParam(SqlParamName = "Category")]
    public string CategoryIds { get; set; }

    [SpParam(SqlParamName = "SubCategory")]
    public string SubCategoryIds { get; set; }

    [SpParam(SqlParamName = "Comm")]
    public string CommunicationIds { get; set; }

    public override string GetSettingKey() => "Acc_CRM_DefaultCommToolUpd";

    public override bool IsValid() => true;
}