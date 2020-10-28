import { BaseStore } from '../base-store';

export interface ICounterState {
  counter: number;
}

export class CounterStore extends BaseStore<ICounterState> {
  constructor(initialState?: ICounterState) {
    super(initialState || {
        counter: 0,
    });
  }

  public setCounter(counter: number) {
    this.setState(state => ({
      ...state,
      counter,
    }));
  }
}