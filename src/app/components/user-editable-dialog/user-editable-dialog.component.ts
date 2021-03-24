import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-editable-dialog',
  templateUrl: './user-editable-dialog.component.html',
  styleUrls: ['./user-editable-dialog.component.scss']
})
export class UserEditableDialogComponent implements OnInit {
  form: FormGroup;
  max: Date;
  constructor(
    public dialogRef: MatDialogRef<UserEditableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (!this.form.valid) { return; }
    this.dialogRef.close(this.form.value);
  }

  ngOnInit(): void {
    this.max = new Date();
    this.max.setFullYear(this.max.getFullYear() - 5);
    this.form = new FormGroup({
      first_name: new FormControl(this.data ? this.data.first_name : '', [
        Validators.required,
      ]),
      last_name: new FormControl(this.data ? this.data.last_name : '', [
        Validators.required,
      ]),
      phone_number: new FormControl(this.data ? this.data.phone_number : '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
      ]),
      birth_date: new FormControl(this.data ? new Date(this.data.birth_date) : '', [
        Validators.required
      ]),
    });
  }

}
