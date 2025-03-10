---
title: OOP第三课笔记
published: 2025-03-06
description: ''
image: ''
tags: [notes]
category: 'OOP'
draft: false 
lang: ''
---
这个人还是什么都不会，但她要开始学 **STL** 了。

---
STL = Standard Template Library
STL 是一个标准库，里面有各种模板类，用来解决各种问题。

STL有三部分：
- Containers
    - class templates, common data structures
- Algorithms
    - Functions that operate on ranges of elements
- Iterators (迭代器，指针的推广，连接容器和算法)
    - Generalization of pointers, access elements in a uniform manner

## Containers
- sequencial
- associative
- unordered associative
- adaptors \*(依赖于其他容器的存在，相当于对其他容器作封装；“插头转换器”)

具体有啥不列举了，建议记住。

### Vector
- $\[begin, end)$
- Details:[vector](https://en.cppreference.com/w/cpp/container/vector)

```cpp
#include <vector>//vector库
#include<iostream>
int main()
{
    vector<int> evens {2,4,6,8}; //花括号初始化
    evens.push_back(20); //添加元素
    evens.push_back(22);
    evens.insert(evens.begin() + 4, 5, 10) //在第4个位置(第四个元素后？)插入5个10

    for(int i = 0; i < evens.size(); ++i)
        cout << evens[i] << ' ';
    cout << endl;
    //iterator代替：
    for (vector<int>::iterator it = evens.begin(); it < evens.end(); ++it)
        cout << *it << endl;
    cout << endl;
    //简化：
    for (auto it = evens.begin(); it < evens.end(); ++it)
        cout << *it << endl;
    cout << endl;
    //其他版本 range for
    for (int e : evens)
        cout << e << ' ';
    cout << endl;
}
```
