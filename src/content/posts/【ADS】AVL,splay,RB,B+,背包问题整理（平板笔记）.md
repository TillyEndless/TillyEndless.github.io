---
title: 【ADS】AVL,splay,RB,B+,背包问题整理（平板笔记）
published: 2024-11-05
description: ''
image: ''
tags: [ADS]
category: 'notes'
draft: false 
lang: ''
---
## 目录
- [AVL树 && Splay树](#avl%E6%A0%91--splay%E6%A0%91)
- [红黑树](#%E7%BA%A2%E9%BB%91%E6%A0%91)
- [B+树](#b%E6%A0%91)
- [背包问题](#%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98)

## AVL树 && Splay树
![](/img/ADS1/WechatIMG183.jpg)
![](/img/ADS1/WechatIMG184.jpg)
## 红黑树
![](/img/ADS1/WechatIMG185.jpg)
## B+树
![](/img/ADS1/WechatIMG186.jpg)
勘误：B+树性质3去掉，不是所有非叶节点的子树都含有它自身。这个性质只对最下面一层非叶节点有效。
备注：$M/2 + 1$就是$M/2$向上取整。
![](/img/ADS1/WechatIMG187.jpg)
B+树最好看一下作业题。
### 补充：
* 一棵 3 阶 B+ 树，我们也称之为一棵 2-3 树。
* 一棵 4 阶 B+ 树，我们也称之为一棵 2-3-4 树。一般 M 的选择为 3 或 4。
* ![](/img/ADS1/1.png)
## 背包问题
![](/img/ADS1/WechatIMG188.jpg)
![](/img/ADS1/WechatIMG189.jpg)
