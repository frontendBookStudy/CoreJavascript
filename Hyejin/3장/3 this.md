# this

실행컨텍스트가 생설될 때 함께 결정된다.
(실행 컨텍스트는 함수를 호출할 때 생성됨 = this는 함수를 호출할 때 결정)

- this에는 호출한 주체에 대한 정보가 담긴다.
- 상황에 따라 this가 바라보는 대상이 달라진다.

<br>
   
   --- 
   <br>

## 상황에 따라 달라지는 this

### 전역 공간에서의 this

- 전역공간에서의 this는 전역 객체를 가리킴.
- 브라우저의 환경에서 전역객체는 window
- Node.js 환경에서는 global

자바스크립트의 모든 변수는 실제로는 특정 객체(실행컨텍스트)의 프로퍼티로서 작동한다.  
전역 변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.

```js
var a = 1;
console.loa(a); //1
console.log(window.a); //1
console.log(this.a); //1 (this 전역객체)
```

따라서 전역공간에서 선언한 변수 a는 전역객체의 프로퍼티로 할당되어, window.a 에도 값을 가져올 수 있는 것이다.

<br>

### this가 호출시점에 따라 달라진다.

1. 함수 vs 메서드

   함수를 실행하는 방법

- 함수로서 호출 (this ->전역객체 )
- 메서드로서 호출 ( this -> 함수(프로퍼티)앞에 객체 )

> _메서드 내부에서의 this_  
> 호출 주체는 함수명(프로퍼티명)앞의 객체 > 이 객체가 this

<br>

> _함수로서 호출할 때 그 함수 내부에서의 this_  
> 함수를 함수로서 호출할 때 this는 지정되지 않음으로 전역객체를 바라본다.

this 바인딩은 오직 함수를 호출하는 구문 아에 점 또는 대괄호 표기가 있는지 없는지가 관건이다.

<br>

### this를 우회하는 방법?

호출당시 주변환경의 this를 그대로 상속받아 사용하고싶다.

1. 외부의 this를 원하는 이름(self)의 변수에 담아서 사용
2. 화살표 함수를 사용
   화살표 함수는 실행컨텍스트를 생성할 때 this바인딩이 빠져, 상위 스코프의 this를 그대로 사용 .
   스코프 체인상 가장 가까운 this 에 접근한다.
3. call, apply, bind 메서드를 활용 this 를 명시적으로 지정

<br>

### 콜백 함수 호출 시 그 함수 내부에서의 this

콜백함수 :함수 A의 제어권을 다른함수(B)에게 넘겨주는 경우, 함수 A를 콜백함수라고 한다.

### 생성자 함수 내부에서의 this

생성자 :구체적인 인스턴스를 만들기 위한 일종의 틀  
어떤 함수가 생성자 함수로서 호출된 경우 내부에서의 this는 새로 만들 구체적인 인스턴스 자신이 된다.

## 명시적으로 this 바인딩

### call / apply

- 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령
- call,apply 메서드를 이용하면 임의의 객체를 this 로 지정이 가능하다.
- call 과 apply 차이는 매개변수 사용의 차이이며, call은 나열, apply는 배열에 담는다.

```js
var func = function (a, b, c) {
  console.log(this, a, b, c);
};
func(1, 2, 3); // window{...} 1 2 3
func.call({ x: 1 }, 4, 5, 6); // {x:1} 4,5,6
func.apply({ x: 1 }, [4, 5, 6]);
```

**apply 활용예시**

```js
var numbers = [1, 2, 3, 4, 5];

var maxApply = Math.max.apply(null, numbers);
var minApply = Math.min.apply(null, numbers);

var maxSpread = Math.max(...numbers);
var minSpread = Math.min(...numbers);
```

### bind

- 함수에 this를 미리 적용

```js
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4);

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8);
```

`bindFunc1`에 `{x:1}`이 this로 바인딩된 func함수가 담긴다.

<br>

> ### React 에서의 this는 ?

함수형 컴포넌트에서의 this는 클래스형 컴포넌트에서만큼 중요하지 않다.  
useState 훅을 사용하기 때문에 state들은 전역객체를 this로 가지기 때문에, this가 모두 같아 클래스형처럼 신경을 쓰지 않아도 된다.

> **총 정리**  
> this는 선언 시점에서 결정되는 것이 아니고, 메소드/함수를 어떤 주체가 실행 하는지에 따라서 결정 된다.  
> (이를 무시할 수 있는 방법 중 하나는 bind를 사용해서 강제로 지정하는 방법이 있다.)
