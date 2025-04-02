namespace CRM.Models.Customer;

using System;

public class HeadlineStaffsAndAuthority
{
    public int RowID { get; set; }
    public int HeadlineID { get; set; }
    public int PicID { get; set; }
    public string PicName { get; set; }
    public int PicRoleID { get; set; }
    public string PicRoleName { get; set; }
    public int PicCommunicationID { get; set; }
    public string PicCommunicationName { get; set; }
    public string PicCommunicationValue { get; set; }
    public string AuthorityID { get; set; }
    public string Authority { get; set; }
    public string Remark { get; set; }
    public bool IsSyncFromPicTable { get; set; }
    public DateTime CreatedDate { get; set; }
}