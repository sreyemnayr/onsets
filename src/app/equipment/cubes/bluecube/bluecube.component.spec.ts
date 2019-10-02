import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluecubeComponent } from './bluecube.component';

describe('BluecubeComponent', () => {
  let component: BluecubeComponent;
  let fixture: ComponentFixture<BluecubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluecubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluecubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
