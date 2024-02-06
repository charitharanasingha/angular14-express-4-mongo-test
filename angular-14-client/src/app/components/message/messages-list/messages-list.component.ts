import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  messages?: Message[];
  currentMessage: Message = {};
  currentIndex = -1;
  title = '';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveMessages();
  }

  retrieveMessages(): void {
    this.messageService.getAll()
      .subscribe({
        next: (data) => {
          this.messages = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveMessages();
    this.currentMessage = {};
    this.currentIndex = -1;
  }

  setActiveMessage(message: Message, index: number): void {
    this.currentMessage = message;
    this.currentIndex = index;
  }

  removeAllMessages(): void {
    this.messageService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentMessage = {};
    this.currentIndex = -1;

    this.messageService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.messages = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}