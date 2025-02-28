namespace CRM.Services.Interfaces;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.ChatTypeMapping;
using CRM.Models.ChatTypeMapping;
using Models;

public interface IChatTypeMappingService
{
    Task<ValueTuple<IEnumerable<ChatTypeMappingModel>, int>> GetChatTypeMappingAsync(GetChatTypeMappingCriteria criteria);

    Task<CommandResult> EditActiveStatusAsync(int conversationId, bool IsActive, int userId);

    Task<CommandResult> DeleteConversationGroupAsync(int conversationId, int userId);

    Task<IEnumerable<GroupHeadlineDirectAccountModel>> GetHeadlineByRecipientAsync(string recipientIds);

    Task<IEnumerable<IgnoreNotificationType>> GetIgnoreNotificationTypeAsync();

    Task<CommandResult> CreatePersonalMappingAsync(InsertPersonalMappingCommand criteria);

    Task<CommandResult> EditChatTypeMappingAsync(UpdateChatTypeMappingCommand criteria);

    Task<CommandResult> EditChatTypeMappingRemarkAsync(UpdateChatTypeMappingRemarkCommand criteria);
}