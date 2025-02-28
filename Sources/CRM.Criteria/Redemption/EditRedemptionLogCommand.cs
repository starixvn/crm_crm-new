namespace CRM.Criteria.Redemption;

using System;
using Models;

public class EditRedemptionLogCommand : BaseNonQueryCommand
{
    public int Id { get; set; }

    public string Subject { get; set; }

    public decimal Amount { get; set; }

    public string DoneBy { get; set; }

    public DateTime ClaimTime { get; set; }

    public string Remark { get; set; }

    public int StatusId { get; set; }

    public int CurrencyId { get; set; }

    public int UserId { get; set; }

    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_RedemptionUpd";

    public override bool IsValid() => true;
}