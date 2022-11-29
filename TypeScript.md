# TypeScript

## 基础类型

string

number

boolean

void 

null

underfined   

### void和（null,unerfined）区别

```js
//如果为null或者underfined就可以赋值给别人
let v:null = underfined
let str:stirng = 'xxx'
str = v  //可以赋值
//如果为void就不可以赋值给别人
let v:void = underfined
let str:stirng = 'xxx'
str = v  //不可以赋值
```



###  赋值和返回定义

```js
let name:string = 'xxx'

function hhh():string { //函数返回值类型定义
    ....
} 
```



## 任意类型

any

unknown

### any和unknown的区别

any可以拿对象里面的值或者方法，unknown不可以

```js
const a:unknown = {name:'hutao'}
console.log(a.name);  //报错
```



## 接口和对象类型

```js
interface Person{
    name:string,
    age?:number   // 可选式操作符
    [propName:string]:string | number  // 定义这里面所有属性的类型为什么
    readonly sex:string  // 不能修改
    callback():number
}

// 多个相同的interface会合并

const person:Person = {
    callback:():number=>{
    	return 18
	}
}

// 用于继承
interface Tao extends Person {
    
}
```



## 数组类型

```js
// 定义数组
const arr:number[] = []
const arr1:any[] = []
const arr2:Array<number> = [] //用泛型的方法定义
// 多维数组
const arr3:number[][] = []
const arr4:Array<Array<number|string>> = [[],[]]
// arguments类数组
Arr(1,2,3)
function Arr(...args:number[]):void{
  // console.log();
  let arr:IArguments = arguments
}
// 定义字符串类型的类数组  
interface Arrnumber {
    [index:number]:string
}
conts arrnumber:Arrnumber = ['1','2']
```



## 函数类型

```js
const fn = function(name:string,age:number = 18,sex?:string){
  return name+age+sex
}

// age后加等于可以使用默认值
// sex后加？没传为underfined

console.log(fn('hutao')); // hutao18undefined
```



## 联合类型、类型断言、交叉类型

```js
// 联合类型
const tel:string|number = '101-84354548'

//交叉类型
interface Person{
  name:string,
}

interface Man {
  sex:number
}

const hu:Person&Man = {name:'tuhao',sex:0}
// 类型断言
name as string
<string>name  // 同上面一个都可以断言
```



## 内置对象

RegExp,Date,Error,HTMLElement等



## class类型

```js
class Person {
  name:string
  protected age:number
  constructor(name:string,age:number){
    this.name = name
    this.age = age
  }
}

let p = new Person('hutao',18)
//对Person中的属性可以设置使用范围，默认为public
public name    //外部可以直接访问  p.name
private name   //只能通过内部访问
protected name  //内部或者子类中访问

class Man extends Person{
  constructor(name:string,age:number){
    super(name,age)
  }
  a(){
    console.log(this.age); // 可以拿到protected属性，如果定义为private就拿不到age
  }
}

//静态属性 static
//静态函数
//静态函数和属性与constructor和那些属性是互斥的

// implements来约束class类
interface Person {
  run():boolean
}

class Man implements Person,H {  //这里可以添加多个约束
  run(): boolean {
    return true
  }
}
```



## abstract抽象类

```js
abstract class Human {
  public head;
  public foot;
  public hand;
  //已实现的方法
  sleep() { 
        return "睡觉"
    }
  //未实现的方法
  abstract toilet();
}

class Male extends Human{
//子类必须实现其声明未实现的方法
    toilet() { 
        return "上男厕所"
    }
}

```

### 抽象类和接口的区别

![image-20221128112739282](D:\Program Files (x86)\Typora\notes\TypeScript.assets\image-20221128112739282.png)



## 元组

```js
let arr:[number,number]  // 限制数组里的类型
let excel: [string, string | number, number, unknown][] = [
  ['hh', 1, 1, null]
]  //多维数组进行限制
```





## enum枚举

```js
enum Type {
    red, // 会自动递增，从red = 0开始
    blue
}
enum Type {
    red = 2, // 会自动递增，从red = 2开始
    blue
}
// 可以通过值找key
Type[2]  // 可以找到red 
```



## never类型

表示不应该存在的类型

比如抛出错误的函数返回值为never,或者用 const hh:never = val 接收一个本不应该存在的值



## symbol类型

唯一，const s:symbol = Symbol('xxx')    // 里面只能为字符串和数字，其他类型会tostring为字符串

```js
const s:symbol = Symbol('xxx')
const obj = {
    [s]:'hhh',  // 用于定义唯一属性名
    name:'xx'
}
通过obj[s]取值
obj['name']这种带字符串的可以看作一般类型的属性名

for in 、object.keys都是取不到symbol类型的
可以通过getOwnPropertySymbols(obj) 取到symbol
或者Reflect.ownKeys()可以取到所有属性
```



## 泛型

```js
// ---泛型函数
function a<T>(name: T, sex: T): T[] {
  return [name, sex]
}
const ans = a<string>('2', '2')
// 泛型约束
interface Len {
    length:name
}
function a<T extends Len>(name: T) {
  name.length ....
}

// ---泛型类
class Sub<T>{
  a: T[] = []
  add(item: T): T[] {
    this.a.push(item)
    return this.a
  }
}
const s = new Sub<number>()
s.add(1)
s.add('1')      // 上二行，对T约束为number类型，所以这里报错
console.log(s.a);

```



## 装饰器

### classDecorator 修饰class的

可以添加多个class注释器在一个上面

```js
const watcher: ClassDecorator = (target: Function) => {
  // console.log(target);
  target.prototype.setName = () => {
    console.log('hhh');
  }
}

@watcher
class A {
  name: string = 'hutao'
  getName() {
    return this.name
  }
}

const s = new A()
const wuhu = 1;
(s as any).setName()

// 柯里化实现带参效果
const watcher = (data: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.setName = () => {
      console.log(data);
    }
  }
}

@watcher('wuhu')
class A {
  name: string = 'hutao'
  getName() {
    return this.name
  }
}
```

























111