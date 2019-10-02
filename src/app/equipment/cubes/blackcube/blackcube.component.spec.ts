import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackcubeComponent } from './blackcube.component';

describe('BlackcubeComponent', () => {
  let component: BlackcubeComponent;
  let fixture: ComponentFixture<BlackcubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackcubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
