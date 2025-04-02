namespace CRM.Services;

using Extensions;
using Microsoft.AspNetCore.Http;
using Models;

public interface ISessionService
{
    CurrentCustomer CurrentCustomer { get; set; }
    void ClearKey(string key);
}

public class SessionService(ISession session) : ISessionService
{
    private const string CurrentCustomerKey = "CurrentCustomer";


    public SessionService(IHttpContextAccessor accessor) : this(accessor.HttpContext.Session)
    {
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