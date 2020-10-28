import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Base store for global stores
 */
export abstract class BaseStore<T> extends BehaviorSubject<T> {
  constructor(initialState: T) {
    super(initialState);
  }

  /**
   * Set state value
   * @param fn state setter
   */
  public setState(fn: (state: T) => T) {
    this.next(fn(this.getValue()));
  }
}