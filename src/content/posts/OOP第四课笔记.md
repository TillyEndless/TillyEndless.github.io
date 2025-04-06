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

```cpp
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

一种错误赋值的情况：
```cpp
void func(int &);

func(i * 3);
```
\* *因为左右值的关系*


### Type restrictions
1. 没有引用的引用。
2. 不存在引用指针，但指针可以有引用变量。
如：
```cpp
int&* p; //illegal
void f(int*& p); //ok
```
3. 数组不能是引用变量类型。

---
## Dynamic memory allocation
- new expression
- delete expression
 
```cpp
int *p = new int(1000);
int *p = new int[1000];
int *p = new int[1000](); //加小括号是可以初始化
```
delete不能重复两次。
null指针delete不会起任何作用，也不会报错。

**a = nullptr**, null指针。

\* *其实new得到的指针前面还有八个字节（size_t变量类型大小），储存new获取的size*

## Const
const不会分配存储，不能再其他模块使用。修改const变量会报错。

const在编译的时候会直接代值到表达式内。
所以const int不适合作为数组长度声明。
```cpp
int * const p = a; //p is const
*p = 20;
p++; //error!

const int *p = a; //(*p) is const
*p = 20; //error!
p++;
```

```cpp
int i;
const int ci = 3;

int* ip;
const int* cip;

ip = &i;
ip = &ci; //error!
cip = &i;
cip = &ci;

*ip = 54; //always legal
*cip = 54; //never illegal
```

---
*补充：构造函数初始化列表（initializer list）*
构造函数的定义分为两部分：参数列表和初始化列表，然后是构造函数体。

**构造函数的名字和类名必须相同！**

使用初始化列表来初始化字段：

构造函数名(参数列表) : 成员1(初始值), 成员2(初始值), … { 构造函数体 }

如：
```cpp
Line::Line( double len): length(len)
{
    cout << "Object is being created, length = " << len << endl;
}
```
等同于
```cpp
Line::Line( double len)
{
    length = len;
    cout << "Object is being created, length = " << len << endl;
}
```

（构造函数如果在class外部定义，需要进行继承）：
```cpp
class Line
{
   public:
      Line();  // 构造函数
};
 
// 成员函数定义，包括构造函数
Line::Line(void)
{
    cout << "Object is being created" << endl;
}
```