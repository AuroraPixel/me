---
title: redis7.0从入门到精通
date: 2023/9/5 09:00:00
lastmod: 2023/9/5 09:00:00
tags: [Redis]
draft: false
summary: 在本文中，我将学习和分析redis相关技术点。
images: '/static/images/redis/bg.png'
authors: ['default']
layout: PostLayout
---

## 什么是Redis:

Redis （Remote dictionary server）是一个基于C语言开发的开源数据库，与传统的sql数据库不同的是redis存储在内存中(内存数据库),这也就是redis读写非常快的原因，被广泛应用于缓存开发。基础存储格式KV类型。

Redis提供了多种数据结构，如字符串、哈希、列表、集合、有范围查询的有序集合、位图、HyperLogLog、地理空间索引和流。Redis具有内置的复制、Lua脚本、LRU驱逐、事务和不同级别的磁盘持久化，并通过Redis Sentinel提供高可用性，并通过Redis Cluster实现自动分区。

## 基础入门:
介绍Redis10大数据类型：string(字符串)、list(列表)、hash(哈希表)、Set(集合)、ZSet(有序集合)、地理空间(GEO)、HyperLogLog(redis基础统计)、bitmap(redis位图)、bitfield(redis位域)、Stream(流)

<code class='li3-warning'>注意：</code>以下命令行中带<code class='li3'>[]</code>都表示可选参数，可以省略!

### key相关基础命令:

<code class='li3'>keys \*</code> :查询所有的key。(其中*可以替换成其他参数)

参数支持glob样式模式匹配:
- h?llo 匹配 hello, hallo and hxllo
- h*llo 匹配 hllo and heeeello
- h[ae]llo 匹配 hello and hallo, but not hillo
- h[^e]llo 匹配 hallo, hbllo, ... but not hello
- h[a-b]llo 匹配 hallo and hbllo

示例:

```c
redis> MSET firstname Jack lastname Stuntman age 35
"OK"
redis> KEYS *name*
1) "firstname"
2) "lastname"
redis> KEYS a??
1) "age"
redis> KEYS *
1) "firstname"
2) "age"
3) "lastname"
redis> 

```

<code class='li3'>exists key [key ...]</code> :判断key是否存在。

用户应该注意，如果参数中多次提及相同的现有键，则会被多次计数。所以如果somekey存在，EXISTS somekey somekey将返回2。

示例:

```c
redis> SET key1 "Hello"
"OK"
redis> EXISTS key1
(integer) 1
redis> EXISTS nosuchkey
(integer) 0
redis> SET key2 "World"
"OK"
redis> EXISTS key1 key2 nosuchkey
(integer) 2
redis> 

```

<code class='li3'>type key</code> :判断key数据类型，当key不存在的时候返回为none。

示例:

```c
redis> SET key1 "value"
"OK"
redis> LPUSH key2 "value"
(integer) 1
redis> SADD key3 "value"
(integer) 1
redis> TYPE key1
"string"
redis> TYPE key2
"list"
redis> TYPE key3
"set"
redis> 

```

<code class='li3'>del key [key ...]</code> :删除指定的key数据，如果key不存在则会忽略，它是单线程阻塞的。

示例:

```c
redis> SET key1 "Hello"
"OK"
redis> SET key2 "World"
"OK"
redis> DEL key1 key2 key3
(integer) 2
redis> 

```

<code class='li3'>unlink key [key ...]</code> :删除指定的key数据，相对于del它是非阻塞的，该命令只是取消键与键空间的链接。实际的删除将在稍后异步发生。

示例:

```c
redis> SET key1 "Hello"
"OK"
redis> SET key2 "World"
"OK"
redis> UNLINK key1 key2 key3
(integer) 2
redis>  

```

<code class='li3'>ttl key</code> :查看key的过期时间，返回单位 s 。

从 Redis 2.8 开始，发生错误时的返回值发生了变化：

- -2如果该键不存在，该命令将返回。
- -1如果key存在但没有关联的过期时间，则该命令返回。

示例:

```c
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> 

```

<code class='li3'>select index </code> :切换redis库的索引，一般默认为0，总共[0-15]一个16个库。<code class='li3-warning'>在redis集群中不支持库索引的切换只支持0索引</code>

<code class='li3'>move key index </code> :将key移动到指定的库索引。
- 1：key移动成功
- 0：key移动失败

<code class='li3'>dbsize </code> :查询当前索引库中key的总数。

[Redis官方命令大全](https://redis.io/commands)。



### String(字符串):
String是redis最基本的类型：一个key对应一个value  <code class='li3-warning'>value最大值是512M</code>。

String类型是二进制安全的。几乎可以存储所有数据类型，比如jgp或者序列号对象。

<code class='li3'>set key value [nx] </code> :当key不存在设置key的值为value

<code class='li3'>set key value [xx] </code> :当key存在设置key的值为value
```c
> set bike:1 Deimos
    OK
> get bike:1
   "Deimos"
> set bike:1 bike nx  //当key不存在设置key的值为value
    (nil)
> set bike:1 bike xx  //当key存在设置key的值为value
    OK
```

<code class='li3'>set key value [get] </code> :给设置新的值并返回旧的值

```c
> set key aa
"OK"
> get key
"aa"
> set key bb get
"aa"
> get key
"bb"

```
<code class='li3'>set key value [ex 1000]|[px 1000] </code> :给key设置过期时间 [秒值]|[毫秒值]


<code class='li3'>set key value [exat 1000]|[pxat 1000] </code> :给key设置过期时间 [秒值的时间戳]|[毫秒值的时间戳]

<code class='li3-warning'>注意：</code>当key存在且没有指定过期时间那么这个key就会重置为-1(永不过期)。那如何给key设置新的值之后，如何才能保证key的过期沿用上一个呢？

<code class='li3'>set key newValue [keepttl]</code> :给key设置新的值，并保持上一个过期时间。
```c
> ttl key
(integer) 967
> set key ccc keepttl
"OK"
> ttl key
(integer) 948

```

## 最后

接下来我将计划用Go仿写一个Redis数据库，敬请期待!。





