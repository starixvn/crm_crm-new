using System;

namespace CRM.Models.ManageSmaFeedback
{
    public class EditSmaFeedback
    {
        public int CustID { get; set; }

        public DateTime CreatedDate { get; set; }

        public int FunctionID { get; set; }

        public string ReviewStatus { get; set; }

        public string Discussion { get; set; }
    }
}
