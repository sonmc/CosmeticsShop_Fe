import { Employee } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new Employee()).toBeTruthy();
  });
});
