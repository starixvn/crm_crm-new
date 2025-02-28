namespace CRM.Criteria.AdminTool.CommunicationToolSetting;

using Fanex.Data;

public class GetCommunicationToolSettingCriteria : BaseSitePermisionCriteria
{
    public string Username { get; set; }

    [SpParam(SqlParamName = "Category")]
    public string CategoryIds { get; set; }

    [SpParam(SqlParamName = "SubCategory")]
    public string SubCategoryIds { get; set; }

    [SpParam(SqlParamName = "IsDisableCat")]
    public bool IsDisableCategorySubCategory { get; set; }

    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalRows { get; set; }

    public override string GetSettingKey() => "Acc_CRM_DefaultCommToolSearch";

    public override bool IsValid() => true;
}