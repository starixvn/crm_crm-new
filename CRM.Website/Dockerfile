FROM registry.nexdev.net:5050/docker/dotnet/core/sdk:5.0.102-ca-patch-buster-slim AS builder

WORKDIR /src

COPY ["CRM.Website/CRM.Website.csproj", "CRM.Website/"]
COPY ["CRM.Core/CRM.Core.csproj", "CRM.Core/"]
COPY ["CRM.Resources/CRM.Resources.csproj", "CRM.Resources/"]
COPY ["CRM.Services/CRM.Services.csproj", "CRM.Services/"]
COPY ["CRM.Repositories/CRM.Repositories.csproj", "CRM.Repositories/"]
COPY ["CRM.Models/CRM.Models.csproj", "CRM.Models/"]
COPY ["CRM.Criteria/CRM.Criteria.csproj", "CRM.Criteria/"]
COPY ["CRM.Letstalk.Client/CRM.Letstalk.Client.csproj", "CRM.Letstalk.Client/"]
COPY ["CRM.ViewModel/CRM.ViewModels.csproj", "CRM.ViewModel/"]
COPY ["CRM.Controllers/CRM.Controllers.csproj", "CRM.Controllers/"]
COPY ["nuget.config", ""]

RUN dotnet restore "CRM.Website/CRM.Website.csproj"

COPY . .

WORKDIR "/src/CRM.Website"

RUN dotnet publish -r linux-x64 --self-contained false -o /app

FROM registry.nexdev.net:5050/docker/dotnet/core/aspnet:5.0-buster-slim AS base

WORKDIR /app

COPY --from=builder /app .

ENTRYPOINT ["dotnet", "CRM.Website.dll"]