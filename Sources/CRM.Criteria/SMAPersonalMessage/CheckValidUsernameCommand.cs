namespace CRM.Criteria.SMAPersonalMessage;

using Models;

public class CheckValidUsernameCommand : BaseNonQueryCommand
{
    public string UserName { get; set; }

    public string CustList { get; set; }

    public override string GetSettingKey() => "Acc_CRM_PersonalMessageCheck";

    public override bool IsValid() => !string.IsNullOrEmpty(UserName);
}