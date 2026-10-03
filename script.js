const opening = document.getElementById("opening");
const bouquetSection = document.getElementById("bouquetSection");
const gallerySection = document.getElementById("gallerySection");
const messageSection = document.getElementById("messageSection");


// ===============================
// OPENING → BOUQUET
// ===============================

document.getElementById("startBtn").addEventListener("click", () => {
  opening.classList.remove("active");
  bouquetSection.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ===============================
// BOUQUET → GALLERY
// ===============================

document.getElementById("galleryBtn").addEventListener("click", () => {
  bouquetSection.classList.remove("active");
  gallerySection.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ===============================
   QUICK SNAP VIDEO GALLERY
=============================== */

const snapVideos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4",
  "videos/video6.mp4"
];

const snapCaptions = [
  "Binatog Moments ❤️",
  "Keleg sa Adobo ko HAHAHA",
  "Duyan Moments ❤️",
  "Jas Us",
  "I love youuuu",
  "Sleeptight Habi ko, Dito lang ako ❤️"
];

let currentSnap = 0;


const snapPhoto =
  document.getElementById("snapPhoto");

const snapVideo =
  document.getElementById("snapVideo");

const snapCaption =
  document.getElementById("snapCaption");

const snapCounter =
  document.getElementById("snapCounter");

const progressBars =
  document.querySelectorAll(".progress-bar");


/* ===============================
   SHOW SELECTED VIDEO
=============================== */

function showSnap(index) {

  /* Prevent going before first video */
  if (index < 0) {
    index = 0;
  }


  /* ===============================
     LAST VIDEO → LETTER
  =============================== */

  if (index >= snapVideos.length) {

    snapVideo.pause();
    snapVideo.currentTime = 0;

    gallerySection.classList.remove("active");
    gallerySection.style.display = "none";

    messageSection.style.display = "block";
    messageSection.classList.add("active");
    messageSection.style.opacity = "1";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }


  /* Save current video */
  currentSnap = index;


  /* ===============================
     FADE OUT
  =============================== */

  snapPhoto.classList.add("fade-out");


  setTimeout(() => {

    /* ===============================
       CHANGE VIDEO
    =============================== */

    snapVideo.src =
      snapVideos[currentSnap];

    snapCaption.textContent =
      snapCaptions[currentSnap];

    snapCounter.textContent =
      `${currentSnap + 1} / ${snapVideos.length}`;


    /* ===============================
       UPDATE PROGRESS BARS
    =============================== */

    progressBars.forEach((bar, index) => {

      if (index <= currentSnap) {
        bar.classList.add("active");
      } else {
        bar.classList.remove("active");
      }

    });


    /* ===============================
       LOAD & PLAY VIDEO
    =============================== */

    snapVideo.load();

    snapVideo.play().catch(() => {
      console.log("Video requires user interaction.");
    });


    /* ===============================
       FADE IN
    =============================== */

    snapPhoto.classList.remove("fade-out");

  }, 450);
}


/* ===============================
   LEFT SIDE = PREVIOUS VIDEO
=============================== */

snapPhoto.addEventListener("click", (event) => {

  const rect =
    snapPhoto.getBoundingClientRect();

  const clickX =
    event.clientX - rect.left;

  const photoWidth =
    rect.width;


  /* LEFT SIDE */

  if (clickX < photoWidth / 2) {

    showSnap(currentSnap - 1);

  }


  /* RIGHT SIDE */

  else {

    showSnap(currentSnap + 1);

  }

});

const bouquet = document.getElementById("bouquet3d");

let isDragging = false;
let startX = 0;
let rotationY = 0;

bouquet.addEventListener("pointerdown", (e) => {
  isDragging = true;
  startX = e.clientX;

  bouquet.setPointerCapture(e.pointerId);
});

bouquet.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const movement = currentX - startX;

  rotationY += movement * 0.5;
  startX = currentX;

  bouquet.style.transform = `rotateY(${rotationY}deg)`;
});

bouquet.addEventListener("pointerup", () => {
  isDragging = false;
});

bouquet.addEventListener("pointercancel", () => {
  isDragging = false;
});