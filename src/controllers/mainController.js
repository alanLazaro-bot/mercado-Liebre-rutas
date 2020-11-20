const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	
	
	index: (req, res) => {
		res.render('index', {products});
	},

	search: (req, res) => {

		

		if(req.query.search){
			 resultado = products.filter(function(product){

					return product.name.includes(req.query.search) || product.description.includes(req.query.search)

				})
			}

				res.render('results',{resultado:resultado});

			}

			
				
};

module.exports = controller;
