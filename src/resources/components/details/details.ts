import {inject} from 'aurelia-framework';
import {EnterCity} from '../../services/enterCity/enterCity';
import {Router} from 'aurelia-router';

@inject(EnterCity, Router)
export class Details {
  enterCity;
  router: Router;

  constructor(EnterCity, Router) {
    this.enterCity = EnterCity;
    this.router = Router;
  }

  public goBack(){
    this.router.navigateBack();
  }

}
