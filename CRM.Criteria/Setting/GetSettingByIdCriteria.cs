using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Criteria.Setting
{
    public class GetSettingByIdCriteria : CriteriaBase
    {
        public int SettingId { get; set; }

        public override string GetSettingKey() => string.Empty;

        public override bool IsValid() => true;
    }
}
