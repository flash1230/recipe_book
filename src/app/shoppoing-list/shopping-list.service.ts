
import { Ingridient } from "../shared/ingridient.model";
import { Subject } from "rxjs/";


export class ShoppingListService{
    ingridientChanged = new Subject<Ingridient[]>();
    startedEditing= new Subject<number>();
    private ingridients: Ingridient[] = [
        new Ingridient('Apples', 4),
        new Ingridient('Onions', 2),
      ];

      getIngridients(){
          return this.ingridients.slice(); // what does slice do?
      }

      getIngridient(index: number){
         return this.ingridients[index];
      }
      addIngridient(ingridient: Ingridient){
          this.ingridients.push(ingridient);
          this.ingridientChanged.next(this.ingridients.slice());
      }

      addIngridients(ingridients: Ingridient[]){
        // for(let ingridient of ingridients)
        //     {
        //         this.addIngridient(Ingridient);
        //     }
        this.ingridients.push(...ingridients);
        this.ingridientChanged.next(this.ingridients.slice())
      }

      updateIngridient(index: number, newIngridient: Ingridient){
        this.ingridients[index] = newIngridient;
        this.ingridientChanged.next(this.ingridients.slice());
      }

      deleteItem(index: number){
        this.ingridients.splice(index,1);
        this.ingridientChanged.next(this.ingridients.slice());
      }
}