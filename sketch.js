//Create variables here
var dog,dogImg,dogImg1,database,foodS,foodStock,fedTime,lastFed,feed,addFood,foodObj
function preload()
{
dogImg=loadImage("images/dogImg.png")
dogImg1=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg)
  dog.scale=0.15

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  textSize=20
  
  foodObj= new Food();

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  
  
}


function draw() {  
  background(46, 139, 87)
  foodObj.display();

  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill(255,255,254);
   //textSize(15);
    if(lastFed>=12){
       text("Last Feed : "+ lastFed%12 + " PM", 350,30);
       }
       else if(lastFed==0){
          text("Last Feed : 12 AM",350,30);
         }
         else{
            text("Last Feed : "+ lastFed + " AM", 350,30);
           }
 
  drawSprites();
  }
 
  //Function to read values from DB
  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS)
  }
//function to update food stock and last fed time 
function feedDog(){ 
  dog.addImage(dogImg1);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
       Food:foodObj.getFoodStock(),
        FeedTime:hour()
       }) 
      } 
      //function to add food in stock 
      function addFoods(){ 
        foodS++;
         database.ref('/').update({
            Food:foodS 
          }) 
        }





