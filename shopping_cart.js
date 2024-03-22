"use strict";

class ShoppingCartException {
    constructor(errorMessage) {
        this.message = errorMessage;
        this.name="ShoppingCartException";
    }
}

//Only one constructor that saves uuid and quantity 
class ProductProxy {
    constructor(i, q) {
        this._uuid = i;
        this._quantity = q;
    }
}  

class ShoppingCart {
    constructor() {
        this._proxies = [];
        this._products = [];
    }

    // Getters
    get productProxies() {
        return this._proxies.slice();
    }

    get products() { 
        return this._products.slice();
    }

    // Setters
    set productProxies(value) { 
        throw new ShoppingCartException("Proxies cannot be changed!");
    }

    set products(value) {
        throw new ShoppingCartException("Products cannot be changed!");
    }
    
    addItem(productUuid, amount) {
        if (amount < 0) throw new ShoppingCartException("Product amount cannot be negative");
        if (this._products.findIndex(p => p.uuid === productUuid)<0 && amount>0){
            this._products.push(ProdList.getProductById(productUuid));
            this._proxies.push(new ProductProxy(productUuid, amount));
        }
        else this.updateItem(productUuid, amount);
    }

    updateItem(productUuid, newAmount) {
        if (newAmount < 0) throw new ShoppingCartException("Product amount cannot be negative");
        if (newAmount == 0) this.removeItem(productUuid);
        else {
            let i = this._proxies.findIndex(p => p._uuid == productUuid);
            this._proxies[i]._quantity=newAmount;
        }
    }

    removeItem(productUuid) {
        this._proxies = this._proxies.filter(p => p._uuid != productUuid);
        this._products = this._products.filter(p => p._uuid != productUuid);
    }

    calculateTotal() {
        let total=0;
        for (let i=0; i<this._proxies.length; i++){
            total += this.products[i]._pricePerUnit * this._proxies[i]._quantity;
        }
        return total;
    }

    //this method is Optional, 
    //receives a function to render the shopping cart and its arguments
    showShoppingCart(fnRender, args = []) {
        fnRender(args);
    }  

    // Funtion to render the shopping Cart
    toHTML(){
        let html = `<h1> Shopping Cart </h1><div class="container mb-3"><div class="row"><div class="col-lg-7"><div class="container mb-3">`
        for (let i=0; i<this._proxies.length; i++){
            html += `<div class="d-flex border mb-3">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mt-3"> ${this.products[i][0]._name}  &nbsp;<button type="button" class="btn btn-danger"> <i class="bi bi-trash-fill"></i> </button></h5>
                                    <p>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text">Quantity:</span>
                                            <input type="number" class="form-control" min="1" max="10" value="${this._proxies[i]._quantity}"/> 
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text">Price:</span>
                                            <input type="number" class="form-control" readonly value="${this.products[i]._pricePerUnit}"/> 
                                            <span class="input-group-text">MXN</span>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <img class="rounded-circle d-block mx-auto img-fluid img-thumbnail" src="${this.products[i]._imageUrl}" alt=""/>
                            </div>
                        </div>
                    </div>`;
        }
    html+=`</div>
    </div>
    <div class="col-lg-1"></div>
    <div class="col-lg-4">
        <div class="d-flex border mb-3">
            <div class="flex-grow-1 ms-3">
                <h5 class="mt-3">Total Purchase</h5>`; 
    for (let i=0; i<this._proxies.length; i++){
        html+=`<p><b>${this.products[i]._name}:</b> ${this._proxies[i]._quantity} x ${this.products[i]._pricePerUnit} MXN</p>                `
    }         
    html += `<h5>Total: ${this.calculateTotal()} MXN</h5><button type="button" class="btn btn-primary d-block mx-auto m-3 col-6" data-bs-toggle="modal" data-bs-target="#PaymentModal">  Pay </button>
                <button type="button" class="btn btn-primary btn-danger d-block mx-auto m-3 col-6"> Cancel </button>
            </div>
        </div>
    </div> 
</div>             
</div>`;
        return html;
    }
}

