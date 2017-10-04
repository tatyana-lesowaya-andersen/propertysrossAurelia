import {inject} from 'aurelia-framework';
import {EnterCity} from '../../services/enterCity/enterCity';
import {countries} from '../../services/enterCity/countries.const';
import {Favorites} from '../../services/enterCity/favorites';

@inject(EnterCity, countries, Favorites)
export class ChooseCity {
  enterCity;
  countries;
  favorites;
  city;

  constructor(EnterCity, countries, Favorites) {
    this.enterCity = EnterCity;
    this.countries = countries;
    this.favorites = Favorites;
  }

  attached() {
    this.favorites.activate();
  }

  goToFavorities() {
    this.enterCity.setActiveFavorites();
    this.favorites.activate();
  }

}
