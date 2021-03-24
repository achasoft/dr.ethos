import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpService} from '../../../services/shared/http.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {UserEditableDialogComponent} from '../../../components/user-editable-dialog/user-editable-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  defaultPageSize: number;
  isLoading: boolean;
  usersData: MatTableDataSource<any>;
  columns: string[];

  constructor(
    private readonly httpService: HttpService,
    private readonly dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.defaultPageSize = 10;
    this.usersData = new MatTableDataSource([]);
    this.columns = [
      // 'index',
      'first_name',
      'last_name',
      'phone_number',
      'birth_date',
      'operations',
    ];
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;
    this.usersData.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'birth_date': return new Date(item.birth_date);
        default: return item[property];
      }
    };
  }

  async fetch(): Promise<void> {
    this.isLoading = true;
    const users = await this.httpService.mockData<any[]>('/users');
    this.usersData.filteredData = [...users.data].splice(0, 0, 10);
    this.usersData.data = users.data;
    this.isLoading = false;

    setTimeout(() => {
      this.paginator.length = users.data.length;
      this.paginator.pageSize = this.defaultPageSize;
      this.paginator.pageIndex = 0;
    }, 100);
  }

  applyFilter(filterValue: string): void {
    this.usersData.filter = filterValue.trim().toLowerCase();
  }

  delete(element): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'PLEASE_CONFIRM',
        message: 'ARE_YOU_SURE',
        actionLabel: 'CONFIRM',
        cancelLabel: 'CANCEL'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersData.data = this.usersData.data.filter(f => f !== element);
      }
    });
  }

  edit(element): void {
    const dialogRef = this.dialog.open(UserEditableDialogComponent, {
      width: '400px',
      data: {...element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(element, result);
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(UserEditableDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersData.data = [result, ...this.usersData.data];
      }
    });
  }
}
