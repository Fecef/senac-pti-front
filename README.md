# 🚀 Guia para Rodar um Projeto Frontend com Vite + Yarn

Este documento explica como instalar as dependências necessárias e rodar
localmente um projeto frontend utilizando **Vite**, **Yarn** e
**Node.js**.

------------------------------------------------------------------------

## 📦 Pré-requisitos

### **1. Node.js**

O Node.js é o ambiente que permite rodar JavaScript no servidor e é
necessário para executar o Vite e o Yarn.

Para verificar se o Node está instalado:

``` bash
node -v
```

### **2. Yarn**

Gerenciador de pacotes utilizado para instalar e rodar dependências.

Instalação:

``` bash
npm install -g yarn
```

------------------------------------------------------------------------

## 📁 Clonando o projeto

``` bash
git clone https://github.com/usuario/seu-projeto.git
cd seu-projeto
```

------------------------------------------------------------------------

## 📥 Instalando dependências

``` bash
yarn install
```

------------------------------------------------------------------------

## ▶️ Rodando o projeto

``` bash
yarn dev
```

Acesse no navegador:

    http://localhost:5173

------------------------------------------------------------------------

## 🏗️ Criando o build

``` bash
yarn build
```

Saída em:

    /dist

------------------------------------------------------------------------

## 🧪 Servindo o build localmente

``` bash
yarn preview
```

------------------------------------------------------------------------

## 🔧 Scripts comuns

``` json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
