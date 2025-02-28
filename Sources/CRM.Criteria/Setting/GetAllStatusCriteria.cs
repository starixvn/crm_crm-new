namespace CRM.Criteria.Setting;

using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetAllStatusCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "type")]
    public byte ViewType { get; set; }

    public byte UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_StatusList";

    public override bool IsValid() => true;
}