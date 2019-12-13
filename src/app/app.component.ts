import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core/Calendar';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { PluginDef } from '@fullcalendar/core/plugin-system';
import { NgLog } from './shared/decorators/NgLog.decorator';
import { uuidv4 } from './shared/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-fullcalendar-with-testing';

  @ViewChild('fullCalendarComp', { read: FullCalendarComponent, static: false }) fullCalendarComp: FullCalendarComponent;
  @ViewChild('contextMenuCalendar', { read: ContextMenuComponent, static: false }) public contextMenuCalendar: ContextMenuComponent;
  @ViewChild('contextMenuEvent', { read: ContextMenuComponent, static: false }) public contextMenuEvent: ContextMenuComponent;

  public events = [
    {
      id: uuidv4(),
      "title":"Long Event",
      "start":"2019-12-07",
      "end":"2019-12-10"
    },
    {
      id: uuidv4(),
      "groupId":"999",
      "title":"Repeating Event",
      "start":"2019-12-09T16:00:00+00:00"
    },
    {
      id: uuidv4(),
      "title":"Conference",
      "start":"2019-12-10",
      "end":"2019-12-12"
    },
    {
      id: uuidv4(),
      "title":"Meeting",
      "start":"2019-12-11T10:30:00+00:00",
      "end":"2019-12-11T12:30:00+00:00"
    },
    {
      id: uuidv4(),
      "title":"Lunch",
      "start":"2019-12-11T12:00:00+00:00"
    },
    {
      id: uuidv4(),
      "title":"Birthday Party",
      "start":"2019-12-12T07:00:00+00:00"
    }
  ];
  public apiCalendar: Calendar;
  public calendarPlugins: PluginDef[] = [timeGridPlugin, interactionPlugin];
  public views = {
    dayGridMonth: {
      titleFormat: { month: 'long', day: '2-digit', year: 'numeric' },
      columnHeaderFormat: { weekday: 'long', omitCommas: true },
      eventLimit: 4
    },
    week: {
      titleFormat: {  day: '2-digit', month: 'long', year: 'numeric'},
      columnHeaderFormat: { weekday: 'long', day: '2-digit', omitCommas: true }
    },
    day: {
      titleFormat: {  day: '2-digit', month: 'long', year: 'numeric'},
      // columnHeader: false
    }
  };

  constructor(
    private _cnxMenuService: ContextMenuService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.apiCalendar = this.fullCalendarComp.getApi();
  }

  eventRenderHandler(infoEvent: any) {
    const parentContentEl: Element = infoEvent.el.getElementsByClassName('fc-content')[0];

    infoEvent.el.setAttribute('data-event-id', infoEvent.event.id);

    parentContentEl.insertAdjacentHTML('afterbegin', `<div>New div</div>`);
  }

  @NgLog()
  eventClickHandler(eventInfo: any) {}

  columnHeaderHandler(date) {
    return date;
  }

  @NgLog()
  dateClickHandler($event) {}

  @NgLog()
  contextMenuHandler($event: any) {
    const targetElement = $event.target;
    const simpleTimeGrid = (this.apiCalendar.view as any).simpleTimeGrid;
    const { dateSpan: { range: { start } } } = simpleTimeGrid.queryHit($event.pageX, $event.pageY);

    console.log(simpleTimeGrid.queryHit($event.pageX, $event.pageY));

    const currentDate = moment(start).format('YYYY-MM-DD');

    if (targetElement.classList.contains('fc-widget-content')) {
      const currentTime = targetElement.parentElement.dataset.time;

      console.log('%c Current time: ', 'color: #ffa200; font-weight: bold', currentTime);
      console.log('%c Current date: ', 'color: #ffa200; font-weight: bold', currentDate);

      this._cnxMenuService.show.next({
        contextMenu: this.contextMenuCalendar,
        event: $event,
        item: {
          currentDate,
          currentTime,
          clickedOn: 'notEvent'
        }
      });
    }
    else {
      let currentTargetElement = targetElement;

      while (!currentTargetElement.classList.contains('fc-event')) {
        currentTargetElement = currentTargetElement.parentElement;

        if (!currentTargetElement) return;
      }

      const eventId = currentTargetElement.dataset.eventId;
      const currentEvent = this.apiCalendar.getEventById(eventId)

      console.log('%c Current event object: ', 'color: #ffa200; font-weight: bold', currentEvent);

      this._cnxMenuService.show.next({
        contextMenu: this.contextMenuEvent,
        event: $event as any,
        item: {
          currentDate,
          clickedOn: 'Event',
          currentEvent
        }
      });
    }

    $event.preventDefault();
    $event.stopPropagation();
  }

  @NgLog()
  closeContextMenuHandler($event) {}
}
