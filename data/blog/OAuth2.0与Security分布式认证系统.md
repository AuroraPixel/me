---
title: 分布式认证系统
date: 2023/9/15 09:00:00
lastmod: 2023/9/15 09:00:00
tags: [ oauth2.0,分布式,java ]
draft: false
summary: 在本文中，我将介绍auth2.0+SpringCloudSecurity搭建分布式认证系统。
images: '/static/images/oauth/oauth2.png'
authors: [ 'default' ]
layout: PostLayout
---

## 认证技术方案:

基于token的认证方式，服务端不存储认证数据，易维护扩展性强，客户端可以把token存在任意地方，并且可以实现web和app以及其它平台的统一认证机制。缺点：token本身携带用户登录的相关信息，因此每次请求都需要传递给服务器，并且服务器都需要进行token解析占用cpu内存。

- 适合统一认证机制（客户端、一方应用、三方应用）统一遵循的认证的机制。
- token认证对第三方的接入更适合，因为它开方，可以使用当前的流行的开方协议Oauth2.0+jwt等。
- 无需要会话存储等复杂操作，减轻服务器和开发者的压力。

![原理图](/static/images/oauth/token认证.png)

## OAuth2.0介绍:
OAuth2.0是一个开放标准，允许用户授权第三方应用访问他们存储在别的服务器提供者的信息，而不需要将用户和密码提供给第三方应用或分享他们的数据所有内容。OAuth2.0(OAuth1.0基本已经废弃)有着许多大公司的支持如Google,Yahoo,Microsoft等都提供了OAuth2.0认证方式。
[OAuth2.0官网](https://oauth.net/2/)。

![原理图](/static/images/oauth/oauth2流程图.png)

## 开发环境搭建:

## JWT令牌:





