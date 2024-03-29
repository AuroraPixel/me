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

## 什么是 Redis:

Redis （Remote dictionary server）是一个基于 C 语言开发的开源数据库，与传统的 sql 数据库不同的是 redis 存储在内存中(内存数据库),这也就是 redis 读写非常快的原因，被广泛应用于缓存开发。基础存储格式 KV 类型。

Redis 提供了多种数据结构，如字符串、哈希、列表、集合、有范围查询的有序集合、位图、HyperLogLog、地理空间索引和流。Redis 具有内置的复制、Lua 脚本、LRU 驱逐、事务和不同级别的磁盘持久化，并通过 Redis Sentinel 提供高可用性，并通过 Redis Cluster 实现自动分区。

## 基础入门:

介绍 Redis10 大数据类型：string(字符串)、list(列表)、hash(哈希表)、Set(集合)、ZSet(有序集合)、地理空间(GEO)、HyperLogLog(redis 基础统计)、bitmap(redis 位图)、bitfield(redis 位域)、Stream(流)

<code class='li3-warning'>注意：</code>以下命令行中带<code class='li3'>[]</code>都表示可选参数，可以省略!

### key 相关基础命令:

<code class='li3'>keys \*</code> :查询所有的 key。(其中\*可以替换成其他参数)

参数支持 glob 样式模式匹配:

- h?llo 匹配 hello, hallo and hxllo
- h\*llo 匹配 hllo and heeeello
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

<code class='li3'>exists key [key ...]</code> :判断 key 是否存在。

用户应该注意，如果参数中多次提及相同的现有键，则会被多次计数。所以如果 somekey 存在，EXISTS somekey somekey 将返回 2。

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

<code class='li3'>type key</code> :判断 key 数据类型，当 key 不存在的时候返回为 none。

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

<code class='li3'>del key [key ...]</code> :删除指定的 key 数据，如果 key 不存在则会忽略，它是单线程阻塞的。

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

<code class='li3'>unlink key [key ...]</code> :删除指定的 key 数据，相对于 del 它是非阻塞的，该命令只是取消键与键空间的链接。实际的删除将在稍后异步发生。

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

<code class='li3'>ttl key</code> :查看 key 的过期时间，返回单位 s 。

从 Redis 2.8 开始，发生错误时的返回值发生了变化：

- -2 如果该键不存在，该命令将返回。
- -1 如果 key 存在但没有关联的过期时间，则该命令返回。

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

<code class='li3'>select index </code> :切换 redis 库的索引，一般默认为 0，总共[0-15]一个 16 个库。<code class='li3-warning'>在 redis 集群中不支持库索引的切换只支持 0 索引</code>

<code class='li3'>move key index </code> :将 key 移动到指定的库索引。

- 1：key 移动成功
- 0：key 移动失败

<code class='li3'>dbsize </code> :查询当前索引库中 key 的总数。

[Redis 官方命令大全](https://redis.io/commands)。

### String(字符串):

String 是 redis 最基本的类型：一个 key 对应一个 value <code class='li3-warning'>value 最大值是 512M</code>。

String 类型是二进制安全的。几乎可以存储所有数据类型，比如 jgp 或者序列号对象。

<code class='li3'>set key value [nx] </code> :当 key 不存在设置 key 的值为 value

<code class='li3'>set key value [xx] </code> :当 key 存在设置 key 的值为 value

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

<code class='li3'>set key value [ex 1000]|[px 1000] </code> :给 key 设置过期时间 [秒值]|[毫秒值]

<code class='li3'>set key value [exat 1000]|[pxat 1000] </code> :给 key 设置过期时间 [秒值的时间戳]|[毫秒值的时间戳]

<code class='li3-warning'>注意：</code>当 key 存在且没有指定过期时间那么这个 key 就会重置为-1(永不过期)。那如何给 key 设置新的值之后，如何才能保证 key 的过期沿用上一个呢？

<code class='li3'>set key newValue [keepttl]</code> :给 key 设置新的值，并保持上一个过期时间。

```c
> ttl key
(integer) 967
> set key ccc keepttl
"OK"
> ttl key
(integer) 948

```

<code class='li3'>mset key value [key value ...] </code> :批量设置 key value

<code class='li3'>msetnx key value [key value ...] </code> :批量设置 key value，<code class='li3-warning'>有一个 key 存在全部失效</code>

<code class='li3'>mget key [key ...] </code> :批量获取 key

<code class='li3'>getrange key start end </code> :获取 key 的从 start 到 end 的值。 <code class='li3-warning'>也可使用负数：1 表示最后一个字符，-2 表示倒数第二个字符，依此类推。</code>

```c
redis> SET mykey "This is a string"
"OK"
redis> GETRANGE mykey 0 3
"This"
redis> GETRANGE mykey -3 -1
"ing"
redis> GETRANGE mykey 0 -1
"This is a string"
redis> GETRANGE mykey 10 100
"string"
redis>

```

<code class='li3'>setrange key offset value </code> :从 key 的 value 第 offset 开始设置 value

```c
redis> SET key1 "Hello World"
"OK"
redis> SETRANGE key1 6 "Redis"
(integer) 11
redis> GET key1
"Hello Redis"
redis>


redis> SETRANGE key2 6 "Redis"
(integer) 11
redis> GET key2
"Redis"
redis>
```

### list(列表):

底层原理是一个双端列表的结构，容量是(2^32)-1 个元素，大概 40 多亿，主要功能 push/pop 等，使用场景在栈、队列、消息队列等。

![list原理图](/static/images/redis/list.png)

<code class='li3'>lpush key element [element ...]</code> : 从 key 的列表左边添加元素 element

<code class='li3'>rpush key element [element ...]</code> : 从 key 的列表右边添加元素 element

<code class='li3'>lrange key start stop</code> : 从左 start 开始到右 end 遍历 list

<code class='li3'>lpop key [count] stop</code> : 从左取出[count]，默认是 1 个元素

<code class='li3'>rpop key [count] stop</code> : 从右取出[count]，默认是 1 个元素

<code class='li3'>lindex key index </code> : 查看 key 中第 index 个元素

<code class='li3'>llen key </code> : 查看 key 中元素的个数

<code class='li3'>lrem key count element </code> : 删除 key 中 count 个 element 元素

<code class='li3'>ltrim key start end </code> : 截取 key 中 start 到 end 的元素，其余舍弃

```c
> lrange list 0 -1
1) "4"
2) "3"
3) "2"
4) "1"
5) "1"
6) "1"

> ltrim list 1 3
"OK"

> lrange list 0 -1
1) "3"
2) "2"
3) "1"

```

<code class='li3'>rpoplpush key key1 </code> : 组合命令，从 key 右取一个元素，左塞入 key1

<code class='li3'>lset key index element </code> : 将 key 的第 index 元素改编为 element <code class='li3-warning'>注意：</code>索引不存在会报索引越界

<code class='li3'>linsert key [before|after] pivot element </code> : 在 key 的已有元素 pivot 的前(后)塞入 element

- 0:key 不存在
- -1:pivot 在 list 中不存在

使用场景：论坛中某人订阅不同消息，可以将消息的 id 存入 redis 的 list 中。

### hash:

## 最后

接下来我将计划用 Go 仿写一个 Redis 数据库，敬请期待!。
