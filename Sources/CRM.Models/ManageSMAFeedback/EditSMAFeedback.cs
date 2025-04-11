using System;

namespace CRM.Models.ManageSmaFeedback
{
    public class EditSmaFeedback
    {
        public int CustID { get; set; }

        public DateTime CreatedDate { get; set; }

        public int FunctionID { get; set; }

        public int ReviewStatusID { get; set; }

        public string Comment { get; set; }

        public string Discussion { get; set; }
    }
}
