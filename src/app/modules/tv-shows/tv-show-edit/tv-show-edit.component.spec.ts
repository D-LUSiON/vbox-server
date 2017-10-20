import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowEditComponent } from './tv-show-edit.component';

describe('TvShowEditComponent', () => {
  let component: TvShowEditComponent;
  let fixture: ComponentFixture<TvShowEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
