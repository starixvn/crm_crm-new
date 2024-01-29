namespace CRM.Criteria.Customer
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class CheckCustomerExistsOnCrmCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_CheckCustomerExistsOnCRM";

        public override bool IsValid() => CustomerId > 0;
    }
}
