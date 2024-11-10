---
title: 【ADS】模拟卷题解
published: 2024-11-05
description: '尚未完工，可能存在纰漏'
image: ''
tags: [ADS]
category: 'notes'
draft: false 
lang: ''
---
## 模拟一
### 判断题
R1-1
![[截屏2024-11-05 19.26.16.png]](/media/12.png)
F

考点：时间复杂度的表示含义，数量级比较

![[截屏2024-11-05 19.26.33.png]](/media/111.png)
F

考点：skew heap, merge 操作, amortized cost计算, potential functions记忆

![[截屏2024-11-05 19.26.46.png]](/media/13.png)
?

【knapsack problem】背包问题

【approximation ratio】近似度；近似比

考点：背包问题，贪心算法，packing rule

![[截屏2024-11-05 19.26.56.png]](/media/14.png)
T

题解：假设最小情况：由于AVL的子树还是AVL，所以我们可以作图递推前几个，发现$f_n = f_{n-2} + f_{n-1} + 1$，所以最少是33个。显然还可以再加2个变成35，题干正确。

![[截屏2024-11-05 19.27.13.png]](/media/15.png)
T

考点：Divide && Conquer公式记忆（多种方法？条件？）

解析：主方法形式三失效了。但是题干假设我们已知时间复杂度，符合代换法”先猜后证“条件，用代换法证明。

![[截屏2024-11-05 19.27.29.png]](/media/16.png)
T

考点：leftest heap定义，merge操作（时间复杂度？）
![[截屏2024-11-05 19.27.38.png]](/media/17.png)
?

NP没学

### 单选题
![[截屏2024-11-05 19.32.42.png]](/media/18.png)
【balanced binary tree parallel algorithm】

考点：并行计算，求前缀和

![[截屏2024-11-05 19.33.43.png]](/media/19.png)
D

考点：binomial queues, deleteMin操作

![[截屏2024-11-05 19.34.22.png]](/media/20.png)
D

考点：【贪心】任务排序问题

分析：这类题型的关键能力是构造反例。
> 如何构造：
> - 从简构造，比如只有两个任务（最少）的情况
> - 根据题干写约束条件，列方程求解，得反例（？……TBC）
题解：感谢[@Xecades 大佬](https://xecades.xyz/)贡献的D选项证明！如下：![](/img/ADS1/WechatIMG216.jpg)
B、C选项容易构造出反例。如：d1=5，t1=3，d2=2，t2=1

![[截屏2024-11-05 19.34.51.png]](/media/21.png)
A

考点：(倒排索引)  precision && recall 计算

![[截屏2024-11-05 19.35.41.png]](/media/22.png)
？

【binary counter】

考点：二项式堆的势能函数，摊还分析

![[截屏2024-11-05 19.37.08.png]](/media/23.png)
考点：对分治法conqure和merge代价的式子理解

![[截屏2024-11-05 19.37.42.png]](/media/24.png)
A

考点：binomial queues的数组表示？

![[截屏2024-11-05 19.38.29.png]](/media/25.png)
考点：【动规/贪心】背包问题（考的蛮多的感觉）

![[截屏2024-11-05 19.39.03.png]](/media/26.png)
考点：NP没学

![[截屏2024-11-05 19.40.58.png]](/media/27.png)
D

考点：skew heap，merge操作

![[截屏2024-11-05 19.41.42.png]](/media/28.png)
D

考点：skew heap，merge操作

![[截屏2024-11-05 19.42.30.png]](/media/29.png)
A

考点：Divide && Conquer公式记忆

![[截屏2024-11-05 19.43.05.png]](/media/30.png)
D

考点：splay tree的find操作（带基本spaly操作）

![[截屏2024-11-05 19.43.51.png]](/media/31.png)
A？

考点：不会做

![[截屏2024-11-05 19.44.20.png]](/media/32.png)
B

考点：B+树（B+树的定义好多有分歧，见我的[平板笔记](https://tillyendless.github.io/posts/adsavlsplayrbb%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98%E6%95%B4%E7%90%86%E5%B9%B3%E6%9D%BF%E7%AC%94%E8%AE%B0)