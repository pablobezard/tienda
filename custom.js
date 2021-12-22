//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');

product = {};
let buyThings = [];
let totalCard = 0;
let countProduct = 0;

const API_URL = "https://fakestoreapi.com"
const HTMLResponse = document.querySelector("#app");

fetch(`${API_URL}/products`)
            .then(res=>res.json())
            .then((products) => {
              const tql = products.map((product) => `   <div class="carts" id="app">
              <div>
                <img src="${product.image}" alt="" />
               
              </div>
              <p><span>${product.price}</span>$</p>
            
              <div class="titleSpace">
              <p class="title">${product.title}</p>
              </div>
              <a href="" data-id="${product.id}" class="btn-add-cart">add to cart</a>
              
            </div>`);
             HTMLResponse.innerHTML= ` ${tql} `
            });

   
//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);

  
}



function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
        if (localStorage.getItem('product')){
            product = JSON.parse(localStorage.getItem('product'))
            loadHtml()
        }
    }
}



function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    loadHtml();

}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;

        sincronitationStorage()
     
    });

    function sincronitationStorage(){
        localStorage.setItem('product', JSON.stringify(product))
    }
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }


function buyAll(){
    if (buyThings.length = 0)
    { } else {
        countProduct--;
    }
}