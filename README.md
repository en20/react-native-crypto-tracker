# 🚀 Template de Login em React Native  

Este é um **template de login** para aplicativos React Native, utilizando **Expo**, **TypeScript**, e **Firebase**. Este template serve como ponto de partida para implementar autenticação em seus projetos móveis.  

---

## 🛠️ Tecnologias Utilizadas  
- **React Native**  
- **Expo**  
- **TypeScript**  
- **Firebase (Authentication e Firestore)**  

---

## 📋 Funcionalidades  
- Tela de **login** e **cadastro**.  
- Autenticação com **email e senha**.  
- Validação de campos usando **React Hook Form** e **Yup**.  
- Integração com o **Firebase Authentication**.  
- Banco de dados no **Firestore** para armazenar informações do usuário (exemplo incluído).  
- Navegação com **React Navigation**.  

---

## 🔧 Pré-requisitos  
Antes de começar, você precisará ter instalado:  
- [Node.js](https://nodejs.org/)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  
- Conta no [Firebase](https://firebase.google.com/)  

---

## 🚀 Como usar  

### 1. Clone o repositório:  
```bash
git clone git@github.com:en20/ReactNative-Login-Firebase-Template.git
cd ReactNative-Login-Firebase-Template`
```
### 2. Instale as Dependências:  
```bash
npm install`
```
### 3. Configure o Firebase:
- Crie um projeto no Firebase Console.
- Habilite o Authentication com o método Email/Password.
- Crie um banco de dados Firestore (modo de teste).
- Adicione o arquivo firebaseConfig.ts na pasta src/config, contendo suas credenciais:

```bash
export const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};
```
### 4. Execute o aplicativo mobile:
```bash
npx expo start
```



