import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { ContextMenuModule, ContextMenuService } from 'ngx-contextmenu';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ContextMenuModule,
        FullCalendarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ContextMenuService]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const instance = fixture.debugElement.componentInstance;

    return { fixture, instance };
  }

  it('should create the app', () => {
    const { instance } = setup();
    expect(instance).toBeTruthy();
  });

  it(`should have as title 'angular-fullcalendar-with-testing'`, () => {
    const { instance } = setup();
    expect(instance.title).toEqual('angular-fullcalendar-with-testing');
  });

  it('should render header with text', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header').textContent.trim()).toContain('Header fullcalendar api');
  });
});

describe('FullCalendar component', () => {
  let fixture;
  let instance;

  beforeEach(() => {

  });

  it('should created fullcalendar component', () => {
    const fixture = TestBed.createComponent(FullCalendarComponent);
    const calendar = fixture.debugElement.componentInstance;
    expect(calendar).toBeTruthy();
  });
});
