namespace CRM.Criteria.Customer
{
    using CRM.Core.Models;

    public class GetSiteTypeByCustIdCriteria : BaseNonQueryCommand
    {
        public int CustId { get; set; }
        public int ErrCode { get; set; }
        public string ErrMsg { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerCheckSiteType";

        public override bool IsValid() => true;
    }
}