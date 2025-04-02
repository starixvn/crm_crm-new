namespace CRM.Filters;

using System;
using Fanex.Logging;
using Fanex.Logging.Extensions;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
public class CrmAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
{
#pragma warning disable S1450
    private INapSession napSession;
    private ILogger logger;
#pragma warning restore S1450
    public CrmAuthorizeAttribute()
    {
    }

    public CrmAuthorizeAttribute(INapSession napSession, ILogger logger)
    {
        this.napSession = napSession;
        this.logger = logger;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        napSession ??= context.HttpContext.RequestServices.GetRequiredService<INapSession>();
        logger ??= context.HttpContext.RequestServices.GetRequiredService<ILogger>();

        try
        {
            if (context.HttpContext == null)
            {
                context.Result = new RedirectToActionResult("SignIn", "Auth", null);
            }

            if (napSession == null || napSession?.UserId <= 0 || string.IsNullOrEmpty(napSession.UserName))
            {
                CloseConnection(context);
            }
        }
        catch (Exception exception)
        {
            var logMessage = new LogMessage(exception.Message)
                .AddSection("Exception Info Authorize", CommonInfoGetters.GetExceptionInfo(exception))
                .ToString();
            logger.Error(logMessage);
        }
    }

    private static void CloseConnection(AuthorizationFilterContext context)
    {
        if (IsAjaxRequest(context.HttpContext.Request))
        {
            context.Result = new UnauthorizedResult();
        }
        else
        {
            context.Result = new RedirectToActionResult("SignIn", "Auth", null);
        }
    }

    private static bool IsAjaxRequest(HttpRequest request)
        => string.Equals(request.Query["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal) ||
           string.Equals(request.Headers["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal);
}