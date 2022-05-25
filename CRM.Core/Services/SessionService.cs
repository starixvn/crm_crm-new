namespace CRM.Core.Services
{
    using System.Collections.Generic;
    using CRM.Core.Extensions;
    using CRM.Core.Models;
    using Fanex.NAP.Client.Models;
    using Microsoft.AspNetCore.Http;

    public interface ISessionService
    {
        CustomerSession CustomerInfo { get; set; }
        void ClearKey(string key);
    }

    public class SessionService : ISessionService
    {
        private readonly ISession session;
        private const string CurrentCustomerKey = "CurrentCustomer";

        public SessionService(ISession session)
        {
            this.session = session;
        }

        public SessionService(IHttpContextAccessor accessor)
        {
            session = accessor.HttpContext.Session;
        }

        public CustomerSession CustomerInfo
        {
            get => session.Get<CustomerSession>(CurrentCustomerKey);
            set => session.Set(CurrentCustomerKey, value);
        }
        
        public void ClearKey(string key)
        {
            session.Remove(key);
        }
    }
}
