import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  isSidebarVisible: boolean;

  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>('');

  constructor(
    private router: Router
  ) {
    this.isSidebarVisible = true;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  toggleSidebarVisibilty() {
    this.isSidebarVisible = !this.isSidebarVisible
    this.sidebarVisibilityChange.next(this.isSidebarVisible);
  }

  setActiveNavItem(navItem: string) {
    localStorage.setItem("activeNavItem", navItem);
  }

  get activeNavItem() {
    return localStorage.getItem("activeNavItem") || 'home';
  }

  public closeNav() {
    this.appDrawer?.close();
  }

  public openNav() {
    this.appDrawer?.open();
  }
}
