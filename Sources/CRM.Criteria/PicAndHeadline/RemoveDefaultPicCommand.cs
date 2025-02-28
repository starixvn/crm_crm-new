namespace CRM.Criteria.PicAndHeadline;

using Models;

public class RemoveDefaultPicCommand : BaseNonQueryCommand
{
    public int HeadlineId { get; set; }

    public int UserId { get; set; }

    public string LoginIP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_PicDefaultDel";

    public override bool IsValid() => HeadlineId >= 0;
}