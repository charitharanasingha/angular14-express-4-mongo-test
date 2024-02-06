import { Component } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent {

  message: Message = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private messageService: MessageService) { }

  saveMessage(): void {
    const data = {
      title: this.message.title,
      description: this.message.description
    };

    this.messageService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newMessage(): void {
    this.submitted = false;
    this.message = {
      title: '',
      description: '',
      published: false
    };
  }

}