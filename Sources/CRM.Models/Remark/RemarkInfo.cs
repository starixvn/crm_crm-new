namespace CRM.Models.Remark;

using System.Collections.Generic;

public class RemarkInfo
{
    public int CustId { get; set; }

    public IEnumerable<string> SpecialRemarks { get; set; }

    public IEnumerable<string> NormalRemarks { get; set; }
}