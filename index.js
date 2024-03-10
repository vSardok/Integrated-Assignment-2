/************ Product class *******************/
console.log("*******Product test*********");

// Create 1 product using the constructor and show it in the console
console.log("Create 1 product using the constructor");
let d29 = new Product("The Final Shape", 
                        "Newest DLC", 
                        "https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt793d6ef2ec86ccca/64dd6c195ec7a9ed0d92d9c6/tfs-media-wallpaper-4k-2.jpg", 
                        "singular copy", 
                        Infinity, 
                        799, 
                        "DLC");
console.log(d29);

// Try to set the uuid and catch the exception showing the message in the console
console.log("Try to set the uuid and catch the exception");
try {
    d29.uuid = "29";
} catch (e) {
    console.log(e);
}

// Try to create a product with an invalid property and catch the exception showing the message in the console
console.log("Try to create a product with an invalid property and catch the exception");
try {
    let d30 = new Product("", "");
    console.log(d30);
} catch (e) {
    console.log(e);
}

// Test cleanObject method and show the result in the console
console.log("Test cleanObject method");
let o1 = {
    "_uuid":"df2008a5-1c40-4dd1-9db7-8aacc03ae2fb",
    "_name": "Banana",
    "_description": "A delicious and healthy fruit",
    "_imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
    "_unit": "piece",
    "_stock": 15,
    "_pricePerUnit": 3.6,
    "_category":"Fruit",
    "_extraProperty":"extra"
}
console.log(Product.cleanObject(o1));

// Test createFromObject method and show the result in the console
console.log("Test createFromObject method");
let o2 = {
    "_name": "Banana",
    "_description": "A delicious and healthy fruit",
    "_imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
    "_unit": "piece",
    "_stock": 15,
    "_pricePerUnit": 3.6,
    "_category":"Fruit",
    "_extraProperty":"extra"
}
console.log(Product.createFromObject(o2));

// Test toHtml methods printing the result in the console
    // Product.toHtmlRow   change the order of the properties
    console.log("Product.toHtmlRow   change the order of the properties");
    console.log(Product.toHtmlRow(d29, ["_name", "_pricePerUnit"]));

    // Product.toHtmlDiv   hide two properties
    console.log("Product.toHtmlDiv   hide two properties");
    console.log(Product.toHtmlDiv(d29, ["_unit", "_description"]));

    // object.toHTML    test it with any of the previous methods
    console.log("object.toHTML    test it with any of the previous methods");
    console.log(d29.toHTML(Product.toHtmlDiv, ["_unit"]));

    
/************ ProdList *******************/
console.log("*******ProdList test*********");

// add a product to the list and show the list in the console using ProdList.log
console.log("add a product to the list");
ProdList.addProduct(d29);
ProdList.log();

// create a product and add it to the list using the method addProduct and show the list in the console using ProdList.log
console.log("create a product and add it to the list using the method addProduct");
let o4 = { 
    "_name":"Season of the Wish", 
    "_description":"Current Season", 
    "_imageUrl":"https://images.contentstack.io/v3/assets/blte410e3b15535c144/blte8da65035f9c8342/6564c8bc2d2f23b2c7f3ca33/s23-media-screenshot-02.jpg", 
    "_unit":"account copy", 
    "_stock":Infinity, 
    "_pricePerUnit": 199, 
    "_category":"Season"
}
ProdList.createProduct(o4); // createProduct uses the method addProduct
ProdList.log();

// get a product by id and show it in the console
console.log("get a product by id");
console.log(ProdList.getProductById(d29._uuid));


// Create a for loop to add 5 products with this data
    let names = ["watermelon", "onion", "avocado", "banana", "white bread"];
    let descriptions = ["from Mexico", "from Puebla", "from Michoacan", "from Aguascalientes", "from Jalisco"];
    let units = ["piece", "kg", "kg", "kg", "piece"];
    let categories = ["fruit", "vegetable", "vegetable", "fruit", "bread"];
    let prices = [80.50, 125.00, 98.00, 32.00, 62.50];
    let stocks = [15, 5, 10, 8, 25];
    let images = ["https://www.melissas.com/cdn/shop/files/image-of-midnight-watermelon-fruit-34071829676076_600x600.jpg?v=1685564568",
"https://www.forksoverknives.com/wp-content/uploads/Yellow-Onion.jpg?auto=webp&optimize=high&quality=70&width=1440",
"https://cdn.britannica.com/72/170772-050-D52BF8C2/Avocado-fruits.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/872px-Banana-Single.jpg",
"https://www.goldmedalbakery.com/content/uploads/2019/12/Jumbo-22oz-White.jpg"]; // ADD IMAGES TO THE PRODUCTS
for (let i = 0; i < 5; i++) {
    ProdList.addProduct(new Product(names[i],descriptions[i],images[i],units[i],stocks[i],prices[i],categories[i]));
}
ProdList.log();


//Display products in HTML  (Do it with View.renderList() and View.renderTable() )
    // Display the list of products in the HTML (use the method renderList)
    console.log("Display the list of products in the HTML (use the method renderList)");
    View.renderList();

    //Display the table of products in the HTML (use the method renderTable)
    console.log("Display the table of products in the HTML (use the method renderTable)");
    View.renderTable();

