import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from '../base-component';
import { BaseCrudService } from '../base-crud.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css']
})
export class BaseListComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() urlList: string = '';
  @Input() typeUser: any;
  @Input() displayedColumns: Array<any> = [];
  @Input() buttonAdd!: any;
  @Input() filterPhone: Boolean = false;
  @Input() data: any;
  @Input() isForm: Boolean = false;

  isLoadingResults = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource: any;

  constructor(
    private baseCrudService: BaseCrudService,
    private router: Router
  ) {
    super();
  }
  ngOnChanges(changes: any): void {
    if (changes.data) {
      this.dataSource = new MatTableDataSource(this.data?.params ? this.data.params : this.data);
      this.resultsLength = this.data?.length;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getList();
    const originalGetRangeLabel = this.paginator._intl.getRangeLabel;

    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.getRangeLabel = (page: number, size: number, len: number) => {
      return originalGetRangeLabel(page, size, len)
        .replace('of', 'de');
    };;
  }

  public getList() {
    if (this.urlList) {
      this.subscription.add(
        this.baseCrudService.getList(this.urlList, {
          page: this.paginator?.pageIndex,
          size: this.paginator?.pageSize,
          type: this.typeUser,
        })
      );
    }
  }

  get columns() {
    return this.displayedColumns.map(c => c.code);
  }

  getData(row: any, column: any) {
    return column?.codeList ? this.getDataByKey(row, column.codeList) : row[column.code];
  }

  getDataByKey(row: any, column: any): any {
    let data = '';
    let newColumn = [];
    Object.keys(row).forEach(key => {
      if (key == column[0] && column.length > 1) {
        newColumn = column.filter((c: string, index: number) => index != 0);
        data = this.getDataByKey(row[key], newColumn);
      } else if (key == column[0]) {
        data = row[key];
      }
    });

    return data;
  }

  navigateToCreate() {
    this.router.navigate([this.buttonAdd.link]);
  }

  public applyFilter(event: string) {
    const filterValue = event;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public filterPhones(event: any) {
    if (event.checked) {
      const newData = this.data.filter((item: any) => item?.telefones?.length >= 2);
      this.dataSource = new MatTableDataSource(newData);
    } else {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }
}
