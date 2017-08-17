
import Signal from '../src/Signal';

describe.only('Signal', () => {
  test('basic', () => {
    const signal = new Signal();
    signal.destroy();
    expect(signal.destroyed).toBe(true);
  });
  test('with listener', () => {
    expect.assertions(1);
    const signal = new Signal();
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.dispatch('test');
  });
  test('with multi listener', () => {
    expect.assertions(2);
    const signal = new Signal();
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.dispatch('test');
  });
  test('listeners', () => {
    const signal = new Signal();
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.add((value) => {
      expect(value).toBe('test');
    });
    expect(signal.getNumListeners()).toBe(2);
  });
  test('removeAll', () => {
    expect.assertions(1);
    const signal = new Signal();
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.removeAll();
    signal.dispatch('test');
    expect(true).toBe(true);
  });
  test('Slot', () => {
    expect.assertions(2);
    const signal = new Signal();
    const slot = signal.add((value) => {
      expect(value).toBe('test');
    });
    slot.remove();
    signal.add((value) => {
      expect(value).toBe('test');
    });
    signal.dispatch('test');
    expect(signal.getNumListeners()).toBe(1);
  });
});
