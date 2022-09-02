class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
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

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

const products = [new Product("Apple", 5, "https://m.media-amazon.com/images/I/818VhMc24JL._AC_SL1500_.jpg"), 
new Product("Orange", 6, "https://m.media-amazon.com/images/I/818VhMc24JL._AC_SL1500_.jpg")];
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

    let description = document.getElementById("description");
    description.innerHTML = "";
    description.append(productName);
    description.append(productPrice);

    searchId.value = "";
});