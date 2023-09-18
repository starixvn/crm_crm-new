namespace CRM.Controllers.AdminTool
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.RemarkClassification, Policy = Policy.Read)]
    public class RemarkClassificationController : BaseController
    {
        public RemarkClassificationController()
        {

        }
    }
}
