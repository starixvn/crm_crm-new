namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllStationCriteria : CriteriaBase
    {
        public override string GetSettingKey()
        {
            return "Acc_CRM_StationList";
        }

        public override bool IsValid() => true;
    }
}
