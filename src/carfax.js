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

var averageAgeCalculator = function(collection) {
	// database.currentYears will go into averageAgeCalculator
	// average = sum of years / number of elements
	// so we know to get the number of elements, we need the total number of elements 
	// in the collection and we know a property to get that :) collection.length 
	// so we need to loop through the collection and add each element in the collection
	// what we need is a variable to store the sum of the years while we loop through
	var average = 0;	
	toolbelt.loop(collection, function(element) {
		average = average + element;	// element is the equivalent to collection[i]
		// because loop's second parameter is always a function
		// so it can be an anonymous function or an external callback
		// we don't need a for statement - loop IS our for statement
		// if we put it inside here, average will be re-initialized for each iteration
		// of the loop so it will be reset
		// what we want is average = average + current element
		// so we keep incrementing the value of average
	});
	return average / collection.length; 
}
var result = averageAgeCalculator(database.currentYears);
console.log(result);


// so we need to filter by one parameter (color)
// we need to loop through all the cars and then only pick out the cars that match the color
// we need an if() statement inside the loop
var filterByColor = function(collection, inputColor) {
	// inputColor is our "filter" expression
	// this is what we have to match to the element["color"] property
	// we need to store the matching "cars" in an array
	var resultArray = [];
	// this is where we need the loop to filter our cars
	toolbelt.loop(collection, function(element) {
		// now we need our if() condition
		// element is an object with a color property
		// this has to match the inputColor
		if (element.color === inputColor) {
			// so you can pass in different colors to your function
			// we need to add this element to the array
			resultArray.push(element);
			// there's no return inside the loop
			// we're just adding an element to the array
		}
	});
	// this is now outside the loop, so we can return the array
	return resultArray;	// after we've populated this with the car elements
}
var result = filterByColor(carData, "champagne");
console.log(result);


var filterAboveYear = function(collection, year) {
	var resultArray = [];	
	toolbelt.loop(collection, function(element) {
		if (element.year > year) {
			resultArray.push(element);
		}
	});
	return resultArray;
}
var result = filterAboveYear(carData, 1992);
console.log(result);


var filterBelowYear = function(collection, year) {
	var newArray = [];
	toolbelt.loop(collection, function(element) {
		if (element.year < year) {
			newArray.push(element);
		}
	});
	return newArray;
};
var result = filterBelowYear(carData, 1997);
console.log(result);

// testing filterBy
var numbers = [1, 2, 3, 4, 5];
var onlyEvens = toolbelt.filterBy(numbers, function(number){
    return number % 2 === 0;
});
console.log(onlyEvens);

console.log("After implementing toolbelt.filterBy");

var filterAboveYear = function(collection, year) {
	return toolbelt.filterBy(collection, function(element) {
		return element.year > year;
	});
}
console.log(filterAboveYear(carData, 1995));
