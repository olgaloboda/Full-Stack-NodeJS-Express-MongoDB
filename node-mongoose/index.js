const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

	console.log('Connected correctly to server');

	Dishes.create({
		name: 'Uthappizz1a',
		description: 'test'
	})
	.then((dish) => {
		console.log('Dish: ', dish);

		//ensure that Dishes are executed
		Dishes.findByIdAndUpdate(dish._id, {
			$set: { description: 'updated test'}
		}, {
			new: true 
		}).exec();
		return dish;
	})
	.then((dish) => {
		console.log('DishN: ', dish);

		dish.comments.push({
			rating: 3,
			author: 'Author',
			comment: 'Good dish!'
		});

		return dish.save();			
	})
	.then((dish) => {
		console.log(dish);

		return Dishes.remove({});
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch((err) => {
		console.log(err);
	});
});