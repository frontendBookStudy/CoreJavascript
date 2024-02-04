## 프로토타입

목차

- 프로토타입의 개념 이해
- 프로토타입 체인

클래스 기반 언어의 '상속' 과 비슷한 효과

## 프로토타입의 개념 이해

- constructor
- prototype
- instance

```js
var instance = new Constructor();
```

`instance.__proto__ <=> Constructor.prototype`

> instance에 자동으로 부여된 `__proto__` 라는 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조한다.

- prototype은 객체, **proto**도 객체
- prototype 객체 내부는 인스턴스가 사용할 메서드를 저장
- instance에서도 숨겨진 프로퍼티인 **proto**를 통해 이 메서드들에 접근 가능

> 실무에서는 `instance.__proto__` 대신 `Object.getPrototypeOf(instance)`/`Object.create(instance)`를 사용하도록 하자!

- 예시

```js
var Person = function (name) {
  //Person이 Constructor(생성자)
  this._name = name;
};
Person.prototype.getName = function () {
  //Person의 prototype에 getName이라는 메서드 지정
  return this._name;
};
// => Person의 instance는 __proto__를 통해 getName을 호출할 수 있음
```

```js
var suzi = new Person("Suzi"); // suzi는 Person의 instance
suzi.__proto__.getName(); // undefined
```

> Q: 그런데 getName 메서드 호출 결과로 undefined가 나온 이유는??

> A: this에 바인딩 된 대상이 잘못 지정되서!

설명

1. getName을 실행해 undefined가 나왔다는것은 변수가 함수라는 것(호출할 수 있는)이다!
2. 함수가 아니라면 TypeError가 발생했을 것.
3. 그렇다면 return 값을 확인해보자! this.name
4. 여기서 this는, 메서드 명 바로앞의 객체가 된다.(함수를 메서드로서 호출했기 때문)
5. 그렇다면, this는 `thomas.__proto__` 객체가 된다! (`thomas`가 아니라)
6. `thomas.__proto__` 객체 내부에는 name이라는 프로퍼티가 없으므로 undefined를 반환한다.

### `__proto__`는 생략가능한 속성이다.

instance 는 Constructor.prototype의 메서드를 마치 자신의 메서드인 것처럼 호출 할 수 있다.<br>
this를 instance(여기선 suzi)로 할 수는 없을까?

```js
var suzi = new Person("Suzi", 28);
suzi.getName(); //Suzi
var iu = new Person("Jieun", 28);
iu.getName(); // Jieun
```

> `__proto__` 생략하면 된다! 원래 이렇게 설계되었으니 이해하고 받아들이자

> 결론 :<br>생성자 함수(Constructor)의 prototype에 어떤 메서드나 프로퍼티가 있다면,<br> instance에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있다!

### Constructor.prototype.constructor 는 생성자 함수 자신을 가리킨다.

자기 자신을 참조하는 프로퍼티가 굳이 필요한가... 라는 생각이지만, 인스턴스와의 관계를 위해 필요한 정보임

```js
var arr = [1, 2];
Array.prototype.constructor === Array; // true
arr.__proto__.constructor === Array; // true
arr.constructor === Array; // true

var arr2 = new arr.constructor(3, 4); // arr2는 arr을 참조
console.log(arr2); //[3,4]
```

> constructor를 변경하더라도 참조하는 대상이 변경될 뿐, 이미 만들어진 인스턴스의 원형이 바뀌거나 or 데이터 타입이 변하는 것은 아님(??)

constructor 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지를 알고자 할 때 사용

- 다음 각 줄은 모두 동일한 대상을 가리킨다

```js
[Constructor][instance].__proto__.constructor[instance].constructor;
Object.getPrototypeOf([instance]).constructor[Constructor].prototype
  .constructor;
```

- 다음 각 줄은 모두 동일한 객체(prototype)에 접근할 수 있다.

```js
[Constructor].prototype[instance].__proto__[instance];
Object.getPrototypeOf([instance]);
```

## 프로토타입 체이닝

### 메서드 오버라이드

> Q: 인스턴스가 프로토타입과 동일한 이름의 프로퍼티 or 메서드를 갖고있는 상황이라면?<br>
> A: 인스턴스의 프로토타입 or 메서드가 호출된다

```js
var Person = function (name) {
  this.name = name;
};
Person.prototype.getName = function () {
  return this.name;
};

var is = new Person("지금");
iu.getName = function () {
  return "바로" + this.name;
};
console.log(iu.getName()); // 바로 지금
```

JS엔진이 getName 메서드를 찾는 방식은 자신의 프로퍼티 검색 > `__proto__` 검색 순서로 진행된다.

> 다만, 오버라이드는 '덮어씌웠다'라는 표현이므로 prototype에 있는 메서드에 접근하는 방법도 있다.

```js
console.log(iu.__proto__.getName()); //undefined

Person.prototype.name = "이 지금";
console.log(iu.__proto__.getName()); //이지금

// this가 prototype대신 instance를 바라보도록 설정
console.log(iu.__proto__.getName.call(iu)); // 지금
```

### 프로토타입 체인

> Q: 객체의 내부구조를 살펴보니, `__proto__` 객체 안에는 다시 `__pr oto__`가 등장한다..! 왜?!

> A: prototype의 객체가 '객체' 이기 때문..!

```js
var arr = [1,2];
arr(.__proto__).push(3);
arr(.__proto__)(.__proto__).hasOwnProperty(2); // true
```

> 위쪽 삼각형의 우측 꼭지점에는 무조건 Object.prototype이 존재.

> 삼각형은 무한으로 연결될 수 있음.

`__proto__`(대각선 방향)방향을 계속 찾아가면, 최종적으로 Object.prototype에 당도
=> 각 프로토타입의 메서드를 자신의 것 처럼 호출할 수 있음.
