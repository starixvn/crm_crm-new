namespace CRM.Core.Filters
{
    using System;
    using System.Threading.Tasks;
    using Fanex.Logging;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.Caching.Memory;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class CrmPermissionAttribute : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IMemoryCache cache;
        private int cacheDuration;
        private readonly IUserService userService;
        private readonly INapSettings napSettings;
        private readonly INapSession napSession;
        private readonly ILogger logger;

        public CrmPermissionAttribute() : this(null, null, null, null, null)
        {
        }

        public CrmPermissionAttribute(IUserService userService, INapSettings napSettings, INapSession napSession, IMemoryCache cache, ILogger logger)
        {
            this.cache = cache ?? new MemoryCache(new MemoryCacheOptions());
            this.userService = userService ?? new UserService();
            this.napSettings = napSettings ?? NapClientManager.NapSettings;
            this.napSession = napSession ?? NapClientManager.NapSession;
            this.logger = logger ?? new Logger();
            PermissionCache = true;
        }

        public string FunctionKey { get; set; }
        public Constant.Policy Policy { get; set; }
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
            if (PermissionCache)
            {
                var cacheKey = string.Format("{0}_{1}_{2}", napSession.UserId,
                    napSettings.SiteId, functionKey);
                var cachedPolicy = cache.Get(cacheKey);

                if (cachedPolicy == null)
                {
                    policy = userService.GetPermission(napSession.UserId, napSettings.SiteId, functionKey);
                    cache.Set(cacheKey, policy, DateTimeOffset.Now.AddSeconds(CacheDuration));
                }
                else
                {
                    policy = (int)cachedPolicy;
                }
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
