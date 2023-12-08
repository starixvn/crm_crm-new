namespace CRM.Core.Services
{
    using CRM.Core.Extensions;
    using CRM.Core.Models;
    using Microsoft.AspNetCore.Http;

    public interface ISessionService
    {
        CurrentCustomer CurrentCustomer { get; set; }
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

        public CurrentCustomer CurrentCustomer
        {
            get => session.Get<CurrentCustomer>(CurrentCustomerKey);
            set => session.Set(CurrentCustomerKey, value);
        }

        public void ClearKey(string key)
        {
            session.Remove(key);
        }
    }
}
