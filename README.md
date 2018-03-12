![ANDES](https://github.com/andes/andes.github.io/raw/master/images/logo.png)

## vApp

Servidor web para ANDES. Permite integrar APP y API es un único servicio.

## Instalación

### Instalar dependencias

```bash
git clone https://github.com/andes/api
git clone https://github.com/andes/app
git clone https://github.com/andes/vapp

cd vapp
npm install
```

### Iniciar el servidor

```bash
node index.js
```

## Docker

### Build images

```bash
docker build -t andesnqn/vapp .

or 

docker build -t andesnqn/vapp --build-arg ENVIRONMENT=develop .
```

### Run images

```bash
docker run  -p  80:80  --rm --name andes_vapp andesnqn/vapp
```

### Run images for developtment

```bash

docker stop andes_vapp

docker exec andes_app node index.js

```
