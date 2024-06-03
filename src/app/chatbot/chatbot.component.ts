// chatbot.component.ts

import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent  {
    chatForm: FormGroup;
    messages: string[] = [];
  
    constructor(private http: HttpClient, private formBuilder: FormBuilder) {
      this.chatForm = this.formBuilder.group({
        userQuery: ['']
      });
    }
  
    sendMessage() {
        const userQueryControl = this.chatForm.get('userQuery');
        const userQuery = userQueryControl ? userQueryControl.value : '';
        
      
      if (userQuery.trim() === '') {
        return;
      }

      console.log(userQuery);
  
      // Add user message to the chat
      this.messages.push(`You: ${userQuery}`);
  
      // Make API call to OpenAI
      this.http
        .post<any>('http://localhost:3000/ask-openai', { userQuery })
        .subscribe(
          (response) => {
            const answer = response.answer;         
            // Add AI response to the chat UI
            this.messages.push(`AI: ${answer}`);
          },
          (error) => {
            console.error('API Error:', error);
            // Handle error, e.g., display an error message in the chat
            this.messages.push('AI: Unable to Generate response');
          }
        );
  
      // Clear the input field
      this.chatForm.get('userQuery')!.setValue('');
    }
}
