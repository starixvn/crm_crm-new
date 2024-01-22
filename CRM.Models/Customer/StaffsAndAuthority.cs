namespace CRM.Models.Customer
{
    public class StaffsAndAuthority
    {
        public int RowID { get; set; }
        public int HeadlineID { get; set; }
        public int PicID { get; set; }
        public string PicName { get; set; }
        public int PicRoleID { get; set; }
        public int PicCommuniationID { get; set; }
        public string PicCommunicationValue { get; set; }
        public string AuthorityID { get; set; }
        public string Authority { get; set; }
        public string Remark { get; set; }
        public bool IsSyncFromPicTable { get; set; }
    }
}
