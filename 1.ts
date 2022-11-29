import { watch } from "fs"

const fn = function (name: string, age: number = 18, sex?: string) {
  return name + age + sex
}

// console.log(fn('hutao'));

// const tel:string|number = '101-84354548'

// //交叉类型
// interface Person{
//   name:string,
// }

// interface Man {
//   sex:number
// }

// const hu:Person&Man = {name:'tuhao',sex:0}

// class Person {
//   name:string
//   protected age:number
//   static a:number = 1
//   constructor(name:string,age:number){
//     this.name = name
//     this.age = age
//   }
//   aa(){
//     return Person.a
//   }
//   static bb(){
//     return this.a
//   }
// }

// class Man extends Person{
//   constructor(name:string,age:number){
//     super(name,age)
//   }
//   a(){
//     console.log(this.age);
//   }
// }

// const p = new Person('hutao',18)
// console.log(Person.bb());

// interface Person {
//   run():boolean
// }

// interface H extends Person {
//   name:string
// }

// class Man implements H {
//   run(): boolean {
//     return true
//   }
//   name:string
// }

// ---------------
// class A {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   setName(name: string) {
//     this.name = name
//   }
//   getName() {
//     console.log(this.name);
//   }
// }

// class B extends A {
//   constructor(name: string) {
//     super(name)
//   }
// }

// const p = new B('hutao')
// p.getName()

// --------------------
// let excel: [string, string | number, number, unknown][] = [
//   ['hh', 1, 1, null]
// ]

// ----------
// enum Type {
//   red,
//   blue
// }

// console.log(Type[0]);

// // -------
// const s: symbol = Symbol('xxx')
// const obj = {
//   [s]: 'hhh',  // 用于定义唯一属性名
//   name: 'hh'
// }
// console.log(obj['name']);

// // ---泛型函数
// function a<T>(name: T, sex: T): T[] {
//   return [name, sex]
// }
// const ans = a<string>('2', '2')

// ----泛型类
// class Sub<T>{
//   a: T[] = []
//   add(item: T): T[] {
//     this.a.push(item)
//     return this.a
//   }
// }
// const s = new Sub<number>()
// s.add(1)
// s.add(2)
// console.log(s.a);

const watcher = (data: string): ClassDecorator => {
  // console.log(target);
  return (target: Function) => {
    target.prototype.setName = () => {
      console.log(data);
    }
  }
}

const log: ClassDecorator = (target: Function) => {
  target.prototype.aaa = '123'
}

const ok: PropertyDecorator = (...arg) => {
  console.log(...arg);
}

@log
@watcher('wuhu')
class A {
  @ok
  name: string = 'hutao'
  sex: string = '男'
  getName() {
    return this.name
  }
}

const s = new A()
const wuhu = 1;
(s as any).setName()
console.log((s as any).aaa);













