import { Component, OnInit, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/interfaces/chat';
import { AddQuestionModel, EditQuestionModel, QuestionModel } from 'src/app/interfaces/question';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css'],
    standalone: false
})
export class AddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  showTips: boolean = true;
  tags: string[] = ['javascript', 'react', 'tailwindcss']; // Mock tags
  tagInput: string = '';
  maxTags: number = 5;

  // CKEditor 5 setup (loaded dynamically so build doesn't fail when package is absent):
  public Editor: any = ClassicEditor;;
  public editorConfig = {
    placeholder: 'Describe your problem here. Include code, error messages, and what you have tried.',
    toolbar: {
      items: [
        'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
        '|', 'insertTable', 'undo', 'redo', 'codeBlock' 
      ]
    }
  };

  constructor(private fb: FormBuilder, private readonly userService: UserService, 
    private readonly notificationService: NotificationService,
    private readonly socketService: SocketService,
    private readonly router: Router,
    private readonly questionService:QuestionService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', Validators.required],
    });

    import('@ckeditor/ckeditor5-build-classic')
      .then((m) => { this.Editor = (m && (m as any).default) || m; })
      .catch(() => { console.warn('CKEditor build not available — rich editor disabled.'); });
  }

  dismissTips(): void {
    this.showTips = false;
  }

  addTag(input: HTMLInputElement): void {
    const value = input.value;
    if ((value || '').trim() && this.tags.length < this.maxTags) {
      this.tags.push(value.trim());
      input.value = '';
    }
    this.tagInput = ''; 
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  postQuestion(): void {
    if (this.questionForm.valid) {
      const questionData: AddQuestionModel = {
        title: this.questionForm.get('title')?.value,
        content: this.questionForm.get('body')?.value,
        tags: this.tags,
        createdBy: this.userService.getUserId()
      };

       this.questionService.AddQuestion(questionData).subscribe({next:(data)=>{
                this.sendNotificationsToRespective(data["question"]["_id"]);
                this.router.navigateByUrl("/");
              },
              error:(err)=>{
                console.error(err.message);
              }})
      
    } else {
      this.questionForm.markAllAsTouched();
      alert('Please fill out all required fields correctly.');
    }
  }

  saveDraft(): void {
    console.log('Saving draft:', this.questionForm.value, this.tags);
    alert('Draft Saved!');
  }

  sendNotificationsToRespective(questionId:string)
  {
    this.notificationService.getNotifiableUserWhenQuestionAdded(this.userService.getUserId(), questionId).subscribe({
      next:(data)=>{
        let userIds = data["uniqUserIds"];
        userIds.forEach((id:string)=>{
          if(id!=this.userService.getUserId())
            {
              this.addNotification(id, questionId);
            }
        })
      },
      error: (err)=>{
        console.log(err.message);
      }
    })
  }

  addNotification(userId:string, questionId: string)
  {
     let notificationModel : NotificationModel = {} as NotificationModel;
     notificationModel.userId = userId;
     notificationModel.message = `${this.userService.getUserName()} asked question`
     notificationModel.link = `/answer/${questionId}`;
     this.notificationService.addNotification(notificationModel).subscribe({
      next:(data)=>{

        this.socketService.emit("notification",data["notification"]);
      }
     })

  }
}