namespace CRM.Letstalk.Core.Models
{
    using System.Collections.Generic;
    using System.Linq;

    public class TelegramAppSettings
    {
        public string Domain { get; set; }
        public string AppCredentialId { get; set; }

        public string AppCredentialPassword { get; set; }

        public string Secret { get; set; }

        public string AllowedHosts { get; set; }

        public string EnableChannelIds { get; set; }

        public IEnumerable<byte> EnableChannels => !string.IsNullOrWhiteSpace(EnableChannelIds)
            ? EnableChannelIds.Split(',').Select(x => byte.Parse(x)) : new List<byte>();
    }
}
