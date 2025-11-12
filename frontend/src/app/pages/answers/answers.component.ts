import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { AddAnswerModel, AnswerModel, EditAnswerModel } from 'src/app/interfaces/answers';
import { ApiResponseModel } from 'src/app/interfaces/api-response-model';
import { NotificationModel } from 'src/app/interfaces/chat';
import { QuestionModel } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { QuestionService } from 'src/app/services/question.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.css'],
    imports:[FormsModule, CommonModule, SpinnerComponent],
    standalone: true
})
export class AnswersComponent implements OnInit{
  questionId : string|null ="";
  answers: AnswerModel[] = []
  question: QuestionModel = {} as QuestionModel;
  doEdit: boolean = false;
  isLoading: boolean = true;

  editAnswerContent: string = "";
  newAnswerContent: string = "";
  currentlySelectedQuestionForEdit: AnswerModel = {} as AnswerModel;

  get questionUpvoteCount(): number {
    return this.question.votes??0;
  }

  get questionViewCount(): number {
    return this.question.views??0;
  }

  constructor(private readonly route: ActivatedRoute, 
    private readonly answerService : AnswerService,
    private readonly notificationService: NotificationService, 
    private readonly questionService : QuestionService, 
    private readonly socketService : SocketService,
    public readonly userService : UserService)
  {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('id');
      console.log(params);
      this.getQuestion(this.questionId??'');
      this.getAnswers();
      window.scrollTo(0, 0);
      this.questionService.incrementViewCount(this.questionId??'').subscribe();
      this.isLoading = false;
    });
  }

  get questionAskedBy(){
    return this.question.createdBy.firstName + " " + this.question.createdBy.lastName;
  }

  onEditClick(answer: AnswerModel) {
    this.doEdit = true;
    this.currentlySelectedQuestionForEdit = answer;
  }

  getQuestion(questionId: string) {
     this.questionService.getQuestionByQuestionId(questionId).subscribe({
      next: (data : ApiResponseModel)=>{
        this.question = data["question"];
      },
      error: (err)=>{
        console.error(err.message);
      }
     })
  }

  getAskedTime(): string {
    const askedTime = new Date(this.question.createdAt);
    const now = new Date();

    const diffMs = now.getTime() - askedTime.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;

    return `Just now`;
  }

  getAnsweredBy(answer: AnswerModel): string {
    if(answer.createdBy._id == this.question.createdBy._id){
      return "You";
    }
    return answer.createdBy.firstName + " " + answer.createdBy.lastName;
  }

  getAnswers() { 
    this.answerService.getAnswerByQuestionId(this.questionId??"").subscribe({
      next:(data:ApiResponseModel)=>{
          this.answers = data["answers"].reverse();
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  } 

  onAnswerAdded(answer: AnswerModel){
    this.answers.unshift(answer);
  }

  getAnsweredTime(answer: AnswerModel): string{
    const createdAt = new Date(answer.createdAt);
    return createdAt.toDateString();
  }

  upvoteAnswer(answer: AnswerModel) {
    this.answerService.voteAnswer(answer._id, true).subscribe();
    answer.votes = (answer.votes ?? 0) + 1;
  }

  downvoteAnswer(answer: AnswerModel) {
    this.answerService.voteAnswer(answer._id, false).subscribe();
    answer.votes = (answer.votes ?? 0) - 1;
  }

  upvoteQuestion() {
    this.questionService.voteQuestion(this.questionId??'', true).subscribe({next: (data)=>{
       this.question.votes+=1;
      }
    });
  }

  downvoteQuestion() {
    this.questionService.voteQuestion(this.questionId??'', false).subscribe({next: (data)=>{
       this.question.votes-=1;
      }
    });
  }

  getVotes(answer: AnswerModel): number {
    return answer.votes??0;
  }

  isAsnweredByCurrentUser(answer: AnswerModel): boolean {
    return answer.createdBy._id === this.userService.getUserId();
  }

  isQuestionAskedByCurrentUser(): boolean {
    return this.question.createdBy._id === this.userService.getUserId();
  }

  setSelectedAnswer(answer: AnswerModel) {
    this.currentlySelectedQuestionForEdit = answer;
    this.editAnswerContent = answer.content;
  }

  deleteAnswer() {
    this.answerService.deleteAnswer(this.currentlySelectedQuestionForEdit._id).subscribe({
      next: (data)=>{
        console.log("Answer Deleted successfully");
        window.location.reload();
      },
      error:(err)=>{
        console.error(err.message);
    }
    })
  }

  addAnswer() {
    const newAnswer: AddAnswerModel  = {} as AddAnswerModel;
    newAnswer.questionId = this.questionId??"";
    newAnswer.content = this.newAnswerContent;
    newAnswer.createdBy =  this.userService.getUserId();
    newAnswer.tags = [];
    this.answerService.addAnswer(newAnswer).subscribe({next:(data)=>{
      this.sendNotificationsToUser(data["answer"]._id);
      window.location.reload();
    },
    error:(err)=>{
      console.error(err.message);
    }})
  }

  editAnswer() {
    const editAnswer: EditAnswerModel  = {} as EditAnswerModel;
    editAnswer._id = this.currentlySelectedQuestionForEdit._id;
    editAnswer.content = this.editAnswerContent;
    editAnswer.tags = this.currentlySelectedQuestionForEdit.tags;
    this.answerService.editAnswer(editAnswer).subscribe({next:(data)=>{
      window.location.reload();
    },
    error:(err)=>{
      console.error(err.message);
    }})
  }

  isEditAnswerSaveButtonDisabled(): boolean {
    return this.editAnswerContent.trim().length == 0 || this.editAnswerContent === this.currentlySelectedQuestionForEdit.content;
  }

  sendNotificationsToUser(answerId: string) {
    this.notificationService.getNotifiableUserWhenAnswerAdded(this.userService.getUserId(), answerId).subscribe({
      next: (data)=>{
        let ids = data["uniqUserIds"];
        for(let i=0;i<ids.length; i++)
          {
            if(ids[i]==this.userService.getUserId()) continue;
            this.addNotification(ids[i], answerId);
          }
      },
      error: (err)=>{
        console.error(err.message);
      }
    })
  }
  
  addNotification(userId:string, answerId: string) {
    let notificationModel : NotificationModel = {} as NotificationModel;
    notificationModel.userId = userId;
    notificationModel.message = `${this.userService.getUserName()} added answer`
    notificationModel.link = `/answer/${this.questionId}`;
    this.notificationService.addNotification(notificationModel).subscribe({
    next:(data)=>{
      this.socketService.emit("notification",data["notification"]);
    }
    })
  }

  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: "ConnectEd",
        text: "Check out this page!",
        url: window.location.href,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing not supported in this browser");
    }
  }
}