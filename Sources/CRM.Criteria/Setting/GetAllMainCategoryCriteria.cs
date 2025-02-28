namespace CRM.Criteria.Setting;

using Constants;
using Fanex.Data.Repository;

public class GetAllMainCategoryCriteria : CriteriaBase
{
    public byte UserRole { get; } = Constants.UserRole;

    public byte Active { get; set; }

    public override string GetSettingKey() => "Acc_CRM_MainCategoryList";

    public override bool IsValid() => true;
}