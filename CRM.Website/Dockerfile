FROM hub.nexdev.net/base/dotnet/core/sdk:6.0-alpine AS builder

WORKDIR /src

COPY ["nuget.config", "."]
COPY ["CRM.Website/CRM.Website.csproj", "CRM.Website/"]
COPY ["CRM.Controllers/CRM.Controllers.csproj", "CRM.Controllers/"]
COPY ["CRM.Core/CRM.Core.csproj", "CRM.Core/"]
COPY ["CRM.Resources/CRM.Resources.csproj", "CRM.Resources/"]
COPY ["CRM.Models/CRM.Models.csproj", "CRM.Models/"]
COPY ["CRM.Services/CRM.Services.csproj", "CRM.Services/"]
COPY ["CRM.Criteria/CRM.Criteria.csproj", "CRM.Criteria/"]
COPY ["CRM.ViewModel/CRM.ViewModels.csproj", "CRM.ViewModel/"]

RUN dotnet restore "CRM.Website/CRM.Website.csproj"

COPY . .
WORKDIR "/src/CRM.Website"

RUN dotnet publish -r linux-x64 --self-contained false -o /app

FROM hub.nexdev.net/nexus/aspnet6_crm_website AS base

WORKDIR /app

COPY --from=builder /app .
ENV TZ="America/La_Paz"

ENTRYPOINT ["dotnet", "CRM.Website.dll"]