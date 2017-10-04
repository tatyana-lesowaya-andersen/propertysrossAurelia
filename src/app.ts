import { Router} from 'aurelia-router';

export class App {
  router: Router;
  configureRouter(config, router) {
    config.title = 'Nestoria';
    config.map([
      { route: ['', 'home'],       name: 'Home',       moduleId: './resources/components/home/home' },
      { route: 'details',       name: 'Details',       moduleId: './resources/components/details/details' }
    ]);
    this.router = router;
  }
}
