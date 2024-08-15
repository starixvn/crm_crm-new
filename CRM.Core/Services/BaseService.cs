namespace CRM.Core.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Criteria;
    using CRM.Core.Models;
    using Fanex.Caching;
    using Fanex.Data.Repository;
    using Fanex.NAP.Client.Helpers.Extensions;

    public interface IBaseService
    {
        Task<IEnumerable<T>> GetDataAsync<T>(ICriteria criteria, string serverIp = "");

        Task<IEnumerable<SiteDbConfig>> GetSiteDbConfigAsync(ICriteria criteria, string serverIp = "");

        Task<IEnumerable<T>> GetDataFromSiteDbAsync<T>(SiteDbBaseCriteria criteria);

        Task<T> GetDataEntityAsync<T>(ICriteria criteria, string serverIp = "");

        Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>>> FetchMultipleAsync<TFirst, TSecond>(ICriteria criteria, string serverIp = "");

        Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>>> FetchMultipleAsync<TFirst, TSecond, TThird>(ICriteria criteria, string serverIp = "");

        Task<ValueTuple<IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>, IEnumerable<TFour>>>
            FetchMultipleAsync<TFirst, TSecond, TThird, TFour>(ICriteria criteria, string serverIp = "");

        Task<CommandResult> ExecuteNonQueryAsync(INonQueryCommand command, string serverIp = "");
    }

    public class BaseService : IBaseService
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICacheService cacheService;
        private const string Config_SiteDb_Key = "ConfigSiteDbKey";

        public BaseService(
            IDynamicRepository dynamicRepository,
            ICacheService cacheService)
        {
            this.dynamicRepository = dynamicRepository;
            this.cacheService = cacheService;
        }

        public async Task<IEnumerable<T>> GetDataAsync<T>(ICriteria criteria, string serverIp = "")
        {
            if (criteria != null && criteria.IsValid())
            {
                return await dynamicRepository.FetchAsync<T>(criteria);
            }

            return new List<T>();
        }

        public virtual async Task<IEnumerable<SiteDbConfig>> GetSiteDbConfigAsync(ICriteria criteria, string serverIp = "")
        {
            var siteConfigs = cacheService.Get<IEnumerable<SiteDbConfig>>(Config_SiteDb_Key);
            if (siteConfigs == null || !siteConfigs.Any())
            {
                siteConfigs = await GetDataAsync<SiteDbConfig>(criteria);
                cacheService.Set(Config_SiteDb_Key, siteConfigs);
            }
            return siteConfigs;
        }

        public async Task<IEnumerable<T>> GetDataFromSiteDbAsync<T>(SiteDbBaseCriteria criteria)
        {
            var siteDbCriteria = new GetSiteDbConfigCriteria();
            var siteConfigs = await GetSiteDbConfigAsync(siteDbCriteria);
            var results = new List<T>();
            foreach (var siteConfig in siteConfigs)
            {
                criteria.SiteDBGroupID = siteConfig.SiteDBGroupID;
                var result = await dynamicRepository.FetchAsync<T>(criteria, siteConfig.AGIP);
                results.AddRange(result);
            }

            return results;
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

        public async Task<CommandResult> ExecuteNonQueryAsync(INonQueryCommand command, string serverIp = "")
        {
            var commandResult = new CommandResult();
            if (command != null && command.IsValid())
            {
                await dynamicRepository.ExecuteAsync(command);

                var properties = command.ToPropertyDictionary();
                if (properties.ContainsKey("ErrCode"))
                {
                    commandResult.Code = int.Parse(properties["ErrCode"].ToString());
                    commandResult.Message = properties["ErrMsg"] != null ? properties["ErrMsg"].ToString() : string.Empty;
                }
            }

            return commandResult;
        }
    }
}