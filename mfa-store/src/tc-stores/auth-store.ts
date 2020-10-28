import { Observable } from 'rxjs';
import { BaseStore } from '../base-store';

export interface IAuthState {
    isInitialized: boolean;
    tokenV2: string;
    tokenV3: string;
    profile: any;
}

export class AuthStore extends BaseStore<IAuthState> {
  constructor(initialState?: IAuthState) {
    super(initialState || {
      isInitialized: false,
      tokenV2: null,
      tokenV3: null,
      profile: null,
    });
  }

  public setAuthState(newState: Partial<IAuthState>) {
    this.setState(state => ({
      ...state,
      ...newState,
    }));
  }
}