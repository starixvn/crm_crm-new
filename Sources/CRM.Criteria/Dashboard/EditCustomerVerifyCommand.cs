namespace CRM.Criteria.Dashboard
{
    using CRM.Core.Models;
    using Fanex.Data;

    public class EditCustomerVerifyCommand : BaseNonQueryCommand
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        public bool IsVerifyEmail { get; set; }

        public bool IsVerifyPassport { get; set; }

        public bool IsVerifyBirthday { get; set; }

        public bool IsVerifySecretCode { get; set; }

        public bool IsVerifyBetCredit { get; set; }

        public bool IsVerifyGivenCredit { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerInformationVerify";

        public override bool IsValid() => true;
    }
}
