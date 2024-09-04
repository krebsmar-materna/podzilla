provider "azurerm" {
  features {}
  subscription_id = "abc37e69-5414-4bcb-9b8b-0a9787adaf09"
}

resource "azurerm_resource_group" "podzilla" {
  name     = "rg-podzilla"
  location = "eastus"
}

resource "azurerm_kubernetes_cluster" "podzilla" {
  name                = "podzilla"
  location            = azurerm_resource_group.podzilla.location
  resource_group_name = azurerm_resource_group.podzilla.name
  dns_prefix          = "podzilla"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }
}
