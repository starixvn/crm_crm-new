namespace CRM.Criteria.PicAndHeadline;

using Fanex.Data.Repository;

public class GetAssignmentCriteria : CriteriaBase
{
    public string Site { get; set; }

    public string Currency { get; set; }

    public string Status { get; set; }

    public int HeadlineType { get; set; }

    public string PicName { get; set; }

    public string DirectAccount { get; set; }

    public string GroupHeadline { get; set; }

    public string Position { get; set; }

    public bool ExcludeAssignedAcc { get; set; }

    public bool ExcludeIgnoredAcc { get; set; }

    public bool ExcludeIsTest { get; set; }

    public int TotalUnassigned { get; set; }

    public int? PageSize { get; set; }

    public int? PageIndex { get; set; }

    public int TotalRows { get; set; }

    public override string GetSettingKey() => "Acc_CRM_PICAssignmentSel";

    public override bool IsValid() => true;
}