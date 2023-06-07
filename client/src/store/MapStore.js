import { makeAutoObservable } from 'mobx';

export default class MapStore {
  constructor() {
    this._saves = [
      { id: 2, matrix: '1.jpg' },
      { id: 3, matrix: '2.jpg' },
    ];
    this._shares = [
      { id: 1, rating: 3.5, mapId: 1,
        matrix: '3.jpg', mark: 5, isSaved: true },
      { id: 2, rating: 4.5, mapId: 2,
        matrix: '4.jpg', mark: 4 },
      { id: 5, rating: 3, mapId: 5,
        matrix: '5.jpg' },
    ];
    makeAutoObservable(this);
  }

  setSaves(saves) {
    this._saves = saves;
  }

  setShares(shares) {
    this._shares = shares;
  }

  get saves() {
    return this._saves;
  }

  get shares() {
    return this._shares;
  }
}
