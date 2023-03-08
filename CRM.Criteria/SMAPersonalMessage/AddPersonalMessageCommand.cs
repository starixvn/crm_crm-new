namespace CRM.Criteria.SMAPersonalMessage
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Models.SMAPersonalMessage;
    using Fanex.Data;

    public class AddPersonalMessageCommand : BaseNonQueryCommand
    {
        public string Title { get; set; }
        public string Usernames { get; set; }
        public IEnumerable<SMATemplate> Contents { get; set; } = new List<SMATemplate>();
        [SpParam(Ignored = true)]
        public string Content => Contents.Any() ? Contents.ToXML("Contents").ToString() : string.Empty;
        public override string GetSettingKey() => "";

        public override bool IsValid() => !string.IsNullOrEmpty(Content) && !string.IsNullOrEmpty(Usernames);
    }
}
