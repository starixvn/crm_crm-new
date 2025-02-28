using System;

namespace CRM.Models.SMAPersonalMessage;

public class SMAMessageInfor
{
    public int MessageId { get; set; }
    public DateTime CreateTime { get; set; }
    public string CreatorName { get; set; }
    public string Title { get; set; }
    public string TargetNames { get; set; }
    public string Content_en { get; set; }
    public string Content_cs { get; set; }
    public string Content_ch { get; set; }
    public string Content_th { get; set; }
    public string Content_vn { get; set; }
}