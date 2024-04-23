function abt() {
    document.getElementById("intro-text").style.display="block";
    document.getElementById("intro-desc").style.display="none";
}

function skls() {
    document.getElementById("intro-text").style.display="none";
    document.getElementById("intro-desc").style.display="block";
}


const initSlider = () => {
    const imageList = document.querySelector ("#top-row, .slider-wrapper, .image-list")
    const slideButtons = document.querySelectorAll (".material-symbols-outlined")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    
    slideButtons.forEach (button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev" ? -.8 : .8;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    
        });

    });

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition ();
    })

}

window.addEventListener("load", initSlider);

document.querySelector('#close-btn').onclick = () => {
    document.querySelector('.popup-img').style.display = 'none'; 
}

document.querySelectorAll('#trm1').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});


document.querySelector('#close-btn2').onclick = () => {
    document.querySelector('.popup-img2').style.display = 'none'; 
}

document.querySelectorAll('#trm2').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img2').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});


document.querySelector('#close-btn3').onclick = () => {
    document.querySelector('.popup-img3').style.display = 'none'; 
}

document.querySelectorAll('#trm3').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img3').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

document.querySelector('#close-btn4').onclick = () => {
    document.querySelector('.popup-img4').style.display = 'none'; 
}

document.querySelectorAll('#trm4').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img4').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

document.querySelector('#close-btn5').onclick = () => {
    document.querySelector('.popup-img5').style.display = 'none'; 
}

document.querySelectorAll('#trm5').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img5').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

document.querySelector('#close-btn6').onclick = () => {
    document.querySelector('.popup-img6').style.display = 'none'; 
}

document.querySelectorAll('#trm6').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img6').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

document.querySelector('#close-btn7').onclick = () => {
    document.querySelector('.popup-img7').style.display = 'none'; 
}

document.querySelectorAll('#trm7').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img7').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

document.querySelector('#close-btn8').onclick = () => {
    document.querySelector('.popup-img8').style.display = 'none'; 
}

document.querySelectorAll('#trm8').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img8').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

document.querySelector('#close-btn9').onclick = () => {
    document.querySelector('.popup-img9').style.display = 'none'; 
}

document.querySelectorAll('#trm9').forEach(image => {
    image.onclick = () =>
    document.querySelector('.popup-img9').style.display = 'block';
    document.querySelector('.image-list').src = image.getAttribute ('src');
});

const hamMenu = document.querySelector(".burger");

const offScreenMenu = document.querySelector(".portrait-nav-pop");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

