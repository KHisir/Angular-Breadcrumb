import { Component } from '@angular/core';
import { BreadcrumbItem } from './cc-breadcrumb/model/breadcrumbItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-breadcrumb';

  items: BreadcrumbItem[] = [
    new BreadcrumbItem('Home', 'fa-home'),
    new BreadcrumbItem('Item1', '', '10'),
    new BreadcrumbItem('Item2'),
    new BreadcrumbItem('Item3'),
    new BreadcrumbItem('Item4'),
    new BreadcrumbItem('Item5')
  ]

  itemName: string = "";
  itemBadge: string = "";
  icon: string = "";
  icons: string[] = ['fa-home', 'fa-music', 'fa-folder', 'fa-folder-open', 'fa-shopping-cart'];

  addItem(): void {
    this.items.push(new BreadcrumbItem(this.itemName, this.icon, this.itemBadge));

    // update list:
    this.items = this.items.concat([]);
    this.itemName = "";
    this.itemBadge = "";
    this.icon = "";
  }
}
