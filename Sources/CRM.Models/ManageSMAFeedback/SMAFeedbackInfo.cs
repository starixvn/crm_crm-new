using System;

namespace CRM.Models.ManageSmaFeedback
{
    public class SmaFeedbackInfo
    {
        public int CustID { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Username { get; set; }

        public string Level { get; set; }

        public string Site { get; set; }

        public int FuncID { get; set; }

        public string FuncName { get; set; }

        public int? ReviewStatusID { get; set; }

        public string ReviewStatus { get; set; }

        public string Comment { get; set; }

        public string Discussion { get; set; }
    }
}
