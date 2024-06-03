// title.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private cardTitle: string = 'i'; 

  // store the card title in a service so that changes made in card title are permenant.
  getCardTitle(): string {
    return this.cardTitle;
  }

  setCardTitle(newTitle: string): void {
    this.cardTitle = newTitle;
  }
}
  

