document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    let currentImageIndex = 0;
    let images = [];

    galleryItems.forEach((item, index) => {
        images.push(item.querySelector("img").getAttribute("src"));
        item.addEventListener("click", () => {
            currentImageIndex = index;
            openLightbox(images[currentImageIndex]);
        });
    });

    function openLightbox(imageSrc) {
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="Lightbox Image">
                <div class="zoom-controls">
                    <button id="zoomIn">+</button>
                    <button id="zoomOut">-</button>
                </div>
                <div class="slider-controls">
                    <button id="prevImage">&lt;</button>
                    <button id="nextImage">&gt;</button>
                </div>
                <span class="close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);

        const closeBtn = lightbox.querySelector(".close");
        const zoomInBtn = lightbox.querySelector("#zoomIn");
        const zoomOutBtn = lightbox.querySelector("#zoomOut");
        const prevImageBtn = lightbox.querySelector("#prevImage");
        const nextImageBtn = lightbox.querySelector("#nextImage");
        let lightboxImage = lightbox.querySelector("img");

        let scale = 1;

        zoomInBtn.addEventListener("click", () => {
            scale += 0.1;
            lightboxImage.style.transform = `scale(${scale})`;
        });

        zoomOutBtn.addEventListener("click", () => {
            if (scale > 1) {
                scale -= 0.1;
                lightboxImage.style.transform = `scale(${scale})`;
            }
        });

        prevImageBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
            lightboxImage.src = images[currentImageIndex];
            scale = 1;
            lightboxImage.style.transform = `scale(${scale})`;
        });

        nextImageBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
            lightboxImage.src = images[currentImageIndex];
            scale = 1;
            lightboxImage.style.transform = `scale(${scale})`;
        });

        closeBtn.addEventListener("click", () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }
});
