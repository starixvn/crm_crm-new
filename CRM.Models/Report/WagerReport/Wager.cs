namespace CRM.Models.Report.WagerReport
{
    using System;

    [Serializable]
    public class Wager
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Amount { get; set; }
    }
}
