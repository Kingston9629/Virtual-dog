var dog,normalDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var value


var feed, lastFed

function preload(){
normalDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
milk= loadImage('Milk.png')

}

function setup() {
database=firebase.database();
createCanvas(1000,400);

foodObj = new Food();

Feed= createButton("Feed the Dog");
Feed.position(700, 95);
Feed.mousePressed(feedDog);

dog=createSprite(800,200,150,150);
dog.addImage(normalDog);
dog.scale=0.17;

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

milkbottle = createSprite(700,200)
milkbottle.addImage(milk)
milkbottle.visible = 0
milkbottle.scale = 0.1
}

function draw() {
background(46,139,87);
foodObj.display();

console.log(value)
fedTime = database.ref("FeedTime")
fedTime.on("value", function(data){
    lastFed=data.val();
})


fill("white");
textSize(15);
if(lastFed>=12){
    text("Last Feed:"+  lastFed%12+"PM", 350, 30)
} else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
}else if(lastFed<=12){
    text("Last Feed:"+lastFed+"AM", 350, 30)

}
fill(4,23,117)
textSize(20)
text(value,400,dog.y-80)




drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}


function feedDog(){


var food_stock_val = foodObj.getFoodStock();

if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0)
    dog.addImage(normalDog)
    milkbottle.visible=0
    
}else{
    foodObj.updateFoodStock(food_stock_val-1) 
    dog.addImage(happyDog);
    milkbottle.visible=1
}

}

function addFoods(){
    foodObj.updateFoodStock(foodObj.foodStock+1);
    database.ref('/').update({
      Food:foodObj.foodStock
    });

}
