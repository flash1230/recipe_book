import { Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 @ViewChild('f') slForm: NgForm;
 subscription: Subscription;
 editMode = false;
 editedIndex: number;
 editedItem: Ingridient;

  constructor(private SLService: ShoppingListService) { }

  ngOnInit(){
    this.subscription=this.SLService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex=index;
        this.editedItem = this.SLService.getIngridient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  onAdd(form: NgForm){
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount);
    if (this.editMode){
      this.SLService.updateIngridient(this.editedIndex, newIngridient);
    }
    else{
      this.SLService.addIngridient(newIngridient);
    }
    this.editMode = false;
    form.reset();
  }
  
  onDelete(){
    this.SLService.deleteItem(this.editedIndex);
    this.onClear();

  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
