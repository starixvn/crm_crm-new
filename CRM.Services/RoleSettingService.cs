using CRM.Core.Constants;
using CRM.Resources;

namespace CRM.Services
{
    public static class RoleSettingService
    {
        public static string GetRoleName(int roleId)
        {
            string roleName;
            switch (roleId)
            {
                case RoleIdConstants.Member:
                case RoleIdConstants.CRMMember:
                    roleName = ViewResources.Member;
                    break;

                case RoleIdConstants.Agent:
                case RoleIdConstants.CRMAgent:
                    roleName = ViewResources.Agent;
                    break;

                case RoleIdConstants.Master:
                case RoleIdConstants.CRMMaster:
                    roleName = ViewResources.Master;
                    break;

                case RoleIdConstants.Super:
                case RoleIdConstants.CRMSuper:
                    roleName = ViewResources.Super;
                    break;

                case RoleIdConstants.Headline:
                    roleName = ViewResources.Headline;
                    break;

                case RoleIdConstants.Account:
                    roleName = ViewResources.Account;
                    break;

                default:
                    roleName = ViewResources.Guest;
                    break;
            }

            return roleName;
        }
    }
}