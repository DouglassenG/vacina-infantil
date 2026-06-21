import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../core/models/child.model';
import { ChildService } from '../../core/services/child.service';

@Component({
  standalone: false,
  selector: 'app-child-profile',
  templateUrl: './child-profile.page.html',
  styleUrls: ['./child-profile.page.scss']
})
export class ChildProfilePage implements OnInit, OnDestroy {

  selectedChild: Child | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private childService: ChildService) {}

  ngOnInit(): void {
    const sub = this.childService.selectedChild$.subscribe(child => {
      this.selectedChild = child;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
