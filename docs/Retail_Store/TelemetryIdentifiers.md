# Telemetry Identifiers

The following is a comprehensive list of all diagnostic and telemetry identifiers currently configured to safely transmit to the Firebase backend from the application. These parameters are strictly limited to non-personal information, app health, and hardware bucketing.

## 1. Application Launch Identifiers
These fields are sent under `type: "app_launch"` unconditionally when the application is booted online:

* **`type`**: "app_launch" (Indicates the event category)
* **`install_id`**: A random offline UUID created during the first run. (e.g., `d274dc5d-f153-488b-b1e1-1eabe958ca0d`)
* **`app_version`**: The static application version string (e.g., `1.0.0`)
* **`build_number`**: The static compilation build number (e.g., `1000`)
* **`release_channel`**: The deployment channel of the application (e.g., `production`)
* **`timestamp`**: The UTC exact time the payload was constructed (e.g., `2026-03-11T05:00:00.0000000Z`)
* **`first_run_at`**: The UTC timestamp of the very first time the application was launched.
* **`last_seen_at`**: The UTC timestamp of the previous application launch.
* **`windows_version`**: The exact version description of the underlying OS. (e.g., `Microsoft Windows 10.0.19045`)
* **`os_architecture`**: The underlying CPU runtime architecture. (e.g., `X64`)
* **`dotnet_runtime_version`**: The framework that is orchestrating the code. (e.g., `.NET 8.0.0`)
* **`ram_bucket`**: An approximated bucket representing system memory. (e.g., `8-16GB`, `16-32GB`)
* **`cpu_core_bucket`**: An approximated bucket representing logical processors. (e.g., `1-2 Cores`, `9-16 Cores`)
* **`screen_resolution_bucket`**: An approximated bucket representing monitor limits. (e.g., `FHD (1080p-1440p)`)
* **`country_setting`**: The active 2-letter ISO country code fetched via a live IP ping to `ip-api.com` without storing the raw IP (e.g., `NL`, `US`). Falls back to Windows Region if offline.
* **`currency_setting`**: The local 3-letter currency symbol configured in Windows (e.g., `USD`, `EUR`).
* **`startup_time_bucket_ms`**: A hardcoded mock field placeholder for update checking implementations (`1000-2000`).
* **`feature_flags`**: An array of active feature toggles (e.g., `["new_checkout", "tax_inclusive"]`).
* **`last_update_prompt_at`**: A nullable timestamp of when the user was last prompted to update.
* **`last_update_installed_at`**: A nullable timestamp of when the last update completed.
* **`crash_count`**: The local, persistent count of how many unhandled exceptions the client has experienced since install.
* **`days_since_install`**: A calculated delta between today and `first_run_at`. (e.g., `0`, `5`)
* **`days_since_last_seen`**: A calculated delta between today and `last_seen_at`. (e.g., `1`)
* **`internet_status`**: Forced to `true` (as reaching Firebase inherently implies the network is alive).
* **`app_launched_count`**: An offline persistent integer incremented on every single application execution.

## 2. Application Error Identifiers
These fields are sent under `type: "error"` unconditionally when the application experiences a fatal exception that shuts the program down.

* **`type`**: "error" (Indicates a crash log)
* **`install_id`**: The same device UUID as above to map crashes to installations.
* **`app_version`**: The version number during the crash.
* **`timestamp`**: The UTC time the crash occurred.
* **`error_category`**: The native .NET Exception name (e.g., `NullReferenceException`, `SqliteException`).
* **`error_message`**: The short technical description natively returned by the .NET Exception runtime.
* **`operation_name`**: The origin category of the crash (defaults to `"unhandled_exception"`).
* **`crash_count`**: The new updated number of total crashes this client has experienced after adding this fatal event.
