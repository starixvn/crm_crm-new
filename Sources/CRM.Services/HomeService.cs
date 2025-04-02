namespace CRM.Services;

using System.Collections.Generic;
using System.Resources;
using System.Text.RegularExpressions;
using Fanex.NAP.Client.Models;

public interface IHomeService
{
    IList<MenuItem> EditMenuLanguage(IList<MenuItem> menus);
}

public class HomeService : IHomeService
{
    public IList<MenuItem> EditMenuLanguage(IList<MenuItem> menus)
    {
        var rm = new ResourceManager(typeof(Resources.ViewResources));
        var newMenus = new List<MenuItem>();
        for (var i = 0; i < menus.Count; i++)
        {
            var menuItem = menus[i];
            var newMenuItem = new MenuItem
            {
                Name = EditMenuName(menuItem.Name, rm),
                DisplayOrder = menuItem.DisplayOrder,
                Environment = menuItem.Environment,
                Id = menuItem.Id,
                IsActive = menuItem.IsActive,
                Policy = menuItem.Policy,
                Url = menuItem.Url
            };

            newMenus.Add(newMenuItem);
        }

        return newMenus;
    }

    private static string EditMenuName(string name, ResourceManager rm)
    {
        var key = Regex.Replace(name.Trim(), "-| ", "");
        var newName = rm.GetString(key);

        return newName ?? name;
    }
}