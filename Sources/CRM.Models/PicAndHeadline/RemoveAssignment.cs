namespace CRM.Models.PicAndHeadline;

using System;
using Extensions.XML;

[Serializable]
[XMLName("RemovedPIC")]
public class RemoveAssignment
{
    [XMLName("HeadlineID")]
    public int HeadlineId { get; set; }

    [XMLName("CustID")]
    public int CustId { get; set; }

    [XMLName("PicID")]
    public int PicId { get; set; }
}