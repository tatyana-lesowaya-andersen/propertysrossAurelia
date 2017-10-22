import {inject} from 'aurelia-framework';
import {enterCity} from '../../services/enterCity/enterCity';
import {countries} from '../../services/enterCity/countries.const';
import {favorites} from '../../services/enterCity/favorites';

@inject(enterCity, countries, favorites)
export class ChooseCity {
  public enterCity: enterCity;
  public countries: any[];
  public favorites: favorites;
  public city: string;

  constructor(enterCity, countries, favorites) {
    Object.assign(this, {enterCity, countries, favorites})
  }

  attached() {
    this.favorites.activate();
  }

  goToFavorities() {
    this.enterCity.setActiveFavorites();
    this.favorites.activate();
  }

}
