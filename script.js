/*spy scroll*/
const sections = document.querySelectorAll("section[id].content");
const navbarLinks = document.querySelectorAll(".navbar a");

function scrollTracker() {
  const currentYScroll = window.scrollY;
  const viewportHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + sectionHeight;
    const id = section.getAttribute("id");
    const currentNavLink = document.querySelector(`.navbar a[href*="#${id}"]`);

    const threshold = 0.9; // 40% of the section height

    // Check if at least 40% of the section is visible in viewport
    const sectionVisibleHeight =
      Math.min(sectionBottom, currentYScroll + viewportHeight) -
      Math.max(sectionTop, currentYScroll);

    if (sectionVisibleHeight > sectionHeight * threshold) {
      currentNavLink?.classList.add("active");
      localStorage.setItem("activeSection", id);
    } else {
      currentNavLink?.classList.remove("active");
    }
  });
}


window.addEventListener("scroll", scrollTracker);

// Scroll to saved section after load
window.addEventListener("load", () => {
  const savedSection = localStorage.getItem("activeSection");
  if (savedSection) {
    const target = document.getElementById(savedSection);
    if (target) {
      // Slight delay to allow layout rendering
      setTimeout(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });

        // Force scrollTracker to run after scrolling
        setTimeout(scrollTracker, 100);
      }, 200);
    }
  }
});


/*video control remover*/
window.addEventListener("scroll", scrollTracker);

document.querySelector(".video-nest").addEventListener("contextmenu", (event) => {
  event.preventDefault();
      
});

/*swiper gallery controls*/
document.addEventListener('DOMContentLoaded', () => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  fetch('gallery-data.json')
    .then(res => res.json())
    .then(data => {
      const images = data.gallerySet1;

      images.forEach(src => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const content = document.createElement('div');
        content.classList.add('slide-content');

        const a = document.createElement('a');
        a.href = src;

        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';

        a.appendChild(img);
        content.appendChild(a);
        slide.appendChild(content);
        swiperWrapper.appendChild(slide);
      });

      // ✅ Initialize Swiper AFTER slides are injected
      new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        coverflowEffect: {
          rotate: 5,
          stretch: 0,
          depth: 50,
          modifier: 4,
          slideShadows: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: {
          enabled: true
        },
        breakpoints: {
          560: {
            slidesPerView: 1.5
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3.5
          }
        }
      });

      // ✅ Initialize LightGallery AFTER links are added
      lightGallery(swiperWrapper, {
        selector: 'a',
        closable: true,
        download: false,
        hideBarsDelay: 900
      });
    });
});


const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const initializedTabs = new Map();

let activeCarousel = null;
let galleryDataGlobal = null;

// Activate a tab and set up its carousel
function activateTab(tabId) {
  tabButtons.forEach(btn =>
    btn.classList.toggle('active', btn.dataset.tab === tabId)
  );
  tabContents.forEach(content =>
    content.classList.toggle('active', content.id === tabId)
  );

  const tab = document.getElementById(tabId);
  if (!tab) return;

  if (!initializedTabs.has(tab)) {
    const state = initCarousel(tab);
    if (state) {
      initializedTabs.set(tab, state);
      activeCarousel = state;
    }
  } else {
    activeCarousel = initializedTabs.get(tab);
    activeCarousel.update(true);
  }
}

// Initialize a carousel with cloning behavior
function initCarousel(container) {
  const track = container.querySelector('.carousel');
  let items = container.querySelectorAll('.carousel-item');
  if (!track || items.length < 2) return null;

  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  track.appendChild(firstClone);
  track.insertBefore(lastClone, items[0]);

  items = container.querySelectorAll('.carousel-item');
  let currentIndex = 1;

  const update = (instant = false) => {
    const width = items[0].offsetWidth;
    track.style.transition = instant ? 'none' : 'transform 0.4s ease';
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  };

  const shift = (step) => {
    currentIndex += step;
    update();
  };

  track.addEventListener('transitionend', () => {
    if (items[currentIndex].classList.contains('clone')) {
      currentIndex = currentIndex === items.length - 1 ? 1 : items.length - 2;
      update(true);
    }
  });

  window.addEventListener('resize', () => {
    update(true);
  });

  update(true); // Initial position

  return {
    shiftLeft: () => {
      if (currentIndex > 0) shift(-1);
    },
    shiftRight: () => {
      if (currentIndex < items.length - 1) shift(1);
    },
    update: (instant = false) => update(instant)
  };
}

