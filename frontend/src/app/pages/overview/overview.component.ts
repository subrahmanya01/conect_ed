import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponseModel } from 'src/app/interfaces/api-response-model';
import { QuestionModel } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { settings } from 'src/assets/appsettings';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css'],
    standalone: false
})
export class OverviewComponent implements OnInit {
  //public questions : QuestionModel[] = []
  public searchKeyword : string = "";
  public currentlyEditing: QuestionModel = {} as QuestionModel;
  public doEdit: boolean = false;

  // --- Sidebar Data ---
  mainNav = [
    { name: 'Home', icon: 'home', active: true },
    { name: 'Tags', icon: 'local_offer', active: false },
    { name: 'Users', icon: 'people', active: false },
  ];

  topTags = [
    { name: '#javascript', count: '12K' },
    { name: '#react', count: '9.8K' },
    { name: '#python', count: '8.1K' },
    { name: '#css', count: '5.5K' },
    { name: '#tailwindcss', count: '3.2K' },
  ];

  // --- Main Content Data ---
  questions : any = [];

  constructor(private questionservice : QuestionService, public userService : UserService, private router: Router)
  {

  }

  ngOnInit(): void {
    this.getQuestions()
  }

  onEditClick(qm: QuestionModel)
  {
    this.currentlyEditing = qm;
    this.doEdit= true;
  }

  onPopupClose()
  {
    this.currentlyEditing = {} as QuestionModel;
    this.doEdit= false;
  }

  getQuestions()
  {
    this.questionservice.getQuestions().subscribe({
      next: (data:ApiResponseModel)=>{
        const response = data["questions"];

        this.questions = response.map((q:any)=>{
          return {
                    id: q._id,
                    title: q.title,
                    votes: 12,
                    answers: 5,
                    views: '1.2K',
                    description: q.content,
                    tags: q.tags,
                    askedBy: q.createdBy?.firstName + " " + q.createdBy?.lastName,
                    time: '2 hours ago'
                  }
        })
      },
      error: (err) => {
        console.error(err.message);
      }
    })
  }

  deleteQuestion(questionId : string)
  {
    this.questionservice.deleteQuestion(questionId).subscribe({
      next:()=>{
        console.log("Question deleted successfully");
        window.location.reload();
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  } 

  navigateToAnswersPage(id:string)
  {
    this.router.navigateByUrl(`/answer/${id}`);
  }

  search(keyword: string)
  {
    this.searchKeyword = keyword.trim();

    if(this.searchKeyword.length==0)
      {
        this.getQuestions()
        return;
      }

    this.questionservice.searchQuestions(keyword).subscribe({
      next: (data)=>{
        this.questions = data["questions"];
      },
      error:(err)=>{
        console.error(err.message);
      }
    })
  }
}
