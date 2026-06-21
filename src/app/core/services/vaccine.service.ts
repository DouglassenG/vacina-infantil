import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VaccineDoseModule } from '../models/vaccine.model';

@Injectable({ providedIn: 'root' })
export class VaccineService {

  constructor(private firestore: AngularFirestore) {}

  public getDosesByChild(childId: string, childAgeMonths: number): Observable<VaccineDoseModule[]> {
    return this.firestore.collection<any>('vaccine_doses', ref =>
      ref.where('childId', '==', childId)
    )
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        const dose = new VaccineDoseModule({ id, ...data });
        dose.evaluateStatus(childAgeMonths);
        return dose;
      }))
    );
  }
}
