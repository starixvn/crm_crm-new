namespace CRM.BackgroundJob.Criteria.ChatBot_ResultAmendment
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetMesssagesVoidSettledCriteria : CriteriaBase
    {
        public int LastMsgTargetId { get; set; }

        public int BatchSizeGetMsg { get; set; }

        public override string GetSettingKey() => "Acc_CRM_VoidingMsg_GetMessage";

        public override bool IsValid() => true;
    }
   
}
