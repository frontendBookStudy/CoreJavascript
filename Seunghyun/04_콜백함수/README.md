## 콜백함수

목차

- 콜백함수란?
- 제어권
- 콜백함수는 함수다
- 콜백 함수 내부의 this에 다른 값 바인딩하기
- 콜백지옥과 비동기 제어

### 콜백함수란?

콜백함수는 다른코드의 인자로 넘겨주는 함수이다.<br/>
call(호출하다)+back(되돌아) 라는 의미로 '제어권'과 관련이 깊다.<br/>

> 콜백함수는 다른 코드(인자 or 메서드)에게 인자로 넘겨줌으로써 제어권도 함께 위임한 함수이다.

### 제어권

#### 호출시점

```js
var count = 0;
var cbFunc = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};

var timer = setInterval(cbFunc, 300);
// 0 (0.3초)
// 1 (0.6초)
// 2 (0.9초)
// 3 (1.2초)
// 4 (1.5초)
```

> 콜백함수(setInterval)의 제어권을 넘겨받은 코드(cbFunc)는 콜백함수 호출시점에 대한 제어권을 가진다.

#### 인자

콜백함수의 제어권을 넘겨받은 코드는 콜백함수를 호출할 때, 인자에 어떤 값들을 어떤 순서로 넘길것인지에 대한 제어권을 가진다.

#### this

콜백함수도 함수이기 때문에, 기본적으로 this는 전역객체를 참조한다.<br>
다만, 제어권을 넘겨받을 코드에서 콜백함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다.

```js
setTimeout(function () {console.log(this);}, 300);  //(1)

[1,2,3,4,5].forEach(function () {
    console.log(this);                              //(2)
});

document.body.innerHTML +='<button id='a'>클릭</button>';
document.body.querySelector('#a')
.addEventListener('click', function (e){
    console.log(this,e);                             //(3)
    }
);
```

각각의 this가 가리키는것

> - (1) 전역객체
> - (2) 전역객체
> - (3) HTML 엘리먼트

### 콜백함수는 함수다

> 콜백함수로 어떤 객체의 메서드를 전달하더라도, 그 메서드는 메서드가 아닌 함수로서 호출됨

### 콜백 함수 내부의 this에 다른 값 바인딩하기

객체의 메서드를 콜백함수로 전달하면 해당 객체를 this로 바라볼 수 없게 됨.

전통적인 방식: this를 다른 변수에 담아 콜백함수로 활용할 함수에서는 this대신 다른 변수를 사용하게 하고, 이를 클로저로 만드는 방식 사용(??)<br/>
요즘 방식 : ES5 bind 메서드 이용.

### 콜백 지옥과 비동기 제어

> 콜백지옥이란? : 콜백함수를 익명함수로 전달하는 과정이 반복되어, 코드의 들여쓰기 수준이 감당하기 힘들정도로 깊어지는 현상.<br>
> 이벤트 처리 or 서버통신과 같은 비동기적인 작업을 수행하기 위해 자주 등장하곤 한다.

#### 동기<->비동기

- 동기 : 현재 실행중인 코드가 완료된 후에야 다음코드를 실행.
- 비동기 : 현재 실행중인 코드의 완료여부와 무관하게 즉시 다음 코드로 넘어감.
  - 특정시간 전까지 함수의 실행 보류(setTimeout)
  - 사용자의 개입이 있을때 함수를 실행하도록 대기(addEventListener)
  - 별도의 대상에 요청하고, 응답이 왔을 때 함수를 실행하도록 대기(XMLHttpRequest)
  - => 별도의 요청, 실행 대기, 보류

콜백지옥을 해결하는 방법 1. 익명의 콜백함수를 기명함수로 바꾸기
-> 함수선언과 함수 호출만 구분할 수 있다면 코드의 가독성도 높이고 콜백지옥을 탈출 가능! (IIFE)<br>

콜백지옥을 해결하는 방법 2. Promise, Generator, async/await

```js
new Promise(function (resolve) {
    setTimeout (function () {
        var name = '에스프레소' ;
        console.log(name);
        resolve(name);
    }, 500)
}).then(function (prevName) {
    return new Promise(function (resolve) {
        setTimeout (function () {
            var name = prevName + ', 아메리카노' ;
            console.log(name);
            resolve(name);
        }, 500);
    });
}).then
....
```

#### Promise

promise를 이용하면 콜백함수를 호출할 때 바로 실행되지만, 내부에 resolve 또는 reject함수를 호출하는 구문이 있을경우, 둘 중 하나가 실행되기 전까지는 then 또는 catch로 넘어가지 않는다.
비동기작업이 완료될 때, resolve or reject를 호출하는 방법으로 사용가능

#### async/await

비동기 작업을 수행하고자 하는 함수 앞에 async, 실질적인 비동기 작업이 필요한 위치마다 await를 표기함.<br>
await의 뒤의 내용을 promise로 자동 전환하고, 해당 내용이 resolve된 후에 다음 진행.
