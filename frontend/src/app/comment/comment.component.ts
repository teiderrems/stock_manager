import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  LoadCommentAction,
  PostCommentAction,
  ResetBooleanField,
} from '../../state/comment/comment.actions';
import { CommentState } from '../../state/comment/comment.state';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    NzCommentModule,
    NzIconModule,
    NzModalModule,
    NzCollapseModule,
    NzListModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzPaginationModule
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  notify() {
    throw new Error('Method not implemented.');
  }
  handleCancel() {
    this.showAddForm.set(false);
  }
  inputValue: any;
  handleSubmit() {
    this.store.dispatch(ResetBooleanField);
    if (this.comment.valid) {
      this.store.dispatch(
        new PostCommentAction(this.comment.getRawValue(), this.currentItemId()!)
      );
      if (this.commentState().isSuccess) {
        this.IsSubmitting.set(false);
        this.showAddForm.set(false);
        this.store.dispatch(ResetBooleanField);
      }
    }
  }
  ngOnInit(): void {
    // this.store.dispatch(new LoadCommentAction(this.itemId()!));
  }

  updateLimit(size:number) {
    this.limit.set(size)

  }

  updatePage(index:number) {
    this.page.set(index);
  }

  page=signal(1);
  limit=signal(20);

  currentItemId = signal<number>(0);
  showAddForm = signal(false);

  IsSubmitting = signal(false);

  comment = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  private readonly store = inject(Store);
  // itemId=input<number>();

  @Input('itemId')
  set itemId(itemId: number) {
    this.currentItemId.set(itemId);
    this.store.dispatch(new LoadCommentAction(itemId));
  }

  commentState = this.store.selectSignal(CommentState.getState);
}
