window.addEventListener('DOMContentLoaded', function() {
const thumbnails = this.document.querySelectorAll('.thumbnail');
const selectedImage = this.document.querySelector('.selected-image');

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
    const productUrl = event.target.getAttribute('src');
    const imageContainer = event.target.closest('.full-image, .overlay-selected-image');
    switchActveProductImage(imageContainer.querySelector('.selected-image'), productUrl.replace('-thumbnail',''));
    imageContainer.querySelector('.thumbnail.selected').classList.remove('selected')
    event.target.parentNode.classList.add('selected');
}

function switchActveProductImage(imageNode, newImageUrl) {
    imageNode.setAttribute('src', newImageUrl);
}

function overlayButtonClicked(event) {;
    const direction = event.target.dataset.direction  || event.target.closest('.btn').dataset.direction;
    
    const overlayThumbnails = Array.from(document.querySelectorAll('#product-overlay .thumbnail'));
    const selectedThumbnailIndex = overlayThumbnails.findIndex(thb => thb.classList.contains('selected'));
    const nextThumbnailCount = (selectedThumbnailIndex + (direction * 1)) % (overlayThumbnails.length);
    
    const nextIndex = nextThumbnailCount < 0 ? overlayThumbnails.length -1 :  Math.max(0, nextThumbnailCount);
    console.log(nextIndex)
    overlayThumbnails[selectedThumbnailIndex].classList.remove('selected');
    overlayThumbnails[nextIndex].classList.add('selected');

    const nextImgSrc = overlayThumbnails[nextIndex].querySelector('img').getAttribute('src');
    switchActveProductImage(document.querySelector('.overlay-selected-image > .selected-image'), nextImgSrc.replace('-thumbnail',''));
    
   
}
/** overlay */





});