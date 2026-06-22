import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VaccineDoseModule } from '../models/vaccine.model';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  doc,
  updateDoc
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class VaccineService {

  private firestore = inject(Firestore);

  public getDosesByChild(childId: string, childAgeMonths: number): Observable<VaccineDoseModule[]> {
    const dosesRef = collection(this.firestore, 'vaccine_doses');
    const q = query(dosesRef, where('childId', '==', childId));
    return collectionData(q, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(d => {
        const dose = new VaccineDoseModule({
          id: d.id,
          vaccineName: d.vaccineName,
          doseType: d.doseType,
          targetAgeMonths: d.targetAgeMonths,
          appliedDate: d.appliedDate?.toDate ? d.appliedDate.toDate() : (d.appliedDate ? new Date(d.appliedDate) : undefined),
          status: 'AGENDADA',
          lotNumber: d.lotNumber
        });
        dose.evaluateStatus(childAgeMonths);
        return dose;
      }))
    );
  }

  public markAsApplied(doseId: string): Promise<void> {
    const doseRef = doc(this.firestore, 'vaccine_doses', doseId);
    return updateDoc(doseRef, {
      appliedDate: new Date()
    });
  }
}
