namespace CRM.Core.Filters
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Models.ValueObject;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.DependencyInjection;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class CrmPermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private IMemoryCache cache;
        private int cacheDuration;
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
            PermissionCache = true;
        }

        public string FunctionKey { get; set; }
        public Policy Policy { get; set; }
        public bool PermissionCache { get; set; }

        public int CacheDuration
        {
            get => cacheDuration == 0 ? napSettings.CacheDuration : cacheDuration;
            set => cacheDuration = value;
        }

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
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }
            else
            {
                context.Result = new RedirectToActionResult("SignIn", "Auth", null);
            }
        }

        private async Task HandleResponseFilter(AuthorizationFilterContext context)
        {
            cache = context.HttpContext.RequestServices.GetRequiredService<IMemoryCache>();
            bool hasPermission = false;
            if (!string.IsNullOrWhiteSpace(FunctionKey))
            {
                var functionKeys = FunctionKey.Split(",");
                foreach (var functionKey in functionKeys)
                {
                    int policy = await GetPermissionPolicy(functionKey);

                    if (policy >= (int)Policy)
                    {
                        hasPermission = true;
                        break;
                    }
                }
            }

            if (!hasPermission)
            {
                bool isAjaxRequest = IsAjaxRequest(context.HttpContext.Request);
                if (isAjaxRequest)
                {
                    context.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.HttpContext.Response.CompleteAsync();
                }
                else
                {
                    context.Result = new ForbidResult();
                }
            }
        }

        private async Task<int> GetPermissionPolicy(string functionKey)
        {
            int policy;
            IEnumerable<FunctionPolicy> permissions;
            if (PermissionCache)
            {
                var cacheKey = string.Format("{0}_{1}_{2}_{3}", "CRMFunction", napSession.UserId, napSession.OnUserId, napSettings.SiteId);
                permissions = cache.Get<IEnumerable<FunctionPolicy>>(cacheKey);

                if (permissions == null)
                {
                    permissions = await userService.GetPermissionsAsync(napSession.UserId, napSettings.SiteId, string.Empty);
                    cache.Set(cacheKey, permissions, new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTimeOffset.Now.AddSeconds(CacheDuration)
                    });
                }

                var functioPolicy = permissions.FirstOrDefault(x => x.Key == functionKey);
                policy = functioPolicy != null ? functioPolicy.Policy : 0;
            }
            else
            {
                policy = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, functionKey);
            }

            return policy;
        }

        private static bool IsAjaxRequest(HttpRequest request)
           => string.Equals(request.Query["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal) ||
              string.Equals(request.Headers["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal);
    }
}
