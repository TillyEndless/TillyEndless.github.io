---
title: 【ADS】并行化算法
published: 2024-12-16
description: ''
image: ''
tags: [notes]
category: 'ADS'
draft: false 
lang: ''
---
# 并行算法公式和结论

<!-- toc -->



## 1. 并行随机访问机（PRAM）模型
### 1.1 模型基础
- **单位时间操作**：  
  读、写、计算均为单位时间完成。

- **多处理器并发模型**：  
  - 共享内存架构，处理器通过**独占读/写**或**并发读/写**访问内存。

---

## 2. 工作-深度（Work-Depth）模型
### 2.1 公式定义
- 总工作量：  
  $W = \text{树中所有节点的总数}$

- 深度：  
  $D = \text{树的高度}$

- 并行运行时间（P个处理器）：  
  $$T = O\left(\frac{W}{P} + D\right)$$

- **含义**：
  - 第一项：$\frac{W}{P}$ 表示工作量被 $P$ 个处理器分摊后每个处理器的负担。
  - 第二项：$D$ 表示所有处理器必须经历的计算树深度。

### 2.2 WD-模式充分性定理
- 若一个算法在 WD 模式下表示为：  
  $O(W, D)$  
  则可以使用 $P$ 个处理器在以下时间内实现：  
  $$T = O\left(\frac{W}{P} + D\right)$$

---

## 3. 并行算法案例
### 3.1 前缀和问题（Prefix-Sum）
- **输入**：  
  $A(1), A(2), \dots, A(n)$  

- **输出**：  
  $\text{Prefix-Sum: } S_i = \sum_{j=1}^i A(j)$

- **公式**：
  - 树状求和：
    $$B(h, i) = B(h-1, 2i-1) + B(h-1, 2i)$$  
    其中 $h = 1, 2, \dots, \log n$，$i = 1, 2, \dots, n/2^h$。

  - 输出：
    $$S(i) = B(\log n, 1)$$

- **复杂度**：
  - 深度：
    $$D = O(\log n)$$
  - 工作量：
    $$W = O(n)$$

---

### 3.2 并行求和问题
- **公式**：
  - 输入：
    $A(1), A(2), \dots, A(n)$

  - 每一步递归：
    $$B(h, i) = B(h-1, 2i-1) + B(h-1, 2i)$$  
    其中 $h = 1, 2, \dots, \log n$，$i = 1, 2, \dots, n/2^h$。

  - 输出：
    $$\text{Sum} = B(\log n, 1)$$

- **复杂度**：
  - 深度：  
    $$D = O(\log n)$$
  - 工作量：  
    $$W = O(n)$$

---

### 3.3 最大值问题
- **公式**：
  - 替代求和中的加法为取最大值：  
    $$B(h, i) = \max\left(B(h-1, 2i-1), B(h-1, 2i)\right)$$

  - 输出：  
    $$\text{Max} = B(\log n, 1)$$

- **复杂度**：
  - 深度：  
    $$D = O(\log n)$$
  - 工作量：  
    $$W = O(n)$$

---

### 3.4 归并排序中的并行排名问题
- **定义**：  
  给定两个已排序数组 $A$ 和 $B$，将其合并为一个有序数组 $C$。

- **公式**：
  - 排名问题定义：
    $$\text{RANK}(j, A) = i \quad \text{若 } A(i) < B(j) < A(i+1)$$

  - 排名公式：
    $$C(i + \text{RANK}(i, B)) = A(i)$$  
    $$C(i + \text{RANK}(i, A)) = B(i)$$

- **复杂度**：
  - 排名：二分搜索：  
    $$O(\log n)$$
  - 合并工作量：  
    $$W = O(n+m)$$

---

## 4. 随机采样与概率分析
### 4.1 随机采样求最大值
- **算法过程**：
  1. 随机从输入 $A$ 中抽取 $B(n^{7/8})$ 个元素。
  2. 用 $B$ 估算 $A$ 的最大值 $M$。
  3. 若 $A$ 中仍存在大于 $M$ 的元素，重复抽样。

- **复杂度**：
  - 高概率下，深度：
    $$D = O(1)$$
  - 工作量：
    $$W = O(n)$$

---

## 5. MapReduce 模型
### 5.1 MapReduce 框架公式
- **模型公式**：
  - **Map**：
    $$(\text{Key}, \text{Value}) \to (\text{Intermediate Key}, \text{Intermediate Value})$$
  - **Reduce**：
    $$(\text{Intermediate Key}, [\text{Intermediate Values}]) \to (\text{Key}, \text{Result})$$