namespace CRM.Models.Common
{
    public class LogSPInfo
    {
        public int UserID { get; set; }

        public int CustID { get; set; }

        public string IP { get; set; }

        public int ActionID { get; set; }

        public string OldValues { get; set; }

        public string NewValues { get; set; }
    }
}
