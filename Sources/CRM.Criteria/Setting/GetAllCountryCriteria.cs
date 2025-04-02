namespace CRM.Criteria.Setting;

using Fanex.Data.Repository;

public class GetAllCountryCriteria : CriteriaBase
{
    public byte Active { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CountryList";

    public override bool IsValid() => true;
}