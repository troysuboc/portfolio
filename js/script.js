const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const body = document.body;

// Toggle menu on burger click
hamMenu.addEventListener('click', () => {
  const isActive = offScreenMenu.classList.toggle('active');
  hamMenu.classList.toggle('active', isActive);
  body.classList.toggle('no-scroll', isActive); // ✅ Toggle scroll lock
});

// Close menu on link click
document.querySelectorAll('.off-screen-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamMenu.classList.remove('active');
    offScreenMenu.classList.remove('active');
    body.classList.remove('no-scroll'); // ✅ Restore scrolling
  });
});

// Close menu on outside click/tap
document.addEventListener('click', (e) => {
  const clickedInsideMenu = offScreenMenu.contains(e.target);
  const clickedBurger = hamMenu.contains(e.target);

  if (!clickedInsideMenu && !clickedBurger && offScreenMenu.classList.contains('active')) {
    hamMenu.classList.remove('active');
    offScreenMenu.classList.remove('active');
    body.classList.remove('no-scroll'); // ✅ Restore scrolling
  }
});

// Attach to all internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const targetId = link.getAttribute('href').substring(1);
  const targetEl = document.getElementById(targetId);

  if (!targetEl) return; // Skip if no matching ID

  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Scroll without changing the URL
    const yOffset = -50; // Adjust if you have a fixed navbar
    const y = targetEl.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    // Optional: remove the hash if it’s already there
    history.replaceState(null, '', window.location.pathname);
  });
});

/*spy scroll portrait*/
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.portrait-menu-link');

  function onScroll() {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);
});

/*spy scroll landscape*/
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

      // ✅ Correct: only ONE initialization
      const swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        coverflowEffect: {
          rotate: 5,
          stretch: 0,
          depth: 50,
          modifier: 4,
          slideShadows: false,
        },
        navigation: false, // use custom buttons
        breakpoints: {
          0: {
            slidesPerView: 1.5
          },
          560: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 3.5
          },
          1024: {
            slidesPerView: 3.5
          }
        }
      });

      // ✅ Hook up your custom buttons AFTER swiper is initialized
      document.getElementById('custom-prev').addEventListener('click', () => {
        swiper.slidePrev();
      });
      document.getElementById('custom-next').addEventListener('click', () => {
        swiper.slideNext();
      });

      // ✅ Initialize LightGallery AFTER links are added
      lightGallery(swiperWrapper, {
        selector: 'a',
        closable: true,
        download: false,
        hideBarsDelay: 900
      });
    })
    .catch(error => console.error("Gallery load failed:", error));
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const initializedTabs = new Map(); // use Map to store state per tab

let activeCarousel = null;

// Main tab activator
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
    const state = initCarousel(tab); // this returns the full state
    initializedTabs.set(tab, state);
    activeCarousel = state;
  } else {
    activeCarousel = initializedTabs.get(tab);
    activeCarousel.update(true); // instantly adjust on tab switch
  }
}

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

  update(true);

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

// Attach shared global navigation buttons
document.querySelector('.prev')?.addEventListener('click', () => {
  activeCarousel?.shiftLeft();
});

document.querySelector('.next')?.addEventListener('click', () => {
  activeCarousel?.shiftRight();
});

// Save & restore tabs
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab') || tabButtons[0].dataset.tab;
  activateTab(savedTab);
});

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    activateTab(tabId);
    localStorage.setItem('activeTab', tabId);
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('imageModal');
  const gallery = document.getElementById('modalGallery');
  const closeBtn = document.getElementById('closeGallery');
  let galleryData = {};

  // ✅ Fetch the JSON data ONCE
  fetch('gallery-data.json')
    .then(res => res.json())
    .then(data => {
      galleryData = data;
    });

  // ✅ Delegate click from ANY .openGalleryBtn inside the whole document
  document.body.addEventListener('click', function (e) {
    const button = e.target.closest('.openGalleryBtn');
    if (!button || !galleryData) return;

    const galleryKey = button.dataset.gallery;
    const images = galleryData[galleryKey];

    if (!images || !Array.isArray(images)) return;

    gallery.innerHTML = ''; // Clear old images

    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      img.style.width = '100%';
      img.style.marginBottom = '20px';
      gallery.appendChild(img);
    });

    // ✅ Reset scroll position
    const modalContent = modal.querySelector('.modal-content');
    modalContent.scrollTop = 0;

    // ✅ Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  // ✅ Close modal
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

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    setTimeout(() => {
      const target = document.getElementById('videos');
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 50);
  }
});

  
