import { makeAutoObservable } from 'mobx';

export default class MapStore {
  constructor() {
    /* this._maps = [
      { id: 1, matrix: '5fd2a4fe-eaa8-458e-a60d-56279d0c1014.jpg' },
      { id: 2, matrix: '9a271a52-0b67-4ea4-b0af-85e0619aefdf.jpg' },
      { id: 3, matrix: '031ee5be-c8df-4e54-8e2a-34991aaddf1f.jpg' },
      { id: 4, matrix: '969c2d5b-1940-44d1-b31f-cff9a12d65f1.jpg' },
      { id: 5, matrix: '10191255-13f8-4e2e-b6d4-a2e45c223885.jpg' },
    ]; */
    this._saves = [
      //{ id: 1, mapId: 1, userId: 1 },
      //{ id: 4, mapId: 4, userId: 3 },

      //{ id: 2, mapId: 2, userId: 2 },
      //{ id: 3, mapId: 3, userId: 2 },
      { id: 2, matrix: '9a271a52-0b67-4ea4-b0af-85e0619aefdf.jpg' },
      { id: 3, matrix: '031ee5be-c8df-4e54-8e2a-34991aaddf1f.jpg' },
    ];
    this._shares = [
      //{ id: 1, rating: 3.5, mapId: 1 },
      //{ id: 2, rating: 4.5, mapId: 2 },
      //{ id: 3, rating: 3, mapId: 5 },
      { id: 1, rating: 3.5, mapId: 1,
        matrix: '5fd2a4fe-eaa8-458e-a60d-56279d0c1014.jpg' },
      { id: 2, rating: 4.5, mapId: 2,
        matrix: '9a271a52-0b67-4ea4-b0af-85e0619aefdf.jpg' },
      { id: 5, rating: 3, mapId: 5,
        matrix: '10191255-13f8-4e2e-b6d4-a2e45c223885.jpg' },
    ];
    makeAutoObservable(this);
  }

  setMaps(maps) {
    this._maps = maps;
  }

  setSaves(saves) {
    this._saves = saves;
  }

  setShares(shares) {
    this._shares = shares;
  }

  get maps() {
    return this._maps;
  }

  get saves() {
    return this._saves;
  }

  get shares() {
    return this._shares;
  }
}
