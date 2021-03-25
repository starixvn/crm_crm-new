namespace CRM.Models.PicAndHeadline
{
    using System.Collections.Generic;
    public class GroupAssignmentCommunication
    {
        public IList<AssignmentCommunication> ListComm { get; set; }
        public int PicId { get; set; }
        public string PicName { get; set; }
    }
}
