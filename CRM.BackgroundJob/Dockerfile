FROM hub.nexdev.net/base/dotnet/core/sdk:5.0.102-ca-patch-buster-slim AS builder

WORKDIR /src

COPY ["nuget.config", "."]
COPY ["CRM.BackgroundJob/CRM.BackgroundJob.csproj", "CRM.BackgroundJob/"]
COPY ["CRM.Letstalk.Services/CRM.Letstalk.Services.csproj", "CRM.Letstalk.Services/"]
COPY ["CRM.Core/CRM.Core.csproj", "CRM.Core/"]
COPY ["CRM.Resources/CRM.Resources.csproj", "CRM.Resources/"]
COPY ["CRM.Letstalk.Client/CRM.Letstalk.Client.csproj", "CRM.Letstalk.Client/"]

RUN dotnet restore "CRM.BackgroundJob/CRM.BackgroundJob.csproj"
COPY . .

WORKDIR "/src/CRM.BackgroundJob"

RUN dotnet publish -r linux-x64 --self-contained false -o /app

FROM hub.nexdev.net/base/dotnet/core/aspnet:5.0-buster-slim AS base

WORKDIR /app

COPY --from=builder /app .

ENTRYPOINT ["dotnet", "CRM.BackgroundJob.dll"]