namespace CRM.Models.Redemption
{
    using System;

    public class CustomerLogInfo
    {
        public int Id { get; set; }

        public string Subject { get; set; }

        public DateTime ClaimTime { get; set; }

        public string Status { get; set; }

        public decimal Amount { get; set; }

        public string Currency { get; set; }

        public string UserName { get; set; }

        public string DoneBy { get; set; }
    }
}
