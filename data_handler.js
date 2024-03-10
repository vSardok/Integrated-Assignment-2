const products = []

class ProdList {
    
    //CRUD METHODS
    
    //Create
    static createProduct(product) {
        ProdList.addProduct(Product.createFromObject(product));
    }  
    
    static addProduct(product){
        products.push(product);
    }

    // Read
    static getProducts(){ 
        return products.splice();
    }  

    static getProductById(uuid) {
        return products.filter(o => {
            if (o.uuid == uuid) return o;
        })
    } 

    // Update
    static updateProduct(uuid, updatedProduct) {
        let i = products.findIndex(p => p.uuid == uuid);
        let keys = ["_name", "_description", "_imageUrl", "_unit", "_stock","_pricePerUnit", "_category"];
        keys.forEach(k => {
            products[i][k] = updatedProduct[k];
        })
    }

    // Delete
    static deleteProduct(uuid) {
        let i = products.findIndex(p => p.uuid == uuid);
        products.splice(i, 1);
    }

    // toHTML   
    static toHtmlList(list){
        return `<div class="container mb-3">\n\t<div class="row">\n${list.map(p=>p.toHTML()).join("")}\t</div>\n</div>\n`;
    }

    static toHtmlTable(list, propOrder = []){
        let table = `<div class="table-responsive m-3"><table class="table table-hover" style="text-align: center;> <thead class="table-primary"> <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Image</th>
        <th>Unit</th>
        <th>Stock</th>
        <th>Price per Unit</th>
        <th>Category</th></tr></thead>`;
        table+= `<tr>${list.map(p=>p.toHTML(Product.toHtmlRow, propOrder)).join("")}</tr>`;
        table += ` </table></div>`;
        return table;
    }

    //FILTER METHOD
    static filterProducts(query,intersection=true) {
        let conditions = {
            ">" : (a,b) => a>b,
            "<" : (a,b) => a<b,
            ">=" : (a,b) => a>=b,
            "<=" : (a,b) => a<=b,
            "==" : (a,b) => a==b,
            "!==" : (a,b) => a!=b,
            "contains" :  (a,b) => a.contains(b),
            "startsWith" : (a,b) => a.startsWith(b),
            "endsWith" : (a,b)=>a.endsWith(b),
            "includes" : (a,b)=>a.includes(b)
        }
        let filteredArray=products.slice();
        if(intersection == true){
            query.forEach(q => {
                filteredArray = filteredArray.filter(p => {
                    if (conditions[q.operator](p[q.property],q.value)) return p;
                })
            })
            return filteredArray;
        }
        else {
            let union = new Set(); // Sets do not store duplicate values, so its easier to make a set instead of filtering the duplicates
            query.forEach(q => {
                filteredArray.filter(p => {
                    if (conditions[q.operator](p[q.property], q.value)) {
                        union.add(p);
                    }
                })
            })
            return Array.from(union);
        }
    } 
    
    // you don't need to modify this method, use it to test your code
    static log(list = products){ 
        console.table(list) 
    }   
}


// You don't need to modify this class, use it to render the products
// View.renderList() to render the list of products (show the products in a web page)
// View.renderTable() to render the table of products 
class View {
    static render(html, elementId){
        document.querySelector(`#${elementId}`).innerHTML = html;
    }
    static renderList(list = products, elementId = "pList"){
        let html = ProdList.toHtmlList(list); //  implement ProdList.toHtmlList method
        this.render(html, elementId);
    }
    static renderTable(list = products, elementId = "pTable"){
        let html = ProdList.toHtmlTable(list); //  implement ProdList.toHtmlTable method
        this.render(html, elementId);
    }
    static searchProduct(uuid, elementId = "pList"){
        let product = ProdList.getProductById(uuid); // implement ProdList.getProductById method
        View.renderList([product], elementId);
    }
}

//ProdList.printToConsole();
//View.renderList(); // Render the list of products
//View.renderTable(); // Render the table of products
