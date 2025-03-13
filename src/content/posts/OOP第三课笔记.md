---
title: OOP第三课笔记
published: 2025-03-06T00:00:00.000Z
description: ''
image: ''
tags:
  - notes
category: OOP
draft: false
lang: ''
---
这个人还是什么都不会，但她要开始学 **STL** 了。

---
***目录***

<!-- toc -->

- [Containers](#containers)
  * [Vector](#vector)
  * [List](#list)
  * [Map](#map)
  * [Algorithm](#algorithm)
- [Typedefs](#typedefs)
- [Putfall Situations (when using STL)](#putfall-situations-when-using-stl)

<!-- tocstop -->

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

- STL的迭代器区间定义：$[begin, end)$
- Details:[vector](https://en.cppreference.com/w/cpp/container/vector)

**Vector基本操作**：
- Constructor/Destructor
- Element access
    - at, operator[], front, back, data(得到动态数组指针), ...
- Iterators
    - begin, end, cbegin, cend, ...
- Capacity
    - empty, size, reserve(管理capacity), capacity(最大容量，最多放多少个元素), ...
- Modifiers
    - clear(清空数据), insert(任意位置插入), erase(任意位置删除), push_back(尾部加入), ...

at会作越界检查，operator[]不会。

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

### List
```cpp
#include <iostream>
#include <string>
#include <list>
using namespace std;

int main(){
    list<string> s;
    s.push_back("hello");
    s.push_back("world");
    s.push_back("stl");
    
    list<string>::iterator p:
    for(p = s.begin(); p!= s.end(); p++)
        cout << *p << " ";
}
```
### Map
- collection of key-value pairs
- lookup by key, and retrieve a value
- e.g.: a telephone book, map<string, string>

```cpp
#include <map>
#include <string>
using namespace std;

int main(){
    map<string, float>price;
    price["snapple"] = 0.75;//用中括号表示/引用
    price["coke"] = 0.50;

    string item;
    double total = 0;
    while(cin >> item)
        total += price[item];//计算购物总价
}
```
map的一种循环遍历：
```cpp
for(const auto &pair : price_list)
    cout << "{" << pair.first << ": " << pair.second << "}";
cout << endl;
```

如果map查询了没有包含的key，他会把key插入并且value设为default（比如0）。

有些时候这种情况就会引入bug。

改进：
```cpp
string item;
int total = 0;
while (cin >> item)
{
    if(price_list.contains(item))//验证是否在map里
        total += price_list[item];
    else
        cout << item << "is not in the list." << endl;//否则报错
}
cout << total << end;
```

### Algorithm
```cpp
#include<algorithm>//所有stl算法的库
#include<iostream>
#include<iterator>//?
#include<string>
#include<list>
#include<vector>
using namespace std;

int main(){
    vector<int> v = {1,2,3,4,5};//"="有没有没关系
    reverse(v.begin(), v.end())//反转区间内所有元素顺序，修改了v本身

    vector<int> u;
    copy(v.begin(), v.end(),u.begin);//error,因为u里面元素为0个，而copy的假设是存在可以写入的元素区间
    //因此，如果想要能够自动插入，需要换一个迭代器back_inserter：
    copy(v.begin(), v.end(), back_inserter(u));
    copy(u.begin(), u.end(), ostream_iterator<int>(cout, ", "));//含义：输出u的元素，用","隔开 //为什么？
    cout << endl;

    list<int> l;
    copy(v.begin(), v.end(), front_inserter(l));//相当于v倒过来的效果
    copy(l.begin(), l.end(), ostream_iterator<int>(cout, ", "));
    cout  << endl;
}
```

```cpp
vector<int> u(10,8)
```
means: create a vector of 10 elements, each of which is 8.
so we can use copy to cover first 4 elements of u with v:
```cpp
vector<int> v{1,2,3,5};
vector<int> u(10,8);
copy(v.begin(),v.end(),u.begin())
```
then we obtain `u`: `{1,2,3,5,8,8,8,8,8,8}`

```cpp
#include"infix_iterator.h"//self-defined iterator
int main(){
    copy(v.begin(), v.end(), infix_iterator<int>(cout, ", "))
    cout << endl;
}
```
so the list's last element will not followed by a comma.

## Typedefs
```cpp
map<Name, list<PhoneNum>> phonebook;
map<Name, list<PhoneNum>>::iterator finger;
//simplify(substitute):
typedef map<Name, list<PhoneNum>> PB;//add the typedef as substitution. then continue with initializing
PB phonebook;
PB::iterator finger;
```

---
*补充：回忆structure的typedef:*
```c
struct type_name{
    member_type1 menber_name1;
}object_name1, object_name2;

//or:
struct type_name{
    menber_type1 menber_name1;
};
typedef struct type_name* TypeName;

//note that:
struct Name* p;
p->menber_name1 = ...;//point to the adress of structure member
struct Name* p;
p.menber_name1 = ...;//point to the value of structure member
```

---
C++11: auto, using **(referances? still lack understandings. notes to be added)**

If the data type the STL contains has self-defined class/structure, then we might need:
- assignment operatr: `operator = ()`
- default constructor **(?)**

For sorted types, like `map`, `set`, ...: **(Why `map` need compration?)**
- less than operator: `operator < ()`

---

## Putfall Situations (when using STL)
![](/media/OOP/1.png)
![](/media/OOP/2.png)
![](/media/OOP/3.png)
![](/media/OOP/4.png)
