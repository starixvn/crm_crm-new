
namespace CRM.Core.Models
{
    using Fanex.Data.Repository;

    public class GetSiteDbConfigCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_SiteDBConfigSel";

        public override bool IsValid() => true;
    }
}