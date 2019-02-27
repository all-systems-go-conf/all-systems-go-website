(function () {

  function particlesJSInit() {
    particlesJS("particles-js", {
      "fps_limit": 30,
      "particles": {
        "number": {
          "value": 100,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.9311942171260817,
          "random": false,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 2,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "top",
          "random": false,
          "straight": true,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 0,
            "rotateY": 0
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "bubble"
          },
          "onclick": {
            "enable": false,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  if ($("body").hasClass("main-page")) {
    particlesJSInit();

    const DESKTOP_SCREEN_WIDTH = 1024;

    // swiper speakers

    let mySwiper = null;

    function initSwiper() {
      let screenWidth = $(window).width();
      if (screenWidth < DESKTOP_SCREEN_WIDTH && mySwiper === null) {
        mySwiper = new Swiper(".speakers__swiper-container", {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30,
          observer: true,
          pagination: {
            el: ".swiper-pagination",
            type: "bullets"
          }
        });
      } else if (screenWidth >= DESKTOP_SCREEN_WIDTH && mySwiper !== null) {
        mySwiper.destroy();
        mySwiper = null;
        $(".swiper-wrapper").removeAttr("style");
        $(".swiper-slide").removeAttr("style");
      }
    }

    initSwiper();

    const menuLinkArray = document.querySelectorAll(".menu__link");

    menuLinkArray.forEach(link => {
      link.addEventListener("click", function (event) {
        const id = this.getAttribute("href").slice(1);

        const activeLink = document.querySelector(".menu__link--active");

        if (activeLink) {
          activeLink.classList.remove("menu__link--active");
        }

        this.classList.add("menu__link--active");

        if (id.length > 0) {
          event.preventDefault();
          const headerHeight = 140;
          const scrollingPosition =
            document.getElementById(id).offsetTop - headerHeight;

          $("body, html").animate({
              scrollTop: scrollingPosition
            },
            1000
          );

          if (window.innerWidth < DESKTOP_SCREEN_WIDTH) {
            $(".header").removeClass("header--open");
          }
        }
      });
    });
  }

  $(window).on("resize", function () {
    if ($("body").hasClass("main-page") && $('.speakers__swiper-container').length) {
      initSwiper();
    }
  });


  let controller = new ScrollMagic.Controller();

  if ($("body").hasClass("main-page")) {


    const sectionArray = document.querySelectorAll("#schedule, #sponsor, #conduct, #speakers");

    sectionArray.forEach(section => {
      new ScrollMagic.Scene({
          triggerElement: "#" + section.getAttribute("id"),
          triggerHook: 0.5,
          duration: section.offsetHeight
        })
        .setClassToggle(
          `a[href="#${section.getAttribute("id")}"]`,
          "menu__link--active"
        )
        .addTo(controller);
    });

    // form validation 
    document.querySelector(".email").addEventListener("input", function () {
      document.querySelector(".venue__form--button").disabled = !this.validity.valid;
    });
  }

  //header menu toggle

  const headerMenuButton = document.querySelector(".header__hamburger");
  const header = document.querySelector(".header");

  headerMenuButton.addEventListener("click", function () {
    header.classList.toggle("header--open");
  });

})();