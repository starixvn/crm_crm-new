namespace CRM.Services.Redemption
{
    using CRM.Core.Services;

    public interface IRedemptionService
    {

    }

    public class RedemptionService : IRedemptionService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public RedemptionService(IBaseService baseService, ICommonService commonService)
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }


    }
}