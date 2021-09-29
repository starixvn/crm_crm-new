namespace CRM.Services.Remark
{
    using CRM.Core.Services;

    public interface IRemarkService
    {

    }

    public class RemarkService : IRemarkService
    {
        private readonly IBaseService baseService;

        public RemarkService(IBaseService baseService)
        {
            this.baseService = baseService;
        }
    }
}
