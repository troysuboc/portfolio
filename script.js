const initSlider = () => {
    const imageList = document.querySelector ("#top-row, .slider-wrapper, .image-list")
    const slideButtons = document.querySelectorAll (".material-symbols-outlined")
    const sliderScrollbar = document.querySelector (".slider-scrollbar")
    const scrollbarThumb = sliderScrollbar.querySelector (".scrollbar-thumb")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max (0, Math.min (maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);


        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    });
    
    
    slideButtons.forEach (button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev" ? -.6 : .6;
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

    //slider images//

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

    //grid images//

    document.querySelector('#close-btn-v1').onclick = () => {
        document.querySelector('.popup-img-v1').style.display = 'none'; 
    }

    document.querySelectorAll('#grm1').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-v1').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-v2').onclick = () => {
        document.querySelector('.popup-img-v2').style.display = 'none'; 
    }

    document.querySelectorAll('#grm2').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-v2').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-v3').onclick = () => {
        document.querySelector('.popup-img-v3').style.display = 'none'; 
    }

    document.querySelectorAll('#grm3').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-v3').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-v4').onclick = () => {
        document.querySelector('.popup-img-v4').style.display = 'none'; 
    }

    document.querySelectorAll('#grm4').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-v4').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-v5').onclick = () => {
        document.querySelector('.popup-img-v5').style.display = 'none'; 
    }

    document.querySelectorAll('#grm5').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-v5').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-v6').onclick = () => {
        document.querySelector('.popup-img-v6').style.display = 'none'; 
    }

    document.querySelectorAll('#grm6').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-v6').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    //mockup images//

    document.querySelector('#close-btn-s1').onclick = () => {
        document.querySelector('.popup-img-s1').style.display = 'none'; 
    }

    document.querySelectorAll('#srm1').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-s1').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-s2').onclick = () => {
        document.querySelector('.popup-img-s2').style.display = 'none'; 
    }

    document.querySelectorAll('#srm2').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-s2').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });

    document.querySelector('#close-btn-s3').onclick = () => {
        document.querySelector('.popup-img-s3').style.display = 'none'; 
    }

    document.querySelectorAll('#srm3').forEach(image => {
        image.onclick = () =>
        document.querySelector('.popup-img-s3').style.display = 'block';
        document.querySelector('.image-list').src = image.getAttribute ('src');
    });










    



}


window.addEventListener("load", initSlider);










