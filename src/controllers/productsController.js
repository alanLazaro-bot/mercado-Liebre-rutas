const fs = require('fs');
const path = require('path');
const { send } = require('process');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		

		let resultado = products.find(function(product){
			return product.id == req.params.id
		})

		res.render('detail',{resultado})
	},

	// Create - Form to create
	create: (req, res) => {

		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res, next) => {

		console.log(req)
		

		products.push({
			id: content[content.length-1].id+1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category:req.body.category,
			description:req.body.description,
			image:req.files[0].filename,		
			

		})

		products = JSON.stringify(products)

		fs.writeFileSync(productsFilePath, products)

		res.send('recibido')


	},

	// Update - Form to edit
	edit: (req, res) => {

let productToEdit = products.find(function(product){
	return product.id==req.params.id
})

		res.render('product-edit-form',{productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		
		products.forEach(function(product){
			
			if(product.id==req.params.id){

			product.name = req.body.name;
			product.price = req.body.price;
			product.discount = req.body.discount;
			product.category = req.body.category;
			product.description = req.body.description;
			}	
			});
		products = JSON.stringify(products)

		fs.writeFileSync(productsFilePath, products)
		res.redirect('/')

		
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;