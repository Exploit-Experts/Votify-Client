import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteDialogComponent } from './vote-dialog.component';

describe('VoteDialogComponent', () => {
  let component: VoteDialogComponent;
  let fixture: ComponentFixture<VoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
