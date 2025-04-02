namespace CRM.Criteria.InformHeadline;

using Models;

public class EditInformStatusCommand : BaseNonQueryCommand
{
    public int TitleId { get; set; }

    public bool StatusType { get; set; }

    public int UserId { get; set; }

    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_InformTitleStatusUpd";

    public override bool IsValid() => TitleId > 0;
}