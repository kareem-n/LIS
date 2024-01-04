const loader = document.querySelector(".loader");

window.addEventListener("load", function () {
  loader.classList.add("hidden");

  const list = document.querySelector("nav ul").cloneNode(true);

  const navLinks = Array.from(document.querySelectorAll("nav a"));

  const nav = document.querySelector("nav");
  const navListToggleBtn = document.querySelector("nav .list");
  const about = document.querySelector("#about");
  const products = document.querySelector("#products");
  const contact = document.querySelector("#contact");
  const our_customers = document.querySelector("#our_customers");

  const out_customers = document.querySelector(".spec");


  out_customers.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo(0, our_customers.offsetTop + 500);
  });

  navListToggleBtn.addEventListener("click", () => {
    if (navListToggleBtn.children[0].classList.contains("fa-bars")) {
      navListToggleBtn.children[0].classList.replace("fa-bars", "fa-close");
    } else {
      navListToggleBtn.children[0].classList.replace("fa-close", "fa-bars");
    }

    list.classList.remove("hidden");

    Array.from(list.children).forEach((link) => {
      link.classList.add("border-b", "border-white");
    });

    document.querySelector("nav .toggledList").children[0].appendChild(list);

    document.querySelector("nav .toggledList").classList.toggle("hidden");

    let x = document.querySelector(".toggledList");

    x.firstElementChild.firstElementChild.addEventListener(
      "click",
      function () {
        document.querySelector("nav .toggledList").classList.add("hidden");
        navListToggleBtn.children[0].classList.replace("fa-close", "fa-bars");
      }
    );
  });

  const navHandleScroll = () => {
    if (window.scrollY > 100) {
      nav.classList.add("bg-black", "bg-opacity-80");
    } else {
      nav.classList.remove("bg-black", "bg-opacity-80");
    }
  };

  const navLinksMap = (activeLink) => {
    navLinks.map((link) => {
      if (link.innerText == activeLink) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  const handleNavLinksColor = () => {
    if (getSectionTop(about) > 100) {
      navLinksMap("Home");
    } else if (
      getSectionTop(about) < 100 &&
      getSectionTop(our_customers) > 300
    ) {
      navLinksMap("About US");
    } else if (
      getSectionTop(our_customers) < 500 &&
      getSectionTop(products) > 500
    ) {
      navLinksMap("Our Customers");
    } else if (getSectionTop(products) < 100 && getSectionTop(contact) > 100) {
      navLinksMap("Products");
    } else if (getSectionTop(contact) < 100) {
      navLinksMap("Contact US");
    }
  };

  const getSectionTop = (section) => {
    return section.getBoundingClientRect().top;
  };

  const aboutSectionAnimateHandle = () => {
    const aboutRightImg = document.querySelector("#about .aboutRightImg");
    const aboutLeftContent = document.querySelector("#about .aboutLeftContent");

    if (getSectionTop(about) <= 200) {
      aboutRightImg.classList.remove("opacity-0");
      aboutLeftContent.classList.remove("opacity-0");
      aboutRightImg.classList.remove("-translate-x-20");
      aboutLeftContent.classList.remove("translate-x-20");
    } else {
      aboutRightImg.classList.add("opacity-0");
      aboutLeftContent.classList.add("opacity-0");

      aboutRightImg.classList.add("-translate-x-20");
      aboutLeftContent.classList.add("translate-x-20");
    }
  };

  const productsSectionAnimateHandle = () => {
    const productSectionTitle = document.querySelector(
      "#products .productTitle"
    );
    const productsPagination = document.querySelector("#sql");

    if (getSectionTop(products) <= 200) {
      productSectionTitle.classList.remove("opacity-0", "scale-0");
      productsPagination.parentElement.classList.remove(
        "opacity-0",
        "translate-y-20"
      );
    } else {
      productSectionTitle.classList.add("opacity-0", "scale-0");
      productsPagination.parentElement.classList.add(
        "opacity-0",
        "translate-y-20"
      );
    }
  };

  const touchSectionHandle = () => {
    aboutSectionAnimateHandle();
    productsSectionAnimateHandle();
  };

  navHandleScroll();
  handleNavLinksColor();
  touchSectionHandle();

  // nav links color section

  window.addEventListener("scroll", function () {
    // navbar bg color change on scroll
    navHandleScroll();

    handleNavLinksColor();

    // nav links color section
    touchSectionHandle();
  });

  const productsPagination = Array.from($("#sql .splide__slide"));

  const itProducts = document.querySelector("#it");
  const secProducts = document.querySelector("#sec");
  const software = document.querySelector("#software");

  productsPagination.map((product) => {
    $(product).click(function (e) {
      productsPagination.map((pro) => {
        pro.classList.remove("theme-bg-color");
        pro.classList.add("theme-color");
      });
      e.target.classList.remove("theme-color");
      e.target.classList.add("theme-bg-color", "text-white");

      switch ($(e.target).attr("data-product")) {
        case "it":
          secProducts.classList.add("hidden");
          software.classList.add("hidden");
          itProducts.classList.remove("hidden");
          break;
        case "sec":
          itProducts.classList.add("hidden");
          software.classList.add("hidden");
          secProducts.classList.remove("hidden");

          var splide2 = new Splide("#sec", {
            fixedWidth: 400,
            perPage: 4,
            pagination: false,
            focus: 0,
            omitEnd: true,
            gap: 20,
            breakpoints: {
              500: {
                fixedWidth: 250,
              },
            },
          });

          splide2.mount();

          break;
        case "software":
          itProducts.classList.add("hidden");
          secProducts.classList.add("hidden");
          software.classList.remove("hidden");

          var splide3 = new Splide("#software", {
            fixedWidth: 400,
            perPage: 4,
            pagination: false,
            focus: 0,
            omitEnd: true,
            gap: 20,
            breakpoints: {
              500: {
                fixedWidth: 250,
              },
            },
          });

          splide3.mount();

          break;

        default:
          break;
      }
    });
  });

  const customers = document.querySelector("#customers");

  new Splide(customers, {
    fixedWidth: "300px",
    // fixedHeight: "300px",
    type: "loop",
    pagination: false,
    drag: "free",
    arrows: false,
    interval: 1000,

    autoplay: true,
    breakpoints: {
      500: {
        fixedWidth: "250px",
      },
    },
  }).mount(window.splide.Extensions);
});
