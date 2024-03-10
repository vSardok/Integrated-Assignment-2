"use strict";

class ProductException {
    constructor(errorMessage) {
        this.message = errorMessage;
        this.name="ProductException";
    }
}

// This class focuses on creating/editing objects (it does not use any object lists at all)
class Product {

    // Constructor here
    constructor(n, d, i, u, s, p, c){
        this._uuid = generateUUID();
        this.name = n;
        this.description = d;
        this.imageUrl = i;
        this.unit = u;
        this.stock = s;
        this.pricePerUnit = p;
        this.category = c;
    }
    // Returns the _uuid
    get uuid() {
        return this._uuid;
    }

    // Throws an exception for attempting to set an id
    set uuid(v) {
        throw new ProductException("It's not possible to change the product ID!");
    }

    // Getters and setters for each property: name, description, imageUrl, unit, stock, pricePerUnit, category
    // Remember to use underscores in variables: this._name, this._unit
    // Perform corresponding validations in the getters // Validations on getters? Don't you mean setters?
    
    // Getters
    get name(){
        return this._name;
    }

    get description(){
        return this._description;
    }

    get imageUrl(){
        return this._imageUrl;
    }

    get unit(){
        return this._unit;
    }

    get stock(){
        return this._stock;
    }

    get pricePerUnit(){
        return this._pricePerUnit;
    }

    get category(){
        return this._category;
    }

    // Setters
    set name(v){
        if (!v) throw new ProductException("Product name cannot be empty!");
        this._name=v;
    }

    set description(v){
        if (!v) throw new ProductException("Product description cannot be empty!");
        this._description=v;
    }

    set imageUrl(v){
        if (!v) throw new ProductException("Product imageUrl cannot be empty!");
        this._imageUrl=v;
    }

    set unit(v){
        if (!v) throw new ProductException("Product unit cannot be empty!");
        this._unit=v;
    }

    set stock(v){
        if (!v) v=0;
        this._stock=v;
    }

    set pricePerUnit(v){
        if (!v || v==0) throw new ProductException("Product price per unit cannot be 0!");
        this._pricePerUnit=v;
    }

    set category(v){
        if (!v) throw new ProductException("Product category cannot be empty!");
        this._category=v;
    }

    // Removes all the properties that are not part of a product
    static cleanObject(obj) {
        let productKeys = ["_uuid", "_name", "_description", "_imageUrl", "_unit", "_stock","_pricePerUnit", "_category"];
        //console.log(productKeys);
        let objKeys= Object.keys(obj);
        //console.log(objKeys);
        objKeys.forEach(k => {
            if (!productKeys.includes(k)) delete obj[k];
        })
        //console.log(obj);
        return obj;
    } 
    
    // cleans the obj, tests if it has the required properties and returns a new Product
    static createFromObject(obj) {
        if (obj.hasOwnProperty("_uuid")) return Product.cleanObject(obj);
        return new Product(obj._name, obj._description, obj._imageUrl, obj._unit, obj._stock, obj._pricePerUnit, obj._category);
    } 
    
    // Returns the product in HTML format
    // default order is uuid, name, description, imageUrl, unit, stock, pricePerUnit, category
    static toHtmlRow(obj, propOrder) {
        let html='<tr>\n'
        if(propOrder == undefined || propOrder.length == 0){
            Object.keys(obj).forEach(k => {
                if(k =="_imageUrl") html+=`\t<td><img src="${obj[k]}" width="100px"/></td>\n`;
                else html+=`\t<td>${obj[k]}</td>\n`;
            })
        }
        else{
            propOrder.forEach(k => {
                if(k =="_imageUrl") html+=`\t<td><img src="${obj[k]}" width="100px"/></td>\n`;
                else html+=`\t<td>${obj[k]}</td>\n`;
            });
        }
        html+='</tr>\n'
        return html;
    }

    // returns a html string similar to the first integrated assignment, but hide those properties in the array
    static toHtmlDiv(obj, hideProps) {
        let html=`<div class="col-lg-3 col-md-4 col-sm-6 mt-3">\n\t<div class="card text-start">\n`;
        if(hideProps == undefined || hideProps.length == 0){
            html+=`\t\t<img class="card-img-top" src="${obj._imageUrl}" style="max-height: 200px; max-width: 320px"/>\n\t\t<div class="card-body">\n`;
            Object.keys(obj).forEach(k => {
                if(k!="_imageUrl"){ 
                    if (k=="_name") html+=`\t\t\t<h4 class="card-title">${obj[k]}</h4>\n`;
                    else html+=`\t\t\t<p class="card-text">${obj[k]}</p>\n`;
                }             
            })
        }
        else {
            if (!hideProps.find((k) => k=="_imageUrl")) html+=`\t\t<img class="card-img-top" src="${obj._imageUrl}"/>\n`;
            html+=`\t\t<div class="card-body">\n`;
            Object.keys(obj).forEach(k => {
                if((!hideProps.find((key) => key==k)) && k!="_imageUrl"){ 
                    if (k=="_name") html+=`\t\t\t<h4 class="card-title">${obj[k]}</h4>\n`;
                    else html+=`\t\t\t<p class="card-text">${obj[k]}</p>\n`;
                }             
            })
        }
        html+=`\t\t</div>\n\t</div>\n</div>\n`;
        return html;
    } 

    // Set a default function to convert a product to HTML 
    toHTML(fnToHtml = Product.toHtmlDiv, array = []) {
        return fnToHtml(this, array);
    } 
}

