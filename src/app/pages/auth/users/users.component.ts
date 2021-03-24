import { Component, OnInit, EventEmitter } from '@angular/core';
import {GridCommand} from '../../../view-models/shared/grid-view-models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  commander = new EventEmitter<GridCommand<any>>();
  constructor() { }

  ngOnInit(): void {
  }

  delete(element): void {

  }

  edit(element): void {

  }
}
