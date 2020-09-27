import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const modalContent = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay")
const modalBtnClose = document.querySelector(".lightbox__button");
const modalBtnRight = document.querySelector(".scroll-right");
const modalBtnLeft = document.querySelector(".scroll-left");



galleryContainer.addEventListener('click', modalOpen);

window.addEventListener("keydown", modalImgScrolling);
modalBtnRight.addEventListener("click", modalImgScrolling);
modalBtnLeft.addEventListener("click", modalImgScrolling);
modalContent.addEventListener("click", modalImgScrolling);


function galleryCardMarkup(img) {
    return img.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
                    <a class="gallery__link"
                     href=${original}>
                         <img class="gallery__image"
                          src=${preview}
                          data-source=${original}
                          alt=${description} />
                    </a>
                    </li>`
    }).join("");
};

galleryContainer.insertAdjacentHTML("beforeend", galleryCardMarkup(galleryItems));

function modalOpen(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    };
    modal.classList.add("is-open");
    modalImg.src = event.target.dataset.source;
    modalImg.alt = event.target.alt;

    overlay.addEventListener("click", modalCloseByOverlayClick);
    document.addEventListener("keydown", modalCloseByEsc);
    modalBtnClose.addEventListener('click', modalClose);
};

function modalClose(event) {
    modal.classList.remove("is-open");
    modalBtnClose.removeEventListener('click', modalClose);
};

function modalCloseByEsc(event) {
    if (event.code === "Escape") {
        modalClose(event)
    }
    document.removeEventListener("keydown", modalCloseByEsc);
};

function modalCloseByOverlayClick(event) {
    if (event.currentTarget === event.target) {
        modalClose(event)
    }
    overlay.removeEventListener("click", modalCloseByOverlayClick);
};


function modalImgScrolling(event) {

    let imgIndex = galleryItems.findIndex(img => img.original === modalImg.src);

    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown' || modalBtnLeft === event.target) {
        if (imgIndex === 0) {
            imgIndex += galleryItems.length;
        }
        imgIndex -= 1;
    };

    if (event.code === 'ArrowRight' || event.code === 'ArrowUp' || modalBtnRight === event.target || modalContent === event.target) {
        if (imgIndex === galleryItems.length - 1) {
            imgIndex -= galleryItems.length;
        }
        imgIndex += 1;
    };

    modalImg.src = galleryItems[imgIndex].original;
    modalImg.alt = galleryItems[imgIndex].description;

};