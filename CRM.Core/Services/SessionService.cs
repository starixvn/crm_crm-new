namespace CRM.Core.Services
{
    using System.Collections.Generic;
    using CRM.Core.Extensions;
    using CRM.Core.Models;
    using Fanex.NAP.Client.Models;
    using Microsoft.AspNetCore.Http;

    public interface ISessionService
    {
        IEnumerable<MenuItem> MenuItems { get; set; }
        CurrentCustomer CurrentCustomer { get; set; }
        void ClearKey(string key);
    }

    public class SessionService : ISessionService
    {
        private readonly ISession session;
        private const string MenuItemsKey = "MenuItems";
        private const string CurrentCustomerKey = "CurrentCustomer";


        public SessionService(ISession session)
        {
            this.session = session;
        }

        public SessionService(IHttpContextAccessor accessor)
        {
            session = accessor.HttpContext.Session;
        }

        public IEnumerable<MenuItem> MenuItems
        {
            get => session.Get<IEnumerable<MenuItem>>(MenuItemsKey);
            set => session.Set(MenuItemsKey, value);
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
