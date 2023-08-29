namespace CRM.Core.Filters
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.AspNetCore.Mvc;
    using Fanex.Logging;
    using Fanex.NAP.Core.Business;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class CrmMultiplePermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IUserService userService;
        private readonly INapSettings napSettings;
        private readonly INapSession napSession;
        private readonly ILogger logger;

        public CrmMultiplePermissionAttribute() : this(null, null, null, null)
        {
        }

        public CrmMultiplePermissionAttribute(IUserService userService, INapSettings napSettings, INapSession napSession, ILogger logger)
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
                if (context.HttpContext == null)
                {
                    context.Result = new RedirectToActionResult("SignIn", "Auth", null);
                }

                if (napSession == null || napSession?.UserId <= 0 || string.IsNullOrEmpty(napSession?.UserName))
                {
                    CloseConnection(context);
                }

                await CheckUserPermissionAsync(context);
            }
            catch (Exception exception)
            {
                var logMessage = new LogMessage(exception.Message)
                       .AddSection("Exception Info Authorize", CommonInfoGetters.GetExceptionInfo(exception))
                       .ToString();
                logger.Error(logMessage);
            }
        }

        private async Task CheckUserPermissionAsync(AuthorizationFilterContext context)
        {
            var attributes = context.ActionDescriptor.FilterDescriptors.Where(x => x.Filter is CrmMultiplePermissionAttribute)
                    .Select(x => x.Filter as CrmMultiplePermissionAttribute).ToList();
            bool hasPermission = false;

            foreach (var attribute in attributes)
            {
                int policy = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, attribute.FunctionKey);

                if (policy >= (int)Policy)
                {
                    hasPermission = true;
                    break;
                }
            }

            if (!hasPermission)
            {
                bool isAjaxRequest = IsAjaxRequest(context.HttpContext.Request);
                if (isAjaxRequest)
                {
                    context.HttpContext.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
                }

                else
                {
                    context.Result = new RedirectToActionResult("405", "error", null);
                }
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
