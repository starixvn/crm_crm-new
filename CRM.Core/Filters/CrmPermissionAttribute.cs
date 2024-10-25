namespace CRM.Core.Filters
{
    using System;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.DependencyInjection;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class CrmPermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        #pragma warning disable S1450
        private IPermissionService permissionService;
        #pragma warning restore S1450
        private readonly INapSession napSession;
        private readonly ILogger logger;

        public CrmPermissionAttribute() : this(null, null)
        {
        }

        public CrmPermissionAttribute(INapSession napSession, ILogger logger)
        {
            this.napSession = napSession ?? NapClientManager.NapSession;
            this.logger = logger ?? new Logger();
            PermissionCache = true;
        }

        public string FunctionKey { get; set; }
        public Policy Policy { get; set; }
        public bool PermissionCache { get; set; }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            try
            {
                if (context.HttpContext == null)
                {
                    context.Result = new RedirectToActionResult("SignIn", "Auth", null);
                }

                if (napSession == null || napSession?.UserId <= 0 || string.IsNullOrEmpty(napSession?.UserName))
                {
                    CloseConnection(context);
                }
                else
                {
                    await HandleResponseFilter(context);
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

        private async Task HandleResponseFilter(AuthorizationFilterContext context)
        {
            permissionService = context.HttpContext.RequestServices.GetRequiredService<IPermissionService>();
            bool hasPermission = false;
            if (!string.IsNullOrWhiteSpace(FunctionKey))
            {
                var functionKeys = FunctionKey.Split(",");
                foreach (var functionKey in functionKeys)
                {
                    int policy = await permissionService.GetPolicyPermissionAsync(functionKey);
                    if (policy >= (int)Policy)
                    {
                        hasPermission = true;
#pragma warning disable S1227
                        break;
#pragma warning restore S1227
                    }
                }
            }

            if (!hasPermission)
            {
                context.Result = new ForbidResult();
            }
        }

        private static bool IsAjaxRequest(HttpRequest request)
           => string.Equals(request.Query["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal) ||
              string.Equals(request.Headers["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal);
    }
}