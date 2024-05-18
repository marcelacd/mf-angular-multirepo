## Module Federate - enfoque Multi Repo
En este proyecto se esta usando angular 16.2.12 - node 16.17.0

## Pasos para crear los microfrontends

1. Crear proyecto
```console
ng new mf-shell --style=scss --routing=true
```

2. Activar la federacion de modulos (https://www.npmjs.com/package/@angular-architects/module-federation)

Nota: instalar version de la libreria que sea compatible con la version de angular
```console
npm i -D @angular-architects/module-federation
```

3. Agregar el uso de modulos federados
```console
ng add @angular-architects/module-federation --project mf-shell --port 4200 --type host (para la aplicacion contenedora)
ng add @angular-architects/module-federation --project mf-shopping --port 4201 --type remote (para los mf)
```

4. Configuración para el host en el webpack.config.js
```console
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
module.exports = withModuleFederationPlugin({
  remotes: {  
    mfPayment: "http://localhost:4202/remoteEntry.js",    
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

5. Configuración para el mf en el webpack.config.js
```console
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
module.exports = withModuleFederationPlugin({
  name: 'mfPayment',
  exposes: {
    "./PaymentComponent": "./src/app/payment/payment.component.ts",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```
