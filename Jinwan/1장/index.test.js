test("test가 동작하는 지 확인합니다.", () => {
  expect(1 + 2).toBe(3);
});

test("기본형의 변수는 새로운 주소에 같은 값을 복사합니다.", () => {
  let a = 1;
  let b = a;

  expect(a === b).toBeTruthy();
});

test("기본형은 복사한 변수의 값이 바뀌면 원본 값과 서로 다르게 됩니다.", () => {
  let a = 1;
  let b = a;

  b = 2;
  expect(a === b).toBeFalsy();
});

test("참조형은 생성된 데이터가 존재하는 주소를 공유합니다.", () => {
  const arr = [1, 2, 3];
  const arr2 = arr;

  expect(arr === arr2).toBeTruthy();
});

test("참조형은 주소를 공유하기 때문에 공유하는 다른 변수가 원본 값을 바꾸면 모든 변수의 값도 같이 바뀌는 것처럼 보입니다.", () => {
  const arr = [1, 2, 3];
  const arr2 = arr;

  arr2[1] = 0;

  expect(arr2).toEqual([1, 0, 3]);
  expect(arr).toEqual([1, 0, 3]);
  expect(arr === arr2).toBeTruthy();
});

test("참조형의 데이터는 내부 값을 변경할 때 가변적입니다.", () => {
  const arr = [1, 2, 3];
  const arr2 = arr;

  expect(arr === arr2).toBeTruthy();
  arr2[0] = 2;
  arr2[1] = 3;
  arr2[2] = 4;

  expect(arr2).toEqual([2, 3, 4]);
  expect(arr).toEqual([2, 3, 4]);
  expect(arr === arr2).toBeTruthy();
});

test("참조형의 데이터를 다른 참조형으로 바꾸면, 새로운 주소가 할당되어 공유 관계가 끊어집니다.", () => {
  const arr = [1, 2, 3];
  let arr2 = arr;

  expect(arr === arr2).toBeTruthy();

  arr2 = [2, 3, 4];
  expect(arr2).toEqual([2, 3, 4]);
  expect(arr).toEqual([1, 2, 3]);
  expect(arr === arr2).toBeFalsy();
});
