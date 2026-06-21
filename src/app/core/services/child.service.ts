import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Child } from '../models/child.model';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ChildService {

  private firestore = inject(Firestore);

  private selectedChildSubject = new BehaviorSubject<Child | null>(null);
  public selectedChild$: Observable<Child | null> = this.selectedChildSubject.asObservable();

  public selectChild(child: Child): void {
    this.selectedChildSubject.next(child);
  }

  public getChildrenByParent(parentId: string): Observable<Child[]> {
    const childrenRef = collection(this.firestore, 'children');
    const q = query(childrenRef, where('parentId', '==', parentId));
    return collectionData(q, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(doc => new Child({
        id: doc.id,
        name: doc.name,
        birthDate: doc.birthDate?.toDate ? doc.birthDate.toDate() : new Date(doc.birthDate),
        gender: doc.gender,
        photoUrl: doc.photoUrl
      })))
    );
  }
}
