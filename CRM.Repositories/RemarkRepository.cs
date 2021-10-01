namespace CRM.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Models.Remark;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public interface IRemarkRepository
    {
        Task<RemarkInfo> GetRemarkAsync(ICriteria criteria);
    }

    public class RemarkRepository : IRemarkRepository
    {
        public async Task<RemarkInfo> GetRemarkAsync(ICriteria criteria)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                using (var reader = await db.ExecuteReaderAsync(criteria))
                {
                    var specialRemarks = new List<string>();
                    var remarks = new List<string>();

                    while (reader.Read())
                    {
                        var remark = reader["Remark"].ToString();
                        string[] newLine = new[] { "\n", "\r", "\n\r", "\r\n" };
                        for (int index = 0; index < newLine.Length; index++)
                        {
                            remark = remark.Replace(newLine[index], "<br/>");
                        }
                        if (Convert.ToBoolean(reader["IsSpecial"]))
                        {
                            specialRemarks.Add(remark);
                        }
                        else
                        {
                            remarks.Add(remark);
                        }
                    }

                    return new RemarkInfo { SpecialRemarks = specialRemarks, NormalRemarks = remarks };
                }
            }
        }
    }
}
