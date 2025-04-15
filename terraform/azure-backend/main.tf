resource "azurerm_app_service" "backend_app" {
  name                = "supply-chain-backend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.backend_plan.id

  app_settings = {
    WEBSITES_PORT                   = "80" # for custom port in container
    MONGO_URI                       = "mongodb+srv://asad:Arshad%407860@supply-chain-project.mongocluster.cosmos.azure.com/supplyChainDB?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
    JWT_SECRET                      = "9f8d7e2b4a6c3d1f0e5b7a2c8f6d4a1e3c2b7d9f8a5c6e1f0d3b7e2a9c4d8f7"
    PORT                            = "80"
    ADMIN_EMAIL                     = "admin@example.com"
    ADMIN_PASSWORD                  = "admin@123"

    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
  }

  site_config {
    linux_fx_version = "DOCKER|asadacr9876.azurecr.io/supply-chain-backend:latest"
    always_on        = true
  }

  identity {
    type = "SystemAssigned"
  }
}
