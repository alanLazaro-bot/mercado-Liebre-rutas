const fs = require('fs');
const path = require('path');
const { send } = require('process');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
	store: (req, res) => {
		let filePath= path.resolve('src','data','productsDataBase.json')
		let content = fs.readFileSync(filePath,{encoding:'utf-8'})
		

		content= JSON.parse(content)


		content.push({

			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category:req.body.category,
			description:req.body.description,
			
			id: content[content.length-1].id+1

		})

		content = JSON.stringify(content)

		fs.writeFileSync(filePath, content)

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
		
		let filePath= path.resolve('src','data','productsDataBase.json')
		let data = fs.readFileSync(filePath,{encoding:'utf-8'})
		

		data = JSON.parse(data)

		data.forEach(function(product){
			
			if(product.id==req.params.id){

			
			product.name = req.body.name;
			product.price = req.body.price;
			product.discount = req.body.discount;
			product.category = req.body.category;
			product.description = req.body.description;
			}	
			});
		data = JSON.stringify(data)

		fs.writeFileSync(filePath, data)
		res.redirect('products')

		
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;