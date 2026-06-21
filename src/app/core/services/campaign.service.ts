import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campaign } from '../models/campaign.model';
import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CampaignService {

  private firestore = inject(Firestore);

  public getActiveCampaigns(): Observable<Campaign[]> {
    const campaignsRef = collection(this.firestore, 'campaigns');
    return collectionData(campaignsRef, { idField: 'id' }).pipe(
      map((docs: any[]) => {
        return docs
          .map(doc => this.mapToCampaign(doc))
          .filter(c => c.isActive);
      })
    );
  }

  public getCampaignsForChild(childAgeInMonths: number): Observable<Campaign[]> {
    const campaignsRef = collection(this.firestore, 'campaigns');
    return collectionData(campaignsRef, { idField: 'id' }).pipe(
      map((docs: any[]) => {
        return docs
          .map(doc => this.mapToCampaign(doc))
          .filter(c => c.isActive && c.isTargetedForChild(childAgeInMonths));
      })
    );
  }

  public getAllCampaigns(): Observable<Campaign[]> {
    const campaignsRef = collection(this.firestore, 'campaigns');
    return collectionData(campaignsRef, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(doc => this.mapToCampaign(doc)))
    );
  }

  private mapToCampaign(doc: any): Campaign {
    return new Campaign({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      targetAgeMinMonths: doc.targetAgeMinMonths,
      targetAgeMaxMonths: doc.targetAgeMaxMonths,
      startDate: doc.startDate?.toDate ? doc.startDate.toDate() : new Date(doc.startDate),
      endDate: doc.endDate?.toDate ? doc.endDate.toDate() : new Date(doc.endDate)
    });
  }
}
