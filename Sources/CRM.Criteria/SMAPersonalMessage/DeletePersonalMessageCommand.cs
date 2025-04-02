namespace CRM.Criteria.SMAPersonalMessage;

using Models;

public class DeletePersonalMessageCommand : BaseNonQueryCommand
{
    public int MessageID { get; set; }
    public string IP { get; set; }
    public override string GetSettingKey() => "Acc_CRM_PersonalMessageDel";

    public override bool IsValid() => MessageID > 0;
}