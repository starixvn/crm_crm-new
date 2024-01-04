namespace CRM.Criteria.Customer
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetHeadlineStaffInfoCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "HeadlineID")]
        public int HeadlineID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewLeftPanel_GetHeadlineStaffInfo";

        public override bool IsValid() => HeadlineID > 0;
    }
}
