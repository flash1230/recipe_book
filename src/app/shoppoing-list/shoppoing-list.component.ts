import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shoppoing-list',
  templateUrl: './shoppoing-list.component.html',
  styleUrls: ['./shoppoing-list.component.css']

})
export class ShoppoingListComponent implements OnInit, OnDestroy {

  ingridients: Ingridient[];
  private idChanged: Subscription;
  constructor(private SLService: ShoppingListService) { }

  ngOnInit(){

    this.ingridients=this.SLService.getIngridients();
    this.idChanged= this.SLService.ingridientChanged.subscribe(
      (ingridients: Ingridient[])=> {
        this.ingridients=ingridients;
      }
    )
  }
 
  onEditItem(index:number){
    this.SLService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.idChanged.unsubscribe();
  }
}
