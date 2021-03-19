namespace CRM.Models.PicAndHeadline
{
    using System.Collections.Generic;

    public class PICAssignmentInfoGroup
    {
        public int HeadlineID { get; set; }

        public string HeadlineName { get; set; }

        public string HeadlineType { get; set; }

        public string DefaultPIC { get; set; }

        public IList<PICAssignmentInfo> PICAssignmentInfos { get; set; }
    }
}
