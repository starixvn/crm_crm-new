namespace CRM.UnitTests.Services;

using System.Collections.Generic;
using System.Threading.Tasks;
using Constants;
using CRM.Services;
using Enum;
using Fanex.NAP.Client;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Helpers.Business;
using Fanex.NAP.Client.Models.ValueObject;
using Fanex.NAP.Client.Services;
using Microsoft.Extensions.Caching.Memory;
using NSubstitute;
using Xunit;

public class PermissionServiceTests
{
    private readonly IUserService userService;
    private readonly INapSession napSession;
    private readonly INapSettings napSettings;
    private readonly IMemoryCache memoryCache;
    private readonly PermissionService permissionService;

    public PermissionServiceTests()
    {
        userService = Substitute.For<IUserService>();
        napSession = Substitute.For<INapSession>();
        napSettings = Substitute.For<INapSettings>();
        memoryCache = Substitute.For<IMemoryCache>();
        permissionService = new PermissionService(userService, napSession, napSettings, memoryCache);
    }

    [Fact]
    public async Task GetPolicyPermissionAsync_WhenCalledWithCache_ReturnsExpectedResult()
    {
        // Arrange
        var functionKey = "TestFunction";
        var cacheKey = $"CRMFunctions_{napSession.UserId}_{napSession.OnUserId}_{napSettings.SiteId}";
        var permissions = new List<FunctionPolicy>
        {
            new() { Key = functionKey, Policy = 1 }
        };
        memoryCache.TryGetValue(cacheKey, out _)
            .Returns(x =>
            {
                x[1] = permissions;
                return true;
            });

        // Act
        var result = await permissionService.GetPolicyPermissionAsync(functionKey);

        // Assert
        Assert.Equal(1, result);
    }

    [Fact]
    public async Task GetPolicyPermissionAsync_WhenCalledWithNullCache_ReturnsExpectedResult()
    {
        // Arrange
        var functionKey = "TestFunction";
        var cacheKey = $"CRMFunctions_{napSession.UserId}_{napSession.OnUserId}_{napSettings.SiteId}";
        var permissions = new List<FunctionPolicy>
        {
            new() { Key = functionKey, Policy = 1 }
        };
        memoryCache.TryGetValue(cacheKey, out _)
            .Returns(x =>
            {
                x[1] = null;
                return false;
            });
        userService.GetPermissionsAsync(napSession.UserId, napSettings.SiteId, string.Empty, napSettings.Environment).Returns(permissions);

        // Act
        var result = await permissionService.GetPolicyPermissionAsync(functionKey);

        // Assert
        Assert.Equal(1, result);
    }

    [Fact]
    public async Task GetPolicyPermissionAsync_WhenCalledWithoutCache_ReturnsExpectedResult()
    {
        // Arrange
        var functionKey = "TestFunction";
        userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, functionKey).Returns((int)Constant.Policy.Read);

        // Act
        var result = await permissionService.GetPolicyPermissionAsync(functionKey, false);

        // Assert
        Assert.Equal(1, result);
        memoryCache.DidNotReceive().TryGetValue(Arg.Any<string>(), out _);
    }

    [Fact]
    public async Task IsHavingPermissionByPolicyAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        const string functionKey = "TestFunction";
        var cacheKey = $"CRMFunctions_{napSession.UserId}_{napSession.OnUserId}_{napSettings.SiteId}";

        var permissions = new List<FunctionPolicy>
        {
            new() { Key = functionKey, Policy = 1 }
        };
        memoryCache.TryGetValue(cacheKey, out _).Returns(x =>
        {
            x[1] = permissions;
            return true;
        });
        // Act
        var result = await permissionService.IsHavingPermissionByPolicyAsync(functionKey);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task GetCurrentUserLicenseeTypeAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var cacheKey = $"CRMFunctions_{napSession.UserId}_{napSession.OnUserId}_{napSettings.SiteId}";

        var permissions = new List<FunctionPolicy>
        {
            new() { Key = "Credit", Policy = 1 },
            new() { Key = "Licensee", Policy = 1 }
        };
        memoryCache.TryGetValue(cacheKey, out _).Returns(x =>
        {
            x[1] = permissions;
            return true;
        });

        // Act
        var result = await permissionService.GetCurrentUserLicenseeTypeAsync();

        // Assert
        Assert.Equal((short)SitePermission.Both, result);
    }

    [Fact]
    public async Task IsHavingPermissionAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var functionKey = "TestFunction";
        var permissions = new List<FunctionPolicy>
        {
            new() { Key = functionKey, Policy = 1 },
            new() { Key = "Licensee", Policy = 1 }
        };
        memoryCache.TryGetValue(Arg.Any<string>(), out _).Returns(x =>
        {
            x[1] = permissions;
            return true;
        });

        // Act
        var result = await permissionService.IsHavingPermissionAsync(functionKey);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task GetCurrentUserCreditPermissionsAsync_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var cacheKey = $"{FunctionKey.Credit}_{napSession.UserId}_{napSession.OnUserId}_{napSettings.SiteId}";
        var functions = new List<FunctionPolicy>
        {
            new() { Name = "CreditFunction", Policy = (int)Constant.Policy.Read }
        };
        memoryCache.TryGetValue(cacheKey, out _).Returns(x =>
        {
            x[1] = functions;
            return true;
        });

        // Act
        var result = await permissionService.GetCurrentUserCreditPermissionsAsync();

        // Assert
        Assert.Equal("CreditFunction", result);
    }

    [Fact]
    public async Task GetCurrentUserCreditPermissionsAsync_WhenCacheIsEmpty_ReturnsExpectedResult()
    {
        // Arrange
        var cacheKey = $"{FunctionKey.Credit}_{napSession.UserId}_{napSession.OnUserId}_{napSettings.SiteId}";
        var functions = new List<FunctionPolicy>
        {
            new() { Name = "CreditFunction", Policy = (int)Constant.Policy.Read }
        };
        memoryCache.TryGetValue(cacheKey, out _).Returns(x =>
        {
            x[1] = null;
            return false;
        });
        userService.GetPermissionsAsync(napSession.UserId, napSettings.SiteId, FunctionKey.Credit, napSettings.Environment).Returns(functions);

        // Act
        var result = await permissionService.GetCurrentUserCreditPermissionsAsync();

        // Assert
        Assert.Equal("CreditFunction", result);
    }
}