import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VaccineDoseModule } from '../models/vaccine.model';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class VaccineService {

  private firestore = inject(Firestore);

  public getDosesByChild(childId: string, childAgeMonths: number): Observable<VaccineDoseModule[]> {
    const dosesRef = collection(this.firestore, 'vaccine_doses');
    const q = query(dosesRef, where('childId', '==', childId));
    return collectionData(q, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(doc => {
        const dose = new VaccineDoseModule({
          id: doc.id,
          vaccineName: doc.vaccineName,
          doseType: doc.doseType,
          targetAgeMonths: doc.targetAgeMonths,
          appliedDate: doc.appliedDate?.toDate ? doc.appliedDate.toDate() : (doc.appliedDate ? new Date(doc.appliedDate) : undefined),
          status: 'AGENDADA',
          lotNumber: doc.lotNumber
        });
        dose.evaluateStatus(childAgeMonths);
        return dose;
      }))
    );
  }
}
