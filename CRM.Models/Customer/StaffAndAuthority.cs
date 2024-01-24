namespace CRM.Models.Customer
{
    public class StaffAndAuthority
    {
        public int RowID { get; set; }
        public int HeadlineID { get; set; }
        public int PicID { get; set; }
        public string PicName { get; set; }
        public int PicRoleID { get; set; }
        public int PicCommunicationID { get; set; }
        public string PicCommunicationValue { get; set; }
        public string AuthorityID { get; set; }
        public string Remark { get; set; }
        public int IsSyncFromPicTable { get; set; }
    }
}
