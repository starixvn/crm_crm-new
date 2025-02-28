namespace CRM.Services;

using Fanex.Data.Repository;
using Fanex.NAP.Client.Helpers.Extensions;
using Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

public interface IBaseService
{
    Task<IEnumerable<T>> GetDataAsync<T>(ICriteria criteria, string serverIp = "");

    Task<T> GetDataEntityAsync<T>(ICriteria criteria, string serverIp = "");

    Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>>> FetchMultipleAsync<TFirst, TSecond>(ICriteria criteria, string serverIp = "");

    Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>>> FetchMultipleAsync<TFirst, TSecond, TThird>(ICriteria criteria, string serverIp = "");

#pragma warning disable S2436

    Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>, IEnumerable<TFour>>>
        FetchMultipleAsync<TFirst, TSecond, TThird, TFour>(ICriteria criteria, string serverIp = "");

#pragma warning restore S2436

    Task<CommandResult> ExecuteNonQueryAsync(INonQueryCommand command, string serverIp = "");
}

public class BaseService(IDynamicRepository dynamicRepository) : IBaseService
{
    public async Task<IEnumerable<T>> GetDataAsync<T>(ICriteria criteria, string serverIp = "")
    {
        if (criteria != null && criteria.IsValid())
        {
            return await dynamicRepository.FetchAsync<T>(criteria);
        }

        return new List<T>();
    }

    public async Task<T> GetDataEntityAsync<T>(ICriteria criteria, string serverIp = "")
    {
        if (criteria != null && criteria.IsValid())
        {
            return await dynamicRepository.GetAsync<T>(criteria);
        }

        return default(T);
    }

    public async Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>>> FetchMultipleAsync<TFirst, TSecond>(ICriteria criteria, string serverIp = "")
    {
        if (criteria != null && criteria.IsValid())
        {
            return await dynamicRepository.FetchMultipleAsync<TFirst, TSecond>(criteria);
        }

        return new ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>>(new List<TFirst>(), new List<TSecond>());
    }

    public async Task<(IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>)> FetchMultipleAsync<TFirst, TSecond, TThird>(ICriteria criteria, string serverIp = "")
    {
        if (criteria != null && criteria.IsValid())
        {
            return await dynamicRepository.FetchMultipleAsync<TFirst, TSecond, TThird>(criteria);
        }

        return new ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>>(new List<TFirst>(), new List<TSecond>(), new List<TThird>());
    }

#pragma warning disable S2436

    public async Task<(IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>, IEnumerable<TFour>)>
        FetchMultipleAsync<TFirst, TSecond, TThird, TFour>(ICriteria criteria, string serverIp = "")
    {
        if (criteria != null && criteria.IsValid())
        {
            return await dynamicRepository.FetchMultipleAsync<TFirst, TSecond, TThird, TFour>(criteria);
        }

        return new ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>, IEnumerable<TFour>>(
            new List<TFirst>(), new List<TSecond>(), new List<TThird>(), new List<TFour>());
    }

#pragma warning restore S2436

    public async Task<CommandResult> ExecuteNonQueryAsync(INonQueryCommand command, string serverIp = "")
    {
        var commandResult = new CommandResult();
        if (command != null && command.IsValid())
        {
            await dynamicRepository.ExecuteAsync(command);

            var properties = command.ToPropertyDictionary();
            if (properties.TryGetValue("ErrCode", out var errorCodeProperty))
            {
                commandResult.Code = int.Parse(errorCodeProperty.ToString() ?? "1");
                commandResult.Message = properties["ErrMsg"] != null ? properties["ErrMsg"].ToString() : string.Empty;
            }
        }

        return commandResult;
    }
}