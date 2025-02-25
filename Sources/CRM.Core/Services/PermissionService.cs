namespace CRM.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Models.ValueObject;
    using Fanex.NAP.Client.Services;
    using Microsoft.Extensions.Caching.Memory;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    public interface IPermissionService
    {
        Task<int> GetPolicyPermissionAsync(string functionKey, bool permissionCache = true);

        Task<bool> IsHavingPermissionByPolicyAsync(string functionKey, Policy policy = Policy.Read);

        Task<short> GetCurrentUserLicenseeTypeAsync();

        Task<bool> IsHavingPermissionAsync(string functionKey);

        Task<string> GetCurrentUserCreditPermissionsAsync(Policy policy = Policy.Read);
    }

    public class PermissionService : IPermissionService
    {
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IMemoryCache memoryCache;

        public PermissionService(
            IUserService userService,
            INapSession napSession,
            INapSettings napSettings,
            IMemoryCache memoryCache
        )
        {
            this.userService = userService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.memoryCache = memoryCache;
        }

        public async Task<int> GetPolicyPermissionAsync(string functionKey, bool permissionCache = true)
        {
            int policy;
            IEnumerable<FunctionPolicy> permissions;
            if (permissionCache)
            {
                var cacheKey = string.Format("{0}_{1}_{2}_{3}", "CRMFunctions", napSession.UserId, napSession.OnUserId, napSettings.SiteId);
                permissions = memoryCache.Get<IEnumerable<FunctionPolicy>>(cacheKey);

                if (permissions == null)
                {
                    permissions = await userService.GetPermissionsAsync(napSession.UserId, napSettings.SiteId, string.Empty, napSettings.Environment);
                    memoryCache.Set(cacheKey, permissions, new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTimeOffset.Now.AddSeconds(napSettings.CacheDuration)
                    });
                }

                var functionPolicy = permissions.FirstOrDefault(x => x.Key == functionKey);
                policy = functionPolicy != null ? functionPolicy.Policy : 0;
            }
            else
            {
                policy = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, functionKey);
            }

            return policy;
        }

        public async Task<bool> IsHavingPermissionByPolicyAsync(string functionKey, Policy policy = Policy.Read)
        {
            return !string.IsNullOrEmpty(functionKey)
                && (await GetPolicyPermissionAsync(functionKey)) >= (int)policy;
        }

        public async Task<short> GetCurrentUserLicenseeTypeAsync()
        {
            var isHavingPermissionCredit = await IsHavingPermissionAsync(FunctionKey.Credit);
            var isHavingPermissionLicensee = await IsHavingPermissionAsync(FunctionKey.Licensee);
            return (isHavingPermissionCredit, isHavingPermissionLicensee) switch
            {
                (true, true) => (short)SitePermission.Both,
                (true, false) => (short)SitePermission.Credit,
                (false, true) => (int)SitePermission.Licensee,
                _ => (short)SitePermission.NA,
            };
        }

        public async Task<bool> IsHavingPermissionAsync(string functionKey)
        {
            int policy = await GetPolicyPermissionAsync(functionKey);
            return policy > 0;
        }

        public async Task<string> GetCurrentUserCreditPermissionsAsync(Policy policy = Policy.Read)
        {
            var siteLabels = string.Empty;
            var cacheKey = string.Format("{0}_{1}_{2}_{3}", FunctionKey.Credit, napSession.UserId, napSession.OnUserId, napSettings.SiteId);
            var functions = memoryCache.Get<IEnumerable<FunctionPolicy>>(cacheKey);

            if (functions == null)
            {
                functions = await userService.GetPermissionsAsync(napSession.UserId, napSettings.SiteId, FunctionKey.Credit, napSettings.Environment);
                memoryCache.Set(cacheKey, functions, new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTimeOffset.Now.AddSeconds(napSettings.CacheDuration)
                });
            }

            if (functions is not null && functions.Any())
            {
                var functionKeys = functions.Where(i => i.Policy >= (int)policy).Select(f => f.Name).ToArray();
                siteLabels = string.Join(",", functionKeys);
            }
            return siteLabels;
        }
    }
}