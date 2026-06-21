import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Historico Vacinal', url: '/vaccine-history', icon: 'medkit' },
    { title: 'Perfil da Crianca', url: '/child-profile', icon: 'person' },
    { title: 'Campanhas', url: '/campaigns', icon: 'megaphone' }
  ];

  constructor() {}
}
