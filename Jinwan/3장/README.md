## this

객체의 메소드가 호출되었을 때 그 객체의 프로퍼티에 접근하는 방법이 필요하다. 이럴 때 사용할 수 있는 것이 `this`이다. `this`는 자신이 속한 객체나 생성할 인스턴스를 의미한다. 즉, 자신이 속한 객체나 생성할 인스턴스의 프로퍼티를 가져다 사용할 수 있게 된 것이다.

> 일반적인 경우 `this`는 `window` 객체에 바인딩되어 있다.

`this`는 코드 어디서든 참조될 수 있는데, 그때마다 `this`는 다른 값을 가지고 있다. `this`는 정적으로 정해진 값이 아니라는 말이다. 함수 내부에서 this를 사용한 경우가 그러하다.

그렇다면 어떤 기준으로 동적으로 정해질까.

결론적으로 호출한 방식에 따라서 결정된다고 보면 된다. 먼저, `this`를 호출하는 경우를 살펴보자.

`함수`는 **일반 함수, 메소드, 콜백함수, 중첩함수, 화살표 함수, 생성자 함수** 정도로 구분할 수 있다.

각 함수마다 `this`에 바인딩되는 객체가 달라진다. 그렇기 때문에 정적이 아닌 동적으로 결정되는 것이다.

> 테스트 코드 스코프의 this를 사용하기 위해 다음과 같이 정의한다.
>
> `const THIS = this; // 테스트 코드 스코프의 this는 빈 객체를 가리킨다. (module.export)`

### 일반함수

일반함수의 `this`는 `전역객체`를 가리킨다. 브라우저면 `window`가 되겠고, node환경이면 `global`이 되겠다. 즉, 일반 함수를 호출했을 때 내부의 `this`는 `전역객체`가 된다는 것이다.

```javascript
it("일반 함수의 this는 전역 객체를 가리킨다.", () => {
  function whereIsThis() {
    return this;
  }
  expect(whereIsThis()).toEqual(???);
});
```

그렇다면 앞서 설명한 내용에서 생각해보자. 앞서 `this`는 호출하는 방식에 따라 결정된다고 했다.

> **일반함수로 호출할 경우 `this`는 `전역 객체`에 바인딩되게 되는 것이다.**

### 콜백함수, 중첩함수

**콜백함수와 중첩함수의 경우는 일반함수와 같기 때문에 `전역 객체`가 바인딩된다.**

```javascript
it("중첩 함수의 this는 전역 객체를 가리킨다.", () => {
  function outer() {
    function inner() {
      return this;
    }
    return inner();
  }
  expect(outer()).toEqual(???);
});
```

```javascript
it("콜백 함수의 this도 전역 객체를 가리킨다.", () => {
  function funWithCallback(callback) {
    return callback();
  }
  expect(
    funWithCallback(function () {
      return this;
    })
  ).toEqual(???); // passed or failed
  const obj = {
    method: function () {
      return this;
    },
  };
  expect(funWithCallback(obj.method)).toEqual(???); // pass 시키려면 어떤 값이 들어갈까?
});
```

### 메소드

메소드는 `this`는 호출한 객체가 바인딩되게 된다.

```javascript
it("method의 this는 호출한 객체를 가리킨다.", () => {
  const obj = {
    a: this,
    b: function () {
      return this;
    },
  };
  expect(obj.a).toEqual(???); // 아래 화살표 함수를 참조하자
  expect(obj.b()).toEqual(???);
});
it("method를 복사해도, this는 호출한 객체를 가리킨다.", () => {
  const obj1 = {
    method: function () {
      return this;
    },
  };
  const obj2 = {
    method: obj1.method,
  };
  expect(obj2.method()).toEqual(???); // passed or failed
});
```

위 코드를 실행하면 객체가 출력되게 되는데 그 객체가 바로 obj객체이다. 호출한 객체가 바인딩 된다는 것은 **객체를 생성할 때 `this`가 정해지는 것이 아니라 호출할 때 정해진다는 것이다.**

두번째 테스트 코드를 보면 `obj1`의 메소드를 가지고 `obj2`의 메소드를 생성했다. 즉, 같은 함수를 참조하고 있다는 것이다. 그런데 메소드 호출은 다르지만 같은 메소드를 참조하고 있는데도 불구하고 `this`의 값이 다른 것을 볼 수 있다. 바로 호출한 객체에 `this`가 바인딩 되기 때문이다. 이렇게 코드를 작성하는 경우는 없지만, 호출한 객체에 바인딩된다는 의미를 보기 위해서 예시를 들어봤다.

> 메소드 함수의 `this`는 호출한 객체에 바인딩된다.

### 생성자 함수

생성자 함수는 조금 다를 수 있다. 생성자 함수는 이 함수 자체를 바인딩하는 것이 아니라 **미래에 생성될 인스턴스**를 `this`에 바인딩한다.

```javascript
it("생성자 함수의 this는 미래 인스턴스를 가리킨다.", () => {
  function Circle(x) {
    this.x = x;
  }
  const instance = new Circle(5);
  expect(instance).toBeInstanceOf(Circle);
  expect(instance.x).toEqual(???);
});
```

생성자 함수로 호출하는 방식은 `new`키워드를 사용하는 방법이 있다. 이러면 각 함수 자체가 `this`에 바인딩되는 것이 아닌 인스턴스가 바인딩되기 때문에 여러개의 인스턴스를 생성하더라도 각각의 프로퍼티는 독립적인 것이 된다.

### 화살표 함수

이것 때문에 많은 실험을 했다. 화살표 함수는 **`this`에 상위 스코프의 `this`가 바인딩된다고 들었다. 스코프는 정의된 위치에 따라 정해지기 마련이다.** 즉, 화살표 함수가 **어디에 정의되었는지**에 따라 `this`가 정해지는 것이다. 이것은 정적 컨텍스트를 따른다고 볼 수 있다. 여기서의 정적과 동적은 값이 정해졌다는 것이 아니라 컨택스트가 정해졌다는 것이다.

비교하기 위해서 아래와 같은 코드를 작성했다.

```javascript
describe("화살표 함수의 this", () => {
  it("화살표 함수의 this는 상위 스코프의 this가 바인딩된다.", () => {
    expect(this).toEqual(???);
  });
  it("상위 스코프가 일반 함수일 경우 this는 전역 객체를 가리킨다.", () => {
    function foo() {
      return (() => this)();
    }
    expect(foo()).toEqual(???);
  });
  it("상위 스코프가 메소드인 경우 this는 호출한 객체를 가리킨다.", () => {
    const obj = {
      method() {
        return (() => this)();
      },
    };
    expect(obj.method()).toEqual(???);
  });
  it("메소드를 화살표 함수로 생성할 경우 this는 상위 스코프의 this를 가리킨다.", () => {
    const obj = {
      method: () => this,
    };
    expect(obj.method()).toEqual(???); // es6의 메소드 정의 방식을 사용해야 하는 이유
  });
  it("콜백 함수를 화살표 함수로 넘겨줄 경우 this는 정의 된 위치에서의 상위 스코프 this를 가리킨다.", () => {
    function funWithCallback(callback) {
      return callback();
    }
    expect(funWithCallback(() => this)).toEqual(???); // pass 하려면 어떻게 해야할까?
    function generateCallback() {
      return () => this;
    }
    expect(generateCallback()()).toEqual(???); // pass 하려면 어떻게 해야할까?
    expect(funWithCallback(generateCallback())).toEqual(???); // pass 하려면 어떻게 해야할까?
  });
});
```
