namespace CRM.Models.Dashboard
{
    public class CustomerInfoVerify
    {
        public string Email { get; set; }

        public string Passport { get; set; }

        public string SecretCode { get; set; }

        public string BirthDay { get; set; }

        public bool IsVerifyEmail { get; set; }

        public bool IsVerifyPassport { get; set; }

        public bool IsVerifyBirthday { get; set; }

        public bool IsVerifySecretCode { get; set; }

        public bool IsVerifyBetCredit { get; set; }

        public bool IsVerifyGivenCredit { get; set; }

        public int RoleId { get; set; }

        public int SiteId { get; set; }

        public bool IsCredit { get; set; }

        public decimal BetCredit { get; set; }

        public decimal GivenCredit { get; set; }
    }
}
