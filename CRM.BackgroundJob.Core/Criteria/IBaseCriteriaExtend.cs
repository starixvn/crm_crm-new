namespace CRM.BackgroundJob.Core.Criteria
{
    public interface IBaseCriteriaExtend
    {
        string GetSettingKey();

        bool IsValid();

        int SiteDBGroupID { get; set; }
    }
}