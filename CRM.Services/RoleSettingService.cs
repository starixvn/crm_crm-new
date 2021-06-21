using CRM.Core.Constants;
using CRM.Resources;

namespace CRM.Services
{
    public static class RoleSettingService
    {
        public static string GetRoleName(int roleId)
        {
            var roleName = string.Empty;
            switch (roleId)
            {
                case RoleIdConstants.Member:
                case RoleIdConstants.CRMMember:
                case RoleIdConstants.CN88Member:
                    roleName = ViewResources.Member;
                    break;

                case RoleIdConstants.Agent:
                case RoleIdConstants.CRMAgent:
                case RoleIdConstants.CN88Agent:
                    roleName = ViewResources.Agent;
                    break;

                case RoleIdConstants.Master:
                case RoleIdConstants.CRMMaster:
                case RoleIdConstants.CN88Master:
                    roleName = ViewResources.Master;
                    break;

                case RoleIdConstants.Super:
                case RoleIdConstants.CRMSuper:
                case RoleIdConstants.CN88Super:
                    roleName = ViewResources.Super;
                    break;

                case RoleIdConstants.Headline:
                    roleName = ViewResources.Headline;
                    break;

                default:
                    roleName = ViewResources.Guest;
                    break;
            }

            return roleName;
        }
    }
}
