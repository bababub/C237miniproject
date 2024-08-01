// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'c237_catwo_ecommerceapp'
// });

// display all products or retrieve all products
// application.get('/', (req,res) => {
//     const sql = 'SELECT * FROM products';
//     connection.query( sql, (error, results) => {
//         if (error) {
//             console.error('database query error:', error.message);
//             return res.status(500).send('error retrieving products')
//         }
//      res.render('index', { products: results });
//     });
// });

// route to retrieve one product by id
// application.get('/product/:id', (req, res) => {
//     const productId = req.params.id;
//     const sql = 'SELECT * FROM products WHERE productId = ?';
//     connection.query( sql, [productId], (error, results) => {
//         if (error) {
//             console.error('database querry error:', error.message);
//             return res.status(500).send('error retrieving product by id');
//         }
//         if (results.length > 0) {
//             res.render('product', { product: results[0] });
//         } else {
//             res.status(404).send('product not found');
//         }
//     });
// });

// add a new product
// app.get('/addProduct', (req, res) => {
//     res.render('addProduct');
// });

// app.post('/addProduct', upload.single('image), (req, res) => {
//     const { name, quantity, price, image } = req.body;
//     let image;
//     if (req.file) {
//         image = req.file.filename;
//     } else {
//         image = null;
//     }

//     const sql = 'INSERT INTO products (productName, quantity, price, image) VALUES (?, ?, ?, ?)';
//     connection.query( sql, [name, quantity, price, image], (error, results) => {
//         if (error) {
//             console.error('error adding product:', error);
//             res.status(500).send('error adding product');
//         } else {
//             res.redirect('/');
//         }
//     });
// });

// set up view engine
// app.set('view engine', 'ejs');
// enable static files
// app.use(express.static('public'));
// enable form processing
// app.use(express.urlencoded({
//     extended: false
// }));
// enable static files
// app.use(express.static('public'));

// display data in form
// application.get('/editProduct/:id', (req, res) => {
//     const productId = req.params.id;
//     const sql = 'SELECT * FROM products WHERE productId = ?';
//     connection.query( sql, [productId], (error, results) => {
//         if (error) {
//             console.error('database query error:', error.message);
//             return res.status(500).send('error retrieving product by ID');
//         }
//         if (results.length > 0) {
//             res.render('editProduct', { product: results[0] });
//         } else {
//             res.status(404).send('product not found');
//       }
//     });
// });

// update database
// app.post('/editProduct/:id', upload.single('image'), (req, res) => {
//     const productId = req.params.id;
//     const { name, quantity, price } = req.body
//     let image = req.body.currentImage;
//     if (req.file) {
//         image = req.file.filename;
//     }

//     const sql = 'UPDATE products SET * productName = ? , quantity = ? , price = ? image = ? WHERE productId = ?';

//     connection.query( sql , [name, quantity, price, image, productId], (error, results) => {
//         if (error) {
//             console.error("error updating product:", error);
//             res.status(500).send('error updating product');
//         } else {
//             res.redirect('/');
//         }
//     });
// });

// delete a product
// app.get('/deleteProduct/:id', (req, res) => {
//     const productId = req.params.id;
//     const sql = 'DELETE FROM products WHERE productId = ?';
//     connection.query( sql , [productId], (error, results) => {
//         if (error) {
//             console.error("error deleting product:", error);
//             res.status(500).send('error deleting product');
//         } else {
//             res.redirect('/');
//         }
//     });
// });

// const express = require('express');
// const mysql = require('mysql2');
// const multer = require('multer');
// const app = express();

// set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer ({ storage: storage });

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const products = [
    { 
      id: 1, 
      name: "Basic Women's Blouse",
      description: 'Suitable for the summer season',
      price: 19.99,
      image: 'womensblouse.jpg'
    },
    { 
      id: 2, 
      name: "Women's Tube Top",
      description: 'Muted green for a neutral look',
      price: 29.99,
      image: 'womenstop.jpg'
    },
    { 
      id: 3, 
      name: "Men's Lightwashed Denim Jeans",
      description: 'Loose fit for a comfortable yet fashionable look',
      price: 39.99,
      image: 'mensjeans.jpg'
    }
];

const users = [];
const cart = [];

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', products });
});

app.get('/products', (req, res) => {
  const { search } = req.query;
  const filteredProducts = search ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : products;
  res.render('products', { title: 'Products', products: filteredProducts });
});

app.get('/cart', (req, res) => {
  res.render('cart', { title: 'Cart', cart });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  users.push({ name, email, password });
  res.redirect('/products');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));