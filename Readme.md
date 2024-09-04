```
flux bootstrap github --owner=<user> --repository=<repository name> --private=false --personal=true --path=clusters/my-cluster
```

flux bootstrap github --owner=krebsmar-materna --repository=podzilla --private=false --personal=true --path=clusters/podzilla

flux create source git aks-store-quickstart \
  --url=https://github.com/krebsmar-materna/podzilla/aks-store-demo \
  --branch=master \
  --interval=1m \
  --export > ./clusters/podzilla/aks-store-quickstart.yaml

flux create kustomization aks-store-quickstart \
--target-namespace=aks-store \
--source=aks-store-quickstart \
--path="./apps" \
--prune=true \
--wait=true \
--interval=30m \
--retry-interval=2m \
--health-check-timeout=3m \
--export > ./clusters/podzilla/aks-store-quickstart-kustomization.yaml