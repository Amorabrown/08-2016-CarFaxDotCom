var database = database.carDataBase
var carData = database.carData;
console.log(carData);
// your code here

toolbelt.loop([1,2,3,4], function (number){
	console.log(number)
})

var result = toolbelt.transform([1,2,3,4], function (number){
	return number * 2
})
console.log(result)


var priceParser = function (collection){
	return toolbelt.transform(collection, function (element){
		return element.price
	})
}
var result = priceParser(carData)

database.currentPrices = result

console.log(result)

var yearParser = function(collection){
	return toolbelt.transform (collection, function (element){
		return element.year
	})
}
var result = yearParser(carData)

database.currentYears = result
console.log(result)












