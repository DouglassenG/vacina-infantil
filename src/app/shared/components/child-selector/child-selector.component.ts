import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../../core/models/child.model';
import { ChildService } from '../../../core/services/child.service';

@Component({
  selector: 'app-child-selector',
  templateUrl: './child-selector.component.html',
  styleUrls: ['./child-selector.component.scss']
})
export class ChildSelectorComponent implements OnInit, OnDestroy {

  children: Child[] = [];
  selectedChild: Child | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private childService: ChildService) {}

  ngOnInit(): void {
    const childrenSub = this.childService.getChildrenByParent('parent1')
      .subscribe(children => {
        this.children = children;
        if (children.length > 0 && !this.selectedChild) {
          this.childService.selectChild(children[0]);
        }
      });
    this.subscriptions.push(childrenSub);

    const selectedSub = this.childService.selectedChild$
      .subscribe(child => {
        this.selectedChild = child;
      });
    this.subscriptions.push(selectedSub);
  }

  onSelectChild(child: Child): void {
    this.childService.selectChild(child);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
