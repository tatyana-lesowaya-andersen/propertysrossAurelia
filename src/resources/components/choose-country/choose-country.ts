import {inject} from 'aurelia-framework';
import {enterCity} from '../../services/enterCity/enterCity';
import {countries} from '../../services/enterCity/countries.const';
import {favorites} from '../../services/enterCity/favorites';

@inject(enterCity, favorites, countries)
export class ChooseCountry {
  public list = countries;
  public enterCity: enterCity;
  public favorites: favorites;

  constructor(enterCity, favorites) {
    Object.assign(this, {enterCity, favorites})
  }

  changeActive(index) {
    if (!this.enterCity.activeCountry) {
      this.favorites.isFavoritesActive = false;
      this.favorites.paginationDestroy();
    }
    this.enterCity.activeCountry = index;
  };


}

