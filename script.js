const filterButtons = document.querySelectorAll("nav ul li");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let currentImages = [];

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.getAttribute("data-filter");
        galleryItems.forEach(item => {
            if (category === "all" || item.getAttribute("data-category") === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        const visibleItems = [...galleryItems].filter(i => i.style.display !== "none");
        currentImages = visibleItems;
        currentIndex = visibleItems.indexOf(item);

        showLightbox(currentImages[currentIndex].querySelector("img").src);
    });
});

function showLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

closeBtn.addEventListener("click", () => lightbox.style.display = "none");

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showLightbox(currentImages[currentIndex].querySelector("img").src);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showLightbox(currentImages[currentIndex].querySelector("img").src);
});

document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeBtn.click();
    }
});
