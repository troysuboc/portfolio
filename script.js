document.addEventListener('scroll', () => {
    const navdiv = document.querySelector('.navdiv');

    if (window.scrollY > 1) {
        navdiv.classList.add('scrolled');
    } else {
        navdiv.classList.remove('scrolled');
    }
 
});

const swiperWrappers = ['.card-wrapper', '.card-wrapper2', '.card-wrapper3', '.card-wrapper4'];

swiperWrappers.forEach(wrapper => {
    new Swiper(wrapper, {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

let menuList = document.getElementById("menuList")
menuList.style.maxHeight = "0px";

function toggleMenu(){
    if(menuList.style.maxHeight == "0px")
    {
        menuList.style.maxHeight = "600px";
    }
    else{
        menuList.style.maxHeight = "0px";
    }
};

document.addEventListener('scroll', () => {
    const homemask = document.querySelector('.home-mask');

    if (window.scrollY > 1) {
        homemask.classList.add('scrolled');
    } else {
        homemask.classList.remove('scrolled');
    }

    document.querySelector('.popup-image span').onclick = () => {
        document.querySelector('.popup-image').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.querySelector('.popup-exit-img').onclick = () => {
        document.querySelector('.popup-image').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    
    document.querySelectorAll('.image-container img').forEach(image => {
        image.onclick = () => {
            document.querySelector('.popup-image').style.display = 'block';
            document.querySelector('.popup-image img').src = image.getAttribute('src');
            document.body.style.overflow = 'hidden';
        }

        
        const togglePopup = (popupClass, imageId) => {
            // Hide popup
            document.querySelector(`${popupClass} span`).onclick = () => {
                document.querySelector(popupClass).style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        
            // Show popup
            document.querySelectorAll(imageId).forEach(image => {
                image.onclick = () => {
                    document.querySelector(popupClass).style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                };
            });
        };
        
        // Initialize popups
        togglePopup('.popup-package', '#p1');
        togglePopup('.popup-package2', '#p2');
        togglePopup('.popup-package3', '#p3');
        togglePopup('.popup-package4', '#p4');
        togglePopup('.popup-package5', '#p5');


    const closePopup = (popupClass) => {
        const popup = document.querySelector(popupClass);
        if (popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Attach event listeners for exit buttons
    for (let i = 0; i < 1000; i++) {
        const exitButton = document.querySelector(`.popup-exit${i > 0 ? i : ''}`);
        if (exitButton) {
            exitButton.onclick = () => closePopup(`.popup-package${i > 0 ? i : ''}`);
        }
    }


    
    const sliders = [
        { sliderClass: '.img-slider', uiId: '#ui1' },
        { sliderClass: '.img-slider2', uiId: '#ui2' },
        { sliderClass: '.img-slider3', uiId: '#ui3' },
        { sliderClass: '.img-slider4', uiId: '#ui4' }
    ];
    
    function toggleSlider(sliderClass, isOpen) {
        const slider = document.querySelector(sliderClass);
        slider.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
    
    sliders.forEach(({ sliderClass, uiId }) => {
        // Close slider
        const closeBtn = document.querySelector(`${sliderClass} span`);
        closeBtn.onclick = () => toggleSlider(sliderClass, false);
    
        // Open slider
        document.querySelectorAll(uiId).forEach(image => {
            image.onclick = () => toggleSlider(sliderClass, true);
        });
    });



});

});