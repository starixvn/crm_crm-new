namespace CRM.Criteria.Customer
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetOtherAccountCommunicationInfoCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewLeftPanel_GetOtherAccountCommunicationInfo";

        public override bool IsValid() => true;
    }
}
