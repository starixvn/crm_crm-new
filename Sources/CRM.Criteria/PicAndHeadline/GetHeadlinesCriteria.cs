namespace CRM.Criteria.PicAndHeadline
{
    using Fanex.Data.Repository;

    public class GetHeadlinesCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public override string GetSettingKey() => "Acc_CRM_HeadlineSel";

        public override bool IsValid() => true;
    }
}