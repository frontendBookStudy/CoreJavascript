describe("변수의 호이스팅", () => {
  it("var 키워드로 선언한 변수는 undefined가 할당되어 호이스팅이 일어난다.", () => {
    expect(varA).toEqual(undefined);
    var varA = "a";
    expect(varA).toEqual("a");
  });
  it("let, const 키워드로 선언한 변수는 초기화 단계 이전에 참조하면 ReferenceError를 던집니다.", () => {
    try {
      console.log(letA);
      let letA = "a";
    } catch (e) {
      expect(e).toBeInstanceOf(ReferenceError);
    }
  });
});

describe("함수의 호이스팅", () => {
  it("함수 선언문이 평가되기 전에 참조가 가능합니다.", () => {
    expect(foo()).toEqual("foo");
    function foo() {
      return "foo";
    }
  });
  it("var 키워드로 만든 함수는 undefined로 초기화됩니다.", () => {
    expect(foo).toEqual(undefined);
    var foo = function () {
      return "foo";
    };
  });
  it("let 키워드로 만든 함수는 선언 이전에 참조하면 에러를 발생시킵니다.", () => {
    try {
      console.log(foo);
      let foo = function () {
        return "foo";
      };
    } catch (e) {
      expect(e).toBeInstanceOf(ReferenceError);
    }
  });
});
