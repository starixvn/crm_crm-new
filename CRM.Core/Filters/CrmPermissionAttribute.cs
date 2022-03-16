namespace CRM.Core.Filters
{
    using System;
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using CRM.Resources;
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

        public CrmPermissionAttribute() : this(null, null, null)
        {
        }

        public CrmPermissionAttribute(IUserService userService, INapSettings napSettings, INapSession napSession)
        {
            this.userService = userService ?? new UserService();
            this.napSettings = napSettings ?? NapClientManager.NapSettings;
            this.napSession = napSession ?? NapClientManager.NapSession;
        }

        public string FunctionKey { get; set; }
        public Constant.Policy Policy { get; set; }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (context?.HttpContext == null || napSession.UserId <= 0)
            {
                return;
            }

            int policy = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, FunctionKey);
            bool isAjaxRequest = IsAjaxRequest(context.HttpContext.Request);

            if (policy < (int)Policy)
            {
                if (isAjaxRequest)
                {
                    var commandResult = new CommandResult
                    {
                        Code = StatusCodes.Status405MethodNotAllowed,
                        Message = ViewResources.Forbidden_Permission
                    };
                    context.Result = new JsonResult(commandResult);
                }
                else
                {
                    context.Result = new RedirectToActionResult("405", "error", null);
                }
            }
        }

        private static bool IsAjaxRequest(HttpRequest request)
           => string.Equals(request.Query["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal) ||
              string.Equals(request.Headers["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal);
    }
}