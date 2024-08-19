class Parent {
    house() { }
}
class Child extends Parent {
    car() { }
}
class Grandson extends Child {
    money() { }
}
const p1 = new Child();
p1 = new Parent();
