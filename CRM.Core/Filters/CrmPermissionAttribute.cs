namespace CRM.Core.Filters
{
    using System;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Resources;
    using Fanex.Logging;
    using Fanex.Logging.Extensions.Database;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class CrmPermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IUserService userService;
        private readonly INapSettings napSettings;
        private readonly INapSession napSession;
        private readonly ILogger logger;

        public CrmPermissionAttribute() : this(null, null, null, null)
        {
        }

        public CrmPermissionAttribute(IUserService userService, INapSettings napSettings, INapSession napSession, ILogger logger)
        {
            this.userService = userService ?? new UserService();
            this.napSettings = napSettings ?? NapClientManager.NapSettings;
            this.napSession = napSession ?? NapClientManager.NapSession;
            this.logger = logger ?? new Logger();
        }

        public string FunctionKey { get; set; }
        public Constant.Policy Policy { get; set; }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            try
            {
                if (napSession == null || napSession?.UserId <= 0 || string.IsNullOrEmpty(napSession?.UserName))
                {
                    CloseConnection(context);
                }

                int policy = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, FunctionKey);
                bool isAjaxRequest = IsAjaxRequest(context.HttpContext.Request);

                if (policy < (int)Policy)
                {
                    if (isAjaxRequest)
                    {
                        context.HttpContext.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
                        await context.HttpContext.Response.WriteAsync(ViewResources.Forbidden_Permission);
                    }

                    else
                    {
                        context.Result = new RedirectToActionResult("405", "error", null);
                    }
                }
            }
            catch (Exception exception)
            {
                var logMessage = new LogMessage(exception.Message)
                       .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception))
                       .ToString();
                logger.Error(logMessage);
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