import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {countries} from '../../services/enterCity/countries.const';
import * as $ from 'jquery';

let client = new HttpClient();

@inject(countries)
export class enterCity {
  public activeCountry: number;
  public countries: any[];
  public resultsNumber: number;
  public pages: number;
  public city: string;
  public favoriteActive: boolean = true;
  public active: any;
  public http;
  public flats: any[];
  public element: Element;

  constructor(countries) {
    Object.assign(this, {countries})
  }

  search(city) {
    this.city = city;
    this.favoriteActive = false;
    const url = countries[this.activeCountry].api + city;
    client.jsonp(url, 'callback')
      .then(response => response.content.response)
      .then(data => {
        const {listings, total_pages} = data;
        this.resultsNumber = listings.length;
        this.flats = listings;
        this.paginationDestroy();
        this.pages = total_pages + 1;
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

  updateFlats(page) {
    const url = `${countries[this.activeCountry].api}${this.city}&page=${page}`;
    client.jsonp(url, 'callback')
      .then(response => response.content.response)
      .then(data => {
        this.resultsNumber = data.listings.length;
        this.flats = data.listings;
      }, error => console.error(error));

  }

  changePage(event, page) {
    this.updateFlats(page);
  }

  setActiveFavorites() {
    this.favoriteActive = true;
    this.activeCountry = undefined;
  }
}
