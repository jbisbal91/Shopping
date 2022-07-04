import { Injectable } from '@angular/core';

import { ItemData } from '../multi-select-item-data/multi-select-item-data';

@Injectable({
  providedIn: 'root'
})
export class MultiSelectService {

  constructor() { }

  sortByWidthAsc(a: ItemData, b: ItemData) {
    if (a.width > b.width) {
        return 1;
    }
    if (a.width < b.width) {
        return -1;
    }
    return 0;
}
}
