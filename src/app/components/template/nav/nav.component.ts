import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavComponent implements OnInit {

  asideVisible: boolean;
  _asideSubscription: any;

  _subscription: any;

  navItens: Array<any> = [];
  expanded: boolean = false;

  constructor(
    private navService: NavService,
  ) {
    this.asideVisible = this.navService.isSidebarVisible
    this._asideSubscription = this.navService.sidebarVisibilityChange.subscribe((value) => {
      this.asideVisible = value
    })
  }

  ngOnInit(): void {
    this.navItens = this.createNavItems();
  }

  changeMenuItem(image: string) {
    this.expanded = true;
    this.navService.setActiveNavItem(image);
  }

  createNavItems() {
    return this.allNavItems;
  }

  get activeNavItem() {
    return this.navService.activeNavItem;
  }

  get allNavItems() {
    return [
      {
        id: 'home',
        title: 'Início',
        icon: 'home',
        router: '/'
      },
      {
        id: 'pessoa',
        title: 'Pessoa',
        icon: 'person',
        router: '/pessoa',
      }
    ];
  }
}
