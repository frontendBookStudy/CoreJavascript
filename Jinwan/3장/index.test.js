const THIS = this; // 테스트 코드 스코프의 this는 빈 객체를 가리킨다. (module.export)

test("모듈 환경에서 this는 module.exports를 가리킨다.", () => {
  expect(THIS).toBe(module.exports);
});
test("module.exports는 단순 빈 객체와 동일하지 않다.", () => {
  expect(THIS).not.toBe({});
});

describe("this가 전역 객체를 가리키는 경우", () => {
  it("일반 함수의 this는 전역 객체를 가리킨다.", () => {
    function whereIsThis() {
      return this;
    }
    expect(whereIsThis()).toBe(global);
  });
  it("중첩 함수의 this는 전역 객체를 가리킨다.", () => {
    function outer() {
      function inner() {
        return this;
      }
      return inner();
    }
    expect(outer()).toBe(global);
  });
  it("콜백 함수의 this도 전역 객체를 가리킨다.", () => {
    function funWithCallback(callback) {
      return callback();
    }
    expect(
      funWithCallback(function () {
        return this;
      })
    ).toBe(global);
    const obj = {
      method: function () {
        return this;
      },
    };
    expect(funWithCallback(obj.method)).toBe(global);
  });
});
describe("this가 특정 객체를 가리키는 경우", () => {
  it("method의 this는 호출한 객체를 가리킨다.", () => {
    const obj = {
      a: this,
      b: function () {
        return this;
      },
    };
    expect(obj.a).toBe(THIS); // 아래 화살표 함수를 참조하자
    expect(obj.b()).toBe(obj);
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
    expect(obj2.method()).toBe(obj2);
  });
  it("생성자 함수의 this는 미래 인스턴스를 가리킨다.", () => {
    function Circle(x) {
      this.x = x;
    }
    const instance = new Circle(5);
    expect(instance).toBeInstanceOf(Circle);
    expect(instance.x).toEqual(5);
  });
});
describe("화살표 함수의 this", () => {
  it("화살표 함수의 this는 상위 스코프의 this가 바인딩된다.", () => {
    expect(this).toBe(THIS);
  });
  it("상위 스코프가 일반 함수일 경우 this는 전역 객체를 가리킨다.", () => {
    function foo() {
      return (() => this)();
    }
    expect(foo()).toBe(global);
  });
  it("상위 스코프가 메소드인 경우 this는 호출한 객체를 가리킨다.", () => {
    const obj = {
      method() {
        return (() => this)();
      },
    };
    expect(obj.method()).toBe(obj);
  });
  it("중첩 함수를 화살표 함수로 생성할 경우 this는 상위 스코프의 this를 가리킨다.", () => {
    const arrowOuter = () => {
      return (() => {
        return this;
      })();
    };
    function outer() {
      return (() => this)();
    }
    expect(arrowOuter()).toBe(THIS);
    expect(outer()).toBe(global);
  });
  it("메소드를 화살표 함수로 생성할 경우 this는 상위 스코프의 this를 가리킨다.", () => {
    const obj = {
      method: () => this,
    };
    expect(obj.method()).toBe(THIS);
  });
  it("콜백 함수를 화살표 함수로 넘겨줄 경우 this는 콜백으로 넘겨줄 때의 상위 스코프 this를 가리킨다.", () => {
    function funWithCallback(callback) {
      return callback();
    }
    expect(funWithCallback(() => this)).toBe(THIS);
    function generateCallback() {
      return () => this;
    }
    expect(generateCallback()()).toBe(global);
    expect(funWithCallback(generateCallback())).toBe(global);
  });
});
