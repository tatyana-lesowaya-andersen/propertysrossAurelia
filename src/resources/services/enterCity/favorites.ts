import {inject} from 'aurelia-framework';
import * as $ from 'jquery';


@inject()
export class Favorites {
  favoriteItems = [];
  flats;
  urlArr = [];
  isFavoritesActive = true;
  dirtyChecker;

  constructor() {
  }

  activate() {
    const str = window.localStorage.getItem('favoriteItems');
    if (str) {
      this.flats = JSON.parse(str) || [];
      this.favoriteItems = this.flats.slice(0, 4);
      this.urlArr = this.flats.map((flat) => flat.img_url);
      if (this.flats.length > 4) {
        this.paginationDestroy();
        if (Math.ceil(this.flats.length / 4) > 1) {
          this.paginationInit();
        }
      }
    } else {
      this.flats = [];
      this.favoriteItems = [];
    }
    this.isFavoritesActive = true;
  }

  addFavorite(newObj) {
    this.flats.push(newObj);
    this.urlArr.push(newObj.img_url);

    this.saveFavorite();
  }

  saveFavorite() {
    window.localStorage.setItem('favoriteItems', JSON.stringify(this.flats));
  }

  deleteFavorite(position) {
    if (this.flats[position]) {
      window.localStorage.removeItem('favoriteItems');
      this.flats.splice(position, 1);
      this.urlArr.splice(position, 1);
      this.saveFavorite();
    }
  }

  get(page) {
    return this.flats.slice(page * 4 - 4, page * 4);
  }

  changeFavoriteStatus(flat, index) {
    $('.fa-star')[index+1].classList.toggle('i-color')
    event.stopPropagation();
    const position = this.urlArr.indexOf(flat.img_url);
    if (position !== -1) {
      this.deleteFavorite(position);
    } else {
      this.addFavorite(flat);
    }
  }

  paginationInit() {
    const pages = Math.ceil(this.flats.length / 4);
    $('#pagination-demo').twbsPagination({
      totalPages: pages,
      startPage: 1,
      visiblePages: 5,
      onPageClick: (event, page)=>{this.loadMoreFavorite(event, page)}
    });
  }

  paginationDestroy() {
    const element = $('#pagination-demo');
    if (element) {
      element.twbsPagination('destroy');
    }
  }

  loadMoreFavorite(event, page) {
    this.favoriteItems = this.get(page);
    this.favoriteItems.forEach(function (flat) {
      flat.title_short = flat.title.length > 35 ?
        flat.title.slice(0, 35).toLowerCase() + "..." : flat.title.toLowerCase();
    });
  }

}
