---
title: OOP第一课笔记
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
这节课主要讲了cpp标准库、输入输出、string类、文件I/O。

---
## 基础
```cpp
#include <iostream>
//标准库(输入输出)
using namespace std;
int main()
{
    int age;
    cout << "hello!" << endl;//控制台输出,endl是换行符
    cin >> age;//控制台输入

    return 0;
}
```
终端编译：
```zsh
g++ -o hello hello.cpp # 优化编译，同目录下产生hello文件
# 或者
g++ hellp.cpp # 直接编译，同目录下产生a.out文件
```
编译文件运行：
```zsh
./hello
# 或者
./a.out
```

- 关于C++：build on C
- C++ improvements
    - Support for OOP
    - Templates
    - STL
    - Exception Handling
    - etc.

## The string class
```cpp
#include <string>
using namespace std;
int main(){
    string str;
    string str1 = "Hello";
    cin >> str;
    cout << str;

    return 0;
}
```
### Assignment:
```cpp
char cstr1[20];
char cstr2[20] = "hello";

string str1;
string str2 = "abc";

cstr1 = cstr2; // illegal
str1 = str2; //legal
```
结论：字符串之间可以相互赋值，char型字符数组不能赋值字符串。

### Concatenation
```cpp
str3 = str1 + str2;
str2 += str1;
```
### Constructors
```cpp
string (const char *cp, int len);

string (const string& s2, int pos);

string (const string& s2, int pos, int len);
```
### Substring
```cpp
substr (int pos, int len);
```
### Search
```cpp
find (const string& str);
```

### Example
```cpp
// e.g.
str1 =  "hello, china!"; //assign
string str1("hello, china!"); //assign
string str2(str1); //copy
string str2 = str1; //copy
string str3(str1, 7, 5); //"china"
string str3 = str1.substr(7, 5); //"china"
str1.replace(7, 5, "hangzhou"); //"hello, hangzhou!"
str1.assign(5, 'A'); //"AAAAA" 重新覆盖赋值

string str4 = "hello, hangzhou city";
string str_to_find = "hangzhou";
str4.replace(str4.find(str_to_find), str_to_find.length(), "shanghai") //search and replace
```
## File I/O
```cpp
#include <ifstream> //read from file
#include <ofstream> //write to file
// 两者可以合用<fstream>代替 （？）
ofstream File1("C:\\test.txt");
File1 << "Hello, China!" << std::endl;

ifstram File2("C:\\test.txt");
std::string str;
File2 >> str;
```

- regex库：
    - 提供了正则表达式的功能
    - Ref:[菜鸟教程-C++ 标准库 <regex>](https://www.runoob.com/cplusplus/cpp-libs-regex.html)

