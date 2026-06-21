import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Child } from '../models/child.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChildService {

  private selectedChildSubject = new BehaviorSubject<Child | null>(null);
  public selectedChild$: Observable<Child | null> = this.selectedChildSubject.asObservable();

  constructor(private firestore: AngularFirestore) {}

  public selectChild(child: Child): void {
    this.selectedChildSubject.next(child);
  }

  public getChildrenByParent(parentId: string): Observable<Child[]> {
    return this.firestore.collection<any>('children', ref =>
      ref.where('parentId', '==', parentId)
    )
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return new Child({ id, ...data });
      }))
    );
  }
}
