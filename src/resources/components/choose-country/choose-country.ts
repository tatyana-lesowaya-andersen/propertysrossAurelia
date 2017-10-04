import {inject} from 'aurelia-framework';
import {EnterCity} from '../../services/enterCity/enterCity';
import {countries} from '../../services/enterCity/countries.const';
import {Favorites} from '../../services/enterCity/favorites';

@inject(EnterCity, Favorites, countries)
export class ChooseCountry {
  // list = enterCity.countries;
  list = countries;
  enterCity;
  favorites;

  constructor(EnterCity, Favorites) {
    this.enterCity = EnterCity;
    this.favorites = Favorites;
  }

  changeActive(index) {
    if (!this.enterCity.activeCountry) {
      this.favorites.isFavoritesActive = false;
      this.favorites.paginationDestroy();
    }
    this.enterCity.activeCountry = index;
  };


}

