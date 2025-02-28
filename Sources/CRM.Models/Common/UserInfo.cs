namespace CRM.Models.Common;

public class UserInfo : BaseModel
{
    public int RoleId { get; set; }

    public string Password { get; set; }
}