---
title: OOP第二课笔记
published: 2025-03-06
description: ''
image: ''
tags: [notes]
category: 'OOP'
draft: false 
lang: ''
---
由于这个人什么也不会，所以她做了C++的语言笔记。

---

能不能在函数
```cpp
void selection_sort(int arr[], int n)
```
中计算数组的长度
```cpp
int n = sizeof(arr) / sizeof(arr[0]);
```
呢？

其实不可以。因为C在传参中会有退化，arr传入函数只剩下一个头地址指针，而不是传入一个完整的数组，所以计算不了sizeof(arr).

```cpp
void swap(int& a, int& b) // 引用类型（引用传参）
{
    int temp = a;
    a = b;
    b = temp;
}
```
Ref:[菜鸟教程-C++ 引用](https://www.runoob.com/cplusplus/cpp-references.html)
```cpp
int& ref = a;//e.g.
```