
var shoes = [
    {
      color : 'blue',
      price : 350,
      in_stock : 25,
      brand: 'Adidas',
      releaseDate: '2010',
      size: [2,2,3,4,2,2,4,5,6,7,4,0,0]
    },
    {
      color : 'orange',
      price : 350,
      in_stock : 17,
      brand: 'Nike',
      releaseDate: '2011',
      size: [1,3,4,5,3,2,4,5,6,0,4,4,0,0,0],
    },
    {
      color : 'black',
      price : 560,
      in_stock : 21,
      brand: 'Reebok',
      releaseDate: '2015',
      size: [1,3,4,5,3,2,4,5,6,0,4,4,0,0,0]
    },
    {
      color : 'blue',
      price : 700,
      in_stock : 30,
      brand: 'Puma',
      releaseDate: '2012',
      size: [5,3,4,2,3,2,2,5,6,3,4,2,0,0,0]
    },
    {
      color : 'yellow',
      price : 150,
      in_stock : 28,
      brand: 'Adidas',
      releaseDate: '2013',
      size: [2,3,4,5,3,2,4,5,6,4,4,4,0,0,0]
    },
    {
      color : 'purple',
      price : 250,
      in_stock : 19,
      brand: 'Nike',
      releaseDate: '2014',
      size: [1,3,5,4,3,0,2,2,4,0,4,4,0,0,0]
    },
    {
      color : 'grey',
      price : 450,
      in_stock : 19,
      brand: 'Superga',
      releaseDate: '2016',
      size: [1,3,2,1,6,2,4,5,0,4,4,4,0,0,0]
    },

  ];





var btn = document.querySelector('.submit');
var searchRes =  document.querySelector('.output-zone');
var sizes = document.querySelector('.size');
var color = document.querySelector('.colour');
var releaseDates = document.querySelector('.dateRel');
var brands = document.querySelector('.brand');
var sBtn = document.querySelector('.searchChange');
var filters = document.getElementsByName('filter');
var stockAddPara = document.querySelector('.stockP');


var newBrand = document.querySelector('#newBrand');
var newColor = document.querySelector('#newColour');
var newRelDate = document.querySelector('#newRelDate');
var newPrice = document.querySelector('#newPrice');
var newSizes = document.querySelector('#newSizes');
var tBtn = document.querySelector('.addStock');
var sizeFormat = document.querySelector('#askAboutSize');

// sizeFormat.addEventListener('mouseover', alert('Add the amount of shoes in each size (starting with size 1) separated by commas. For example, if there are 3 pairs in size 1, 4 in size 2 and 8 in size 3 the input would be: 3,4,8'))

function hideShow(){
  counter ++;
  if (counter % 2 == 0 || counter == 0){
  stockAddPara.style.visibility = 'hidden'
}
else{
  stockAddPara.style.visibility = "visible"
}
};

var counter = 0;

var newColorOption = document.getElementById('newColorOption').innerHTML;
var template2 = Handlebars.compile(newColorOption);

var newBrandOption = document.getElementById('newBrandOption').innerHTML;
var template3 = Handlebars.compile(newBrandOption);


tBtn.addEventListener('click', function(){
  var colorOptions = document.querySelectorAll('.colorOptions');
  var brandOptions = document.querySelectorAll('.brandOptions');
  var dateRelOptions = document.querySelectorAll('.dateRelOptions');
  var colorArray = [];
  var brandArray = [];
  var dateRelArray = [];

  for (var i=0;i<colorOptions.length;i++){
    if (colorOptions[i].value == newColor.value.toLowerCase()){
      colorArray.push(colorOptions[i].value);
    }
  };
 if (colorArray.length == 0){

var newColorChoice = template2({
  newColorHandle : newColor.value.toLowerCase(),
  newColorHandleMenu : newColor.value.substr(0,1).toUpperCase() + newColor.value.substr(1).toLowerCase()
})
color.innerHTML += newColorChoice;
 }

 for (var i=0;i<brandOptions.length;i++){
   if (brandOptions[i].value == newBrand.value){
     colorArray.push(colorOptions[i].value);
   }
 };
if (brandArray.length == 0){
var newBrandChoice = template3({
 newBrandHandle : newBrand.value.substr(0,1).toUpperCase() + newBrand.value.substr(1).toLowerCase(),
 newBrandHandleMenu : newBrand.value.substr(0,1).toUpperCase() + newBrand.value.substr(1).toLowerCase()
});
brands.innerHTML += newBrandChoice;
};


  var sizeArr = newSizes.value.split(',');
  var newStockItem = {
    color : newColor.value.toLowerCase(),
    price : newPrice.value,
    brand: newBrand.value.substr(0,1).toUpperCase() + newBrand.value.substr(1).toLowerCase(),
    releaseDate: newRelDate.value,
    size: sizeArr
  };
  shoes.push(newStockItem);
  newColor.value = "";
  newPrice.value = "";
  newBrand.value = "";
  newRelDate.value = "";
  newSizes.value = "";


});

function isColor(stock){
  return stock.color == color.value;
}
function isBrand(stock){
  return stock.brand == brands.value;
}

function isReleaseDate(stock){
  return stock.releaseDate == releaseDates.value;

}

var tableDsgn = document.getElementById('table').innerHTML;
var template = Handlebars.compile(tableDsgn);

btn.addEventListener('click', function(){
  var sizeChosen = sizes.value;

  Handlebars.registerHelper('sizeIng', function(finalArray) {
    return finalArray[sizeChosen];
  });

  var sizeNotString = Number(sizeChosen);
  var actualSize = sizeNotString+1;

  if (sizeChosen !== 'notSize'){
  if (color.value !== 'notOption'){
    var filter1 = shoes.filter(isColor);
  }
  else{filter1 = shoes};
  if (brands.value !== 'notOption'){
    var filter2 = filter1.filter(isBrand);
  }
  else { var filter2 = filter1};
  if (releaseDates.value !== 'notOption'){
  var filter3 = filter2.filter(isReleaseDate)}
  else { var filter3 = filter2
  }
  for (var i=0; i<filter3.length; i++){
  var sizeChosenHandle = filter3[i].size[sizeChosen];
};
console.log(sizeChosenHandle)
      var shoeTable = template({
        size : actualSize,
        filter3,
      });
      searchRes.innerHTML = shoeTable;
  }
else{
  alert('Please choose a size!')
}

});
