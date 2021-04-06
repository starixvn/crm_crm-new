namespace CRM.Models.PicAndHeadline
{
    using System.Collections.Generic;
    public class GroupAssignmentCommunication
    {
        public IList<AssignmentCommunication> ListComm { get; set; }
        public int PicId { get; set; }
        public int Order { get; set; }
        public int RoleId { get; set; }
        public string PicName { get; set; }
    }
}
