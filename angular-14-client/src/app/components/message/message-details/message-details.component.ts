import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentMessage: Message = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMessage(this.route.snapshot.params["id"]);
    }
  }

  getMessage(id: string): void {
    this.messageService.get(id)
      .subscribe({
        next: (data) => {
          this.currentMessage = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentMessage.title,
      description: this.currentMessage.description,
      published: status
    };

    this.message = '';

    this.messageService.update(this.currentMessage.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentMessage.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateMessage(): void {
    this.message = '';

    this.messageService.update(this.currentMessage.id, this.currentMessage)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This message was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteMessage(): void {
    this.messageService.delete(this.currentMessage.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/messages']);
        },
        error: (e) => console.error(e)
      });
  }

}