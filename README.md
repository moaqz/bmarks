> [!WARNING]
> **ARCHIVED PROJECT**
> 
> This project is no longer actively maintained and has been archived. No updates, bug fixes, or support will be provided. Feel free to fork if you wish to continue development.

## 🔥 Features

- Organize your bookmarks by tags.

- Export your bookmarks as JSON.

- Generate an access token to access your data.

## 🧰 Tech Stack

- [**React**](https://react.dev/)
- [**Typescript**](https://www.typescriptlang.org/)
- [**UnoCSS**](https://unocss.dev/)
- [**Appwrite**](https://appwrite.io/)

## 🔨 Setup Server

1. Install dependencies `pnpm install`
2. Register [Appwrite](https://cloud.appwrite.io) account
3. Create project
4. Login with `pnpm appwrite login`
5. Update project ID in `appwrite.json`
6. Deploy project with `pnpm appwrite:deploy`

## 👀 Client Setup

1. Create `.env` file with `cp .env.example .env.local`
2. Update the environment variables
3. Start server `pnpm dev`

> [!NOTE]
> If you plan to run Appwrite locally using `Docker`, ensure that `VITE_APPWRITE_API_ENDPOINT` is set to `http://localhost/v1`. If you are using the Appwrite cloud, set it to `https://cloud.appwrite.io/v1`.
