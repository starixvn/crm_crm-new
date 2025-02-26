namespace CRM.Models.Customer
{
    public class UserInfo
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int SiteId { get; set; }
        public string SiteName { get; set; }
        public int Level { get; set; }
        public short Status { get; set; }
    }
}
