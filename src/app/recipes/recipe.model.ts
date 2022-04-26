import { Ingridient } from "../shared/ingridient.model";


export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingridients: Ingridient[];

    constructor(name: string, desc: string, imagePath: string, ingridients: Ingridient[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingridients=ingridients;
    }
}