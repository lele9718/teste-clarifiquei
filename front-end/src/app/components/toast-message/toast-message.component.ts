import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.sass'
})
export class ToastMessageComponent implements OnInit {
  
  @Input() isToastVisible = false; // Controla se a mensagem toast está visível
  @Input() message = ''; 
  @Input() color = 'color-success';


  ngOnInit() {
  }
}
