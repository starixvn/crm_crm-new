namespace CRM.Criteria.SMAPersonalMessage
{
    using Fanex.Data.Repository;

    public class GetPersonalMessageCriteria : CriteriaBase
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int TotalRows { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PersonalMessageSel";

        public override bool IsValid() => true;
    }
}
