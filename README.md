## 🔥 Features

- Organize your bookmarks by tags.

- Export your bookmarks as JSON.

- Generate an access token to access your data.

## 📦 Stack

- [**React**](https://react.dev/) - The library for web and native user interfaces.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**UnoCSS**](https://unocss.dev/) - Instant On-demand Atomic CSS Engine.
- [**Appwrite**](https://appwrite.io/) - Backend platform for developing Web, Mobile, and Flutter applications.

## 🔨 Local Setup

> [!IMPORTANT]
> This guide covers how to run Appwrite locally using `Docker`. Ensure that you have `Docker` installed and the Docker daemon is running.

> [!NOTE]
> All required variables are documented in the `.env.example` file. For development, create a `.env.local` file and fill it with the required values.

1. Clone the repository

```bash
git clone git@github.com:moaqz/bmarks.git --depth 1
cd bmarks
```

2. **Start the `Appwrite` service:**

Before running the service, I highly recommend reading the [system requirements](https://appwrite.io/docs/advanced/self-hosting#system-requirements) in the Appwrite documentation.

If your system meets the requirements, run the following command:

```bash
docker compose -f appwrite/docker-compose.yml up
```

> [!NOTE]
> This command may take some time to complete. Appwrite includes 22 services that need to start up.

3. **Create a user account and an organization:**

Open the Appwrite console by navigating to [http://localhost](http://localhost). Create a new user account.

After creating the account, you will be redirected to the account panel. Go to the [Organizations section](http://localhost/console/account/organizations) and create an organization.

4. **Create a project:**

In the organization panel, create a new project. After creating the project, copy the `Project ID` and add it to the `.env` file.

![api-key](/public/assets/api-key.png)

The `Project ID` is located next to the name of your project. You can also find it in the settings button in the sidebar.

5. **Get an API Token:**

On the getting started page of your project, you will see a section named `Integrate with your server`. Click the `API Key` button and create an API key with all permissions.

![integrate-with-your-server](/public/assets/integrate-with-your-server.png)

> [!WARNING]
> The API key requires all permissions for the setup script to run. It is recommended to delete the API key after running the script, as it is only needed for this initial setup.

6. **Run the setup script to configure the database schema:**

```bash
pnpm run setup
```

The script will output the variables that you need to replace in the `.env` file.

7. **Run the project in a separate terminal:**

```bash
pnpm dev
```

## 🌐 Using Appwrite Cloud

If you choose to use Appwrite Cloud instead of Docker, follow the same steps as outlined above. The required environment variables will function in the same way, and you can use the setup script to configure the database schema.

Ensure to replace the `API key secret` and `Project ID` with the values from Appwrite Cloud in your `.env` file.
