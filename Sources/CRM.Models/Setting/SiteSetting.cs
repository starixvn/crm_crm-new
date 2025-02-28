namespace CRM.Models.Setting;

public class SiteSetting : BaseModel
{
    public string AliasName { get; set; }

    public bool IsActive { get; set; }
}