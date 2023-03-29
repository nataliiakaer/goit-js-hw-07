import { galleryItems } from "./gallery-items.js";

// Change code below this line

const galleryListEl = document.querySelector(".gallery");
const imageMarkup = createImageItemMurkup(galleryItems);

galleryListEl.insertAdjacentHTML("beforeend", imageMarkup);
galleryListEl.addEventListener("click", onImageClick);

function createImageItemMurkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      // console.log(preview);
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}

function onImageClick(evt) {
  evt.preventDefault();
  const isSelectedImageEl = evt.target.classList.contains("gallery__image");

  if (!isSelectedImageEl) {
    return;
  }

  const modal = basicLightbox.create(
    `<img class="gallery__image"
     src="${evt.target.dataset.source}" />`,
    {
      onShow: (modal) => {
        window.addEventListener("keydown", keydownEsc);
      },
      onClose: (modal) => {
        window.removeEventListener("keydown", keydownEsc);
      },
    }
  );

  function keydownEsc(event) {
    if (event.key === "Escape" && basicLightbox.visible()) {
      modal.close();
    }
  }
  modal.show();
}
