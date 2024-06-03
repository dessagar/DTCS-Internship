import { Component, OnInit } from '@angular/core';
import { AskmeService } from './askme.service';
import { ElementRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-askme',
  templateUrl: './askme.component.html',
  styleUrls: ['./askme.component.scss']
})



export class AskmeComponent  {

  @ViewChild('answerInput') answerInput!: ElementRef;

  
  questions: any[] = [];
  newQuestion: string = '';
  unansweredQuestions: any[] = [];
  unansweredCount: number = 0;
  showUnansweredQuestions: boolean = false;

 
  


  constructor(
    private chatService: AskmeService,
  ) {}

  ngOnInit(): void {
    // Fetch questions on component initialization
    this.fetchQuestions();
  }

  

  
  // formatTimestamp(timestamp: string): string {
  //   const formattedDate = this.datePipe.transform(timestamp, 'hh:mm a, dd/MM/yyyy');
  //   return formattedDate ? formattedDate : timestamp;
  // }

  formatTimestamp(timestamp: string): string {
    try {
      // Replace 'T' with ' , '
      let formattedTimestamp = timestamp.replace('T', ' , ');
  
      // Take the part until the second occurrence of ':'
      const indexOfFirstColon = formattedTimestamp.indexOf(':');
      if (indexOfFirstColon >= 0) {
        const indexOfSecondColon = formattedTimestamp.indexOf(':', indexOfFirstColon + 1);
        if (indexOfSecondColon >= 0) {
          formattedTimestamp = formattedTimestamp.substring(0, indexOfSecondColon);
        }
      }
  
      return formattedTimestamp || timestamp;
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return timestamp;
    }
  }
  
  
  
  
  
  

 
  

  askQuestion() {
    // Send new question to the server
    this.chatService.askQuestion(this.newQuestion).subscribe(() => {
      // After asking, fetch updated questions
      this.fetchQuestions();
      this.newQuestion = ''; // Clear the input field
    });
  }

  replyToQuestion(question: any) {
    const answer = this.answerInput.nativeElement.value.trim();
    if (answer) {
      if (!question.answers) {
        question.answers = [];
      }
      question.answers.push(answer);
      this.updateAnswersInDatabase(question._id, question.answers);
      // Clear the input field after submitting the answer
      this.answerInput.nativeElement.value = '';
    }
  }
  // replyToQuestion(question: any) {
  //   const answer = prompt('Enter your answer:');
  //   if (answer) {
  //     if (!question.answers) {
  //       question.answers = [];
  //     }
  //     // Define an interface for the answer object
  //     interface Answer {
  //       text: string;
  //     }
  //     // Push the answer as an object conforming to the Answer interface
  //     question.answers.push({ text: answer } as Answer);
  //     // Extract the answer texts and pass them to the updateAnswersInDatabase method
  //     this.updateAnswersInDatabase(question._id, question.answers.map((a: Answer) => a.text));
  //   }
  // }
  
  // private updateAnswersInDatabase(questionId: string, answers: string[]) {
  //   this.chatService.postAnswers(questionId, answers).subscribe(() => {
  //     this.fetchQuestions();
  //   });
  // }


  fetchQuestions() {
    // Fetch all questions from the server
    this.chatService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      // Filter unanswered questions
      this.unansweredQuestions = questions.filter((q) => !q.answered);
      this.unansweredCount = this.unansweredQuestions.length;
    });
  }

  toggleUnansweredQuestions() {
    this.showUnansweredQuestions = !this.showUnansweredQuestions;
  }

  private updateAnswersInDatabase(questionId: string, answers: string[]) {
    this.chatService.addAnswers(questionId, answers).subscribe(() => {
      this.fetchQuestions();
    });
  }

  showAllAnswers(question: any) {
    // question.showAllAnswers = true; 
    question.showAllAnswers = !question.showAllAnswers;
    // Fetch all answers for the specific question
    // and display them
  }
  // toggleShowAllAnswers(question: any) {
  //   question.showAllAnswers = !question.showAllAnswers;
  // }

  showAnswerInput(question: any) {
    question.showAnswerInput = true;
    setTimeout(() => {
      this.answerInput.nativeElement.focus();
    });
  }

  cancelAnswerInput(question: any) {
    question.showAnswerInput = false;
  }
  

  
}
