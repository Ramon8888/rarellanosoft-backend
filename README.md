<img width="120px" src="https://rarellano-soft.com/assets/img/logoRarellano.png">

# Backend R Arellano Soft 

This project is the main app for R Arellano Group

#### Dependences

* Node version **18.12.1**
* NPM version **8.19.2**
* MariaDB version **10.7.8**

---
#### Installation

Use the package manager npm to install dependencies.

```bash
npm i
```
---

#### Environment variables
Rename **example.env file** to **.env**
| Name | Value |
|-|-|
DB_DATABASE | db_name 
DB_USERNAME|db_user
DB_PASSWORD|db_password
DB_HOST|db_host
DB_DIALECT|mysql 
ENV|dev or production
APP_HOST|app_port
APP_SUPER_USER|super_user_email
APP_PASSWORD|super_user_password
APP_SUPER_USER_PHONE|super_user_phone
APP_SUPER_USER_ROLE|ra_super_user
APP_AUTH|rarellano_soft_app
JWT_KEY|jwt_key
SMTP_USER|email_account_smtp
SMTP_PASSWORD|email_password_smtp
SMTP_HOST|email_host_smtp
SMTP_PORT|email_smtp_port
URL_APP_AUTH_FRONT|url_frontend_allowed
URL_APP_AUTH_RECOVERY_PASS|'url_frontend_to_recovery_password'
URL_APP_AUTH_ACTIVATE_ACCOUNT|'url_frintend_to_activate_account'
---

#### Start app
```bash
npm run go
```



#### License
[R Arellano Soft](https://rarellano-soft.com/)