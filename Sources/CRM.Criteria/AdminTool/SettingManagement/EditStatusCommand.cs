namespace CRM.Criteria.AdminTool.SettingManagement;

using Constants;
using Models;

public class EditStatusCommand : BaseNonQueryCommand
{
    public byte UserRole { get; } = Constants.UserRole;
    public int UserId { get; set; }
    public int SettingId { get; set; }
    public bool IsActive { get; set; }
    public string IP { get; set; }
    public override string GetSettingKey() => "Acc_CRM_SettingDel";

    public override bool IsValid() => true;
}