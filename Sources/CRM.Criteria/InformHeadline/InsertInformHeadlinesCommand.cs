namespace CRM.Criteria.InformHeadline
{
    using CRM.Core.Models;
    using CRM.Models.InformHeadline;
    using Fanex.Data;
    using System.Collections.Generic;

    public class InsertInformHeadlinesCommand : BaseNonQueryCommand
    {
        public int TitleId { get; set; }

        public string Title { get; set; }

        [SpParam(SqlParamName = "Currency")]
        public string Currencies { get; set; }

        [SpParam(SqlParamName = "Level")]
        public string Levels { get; set; }

        [SpParam(SqlParamName = "Site")]
        public string Sites { get; set; }

        public byte TypeAccount { get; set; }

        public int IsVip { get; set; }

        [SpParam(SqlParamName = "ExcludeIgnored")]
        public bool ExcludeIgnoredAccounts { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<EditInform> Informs { get; set; } = new List<EditInform>();

        public override string GetSettingKey() => "Acc_CRM_InformHeadlineIns";

        public override bool IsValid() => true;
    }
}
