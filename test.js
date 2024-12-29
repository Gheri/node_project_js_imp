const sum = require("./index.js");

beforeAll(() => {
  
});

afterAll(() => {
  
});

describe('Test Module 1', () => {
  test('Test Case 1', async () => {
     const sumOf1And2 =sum(1,2);
     console.log(sumOf1And2);
     expect(sumOf1And2).toBe(3);
  })
})
