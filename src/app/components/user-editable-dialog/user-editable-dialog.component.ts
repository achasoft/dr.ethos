import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-editable-dialog',
  templateUrl: './user-editable-dialog.component.html',
  styleUrls: ['./user-editable-dialog.component.scss']
})
export class UserEditableDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserEditableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
