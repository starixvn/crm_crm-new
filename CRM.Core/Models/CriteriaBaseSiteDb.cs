
namespace CRM.Core.Models
{

    public interface CriteriaBaseSiteDb
    {
        string GetSettingKey();
        bool IsValid();
        int SiteDBGroupID { get; set; }
    }
}