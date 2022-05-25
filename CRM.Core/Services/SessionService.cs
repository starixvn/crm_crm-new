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
        IEnumerable<MenuItem> Menus { get; set; }
        void ClearKey(string key);
    }

    public class SessionService : ISessionService
    {
        private readonly ISession session;
        private const string CurrentCustomerKey = "CurrentCustomer";
        private const string CurrentUserMenuKey = "CurrentUserMenu";

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

        public IEnumerable<MenuItem> Menus
        {
            get => session.Get<IEnumerable<MenuItem>>(CurrentUserMenuKey);
            set => session.Set(CurrentUserMenuKey, value);
        }

        public void ClearKey(string key)
        {
            session.Remove(key);
        }
    }
}
