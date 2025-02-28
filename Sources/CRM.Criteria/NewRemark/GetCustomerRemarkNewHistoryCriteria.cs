namespace CRM.Criteria.NewRemark;

using Fanex.Data.Repository;

public class GetCustomerRemarkNewHistoryCriteria : CriteriaBase
{
    public int CustID { get; set; }
    public int RemarkID { get; set; }
    public int PageSize { get; set; }
    public int PageIndex { get; set; }
    public int TotalRows { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewHistory";

    public override bool IsValid() => RemarkID > 0;
}