// Inject slides into carousels from JSON data
function populateCarouselsFromJSON(designData) {
  Object.entries(designData).forEach(([tabId, items]) => {
    const tab = document.getElementById(tabId);
    if (!tab) return;

    const track = tab.querySelector('.carousel');
    if (!track) return;

    track.innerHTML = ''; // Clear existing

    items.forEach(item => {
      const slide = document.createElement('div');
      slide.className = 'carousel-item';
      slide.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="content-wrapper">
          <h2>${item.title}</h2>
          <button class="openGalleryBtn" data-gallery="${item.gallery}">view more</button>
          <div class="wrapper-overlay"></div>
        </div>
      `;
      track.appendChild(slide);
    });
  });
}

// Attach modal close behavior
function setupModalCloseBehavior() {
  const modal = document.getElementById('imageModal');
  const closeBtn = document.getElementById('closeGallery');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// Event delegation for dynamic 'view more' buttons
document.addEventListener('click', (e) => {
  const button = e.target.closest('.openGalleryBtn');
  if (!button) return;

  const galleryKey = button.dataset.gallery;
  const modal = document.getElementById('imageModal');
  const gallery = document.getElementById('modalGallery');

  if (!galleryDataGlobal || !galleryDataGlobal[galleryKey]) {
    console.warn(`No gallery data found for key: ${galleryKey}`);
    return;
  }

  const images = galleryDataGlobal[galleryKey];
  gallery.innerHTML = '';

  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.marginBottom = '20px';
    gallery.appendChild(img);
  });

  const modalContent = modal.querySelector('.modal-content');
  modalContent.scrollTop = 0;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
});

// Tab navigation click handlers
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    activateTab(tabId);
    localStorage.setItem('activeTab', tabId);
  });
});

// Carousel navigation buttons
document.querySelector('.prev')?.addEventListener('click', () => {
  activeCarousel?.shiftLeft();
});
document.querySelector('.next')?.addEventListener('click', () => {
  activeCarousel?.shiftRight();
});

// On page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab') || tabButtons[0].dataset.tab;

  Promise.all([
    fetch('design-data.json').then(res => res.json()),
    fetch('gallery-data.json').then(res => res.json())
  ])
    .then(([designData, galleryData]) => {
      galleryDataGlobal = galleryData; // ✅ set global data
      populateCarouselsFromJSON(designData);
      requestAnimationFrame(() => {
        activateTab(savedTab);
        setupModalCloseBehavior();
      });
    })
    .catch(err => console.error('Error loading JSON files:', err));
});




/*Video Switcher*/
fetch('video-data.json')
  .then(res => res.json())
  .then(data => {
    const listContainer = document.getElementById('videoList');
    const mainVideo = document.querySelector('.main-video video');
    const mainTitle = document.querySelector('.main-video .title');
    const videoWrap = document.querySelector('.video-wrap'); // added here

    data.forEach((videoData, index) => {
      const vid = document.createElement('div');
      vid.className = 'vid';
      if (index === 0) vid.classList.add('active');

      vid.innerHTML = `
        <video src="${videoData.src}" muted poster="${videoData.thumbnail}"></video>
        <h3 class="title">${videoData.title}</h3>
      `;

      vid.addEventListener('click', () => {
        document.querySelectorAll('.video-list .vid').forEach(v => v.classList.remove('active'));
        vid.classList.add('active');

        // ✨ Fade out main video container
        videoWrap.style.opacity = '0';

        setTimeout(() => {
          mainVideo.src = videoData.src;
          mainTitle.textContent = videoData.title;

          // ✨ Fade in
          videoWrap.style.opacity = '1';
        }, 300); // match the CSS transition duration
      });

      listContainer.appendChild(vid);

      if (index === 0) {
        mainVideo.src = videoData.src;
        mainTitle.textContent = videoData.title;
      }
    });
  })
  .catch(error => console.error('Failed to load gallery data:', error));


/*Video Player*/
  const player = new Plyr('#player');
  
