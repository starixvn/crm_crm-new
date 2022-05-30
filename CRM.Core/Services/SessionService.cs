namespace CRM.Core.Services
{
    using CRM.Core.Extensions;
    using CRM.Core.Models;
    using Microsoft.AspNetCore.Http;

    public interface ISessionService
    {
        CustomerSession CustomerInfo { get; set; }
        CurrentCustomer CurrentCustomer { get; set; }
        void ClearKey(string key);
    }

    public class SessionService : ISessionService
    {
        private readonly ISession session;
        private const string CustomerInfoKey = "CustomerInfo";
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
            get => session.Get<CustomerSession>(CustomerInfoKey);
            set => session.Set(CustomerInfoKey, value);
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
