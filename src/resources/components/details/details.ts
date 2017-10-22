import {inject} from 'aurelia-framework';
import {enterCity} from '../../services/enterCity/enterCity';
import {Router} from 'aurelia-router';

@inject(enterCity, Router)
export class Details {
  public enterCity: enterCity;
  public router: Router;

  constructor(enterCity, Router) {
    this.enterCity = enterCity;
    this.router = Router;
  }

  public goBack(){
    this.router.navigateBack();
  }

}
