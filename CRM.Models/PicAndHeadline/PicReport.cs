namespace CRM.Models.PicAndHeadline
{
    using System.Collections.Generic;

    public class PicReport
    {
        public IList<PicInfo> DataList { get; set; }

        public int Total { get; set; }
    }
}
