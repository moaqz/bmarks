## 🔥 Features

- Organize your bookmarks by tags.

- Export your bookmarks as CSV and JSON.

- Generate an access token to access your data.

## 📦 Stack

- [**React**](https://react.dev/) - The library for web and native user interfaces.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**UnoCSS**](https://unocss.dev/) - Instant On-demand Atomic CSS Engine.
- [**Appwrite**](https://appwrite.io/) - Backend platform for developing Web, Mobile, and Flutter applications.

## 🔨 Local Setup

This guide covers how to run Appwrite locally using `Docker`. Ensure that you have `Docker` installed.

> [!IMPORTANT]
> Make sure the Docker daemon is running before executing the command.

1. **Start the `Appwrite` service:**

```bash
docker compose -f appwrite/docker-compose.yml up
```

This command could take time. The Appwrite contains 22 services that needs to boot up.

1. **Create user account and an organization:**

Open the Appwrite console by navigating to [http://localhost](http://localhost). Create a new user account.

After creating the account, you will be redirected to the account panel. Go to the [Organizations section](http://localhost/console/account/organizations) and create an organization.

3. **Create a project and get an API Token:**

In the organization panel, create a new project. After creating the project, generate an API token by following these steps:

- Navigate to the project's settings.
- Under the "API credentials" section, click on the `View API Keys` button and create an API key with all permissions.
- Copy the `API key secret` and the `Project ID` and add them to the .env file.

> [!WARNING]
> The API key requires all permissions for the setup script to run. It is recommended to delete the API key after running the script, as it is only needed for this initial setup.

4. **Run the setup script to configure the database schema:**

```bash
pnpm run setup
```

The script will output the variables that you need to replace in the `.env` file.

5. **Run the project in a separate terminal:**

```bash
pnpm dev
```

## 🌐 Using Appwrite Cloud

If you choose to use Appwrite Cloud instead of Docker, follow the same steps as outlined above. The required environment variables will function in the same way, and you can use the setup script to configure the database schema.

Ensure to replace the `API key secret` and `Project ID` with the values from Appwrite Cloud in your `.env` file.
