import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // CKEditor 5

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent  {
  // questionForm!: FormGroup;
  // showTips: boolean = true;
  // tags: string[] = ['javascript', 'react', 'tailwindcss']; // Mock tags
  // tagInput: string = '';
  // maxTags: number = 5;

  // // CKEditor 5 setup:
  // public Editor = ClassicEditor; 
  // public editorConfig = {
  //   placeholder: 'Describe your problem here. Include code, error messages, and what you have tried.',
  //   toolbar: {
  //     items: [
  //       'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
  //       '|', 'insertTable', 'undo', 'redo', 'codeBlock' 
  //     ]
  //   }
  // };

  // constructor(private fb: FormBuilder) { }

  // ngOnInit(): void {
  //   this.questionForm = this.fb.group({
  //     title: ['', [Validators.required, Validators.minLength(10)]],
  //     body: ['', Validators.required],
  //   });
  // }

  // dismissTips(): void {
  //   this.showTips = false;
  // }

  // // --- Tag Input Logic ---
  // addTag(input: HTMLInputElement): void {
  //   const value = input.value;
  //   if ((value || '').trim() && this.tags.length < this.maxTags) {
  //     this.tags.push(value.trim());
  //     input.value = ''; // Clear native input
  //   }
  //   this.tagInput = ''; // Clear ngModel
  // }

  // removeTag(tag: string): void {
  //   const index = this.tags.indexOf(tag);
  //   if (index >= 0) {
  //     this.tags.splice(index, 1);
  //   }
  // }

  // // Submit Handler
  // postQuestion(): void {
  //   if (this.questionForm.valid) {
  //     const questionData = {
  //       title: this.questionForm.get('title')?.value,
  //       body: this.questionForm.get('body')?.value,
  //       tags: this.tags,
  //     };
  //     console.log('Question to post:', questionData);
  //     // Your service call goes here: this.questionService.submit(questionData);
  //     alert('Question Posted! Check console for data.');
  //   } else {
  //     this.questionForm.markAllAsTouched();
  //     alert('Please fill out all required fields correctly.');
  //   }
  // }

  // saveDraft(): void {
  //   console.log('Saving draft:', this.questionForm.value, this.tags);
  //   alert('Draft Saved!');
  // }
}