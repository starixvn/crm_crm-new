namespace CRM.Services
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using static Fanex.NAP.Core.Business.Constant;

    public interface IPermissionService
    {
        Task<int> GetPolicyPermissionAsync(string functionKey);

        Task<bool> IsHavingPermissionByPolicyAsync(string functionKey, Policy policy = Policy.Read);

        Task<short> GetSitePermissionAsync();

        Task<bool> IsHavingPermissionAsync(string functionKey);

        Task<string> GetChildPermissionsAsync(string parentFunctionKey);
    }

    public class PermissionService : IPermissionService
    {
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;

        public PermissionService(
            IUserService userService,
            INapSession napSession,
            INapSettings napSettings
        )
        {
            this.userService = userService;
            this.napSession = napSession;
            this.napSettings = napSettings;
        }

        public async Task<int> GetPolicyPermissionAsync(string functionKey)
        {
            return await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, functionKey);
        }

        public async Task<bool> IsHavingPermissionByPolicyAsync(string functionKey, Policy policy = Policy.Read)
        {
            return await userService.IsHavingPermissionAsync(napSession.UserId, napSettings.SiteId, functionKey, policy);
        }

        public async Task<short> GetSitePermissionAsync()
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
            int policy = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, functionKey);
            return policy > 0;
        }

        public async Task<string> GetChildPermissionsAsync(string parentFunctionKey)
        {
            var siteLabels = string.Empty;
            var functions = await userService.GetPermissionsAsync(napSession.UserId, napSettings.SiteId, parentFunctionKey);
            if (functions is not null && functions.Any())
            {
                var functionKeys = functions.Select(f => f.Name).ToArray();
                siteLabels = string.Join(",", functionKeys);
            }
            return siteLabels;
        }
    }
}