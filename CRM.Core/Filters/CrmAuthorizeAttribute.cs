namespace CRM.Core.Filters
{
    using System;
    using CRM.Core.Services;
    using CRM.Resources;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class CrmAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        private readonly INapSession napSession;
        private readonly ICRMLogService logService;

        public CrmAuthorizeAttribute() : this(null, null)
        {
        }

        public CrmAuthorizeAttribute(INapSession napSession, ICRMLogService logService)
        {
            this.napSession = napSession ?? NapClientManager.NapSession;
            this.logService = logService;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context?.HttpContext == null)
            {
                return;
            }

            if (napSession == null || napSession.UserId <= 0 || string.IsNullOrEmpty(napSession.UserName))
            {
                logService.LogInformation(String.Format("IsAjaxRequest: {0}", IsAjaxRequest(context.HttpContext.Request)));
                CloseConnection(context);
            }
        }

        private static void CloseConnection(AuthorizationFilterContext context)
        {
            if (IsAjaxRequest(context.HttpContext.Request))
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
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
}