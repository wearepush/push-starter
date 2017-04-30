import expect from 'expect';

const double = x => x * 2;

test('doubles', () => {
  expect(double(2)).toBe(4);
});
