import {inject} from 'aurelia-framework';
import {countries} from '../../services/enterCity/countries.const';
import {HttpClient, json} from "aurelia-fetch-client";
import * as $ from 'jquery';

let client = new HttpClient();

@inject(countries)
export class EnterCity {
  activeCountry;
  countries;
  resultsNumber;
  pages;
  city;
  favoriteActive = true;
  active;
  flats;
  element;

  constructor(countries) {
    this.countries = countries;
  }

  search(city) {
    this.city = city;
    this.favoriteActive = false;
    var url = countries[this.activeCountry].api + city ;
    client.fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.resultsNumber = data.response.listings.length;
        this.flats = data.response.listings;
        console.log(this.flats);
        this.paginationDestroy();
        this.pages = data.response.total_pages + 1;
        if (this.pages > 1) {
          this.paginationInit();
        }
      });
  }

  saveAsActive(active) {
    this.active = active;
    return true;
  }

  paginationInit() {
    $('#pagination-demo').twbsPagination({
      totalPages: this.pages,
      startPage: 1,
      visiblePages: 5,
      onPageClick: (event, page) => {
        this.changePage(event, page)
      }
    });
  }

  paginationDestroy() {
    if (this.element) {
      $('#pagination-demo').twbsPagination('destroy');
    }
  }

  updateFlats(page){
    var url = countries[this.activeCountry].api + this.city + '&page=' + page;
    client.fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.resultsNumber = data.response.listings.length;
        this.flats = data.response.listings;
      });

  }

  changePage(event, page) {
    this.updateFlats( page);
  }

  setActiveFavorites() {
    this.favoriteActive = true;
    this.activeCountry = undefined;
  }
}
