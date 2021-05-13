class Food {
  constructor(){
  this.foodStock=20;
  this.lastFed;
  this.image=loadImage('Milk.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){
    var x=100,y=120;     
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=100;
          y=y+70;
        }
        image(this.image,x,y,50,50);
        x=x+50;
      }
    }
  }
}
