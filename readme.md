# 📱 Saveurs Maison - Ionic Angular App con Azure B2C

Aplicación móvil desarrollada en **Ionic + Angular (standalone)** con autenticación mediante **Azure AD B2C**, compatible con plataformas **web y Android**.

---

## 📦 Requisitos

- Node.js 18+
- Ionic CLI (`npm install -g @ionic/cli`)
- Android Studio (para pruebas en Android)
- Cuenta en Azure B2C con flujo configurado

---

## 🚀 Cómo clonar y correr la app

### 1. Clonar repositorio

```bash
git clone https://github.com/cratulas/MaisonSaveursFrontendIonic
cd saveurs-maison
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo de entorno para Android

```ts
// src/environments/environment.android.ts
export const environmentAndroid = {
  azureB2C: {
    tenantName: 'tutenlab.onmicrosoft.com',
    clientId: 'XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    authorityDomain: 'tutenlab.b2clogin.com',
    signInSignUpPolicy: 'B2C_1_signin_signup',
    redirectUri: 'com.saveurs.maison://auth',
    apiScopes: ['https://tutenlab.onmicrosoft.com/api/demo.read']
  }
};

---

## 🌐 Ejecutar en Web

```bash
ionic serve
```

---

## 📱 Ejecutar en Android

```bash
npm run build
npx cap sync android
npx cap open android
```

Desde Android Studio puedes correr la app en un emulador o dispositivo físico.

---

## 🔐 Flujo de Login

- Presiona **Login** → abre navegador con Azure B2C.
- Al autenticar, vuelve a la app vía `com.saveurs.maison://auth`.
- Se obtienen los tokens y se muestra el perfil.
- **Logout** cierra sesión en Azure B2C.

---

## 📂 Estructura

```
src/
├── app/
│   ├── home/
│   ├── profile/
│   └── auth/
├── environments/
```

---

## ✅ Funcionalidades

- [x] Login con Azure B2C
- [x] Soporte Android & Web
- [x] Protección de rutas
- [x] Tokens y perfil del usuario
- [x] Redirección con URI personalizada

---

## 🧪 Testeado en

- Android Emulator (Pixel 6, API 33)
- Navegador Chrome (Web)

---






## ✅ Funcionalidades

- [x] Se agrego Nav  componente
- [x] Se agrego Footer componente
- [x] se modifico app.component para dejar nav y footer en toda la spa
- [x] se agrego login 
- [x] se otras modificaciones 

---






## 👨‍💻 Autor

Mauricio Mora  
Francisco Salinas
Duoc UC - Taller Aplicado de Software  
App Saveurs Maison 🍷🧀

---




    


