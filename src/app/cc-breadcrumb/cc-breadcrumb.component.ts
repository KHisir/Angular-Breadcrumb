import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BreadcrumbItem } from './model/breadcrumbItem';
@Component({
  selector: 'app-cc-breadcrumb',
  templateUrl: './cc-breadcrumb.component.html',
  styleUrls: ['./cc-breadcrumb.component.scss'],
})
export class CcBreadcrumbComponent implements OnInit, AfterViewInit {
  @Output() breadcrumb = new EventEmitter<BreadcrumbItem[]>();
  @Input() separator: string = '/'; // /, →, •, |, ›, —
  @Input() itemWidth: number = 100;
  
  private _items: BreadcrumbItem[] = [];
  public get items() : BreadcrumbItem[] {
    return this._items;
  }

  @Input()
  public set items(v : BreadcrumbItem[]) {
    this._items = v;
    this.setItems();
  }
  
  dropdownList: BreadcrumbItem[] = [];
  dropdownItemId: string = 'breadcrumb-dropdown-item';

  dropdownIsOpen: boolean = false;
  dropdownItem?: HTMLElement;
  observer?: ResizeObserver;

  @ViewChild("olElem") olElem?: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.dropdownItem !== undefined) {
      // if (this.dropdownItem.id === dropdownItemId) {
      //   this.dropdownIsOpen = true;
      // } else {
      //   this.dropdownIsOpen = false;
      // }
      this.dropdownItem = undefined;
    } else {
      this.dropdownIsOpen = false;
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.observer = new ResizeObserver(entries => {
      // const width = entries[0].contentRect.width;
      // console.log(width);
      this.setItems();
    });

    if (this.olElem !== undefined && this.observer !== undefined) {
      this.observer.observe(this.olElem.nativeElement);
    }

    this.setItems();
  }

  ngOnDestroy() {
    if (this.olElem !== undefined && this.observer !== undefined) {
      this.observer.unobserve(this.olElem.nativeElement);
    }
  }

  setItems(): void {
    if (this.olElem !== undefined) {
      this.items.forEach((e: BreadcrumbItem) => e.ShowInDropdown = false);
      this.dropdownList = [];

      const padding: number = 60;

      if ((this.items.length * this.itemWidth) > this.olElem.nativeElement.offsetWidth) {
        const count: number = Math.floor((this.olElem.nativeElement.offsetWidth - padding) / this.itemWidth);
      
        // add item for dropdown:
        if (this.items.find((e: BreadcrumbItem) => e.Id === this.dropdownItemId) === undefined) {
          this.items.splice(1, 0, new BreadcrumbItem('', 'fa-ellipsis-h', '', this.dropdownItemId));
        }

        for (let i = 2; i < this.items.length; i++) {
          if (this.dropdownList.length === (this.items.length - count)) {
            break;
          } else {
            this.items[i].ShowInDropdown = true;
            this.dropdownList.push(this.items[i]);
          }
          
        }
      } else {
        // remove dropdown item:
        if (this.items.find((e: BreadcrumbItem) => e.Id === this.dropdownItemId) !== undefined) {
          this.items.splice(1, 1);
        }
      }
    }
    this.cdr.detectChanges();
  }

  itemOnClick(item: BreadcrumbItem, elem?: HTMLElement): void {
    if (item.Id === this.dropdownItemId) {
      this.dropdownIsOpen = !this.dropdownIsOpen;
      this.dropdownItem = this.dropdownIsOpen === true ? elem : undefined;
    } else {
      this.dropdownItem = undefined;
      for (let i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i].Id === item.Id) {
          break;
        } else {
          this.items.pop();
        }
      }
      this.setItems();
      this.breadcrumb.emit(this.items);
    }
  }
}
