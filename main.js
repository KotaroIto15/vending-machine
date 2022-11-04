class Product {
    constructor(name, price, image, link) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.link = link;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getImage() {
        return this.image;
    }

    getLink() {
        return this.link;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

// Constant declaration: products and buttons
const products = 
[
    new Product("Apple", 1.15, "https://assets.shop.loblaws.ca/products/20073899001/b2/en/front/20073899001_front_a06_@2.png", "https://www.nofrills.ca/red-delicious-apples/p/20073899001_KG"), 
    new Product("Orange", 6.99, "https://assets.shop.loblaws.ca/products/20323404001/b2/en/front/20323404001_front_a06_@2.png", "https://www.nofrills.ca/organic-navel-oranges-3lb-bag/p/20323404001_EA"), 
    new Product("Grape", 3.74, "https://assets.shop.loblaws.ca/products/20254491001/b2/en/front/20254491001_front_a06_@2.png", "https://www.nofrills.ca/red-seedless-grapes/p/20254491001_EA"),
    new Product("Kiwi", 0.75, "https://assets.shop.loblaws.ca/products/20130242001/b2/en/front/20130242001_front_a06_@2.png", "https://www.nofrills.ca/kiwis/p/20130242001_EA"),
    new Product("Pineapple", 3.50, "https://assets.shop.loblaws.ca/products/20160992001/b2/en/front/20160992001_front_a06_@2.png", "https://www.nofrills.ca/pineapple/p/20160992001_EA"),
    new Product("Melon", 4.00, "https://assets.shop.loblaws.ca/products/20167017001/b2/en/front/20167017001_front_a06_@2.png", "https://www.nofrills.ca/cantaloupe/p/20167017001_EA"),
    new Product("Watermelon", 6.00, "https://assets.shop.loblaws.ca/products/20145379001/b2/en/front/20145379001_front_a06_@2.png", "https://www.nofrills.ca/mini-seedless-watermelon/p/20145379001_EA"),
    new Product("Lemon", 0.99, "https://assets.shop.loblaws.ca/products/20028593001/b2/en/front/20028593001_front_a06_@2.png", "https://www.nofrills.ca/lemon/p/20028593001_EA"),
    new Product("Strawberry", 5.99, "https://assets.shop.loblaws.ca/products/20049778001/b2/en/front/20049778001_front_a06_@2.png", "https://www.nofrills.ca/strawberries-1lb/p/20049778001_EA"),
    new Product("Banana", 1.75, "https://assets.shop.loblaws.ca/products/20175355001/b2/en/front/20175355001_front_a06_@2.png", "https://www.nofrills.ca/bananas-bunch/p/20175355001_KG")
];
const buttons = document.querySelectorAll(".num-btn");
const searchId = document.getElementById("search-id");
const main = document.getElementById("main");
const extra = document.getElementById("extra");
const image = document.getElementById("image");


function createText(){
    let ele = document.createElement("h5");
    ele.classList.add("text-center");

    return ele;
}

function animateMain(nextElement, currentElement, indexDiff) {

    main.innerHTML = "";
    main.append(nextElement);

    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    image.innerHTML = "";

    if (indexDiff < 0) {
        image.append(main);
        image.append(extra);
    } else {
        image.append(extra);
        image.append(main);
    }
}

function searchProductById(stringId) {
    let numId = parseInt(stringId);
    for (i = 0; i < products.length; i++) {
        let product = products[i];
        if (product.getId() === numId) return product;
    }

    return null;
}

for (i = 1; i <= products.length; i++) {
    let product = products[i-1];
    product.setId(i);
}

// when clicking buttons, enter its value into the input text field.
buttons.forEach(function(button) {
    button.addEventListener("click", function(){
        searchId.value += button.innerHTML;
    });
});

document.getElementById("search").addEventListener("click", function(){
    let nextProduct = searchProductById(searchId.value);
    let nextImg = document.createElement("img");
    nextImg.classList.add("product-image");
    nextImg.src = nextProduct.getImage();

    let currentImg = main.querySelectorAll("img").item(0);
    let indexDiff = nextProduct.getId() - main.getAttribute("index");

    if (indexDiff !== 0) animateMain(nextImg, currentImg, indexDiff);
    main.setAttribute("index", String(nextProduct.getId()));

    let productName = createText();
    productName.innerHTML = "Name: " + nextProduct.getName();

    let productPrice = createText();
    productPrice.innerHTML = "Price: $" + String(nextProduct.getPrice());

    let buyDiv = document.createElement("div");
    buyDiv.classList.add("text-center");

    let buy = document.createElement("a");
    buy.href = nextProduct.getLink();
    buy.target = "_blank";
    buy.innerHTML = "Buy this product";
    
    buyDiv.append(buy);
    
    let description = document.getElementById("description");
    description.innerHTML = "";
    description.append(productName);
    description.append(productPrice);
    description.append(buyDiv);
    

    searchId.value = "";
});