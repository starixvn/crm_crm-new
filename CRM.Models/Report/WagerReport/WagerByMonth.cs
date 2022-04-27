namespace CRM.Models.Report.WagerReport
{
    using System;
    using System.Collections.Generic;

    [Serializable]
    public class WagerByMonth
    {
        public string Month { get; set; }

        public IList<Wager> Wagers { get; set; }

        public int Total { get; set; }
    }
}
