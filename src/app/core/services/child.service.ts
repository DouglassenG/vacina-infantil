import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Child, IChild } from '../models/child.model';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
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
      map((docs: any[]) => docs.map(d => new Child({
        id: d.id,
        name: d.name,
        birthDate: d.birthDate?.toDate ? d.birthDate.toDate() : new Date(d.birthDate),
        gender: d.gender,
        photoUrl: d.photoUrl
      })))
    );
  }

  public addChild(childData: IChild, parentId: string): Promise<void> {
    const childrenRef = collection(this.firestore, 'children');
    return addDoc(childrenRef, {
      parentId,
      name: childData.name,
      birthDate: childData.birthDate,
      gender: childData.gender,
      photoUrl: childData.photoUrl || 'assets/shapes/default-avatar.svg'
    }).then(() => {});
  }

  public updateChild(childId: string, data: Partial<IChild>): Promise<void> {
    const childRef = doc(this.firestore, 'children', childId);
    return updateDoc(childRef, { ...data });
  }

  public deleteChild(childId: string): Promise<void> {
    const childRef = doc(this.firestore, 'children', childId);
    return deleteDoc(childRef);
  }
}
