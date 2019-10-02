import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedcubeComponent } from './redcube.component';

describe('RedcubeComponent', () => {
  let component: RedcubeComponent;
  let fixture: ComponentFixture<RedcubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedcubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