// Update the product list, change some value of a product
console.log("Update the product list, change some value of a product");
d29._pricePerUnit+=.99;
ProdList.updateProduct(d29._uuid, d29);
ProdList.log();

// Delete a product from the list
console.log("Delete a product from the list");
ProdList.deleteProduct(products[5]._uuid);
ProdList.log();

// Filter by category (includes) and show the result in the console
console.log("Filter by category (includes)");
let filter = [{ property:"_category", 
                value: "DLC",
                operator: "includes"}]
ProdList.log(ProdList.filterProducts(filter,true))

// Filter by category (includes) and price and show the result in the console
    // Filter by category and price > 90
    console.log("Filter by category and price > 90");
    filter = [{ property:"_category", 
                value: "vegetable",
                operator: "includes"},
                { property:"_pricePerUnit", 
                value: "90",
                operator: ">"}]
    ProdList.log(ProdList.filterProducts(filter,true))
    
    // Filter by category and price < 90
    console.log("Filter by category and price < 90");
    filter = [{ property:"_category", 
                value: "fruit",     // Banana wont appear, it was deleted
                operator: "includes"},
                { property:"_pricePerUnit", 
                value: "90",
                operator: "<"}]
    ProdList.log(ProdList.filterProducts(filter,true))

    // Filter by category or price > 90
    console.log("Filter by category or price > 90");
    filter = [{ property:"_category", 
                value: "vegetable",
                operator: "includes"},
                { property:"_pricePerUnit", 
                value: "90",
                operator: ">"}]
    ProdList.log(ProdList.filterProducts(filter,false))

// Filter by multiple properties
    // intersection = true
    console.log("Filter with multiple properties intersection = true");
    filter = [{ property:"_unit", 
                value: "copy",
                operator: "includes"},
                { property:"_pricePerUnit", 
                value: "200",
                operator: "<"}]
    ProdList.log(ProdList.filterProducts(filter,true))
    
    // intersection = false
    console.log("Filter with multiple properties intersection = false");
    filter = [{ property:"_unit", 
                value: "copy",
                operator: "includes"},
                { property:"_pricePerUnit", 
                value: "200",
                operator: "<"}]
    ProdList.log(ProdList.filterProducts(filter,false))



// ******** ShoppingCart ******** //
console.log("*******ShoppingCart test*********");
let cart = new ShoppingCart();

// Add about 4 items (using addItem) and show the shopping cart in the console
console.log("Add about 4 items (using addItem)");
cart.addItem(d29._uuid, 2);
cart.addItem(products[5]._uuid, 3);
cart.addItem(products[1]._uuid, 1);
cart.addItem(products[3]._uuid, 8);
console.table(cart.productProxies);

// Update quantity of a product in the cart and show the shopping cart in the console
console.log("Update quantity of a product in the cart");
cart.updateItem(d29._uuid, 1);
console.table(cart.productProxies);

// Delete a product, and show the shopping cart in the console
console.log("Delete a product");
cart.removeItem(products[3]._uuid);
console.table(cart.productProxies);

// Calculate the total of the shopping cart and show it in the console
console.log("Calculate the total of the shopping cart");
console.log(cart.calculateTotal()) // (799.99 + 62.5*3 + 199)=1186.49

// Optional: Show the shopping cart in the HTML (use the method showShoppingCart) in div#cart
cart.showShoppingCart((arg)=>{document.querySelector(`#cart`).innerHTML = arg;}, cart.toHTML())

// ******** Self  assessment ******** //
// This object will help you to keep track of your progress
// Change the value of each property to true if you have completed the item


let evaluation = {
    "productClass": {
        "constructor": true,
        "getters": true,
        "setters": true,
        "cleanObject": true,
        "createFromObject": true,
        "toHtmlRow": true,
        "toHtmlDiv": true,
        "toHTML": true
    },
    "prodListClass": {
        "addProduct": true,
        "createProduct": true,
        "getProducts": true,
        "getProductById": true,
        "updateProduct": true,
        "deleteProduct": true,
        "toHtmlList": true,
        "toHtmlTable": true,
        "filterProducts": true
    },
    "shoppingCart": {
        "constructor": true,
        "getters": true,
        "setters": true,
        "addItem": true,
        "updateItem": true,
        "deleteItem": true,
        "calculateTotal": true,
        "showShoppingCart": true
    }
}

let conclusions = `
  Not my best time, for sure. I was so confused in the import of js files that I had a rough and long time trying to understand it, and I still don't get it. But, it works, 
  that's what matters. In respect to the actual exercises, almost everything went smoothly, just some small errors of forgetting the underscore when updating some values, 
  and the function of filtering products, specifically the intersection part, where I was thinking on adding in an array every product that matched any of the filters, 
  and then deleting the duplicates, but at that moment I was advised to use a "Set", and I can see it saved me a lot of time, I forgot that sets do not save duplicates.
  Also, I wanted to include that I wanted to keep the structure in the toHTML functions, that's why I started using tabulators and line jumps, but, it started getting confusing
  and overwhelming when I had a lot of divs. 
  `
