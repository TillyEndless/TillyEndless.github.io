---
title: OOP第四课笔记
published: 2025-03-13
description: ''
image: ''
tags: [notes]
category: 'OOP'
draft: false 
lang: ''
---
Memory Model 
内存模型

---

- extern 变量用法
- extern编译过程
    - extern关键词：相当于编译时预留位置
    - 两个文件(模块)编译完后，最后会进行link，把真正的变量值替换到预留的位置中
- static：外部不能使用
    - 声明static后，不论是函数还是变量，都只能在函数之间共享，但不能在模块之间共享 **（？）**
- 指针一般是8bytes，定长，因为存的是address

## reference
reference变量只在初始化时能够绑定，所以创建的时候必须要有初始化的值。
```cpp
int& r = c;
```
那么r就是c，c就是r，它俩是一个东西。

**区别reference和指针**

```vpp
void f(int& a);
f(y);
```
则在y传入函数的时候，a就和y绑定了。

### Defining references
- `type& refname = name;`
- `type& refname`
后一种情况：
```cpp
class A{
    private:
        T& a;   // 成员变量是引用类型
    public:
        A(T& a) : a(a) { /* 构造函数体 */ } //a在这时候被初始化绑定
}
```
---
*补充：构造函数初始化列表（initializer list）*
构造函数的定义分为两部分：参数列表和初始化列表，然后是构造函数体。

格式是：

构造函数名(参数列表) : 成员1(初始值), 成员2(初始值), … { 构造函数体 }
