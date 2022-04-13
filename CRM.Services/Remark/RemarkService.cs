namespace CRM.Services.Remark
{
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.NewRemark;
    using CRM.Criteria.Remark;
    using CRM.Models.Remark;
    using CRM.Models.RemarkNew;
    using CRM.Repositories;

    public interface IRemarkService
    {
        Task<RemarkInfo> GetRemarkAsync(GetRemarkCriteria criteria);

        Task<CommandResult> EditRemarkAsync(EditRemarkCommand command);

        Task<IEnumerable<RemarkNewInfo>> GetNewRemarkAsync(GetNewRemarkCriteria criteria);
    }

    public class RemarkService : IRemarkService
    {
        private readonly IBaseService baseService;
        private readonly IRemarkRepository remarkRepository;

        public RemarkService(IBaseService baseService, IRemarkRepository remarkRepository)
        {
            this.baseService = baseService;
            this.remarkRepository = remarkRepository;
        }

        public async Task<RemarkInfo> GetRemarkAsync(GetRemarkCriteria criteria)
        {
            var remarks = await remarkRepository.GetRemarkAsync(criteria);
            return remarks;
        }

        public async Task<CommandResult> EditRemarkAsync(EditRemarkCommand command)
        {
            var xmlContent = new StringBuilder(1024);
            xmlContent.Append("<Remarks>");
            if (command.SpecialRemarks != null)
            {
                BuildRemarksXml(xmlContent, command.SpecialRemarks, true);
            }

            if (command.NormalRemarks != null)
            {
                BuildRemarksXml(xmlContent, command.NormalRemarks, false);
            }

            xmlContent.Append("</Remarks>");
            command.Remarks = xmlContent.ToString();

            return await baseService.ExecuteNonQueryAsync(command);
        }

        public static void BuildRemarksXml(StringBuilder xmlContent, IEnumerable<string> remarks, bool isSpecial)
        {
            var isSpecialText = isSpecial ? " IsSpecial=\"1\" />" : " IsSpecial=\"0\" />";
            foreach (var remark in remarks)
            {
                if (!string.IsNullOrWhiteSpace(remark))
                {
                    xmlContent.Append("<Remark Content=\"").Append(HttpUtility.HtmlEncode(remark)).Append("\"")
                        .Append(isSpecialText);
                }
            }
        }

        public async Task<IEnumerable<RemarkNewInfo>> GetNewRemarkAsync(GetNewRemarkCriteria criteria)
        {
            var newRemarks = await baseService.GetDataAsync<RemarkNewInfo>(criteria);
            return newRemarks;
        }
    }
}
