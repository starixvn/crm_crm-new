FROM registry.nexdev.net:5050/docker/dotnet/core/sdk:5.0.102-ca-patch-buster-slim AS builder

WORKDIR /src

COPY ["nuget.config", "."]
COPY ["CRM.Letstalk.Webhook/CRM.Letstalk.Webhook.csproj", "CRM.Letstalk.Webhook/"]
COPY ["CRM.Letstalk.Client/CRM.Letstalk.Client.csproj", "CRM.Letstalk.Client/"]
COPY ["CRM.Letstalk.Core/CRM.Letstalk.Core.csproj", "CRM.Letstalk.Core/"]
COPY ["CRM.Core/CRM.Core.csproj", "CRM.Core/"]
COPY ["CRM.Resources/CRM.Resources.csproj", "CRM.Resources/"]

RUN dotnet restore "CRM.Letstalk.Webhook/CRM.Letstalk.Webhook.csproj"

COPY . .

WORKDIR "/src/CRM.Letstalk.Webhook"

RUN dotnet publish -r linux-x64 --self-contained false -o /app

FROM registry.nexdev.net:5050/docker/dotnet/core/aspnet:5.0-buster-slim AS base

WORKDIR /app

COPY --from=builder /app .

ENTRYPOINT ["dotnet", "CRM.Letstalk.Webhook.dll"]