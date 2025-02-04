---
title: 【命令】MySQL
published: 2025-01-22
description: ''
image: ''
tags: [journal]
category: '命令'
draft: false 
lang: ''
---

***目录***
<!-- toc -->

## MySQL安装
[mysql安装：（debian系统）]（https://www.racent.com/blog/405）

（其他教程的安装行不通，sudo apt也会报错，这篇不会报错，猜测是安装包是原因）

## 创建数据库
### 步骤 1: 登录 MySQL

使用 SSH 登录到你的服务器，然后运行以下命令登录 MySQL：
```zsh
mysql -u root -p
```
- -u root：表示以 root 用户登录。
- -p：提示你输入 root 用户的密码。

输入密码后，成功登录 MySQL 命令行后，会看到类似 mysql> 的提示符。

**以下都在“mysql>”环境中完成**

### 步骤 2: 创建新的数据库

运行以下命令创建一个数据库。例如，数据库名称为 typecho_db：
```sql
CREATE DATABASE typecho_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
- CHARACTER SET utf8mb4：确保数据库支持存储表情符号等特殊字符。
- COLLATE utf8mb4_general_ci：为字符集设置排序规则。

### 步骤 3: 创建一个用户

为 Typecho 创建一个新的用户（如 typecho_user），并设置密码（如 securepassword）：
```sql
CREATE USER 'typecho_user'@'localhost' IDENTIFIED BY 'securepassword';
```
- 'localhost'：限制用户只能从本地访问数据库。如果需要远程访问，可以替换为 %（所有地址）或指定的 IP。

### 步骤 4: 授予权限

将用户 typecho_user 的权限授予到 typecho_db 数据库：
```sql
GRANT ALL PRIVILEGES ON typecho_db.* TO 'typecho_user'@'localhost';
```
刷新权限以使更改生效：
```sql
FLUSH PRIVILEGES;
```
### 步骤 5: 验证创建&授权用户

运行以下命令查看数据库和用户是否创建成功：
1. 查看数据库：
```sql
SHOW DATABASES;
```
确保 typecho_db 在列表中。

2. 查看用户：
```sql
SELECT User, Host FROM mysql.user;
```
确保 typecho_user 在列表中。

3. 授权用户：
为用户分配权限后，刷新权限表：
```sql
GRANT ALL PRIVILEGES ON typecho_db.* TO 'tilly'@'%';
FLUSH PRIVILEGES;
```

### 步骤 6: 退出 MySQL

完成后，退出 MySQL 命令行：
```sql
EXIT;
```
### 步骤 7: 记录数据库信息

在安装 Typecho 时需要以下信息：
- 数据库名称：typecho_db
- 用户名：typecho_user
- 密码：securepassword
- 主机地址：localhost
