import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../../core/user.service';
import { Event } from '../event';
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {


  constructor() {
    }


  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  

}
