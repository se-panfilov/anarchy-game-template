# In your Project

## Placeholders

Replace project's placeholders with your details.
(please use case-sensitive search and replace).

- `XXX_GAME_NAME` - the brand name of the game (usually registered trademark)
- `XXX_GAME_TECH_NAME` - technical name used in app stores (snake_case, lowercase, no spaces)
- `XXX_GAME_TECH_NAME_FOR_RELEASE_PREFIX` - technical name used in release package names (kebab-case, lowercase, no spaces)
- `XXX_COMPANY_NAME` - the name of the company that developed the game (usually it's your studio name)
- `XXX_AUTHOR_SHORT` - the short name of the author
- `XXX_AUTHOR_FULL` - the full name of the author
- `XXX_AUTHOR_EMAIL` - the email address of the author
- `XXX_START_YEAR` - the year when the development of the game started
- `XXX_START_DATE` - the same as XXX_START_YEAR, but in dd.mm.yyyy format
- `XXX_HOMEPAGE_URL` - home page URL (default targets readme.md)
- `XXX_REPO_URL` - repository URL
- `XXX_BUGS_URL` - bugs/issues URL
- `XXX_DESKTOP_REPO_OWNERL` - the owner of the repository (for desktop app), i.g. GitHub user or organization name
- `XXX_DESKTOP_REPO_NAME` - the repository name (for desktop app), e.g. GitHub repository name
- `XXX_PRIVACY_EMAIL` - the email address for privacy-related contacts
- `XXX_SECURITY_EMAIL` - the email address for security-related contacts
- `XXX_SUPPORT_EMAIL` - the email address for support-related contacts
- `XXX_ACCESSIBILITY_EMAIL` - the email address for accessibility-related contacts
- `XXX_QUESTIONS_EMAIL` - the email address for general questions
- `XXX_LEGAL_EMAIL` - the email address for legal-related contacts
- `XXX_GOVERNING_LAW_COUNTRY` - the country whose laws govern the EULA
- `XXX_GOVERNING_VENUE` - the venue (city, state/province) whose laws govern the EULA
- `XXX_DESKTOP_SYNOPSIS` - a short description of the desktop app (used in app stores)
- `XXX_SENTRY_ORG` - Sentry organization name
- `XXX_SENTRY_PROJECT_CORE` - Sentry project name for the Core app
- `XXX_SENTRY_PROJECT_DESKTOP` - Sentry project name for the Desktop app
- `XXX_SENTRY_DSN_MOBILE` - Sentry DSN for the Mobile app
- `XXX_SENTRY_DSN_CORE` - Sentry DSN for the Core app
- `XXX_SENTRY_DSN_DESKTOP` - Sentry DSN for the Desktop app
- `XXX_CONFORMITY_SERIES_CORE` - (Core app) A range of versions (major version) that matches of package.json, which were published commercially
- `XXX_BASELINE_VERSION_CORE` - (Core app) First CE-market release version
- `XXX_CONFORMITY_SERIES_DESKTOP` - (Desktop app) A range of versions (major version) that matches of package.json, which were published commercially
- `XXX_BASELINE_VERSION_DESKTOP` - (Desktop app) First CE-market release version
- `XXX_BASELINE_EFFECTIVE_DATE_CORE` - (Core app) The date of the first CE-market release
- `XXX_BASELINE_EFFECTIVE_DATE_DESKTOP` - (Desktop app) The date of the first CE-market release
- `XXX_INITIAL_RELEASE_DATE` - The date of the initial release of the game
- `XXX_STEAM_APP_ID` - the Steam App ID of the game
- `XXX_DEPOT_ID_WIN` - the Steam Depot ID for Windows version of the game
- `XXX_DEPOT_ID_MAC` - the Steam Depot ID for macOS version of the game
- `XXX_DEPOT_ID_LINUX` - the Steam Depot ID for Linux version of the game

## Secrets

The following secrets must be configured in your GitHub repository settings
(**Settings → Secrets and variables → Actions → Repository secrets**).

### `STEAM_USERNAME`

The username of a dedicated **Steam Build Account**.

This account must have the following permissions on your Steamworks app:

- _Edit App Metadata_
- _Publish App Changes To Steam_

Create a dedicated build account here:
https://partner.steamgames.com/doc/sdk/uploading#Build_Account

> **Do NOT use your personal Steam account.**

### `STEAM_CONFIG_VDF`

Base64-encoded `config.vdf` file from SteamCMD, used for Steam Guard authentication in CI.

**How to generate:**

1. Install [SteamCMD](https://partner.steamgames.com/doc/sdk/uploading#1) on your local machine.
2. Log in: `steamcmd +login <username> <password> +quit`
   (enter the Steam Guard MFA code when prompted).
3. Verify MFA is cached: `steamcmd +login <username> +quit`
   (should succeed without MFA prompt).
4. Encode `config.vdf`:
   - **Linux**: `cat config/config.vdf | base64 > config_base64.txt`
   - **macOS**: `cat ~/Library/Application\ Support/Steam/config/config.vdf | base64 > config_base64.txt`
5. Copy the contents of `config_base64.txt` and store as the `STEAM_CONFIG_VDF` secret.

> ⚠️ The encoded `config.vdf` contains sensitive authentication data.
> Never commit it to the repository. Rotate it periodically.
> If CI requests a new MFA code, re-run `steamcmd +login` locally and update the secret.
