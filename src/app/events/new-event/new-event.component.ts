import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
