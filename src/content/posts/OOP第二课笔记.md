---
title: OOP第二课笔记
published: 2025-03-06T00:00:00.000Z
description: ''
image: ''
tags:
  - notes
category: OOP
draft: false
lang: ''
---
由于这个人什么也不会，所以她做了C++的语言笔记。

---
***目录***

<!-- toc -->

- [Template](#template)
- [结构体](#%E7%BB%93%E6%9E%84%E4%BD%93)
- [Class](#class)
  * [问题：数组截断](#%E9%97%AE%E9%A2%98%E6%95%B0%E7%BB%84%E6%88%AA%E6%96%AD)
  * [不改变字段的函数约定：const](#%E4%B8%8D%E6%94%B9%E5%8F%98%E5%AD%97%E6%AE%B5%E7%9A%84%E5%87%BD%E6%95%B0%E7%BA%A6%E5%AE%9Aconst)

<!-- tocstop -->

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
    b = temp;//相当于直接交换了a,b对应的引用变量本身
}
```
Ref:[菜鸟教程-C++ 引用](https://www.runoob.com/cplusplus/cpp-references.html)
```cpp
int& ref = a; //e.g.
```
## Template
```cpp
template <typename T>
void print_array(T arr[], int n)
{
    for(int i = 0; i < n; i++)
        std::cout << arr[i] << ' ';
    std::cout << std::endl;
}
```
**关键** : 模板里面所有涉及到type T的地方都要修改。

代码例子（简单可跳）：
```cpp
template<typename T>
void selection_sort(T arr[], int n)
{
    for(int i=0; i<n-1; ++i){
        int min_index = min_element(arr, i, n);
        if(min_index != i)
            swap(arr[min_index], arr[i]);
    }
}

template<typename T>
void swap(T& a, T& b){
    T tmp = a;
    a = b;
    b = tmp;
}
```
## 结构体
接上，加入结构体：（不属于 **标准类型** string这些）
```cpp
struct Student{
    int id;
    std::string name;
}
...
Student arr[]={{1,"wang"},{2,"liu"},{3,"zhou"}}; //initialization
...
//再使用之前的template，Student作为T类型
```
然而这样 **报错了** ！

因为Student是结构体，结构体没有重载的运算符，所以不能使用swap()。

同时结构体还不能在selection_sort函数中比大小。

为此我们需要 **定义operator** 在结构体中：
```cpp
struct Student{
    int id;
    std::string name;
}
bool operator<(const Student& s1, const Student& s2) // < 操作
{
    return s1.id < s2.id;
}
```
同时结构体还不能直接通过"cout<<"输出（标准输出流），所以也要我们自己定义操作。
```cpp
std::ostream& operator<<(const Student& s) // << 操作
{
    return out << "(" << s.id << ", " << s.name << ")";
}
```

- string可以比大小

## Class
class的好处：数据封装

private:外界能看到，但不能访问。其他地方class和struct一样。

**注意** ：class的 **初始化** 和struct的初始化不同(因为class有字段是private，不能外界直接动它)。

struct的初始化见上。

class的初始化需要构造函数。
```cpp
class Rectangle{
private:
    double w, h;
    double area,perimeter;
public: //这里的函数要对外开放使用，所以public
    Rectangle(double w, double h):w(w), h(h) {} //参数列表
    void calc_area(){
        area = w*h;
    }
    void calc_perimeter(){
        perimeter = 2*(w+h);
    }
...
    Rectangle arr[]={{2,3},{5,5}};
    //{2,3}相当于Rectangle(2,3)
    int n = sizeof(arr)/sizeof(arr[0]);

    for(Rectangle& r : arr)//新的循环写法，类似python，从列表中枚举
    {
        arr[i].calc_area();
        arr[i].calc_perimeter();
    }//计算面积和周长
}
```
模板化：
```cpp
class Shape{
protected:
    double area, perimeter;
public: 
}

class Rectangle : public Shape{//Rectangle继承Shape
    ...
}
class Circle : public Shape{
    ...
}
class Triangle : public Shape{
    ...
}
```

### 问题：数组截断
```cpp
Shape arr[]={Rectangle(2,3), Circle(5)};
```
**问题** ：发生截断，数组中创建的元素只剩下Shape的属性。

**解决** ：用数组指针，指向不同的class，那么这些class仍保留自己的独特属性。
```cpp
Shape* arr[] = {new Rectangle(2,3), new Rectangle(5,5), new Circle(3), new Triangle（2,5,4）}
```

那么应该如何通过Shape调用不同class的同名不同内容函数呢?

```cpp
class Shape{
protected: //派生类的函数实现时可以访问，但外部operator不能访问
    double area, perimeter;
public: //派生的类型都得实现这两个函数：
    virtual void calc_area()=0;//函数没有实体，只是一个接口。加上virtual变成虚函数
    virtual void calc_perimeter()=0;
}
```
然后可以 *选择地* 给继承class的函数加上关键词 **override** :
```cpp
class Rectangle : public Shape{
    ...
public:
    void calc_area() override{
        ...
    }
    ...
}
```
相应地改变operator:
```cpp
std::ostream& operator<<(std::ostream& out, const Shape& s)
{
    return out << "(" << s.get_area() << ", " << s.get_perimeter() << ")";
}
```
注：要定义get_area()和get_perimeter()，因为operator<<()属于外部操作，不能访问protected的字段。

或者可以加上 `friend` :
```cpp
class Shape{
protected: 
    double area, perimeter;
public: 
    virtual void calc_area()=0;
    virtual void calc_perimeter()=0;
    friend std::ostream& operator<<(std::ostream& , const Shape& );//有参数表就行，不一定需要参数名字“out”“s”
}
```
那样的话
```cpp
std::ostream& operator<<(std::ostream& out, const Shape& s)
{
    return out << "(" << s.area() << ", " << s.perimeter() << ")";
}
```
仍旧可以。

### 不改变字段的函数约定：const
```cpp
class Shape{
protected: 
    double area, perimeter;
public: 
    ...
    virtual std::string name() const = 0;//const告诉编译器，这个函数不会改变类的字段
}
//具体到继承class:
std::string name() const override{
    return "Rectangle";
}
```
这里没搞懂，为什么不const就报错了。

后面还实现了一个selection_sort加一个bool参数，实现分别按照area或perimeter的两种排序。

更一般的扩展，快速上手：
```cpp
selection_sort(arr, n, [](Shape* s1, Shape* s2){return s1->get_perimeter() > s2->get_perimeter();})
//函数可以不带名字
```

---
## 补充学习，待整理
### class基本
- class 函数在类内和内外定义格式；内联函数&类成员函数
- 成员和类的默认访问修饰符是 private
- public变量可以不使用成员函数来赋值/修改
- protected成员区别于private：
    - private 成员只能被本类成员（类内）和友元访问，不能被派生类访问
    - protected 成员可以被派生类访问
    - 有三种继承：public,protected,private
    - protected 成员继承实例：
```cpp
#include <iostream>
using namespace std;
 
class Box
{
   protected:
      double width;
};
 
class SmallBox:Box // SmallBox 是派生类
{
   public:
      void setSmallWidth( double wid );
      double getSmallWidth( void );
};
 
// 子类的成员函数
double SmallBox::getSmallWidth(void)
{
    return width ;
}
 
void SmallBox::setSmallWidth( double wid )
{
    width = wid;
}
 
// 程序的主函数
int main( )
{
   SmallBox box;
 
   // 使用成员函数设置宽度
   box.setSmallWidth(5.0);
   cout << "Width of box : "<< box.getSmallWidth() << endl;
 
   return 0;
}
```
---
### 类构造函数
- 类的构造函数是类的一种特殊的成员函数，它会在每次创建类的新对象时执行。
- 构造函数的名称与类的名称是完全相同的，并且不会返回任何类型，也不会返回`void`。构造函数可用于为某些成员变量设置初始值。
- 类外定义构造函数(不含参)：
```cpp
#include <iostream>
 
using namespace std;
 
class Line
{
   public:
      void setLength( double len );
      double getLength( void );
      Line();  // 这是构造函数
 
   private:
      double length;
};
 
// 成员函数定义，包括构造函数
Line::Line(void)
{
    cout << "Object is being created" << endl;
}
 
void Line::setLength( double len )
{
    length = len;
}
 
double Line::getLength( void )
{
    return length;
}
// 程序的主函数
int main( )
{
   Line line;
 
   // 设置长度
   line.setLength(6.0); 
   cout << "Length of line : " << line.getLength() <<endl;
 
   return 0;
}
```
运行结果：
```bash
Object is being created
Length of line : 6
```

- 带参数构造函数：在创建对象时会给对象赋初始值
```cpp
class Line{
   public:
      Line(double len);  // 这是构造函数
};
// 成员函数定义，包括构造函数
Line::Line( double len){
    cout << "Object is being created, length = " << len << endl;
    length = len;
}
//使用：
Line line(10.0);
```

- 用初始化列表来初始化字段
```cpp
Line::Line( double len): length(len){...}
//上面的语法等同于下面：
Line::Line( double len){
    length = len;
    ...
}
```
传多个参数也同理。

---
### 拷贝构造函数
常见形式：
```cpp
classname (const classname &obj) {
   // 构造函数的主体
}
```
实例：（比较长简单看）
```cpp
#include <iostream>
 
using namespace std;
 
class Line
{
   public:
      int getLength( void );
      Line( int len );             // 简单的构造函数
      Line( const Line &obj);      // 拷贝构造函数
      ~Line();                     // 析构函数
 
   private:
      int *ptr;
};
 
// 成员函数定义，包括构造函数
Line::Line(int len)
{
    cout << "调用构造函数" << endl;
    // 为指针分配内存
    ptr = new int;
    *ptr = len;
}
 
Line::Line(const Line &obj)
{
    cout << "调用拷贝构造函数并为指针 ptr 分配内存" << endl;
    ptr = new int;
    *ptr = *obj.ptr; // 拷贝值
}
 
Line::~Line(void)
{
    cout << "释放内存" << endl;
    delete ptr;
}
int Line::getLength( void )
{
    return *ptr;
}
 
void display(Line obj)
{
   cout << "line 大小 : " << obj.getLength() <<endl;
}
 
// 程序的主函数
int main( )
{
   Line line1(10);
 
   Line line2 = line1; // 这里也调用了拷贝构造函数
 
   display(line1);
   display(line2);
 
   return 0;
}
```
