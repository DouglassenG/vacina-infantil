import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campaign } from '../models/campaign.model';

@Injectable({ providedIn: 'root' })
export class CampaignService {

  constructor(private firestore: AngularFirestore) {}

  public getActiveCampaigns(): Observable<Campaign[]> {
    return this.firestore.collection<any>('campaigns')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions
            .map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return new Campaign({ id, ...data });
            })
            .filter(c => c.isActive);
        })
      );
  }

  public getCampaignsForChild(childAgeInMonths: number): Observable<Campaign[]> {
    return this.firestore.collection<any>('campaigns')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions
            .map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return new Campaign({ id, ...data });
            })
            .filter(c => c.isActive && c.isTargetedForChild(childAgeInMonths));
        })
      );
  }

  public getAllCampaigns(): Observable<Campaign[]> {
    return this.firestore.collection<any>('campaigns')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return new Campaign({ id, ...data });
        }))
      );
  }
}
