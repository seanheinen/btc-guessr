import { ChangeDetectionStrategy, Component, inject, model, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from './store/selectors/user-selectors';
import { UserActions } from './store/actions/user-actions';
import { take } from 'rxjs';

@Component({
  selector: 'cx-root',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  readonly store = inject(Store);
  readonly dialog = inject(MatDialog);
  readonly user = this.store.selectSignal(selectUser);

  changeUsername() {
    this.dialog.open(ChangeUsernameDialog);
  }
  resetScore() {
    this.store.dispatch(UserActions['cx/user/change-score']({ score: 0 }));
  }
}

@Component({
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  selector: 'cx-change-username-dialog',
  template: `
    <h2 mat-dialog-title>Change username</h2>
    <mat-dialog-content>
      <p>Enter in your new username</p>
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput [(ngModel)]="username" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="cancel()">Cancel</button>
      <button matButton (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
})
export class ChangeUsernameDialog implements OnInit {
  readonly store = inject(Store);
  readonly dialogRef = inject(MatDialogRef<ChangeUsernameDialog>);
  readonly username = model<string>('');

  ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.username.set(user.username);
      });
  }
  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.store.dispatch(UserActions['cx/user/update-username']({ username: this.username() }));
    this.dialogRef.close();
  }
}
