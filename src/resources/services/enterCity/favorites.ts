import {inject} from 'aurelia-framework';
import * as $ from 'jquery';
import {flatsPerPage, titleLength} from '../../services/enterCity/countries.const';


@inject()
export class favorites {
  public favoriteItems: any[] = [];
  public flats: any[];
  public urlArr: string[] = [];
  public isFavoritesActive: boolean = true;

  constructor() {
  }

  activate() {
    const str = window.localStorage.getItem('favoriteItems');
    if (str) {
      this.flats = JSON.parse(str) || [];
      this.favoriteItems = this.flats.slice(0, flatsPerPage);
      this.urlArr = this.flats.map(({ img_url }) => img_url);
      if (this.flats.length > flatsPerPage) {
        this.paginationDestroy();
        if (Math.ceil(this.flats.length / flatsPerPage) > 1) {
          this.paginationInit();
        }
      }
    } else {
      this.flats = [];
      this.favoriteItems = [];
    }
    this.isFavoritesActive = true;
  }

  addFavorite(newFavoriteFlat) {
    this.flats.push(newFavoriteFlat);
    this.urlArr.push(newFavoriteFlat.img_url);

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

  getPage(page) {
    return this.flats.slice(page * flatsPerPage - flatsPerPage, page * flatsPerPage);
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
    const pages = Math.ceil(this.flats.length / flatsPerPage);
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
    this.favoriteItems = this.getPage(page);
    this.favoriteItems.forEach(flat => {
      const {title, title_short} = flat;
      flat.title_short = title.length > titleLength ? `${title.slice(0, titleLength).toLowerCase()}...` : title.toLowerCase();
    });
  }

}
