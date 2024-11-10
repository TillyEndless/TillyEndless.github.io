---
title: 【ADS】期中复习
published: 2024-11-05
description: ''
image: ''
tags: [ADS]
category: 'notes'
draft: false 
lang: ''
---
## 目录
- [Leftest Heap VS Skew Heap](#leftest-heap-vs-skew-heap)
  * [定义](#%E5%AE%9A%E4%B9%89)
    + [左偏堆](#%E5%B7%A6%E5%81%8F%E5%A0%86)
    + [斜堆](#%E6%96%9C%E5%A0%86)
  * [操作：合并](#%E6%93%8D%E4%BD%9C%E5%90%88%E5%B9%B6)
    + [左偏堆](#%E5%B7%A6%E5%81%8F%E5%A0%86-1)
    + [斜堆](#%E6%96%9C%E5%A0%86-1)
  * [摊还分析 ：斜堆](#%E6%91%8A%E8%BF%98%E5%88%86%E6%9E%90-%E6%96%9C%E5%A0%86)
  * [习题](#%E4%B9%A0%E9%A2%98)
- [补充：左偏堆单点删除](#%E8%A1%A5%E5%85%85%E5%B7%A6%E5%81%8F%E5%A0%86%E5%8D%95%E7%82%B9%E5%88%A0%E9%99%A4)
- [Divide && Conquer 时间复杂度计算（公式）](#divide--conquer-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E8%AE%A1%E7%AE%97%E5%85%AC%E5%BC%8F)
  * [主方法形式三](#%E4%B8%BB%E6%96%B9%E6%B3%95%E5%BD%A2%E5%BC%8F%E4%B8%89)
  * [其他形式&方法的理解](#%E5%85%B6%E4%BB%96%E5%BD%A2%E5%BC%8F%E6%96%B9%E6%B3%95%E7%9A%84%E7%90%86%E8%A7%A3)

## Leftest Heap VS Skew Heap
### 定义
#### 左偏堆
先来看左偏堆对dist的定义：
一个左偏堆的结点维护了左右子堆的地址、自身的键值、和一个“**距离(dist)**”。
```c
struct LeftistHeapNode {
    ElementType val;
    int dist;
    LeftistHeapNode * ls, * rs;
};
```
一共定义了四个”部件“，不难类比到，左偏堆对dist的维护相当于AVL Tree对height的维护，左偏堆->斜堆，可以类比为 AVL ->splay，是一种对维护信息负担的化简。
![截屏2024-11-05 20.20.10.png](/media/1.png)
从第二点可以看出，dist是**递归**定义的。
从dist定义左偏堆：
![截屏2024-11-05 20.25.36.png](/media/2.png)

#### 斜堆
再来看斜堆的定义特点。
斜堆只定义了val,\*rchild,\*lchild,相比左偏堆少了对dist的维护。
斜堆的好处是能够快速合并，实现完全自上而下的并发操作。
下面讲merge操作：

### 操作：合并
#### 左偏堆
**先维护堆的性质**，在**回溯时维护左偏性质**。
即先自上而下按照根的大小合并（根节点和左子树），再自下而上maintain（维护左偏性质，进行左右子树交换）
形式也分为两种方式：**递归式**和**迭代式**。迭代式需要额外维护两个指针，分别指向两棵树*还没被合并* 的子树的根，并不断选择较小的那个合并进去，直到两个指针都为空。

**递归式代码：**
```c
LeftistHeapNode * merge(LeftistHeapNode * x, LeftistHeapNode * y) {
    if (x == NULL) return y;
    if (y == NULL) return x;
    if (x->val > y->val) {
        swap(x, y);
    }//小根堆
    x->rs = merge(x->rs, y);//自上而下合并
    if (x->ls->dist == NULL || x->ls->dist < x->rs->dist) {
        swap(x->ls, x->rs);
    }//维护交换根节点
    x->dist = x->rs->dist + 1;
    return x;
}
```
**迭代式代码：**
```c
LeftistHeapNode * merge(LeftistHeapNode * x, LeftistHeapNode * y) {
    LeftistHeapNode * tx = x, * ty = y;
    LeftistHeapNode * res = NULL, * cur = NULL;
    while (tx != NULL && ty != NULL) {
        if (tx->val > ty->val) {
            swap(tx, ty);
        }
        if (res == NULL) {//res保留返回的根节点
            res = tx;
            cur = tx;
        } else {
            cur->rs = tx;
            cur = cur->rs;//合并
        }
        tx = tx->rs;//递归
    }
    while (ty != NULL) {
        if (res == NULL) {
            res = ty;
            cur = ty;
        } else {
            cur->rs = ty;
            cur = cur->rs;
        }
        ty = ty->rs;
    }
    res = adjust(res);
    return res;
}
```
迭代式有些很好的动画，方便理解：[修佬的笔记](https://note.isshikih.top/cour_note/D2CX_AdvancedDataStructure/Lec04/#%E8%BF%AD%E4%BB%A3%E5%BC%8F)

#### 斜堆
最大的区别：**合并后无条件交换**

### 摊还分析 ：斜堆
* 势能函数：**Φ(Heap)=number of heavy node in Heap**
	* 对于一个子堆 H，如果右子堆大小+1 ≥ 整个堆大小$*(1/2)$（左边+1是因为包括根节点） ，则 H 是**heavy node**，否则是**light node**。
  摊还证明：![[截屏2024-11-05 22.10.20.png]](/media/3.png)![[截屏2024-11-05 22.18.49.png]](/media/4.png)![[截屏2024-11-05 22.19.21.png]](/media/6.png)
  至于为什么light nodes的数量是$O(logN)$，课堂上已经证明过（可以预设light nodes最多的情况来作图，数学归纳法证明。

### 习题

![[截屏2024-11-05 19.26.33.png]](/media/111.png)
F
考点：skew heap, merge 操作, amortized cost计算, potential functions记忆

## 补充：左偏堆单点删除
（这个也忘记了，盘一下细节）
操作：只需要**合并**被删除的结点的两个子结点，得到新的树根节点去代替被删除的结点，再在回溯的过程中 bottom-up 地更新 dist 即可。
回溯maintain的过程：只要从新根节点开始检查/交换，因为**左偏堆的子树都是左偏堆**

代码实现：
```c
LeftistHeapNode * del(LeftistHeapNode * cur, ElementType x) {
    if (cur->val == x) {
        return merge(cur->l, cur->r);
    } else {
        if (cur->val > x) return cur;//小根堆，找不到就返回cur指针
        if (cur->l != NULL) del(cur->l, x);
        if (cur->r != NULL) del(cur->r, x);
        adjust(cur);//回溯操作
    }
}
```
## Divide && Conquer 时间复杂度计算（公式）
直接看[修佬笔记](https://note.isshikih.top/cour_note/D2CX_AdvancedDataStructure/Lec07/#%E5%A4%8D%E6%9D%82%E5%BA%A6%E5%88%86%E6%9E%90)

总结一下：
三类方法：代换法、递归树法、主方法
### 主方法形式三
考试一般会用到的是主方法第三种形式：![[截屏2024-11-05 22.28.18.png]](/media/7.png)

### 其他形式&方法的理解
* 代换法：先猜后证，证明时用放缩方法。
* 递归树法：等比数列求和；画出图![[截屏2024-11-05 23.03.14.png]](/media/8.png)
	* 可能需要运用数学工具：![[截屏2024-11-05 23.04.28.png]](/media/9.png)（巧记：最上面和最下面换一下）
* 主方法形式一（有人能记住吗）![[截屏2024-11-05 23.11.11.png]](/media/10.png)
* 主方法形式二![[截屏2024-11-05 23.11.29.png]](/media/11.png)


## Binomial Tree && Binomial Queue
### Binomial Tree
* 二项树是一个 N 叉树，所以通常我们使用链表 sibling 的形式来表示一个节点的 children。
* 性质：
	* ![[1.png]](/media/123/1.png)
	* 二项树满足堆的性质，即 parent 节点的值小于（大于） child 节点的值
	*   k 阶二项树都是同构的（k 阶二项树结构唯一确定），且 k 阶二项树是两个 k−1 阶二项树合并得到的。而其合并方式是直接令其中一棵成为另外一棵的根的新 child，因此二项树的每个 child 也是二项树。
* k阶二项树：$B_k$
### Binomial Queue：TBC
* 重要联系/工具:二进制表示
* N个节点，则有$O(logN)$个二项树
* 操作
	* 队列合并：从小到大合并（**从低位到高位**）。
	* 查询队首：![[ADS/media/123/2.png]](/media/123/2.png)


## Precision && Recall 计算
![[ADS/media/123/3.png]](/media/123/3.png)
precision：遍历（retrieved）到的
recall：相关（relevant）的
（为啥叫recall??）

## B+树
参考[我的平板笔记](https://tillyendless.github.io/posts/adsavlsplayrbb%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98%E6%95%B4%E7%90%86%E5%B9%B3%E6%9D%BF%E7%AC%94%E8%AE%B0/#b%E6%A0%91)
## 红黑树
参考[我的平板笔记](https://tillyendless.github.io/posts/adsavlsplayrbb%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98%E6%95%B4%E7%90%86%E5%B9%B3%E6%9D%BF%E7%AC%94%E8%AE%B0/#%E7%BA%A2%E9%BB%91%E6%A0%91)
> 红黑树的操作动画：
> - [红黑树 - 定义, 插入, 构建]( https://www.bilibili.com/video/BV1Xm421x7Lg/?share_source=copy_web&vd_source=759a6191b199b3735f0e3c6d6f33d199)
> - [红黑树 - 删除]( https://www.bilibili.com/video/BV16m421u7Tb/?share_source=copy_web&vd_source=759a6191b199b3735f0e3c6d6f33d199)

## Backtracking
### The Turnpike Reconstruction Problem 收费站问题
[🔗修佬的笔记](https://note.isshikih.top/cour_note/D2CX_AdvancedDataStructure/Lec06/#%E6%A1%88%E4%BE%8B-the-turnpike-reconstruction-problem)
![[截屏2024-11-10 11.37.06.png]](/media/33.png)
代码实现：
```c
bool Reconstruct ( DistType X[ ], DistSet D, int N, int left, int right )
{ /* X[1]...X[left-1] and X[right+1]...X[N] are solved */
    bool Found = false;
    if ( Is_Empty( D ) )
        return true; /* solved */
    D_max = Find_Max( D );
    /* option 1：X[right] = D_max */
    /* check if |D_max-X[i]|D is true for all X[i]’s that have been solved */
    OK = Check( D_max, N, left, right ); /* pruning */
    if ( OK ) { /* add X[right] and update D */
        X[right] = D_max;
        for ( i=1; i<left; i++ )  Delete( |X[right]-X[i]|, D);
        for ( i=right+1; i<=N; i++ )  Delete( |X[right]-X[i]|, D);
        Found = Reconstruct ( X, D, N, left, right-1 );
        if ( !Found ) { /* if does not work, undo */
            for ( i=1; i<left; i++ )  Insert( |X[right]-X[i]|, D);
            for ( i=right+1; i<=N; i++ )  Insert( |X[right]-X[i]|, D);
        }
    }
    /* finish checking option 1 */
    if ( !Found ) { /* if option 1 does not work */
        /* option 2: X[left] = X[N]-D_max */
        OK = Check( X[N]-D_max, N, left, right );
        if ( OK ) {
            X[left] = X[N] – D_max;
            for ( i=1; i<left; i++ )  Delete( |X[left]-X[i]|, D);
            for ( i=right+1; i<=N; i++ )  Delete( |X[left]-X[i]|, D);
            Found = Reconstruct (X, D, N, left+1, right );
            if ( !Found ) {
                for ( i=1; i<left; i++ ) Insert( |X[left]-X[i]|, D);
                for ( i=right+1; i<=N; i++ ) Insert( |X[left]-X[i]|, D);
            }
        }
        /* finish checking option 2 */
    } /* finish checking all the options */
    
    return Found;
}
```
### Backtracing代码模板
可以类比Turnpike Reconstruction的代码
```c
bool Backtracking ( int i )
{   Found = false;
    if ( i > N )
        return true; /* solved with (x1, …, xN) */
    for ( each xi  Si ) { 
        /* check if satisfies the restriction R */
        OK = Check((x1, …, xi) , R ); /* pruning */
        if ( OK ) {
            Count xi in;
            Found = Backtracking( i+1 );
            if ( !Found )
                Undo( i ); /* recover to (x1, …, xi-1) */
        }
        if ( Found ) break; 
    }
    return Found;
}
```
### ɑ-β 剪枝
参考[【OI Wiki】alpha-beta 剪枝](https://oi-wiki.org/search/alpha-beta/#alpha-beta-%E5%89%AA%E6%9E%9D "Permanent link")
应用案例：Tic-tac-toe
#### Tic-tac-toe:  Minimax Strategy
![截屏2024-11-10 12.17.07.png](/media/34.png)
![截屏2024-11-10 13.56.26.png](/media/35.png)
代码实现：
```c
#include <stdio.h>

#define MAXN (8+1)

int n;
int ori_flag;
int leaves[MAXN]; // The value of each leaf, from left to right.

int max(int a, int b) { return a >= b ? a : b; }
int min(int a, int b) { return a <= b ? a : b; }

int dfs(int l, int r, int flag, int pruning_flag, int bound)
// `l` and `r` mark the two ends of the subscript of the leaves of the current subtree.
// `flag` marks whether current level returns the maximum (flag = 1) or minimum (flag = 0) value between the two children of the root.
// `pruning_flag` marks whether it is valid (pruning_flag = 1) to prune the right child of the root or not (pruning_flag = 0).
// `bound` is a bound of pruning.
{
    int left_child, right_child;
    //printf("%d %d\n", l, r); // Test which nodes are visited
    if (l == r) return leaves[l]; // Base case for leaf nodes
    
    left_child = dfs(l, l + (r - l) / 2, !flag, 0, bound);

    // Pruning condition
    if (pruning_flag && ((flag && left_child >= bound) || (!flag && left_child <= bound))) {
        return left_child; // prune if condition met
    }

    right_child = dfs(l + (r - l) / 2 + 1, r, !flag, 1, left_child);
    
    return flag ? max(left_child, right_child) : min(left_child, right_child);
}

int main()
{
    scanf("%d%d", &n, &ori_flag);
    for(int i = 1; i <= n; i++) { scanf("%d", &leaves[i]); }
    printf("%d\n", dfs(1, n, ori_flag, 0, 0));
    // When `ori_flag` is 1, the value of the root of the game tree is the maximum value between its two children,
    // Otherwise the value of the root is the minimum value between its two children.
}
```

