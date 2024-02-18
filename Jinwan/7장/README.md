## 클래스

자바스크립트는 원래 프로토타입 기반 객체지향 언어이다. 클래스를 기반으로 하는 다른 객체 지향 언어와 다르게 생성자 함수와 프로토타입으로 객체지향 언어의 상속을 구현한다.

ES5까지는 생성자 함수를 이용해서 클래스를 정의했지만, ES6부터는 클래스 문법을 제공하기 때문에 클래스 문법을 사용해서 작성하면 된다. 하지만, 클래스 문법을 제공한다고 해서 프로토타입의 언어에서 클래스를 기반으로 한 언어로 바뀐 것은 아니고 새로운 인스턴스 생성 방법을 새로 만든 것이라고 생각해야 한다. 클래스 문법도 사실 프로토타입을 기반으로 만들어 진 것이기 때문이다.

## 클래스 정의

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
  static sayHi() {
    console.log("hi");
  }
}
```

위의 클래스는 `Person`이라는 클래스를 생성한 것이다. 이와 같은 방식으로 클래스를 생성할 수 있다. 위 클래스 코드를 생성자 함수로 나타내면 아래와 같다.

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
Person.sayHi = function () {
  console.log("hi");
};
```

## 인스턴스 생성

클래스를 통한 인스턴스 생성은 생성자 함수로 인스턴스를 생성하는 것과 같다.

```javascript
const man = new Person("john");
```

위와 같은 방식으로 인스턴스를 생성할 수 있다. 하지만, 생성자 함수와 다른 점은 `new`키워드 없이 인스턴스를 생성하게 되면 클래스의 경우는 오류가 발생한다. 하지만 생성자 함수의 경우에는 일반 함수로 작동하게 된다. 즉, 생성자 함수로 인스턴스를 생성하게 되면 의도치 않게 생성자 함수가 일반 함수로 호출되어 원하는 동작을 할 수 없게 된다.

## 클래스 메소드

클래스 몸체에 들어갈 수 있는 메소드의 종류는 3가지 이다.

- 생성자
- 프로토타입 메소드
- 정적 메소드

생성자는 인스턴스를 생성할 때 바로 호출되는 메소드이고, 프로토타입 메소드는 인스턴스들이 공통으로 상속받을 메소드다. 정적 메소드는 클래스가 생성한 인스턴스는 접근할 수 없지만, 클래스 자체는 접근할 수 있는 메소드다.

### 프로토타입 메소드

위 코드에서 생성자 함수에 메소드를 넣을 때 프로토타입을 이용했다. 만약, 프로토타입을 이용하지 않고 생성자 함수 내에 `this.메소드`로 만들었다면, 다른 의미가 된다.

```javascript
function Person1(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name);
  };
}

function Person2(name) {
  this.name = name;
}
Person2.prototype.sayName = function () {
  console.log(this.name);
};

const a = new Person1("a");
const b = new Person1("b");

a.sayName === b.sayName; // false

const c = new Person2("c");
const d = new Person2("d");
c.sayName === d.sayName; // true
```

위의 코드에서 `Person1`과 `Person2`로 만든 인스턴스 객체는 모두 `sayName`이라는 메소드를 가지고 있고, 같은 동작을 한다. 하지만 `Person1`로 만든 인스턴스의 경우 인스턴스를 생성할 때마다 새로운 메소드를 만들게 되지만, `Person2`의 경우는 하나의 `sayName`메소드를 공유하는 것을 알 수 있다.

위에 서로 다른 두 인스턴스의 메소드가 같은지를 비교한 값을 확인해보면 알 수 있다.

만약 `prototype`을 이용하지 않고 메소드를 생성할 경우 같은 동작을 하는 메소드가 인스턴스를 생성할 때마다 새로 만들어지기 때문에 메모리 공간에 비효율적으로 차지하게 된다.

그렇기 때문에 `prototype`을 이용해서 공통된 메소드를 공유하는 방식으로 코드를 만들어야 한다.

클래스에 경우 아래와 같이 메소드를 알아서 프로토타입 메소드로 만들어 준다.

![](https://velog.velcdn.com/images/crowwan/post/c6a705e1-368f-4f7a-bd3a-b26829fff049/image.png)
