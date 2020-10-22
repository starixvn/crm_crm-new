namespace CRM.Core.Models
{
    using System;

    public class ExternalRedirectMapping
    {
        public string Domain { get; set; }
        public Uri DomainUri => new Uri(Domain);
        public bool IncludePort { get; set; }
        public string ExternalHomePageUrl { get; set; }
        public string ExternalSignInUrl { get; set; }
    }
}