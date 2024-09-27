using CRM.Core.Constants;
using CRM.Resources;

namespace CRM.Services
{
    public static class RoleSettingService
    {
        public static string GetRoleName(int roleId)
        {
            string roleName = roleId switch
            {
                RoleIdConstants.Member or RoleIdConstants.CRMMember => ViewResources.Member,
                RoleIdConstants.Agent or RoleIdConstants.CRMAgent => ViewResources.Agent,
                RoleIdConstants.Master or RoleIdConstants.CRMMaster => ViewResources.Master,
                RoleIdConstants.Super or RoleIdConstants.CRMSuper => ViewResources.Super,
                RoleIdConstants.Headline => ViewResources.Headline,
                RoleIdConstants.Account => ViewResources.Account,
                _ => ViewResources.Guest,
            };
            return roleName;
        }
    }
}