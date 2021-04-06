namespace CRM.Models.PicAndHeadline
{
    public class AssignmentCommunication
    {
        public int PicId { get; set; }
        public string Username { get; set; }
        public string CommunicationTool { get; set; }
        public string CommunicationValue { get; set; }
        public int RoleId { get; set; }
        public short Order { get; set; }
    }
}
