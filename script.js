window.addEventListener('DOMContentLoaded', function() {
const thumbnails = this.document.querySelectorAll('.thumbnail');
const selectedImage = this.document.querySelector('.selected-image');
const cart = this.document.getElementById('cart');
const itemCountNode = this.document.querySelector('.item__count');
const selectedProducts = [];

/** thumbnail click behaviour */
thumbnails[0].classList.toggle('selected');
thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', changeSelectedImage);
})

selectedImage.addEventListener('click', showOverlay);

function showOverlay(event) {
    const overlay = document.querySelector('#overlay-template').content.cloneNode(true);
    const selectedImageUrl = event.target.getAttribute('src');
    overlay.querySelector('.selected-image').setAttribute('src', selectedImageUrl);
    document.querySelector('body').appendChild(overlay);
    // close button click
    setTimeout(function() {
        document.querySelector('.close-btn').addEventListener('click', function() {
            document.getElementById('product-overlay').remove();
        });
    }, 0);
    const overlayThumbnails = document.querySelectorAll('#product-overlay .thumbnail');
    const selectedThumbnailIndex = Array.from(thumbnails).findIndex(thb => thb.classList.contains('selected'))
    overlayThumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('click', changeSelectedImage);
    });

    overlayThumbnails[selectedThumbnailIndex].classList.add('selected');

   document.querySelectorAll('#product-overlay .btn').forEach( function(btn) {
    btn.addEventListener('click', overlayButtonClicked, false);
   })
}

function changeSelectedImage(event) {
    const productUrl = event.target.getAttribute('src') || event.target.querySelector('img').getAttribute('src');
    console.log(event)
    const imageContainer = event.target.closest('.full-image, .overlay-selected-image');
    switchActveProductImage(imageContainer.querySelector('.selected-image'), productUrl.replace('-thumbnail',''));
    imageContainer.querySelector('.thumbnail.selected').classList.remove('selected')
    event.target.classList.add('selected');
}

function switchActveProductImage(imageNode, newImageUrl) {
    imageNode.setAttribute('src', newImageUrl);
}

/** overlay */

function overlayButtonClicked(event) {;
    const direction = event.target.dataset.direction  || event.target.closest('.btn').dataset.direction;
    
    const overlayThumbnails = Array.from(document.querySelectorAll('#product-overlay .thumbnail'));
    const selectedThumbnailIndex = overlayThumbnails.findIndex(thb => thb.classList.contains('selected'));
    const nextThumbnailCount = (selectedThumbnailIndex + (direction * 1)) % (overlayThumbnails.length);
    
    const nextIndex = nextThumbnailCount < 0 ? overlayThumbnails.length -1 :  Math.max(0, nextThumbnailCount);
  
    overlayThumbnails[selectedThumbnailIndex].classList.remove('selected');
    overlayThumbnails[nextIndex].classList.add('selected');

    const nextImgSrc = overlayThumbnails[nextIndex].querySelector('img').getAttribute('src');
    switchActveProductImage(document.querySelector('.overlay-selected-image > .selected-image'), nextImgSrc.replace('-thumbnail',''));
    
   
}



function addProduct() {
    const numberOfProducts = +document.querySelector('#counter-value').getAttribute('value');
    console.log(numberOfProducts)
    if(!numberOfProducts) {
        const isCartContentPresent = !!document.querySelector('.cart__content');
        const cartContent = isCartContentPresent ? document.querySelector('.cart__content') : document.createElement('p');
        cartContent.classList.add('cart__content');
        cartContent.innerHTML = '';
        cartContent.textContent = 'Your cart is empty!';
        cart.insertAdjacentElement('beforeend', cartContent);
        itemCountNode.innerHTML = '';
        itemCountNode.classList.toggle('visible', false);
    } else if(numberOfProducts > 0) {
       const cartContent =  document.querySelector('.cart__content');
       cartContent.innerHTML ='';
        const cartProductHtml = `<div class="product-container">
                    
                        <div class="product-line">
                                <img src="images/image-product-1-thumbnail.jpg" alt="selected product thumbnail">
                                <div><span>Fall Limited Edition Sneakers ${`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                                    125,
                                  )} x ${numberOfProducts}`} <strong>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                                    (numberOfProducts * 125),
                                  ) }</strong></span></div>
                                <button>
                                    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
                                </button>
                        </div>
                        <button class="btn btn__primary" id="checkout-product-btn">
                         <span>Checkout</span>
                       </button>                 
                </div>`;
                cartContent.insertAdjacentHTML('beforeend', cartProductHtml);
                itemCountNode.innerHTML = `${numberOfProducts}`;
                itemCountNode.classList.toggle('visible', true);
    }   

   
}

function showCart() {
    cart.classList.toggle('visible');
}

function incrementCounter() {
    let counter = document.querySelector('#counter-value');
    let newValue = +counter.getAttribute('value');
    counter.setAttribute('value', Math.max(0, ++newValue))
}

function decrementCounter() {
    let counter = document.querySelector('#counter-value');
    let newValue = +counter.getAttribute('value');
    counter.setAttribute('value', Math.max(0, --newValue));
}

function isOverlayOpen() {
    return !!document.getElementById('product-overlay');
}


this.document.querySelector('.btn__minus').addEventListener('click', decrementCounter);
this.document.querySelector('.btn__plus').addEventListener('click', incrementCounter);

this.document.querySelector('.cart-btn').addEventListener('click', showCart);

this.document.getElementById('add-product-btn').addEventListener('click', () => addProduct());

addProduct();

this.document.querySelectorAll('a[href="#"]').forEach(anchor => anchor.addEventListener('click', e => e.preventDefault()))

this.document.addEventListener('keydown', (e) => {
    if (e.keyCode == 27 && isOverlayOpen()) {
        document.getElementById('product-overlay').remove();
    }
})

function determineMediaSize() {
    const root = this.document.querySelector('html');
    root.classList.remove('mobile');
    root.classList.remove('desktop');
   const mediaSizeClass = this.window.matchMedia("(min-width: 990px)").matches ? 'desktop' : 'mobile';
    root.classList.add(mediaSizeClass);
}

this.window.addEventListener('resize', determineMediaSize);

determineMediaSize();

});