namespace CRM.Criteria.Remark;

using System.Collections.Generic;
using Fanex.Data;
using Models;

public class EditRemarkCommand : BaseNonQueryCommand
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public string Remarks { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<string> SpecialRemarks { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<string> NormalRemarks { get; set; }

    public int UserId { get; set; }

    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerRemarkUpd";

    public override bool IsValid() => true;
}