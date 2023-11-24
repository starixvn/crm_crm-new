namespace CRM.Core.Criteria
{
    using Fanex.Data.Repository;

    public abstract class SiteDbBaseCriteria : ICriteria
    {
        public int SiteDBGroupID { get; set; }

        public abstract string GetSettingKey();

        public abstract bool IsValid();

        public bool IsInvalid()
        {
            return !IsValid();
        }
    }
}
