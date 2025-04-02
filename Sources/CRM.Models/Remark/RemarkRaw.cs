namespace CRM.Models.Remark;

public class RemarkRaw
{
    public int CustId { get; set; }

    public string Remark { get; set; } = string.Empty;

    public bool IsSpecial { get; set; }
}