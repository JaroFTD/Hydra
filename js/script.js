"use strict";

// МЕНЮ БУРГЕР
let menu = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
menu.addEventListener('click', function () {
   document.body.classList.toggle('_lock');
   menu.classList.toggle('_active');
   menuBody.classList.toggle('_active');
});

// СЛАЙДЕР 
const mainBlockSwiper = document.querySelector('.swiper-main-block');
if (mainBlockSwiper) {
   const swiper = new Swiper('.swiper-main-block', {
      // Optional parameters
      loop: true,
      simulateTouch: false,
      autoHeight: true,
      // Navigation arrows
      navigation: {
         nextEl: '.swiper-main-block__next',
         prevEl: '.swiper-main-block__prev',
      },
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         992: {
            slidesPerView: 3,
         }
      },
   });
}

const servicesSwiper = document.querySelector('.swiper-services');
if (servicesSwiper) {
   const swiper = new Swiper('.swiper-services', {
      // Optional parameters
      loop: true,
      simulateTouch: false,
      slidesPerView: 4,
      autoHeight: true,
      spaceBetween: 11,
      // Navigation arrows
      navigation: {
         nextEl: '.swiper-services__next',
         prevEl: '.swiper-services__prev',
      },  
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         600: {
            slidesPerView: 2,
         },
         992: {
            slidesPerView: 3,
         },
         1170: {
            slidesPerView: 4,
         },
      },
   });
}

const technologiesSwiper = document.querySelector('.swiper-technologies');
if (technologiesSwiper) {
   const swiper = new Swiper('.swiper-technologies', {
      // Optional parameters
      simulateTouch: false,
      spaceBetween: 11,
      // Navigation arrows
      navigation: {
         nextEl: '.swiper-technologies__next',
         prevEl: '.swiper-technologies__prev',
      },  
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         600: {
            slidesPerView: 2,
         },
         992: {
            slidesPerView: 3,
         },
         1170: {
            slidesPerView: 4,
         },
      },
   });
}

const howtoSwiper = document.querySelector('.swiper-howto');
if (howtoSwiper) {
   const swiper = new Swiper('.swiper-howto', {
      // Optional parameters
      loop: true,
      simulateTouch: false,
      spaceBetween: 20,
      autoHeight: true,
      // Navigation arrows
      navigation: {
         nextEl: '.swiper-howto__next',
         prevEl: '.swiper-howto__prev',
      },  
      breakpoints: {
         0: {
            slidesPerView: 1,
         },
         600: {
            slidesPerView: 2,
         },
         992: {
            slidesPerView: 3,
         },
         1170: {
            slidesPerView: 4,
         },
      },
   });
}

// ВАЛИДАЦИЯ ФОРМЫ
let forms = document.querySelectorAll('form');
if (forms.length > 0) { 
   intitForms(forms);
}
function intitForms(forms) {
   for (let i = 0; i < forms.length; i++){
      initForm(forms[i]);
   }

   function initForm(form) { 
      form.addEventListener('submit', formSend);
      
      let resultMessage = document.createElement('p');

      async function formSend(e) {
         e.preventDefault();

         let error = formValidate(form);

         // для отправки спомощью AJAX
         let formData = new FormData(form);

         if (error === 0) {
            // для отправки спомощью AJAX
            let response = await fetch('sendmail.php', {
               method: 'POST',
               body: formData
            });
            if (response.ok) {
               let result = await response.json();
               alert(result.message);
               formPreview.innerHTML = '';
               form.reset();
               resultMessage.style.color = 'green';
               resultMessage.textContent = 'Отправленно';
            }else{
               alert('Ошибка');
               resultMessage.style.color = 'red';
               resultMessage.textContent = 'Ошибка';
            }
         } else {
            resultMessage.style.color = 'red';
            resultMessage.textContent = 'Ошибка';
            form.appendChild(resultMessage);
         }
      }

      function formValidate(form) { 
         let error = 0;
         let formReq = form.querySelectorAll('._req');

         for (let i = 0; i < formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);
            // проверяем input на email
            if (input.classList.contains('_email')) {
               if (emailTest(input)) {
                  formAddError(input);
                  error++;
               }
            // проверяем input на checkbox
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
               formAddError(input);
               error++;
            } else {
               // проверяем input на пустые поля
               if (input.value === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }
      // Функция для добавления класса error
      function formAddError(input) { 
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }
      // Функция для удаления класса error
      function formRemoveError(input) { 
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      // Функия теста email
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
      
   }
}

// ЯКОРЬ (ПЛАВНАЯ ПРОКРУТКА ДО НУЖНОГО БЛОКА)
let menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
   for (let menuLink of menuLinks) {
      menuLink.addEventListener('click', onMenuLinkClick);
   }

   function onMenuLinkClick(e) {
      let menuLink = e.target;

      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         let gotoBlock = document.querySelector(menuLink.dataset.goto);
         let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight / 2;

         if (menu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            menu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      }
   }
}

// ПАРАЛАХ АНИМАЦИЯ МЫШЬЮ
const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
if (paralaxMouse.length) {
   paralaxMouseInit(paralaxMouse);
}
function paralaxMouseInit(paralaxMouse) {
   paralaxMouse.forEach(el => {
      const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

      // Коэф. X 
      const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
      // Коэф. У 
      const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
      // Напр. Х
      const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
      // Напр. У
      const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
      // Скорость анимации
      const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


      // Объявление переменных
      let positionX = 0, positionY = 0;
      let coordXprocent = 0, coordYprocent = 0;

      setMouseParallaxStyle();

      // Проверяю на наличие родителя, в котором будет считываться положение мыши
      if (paralaxMouseWrapper) {
         mouseMoveParalax(paralaxMouseWrapper);
      } else {
         mouseMoveParalax();
      }

      function setMouseParallaxStyle() {
         const distX = coordXprocent - positionX;
         const distY = coordYprocent - positionY;
         positionX = positionX + (distX * paramAnimation / 1000);
         positionY = positionY + (distY * paramAnimation / 1000);
         el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 5)}%,${directionY * positionY / (paramСoefficientY / 5)}%,0);`;
         requestAnimationFrame(setMouseParallaxStyle);
      }
      function mouseMoveParalax(wrapper = window) {
         wrapper.addEventListener("mousemove", function (e) {
            const offsetTop = el.getBoundingClientRect().top + window.scrollY;
            if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
               // Получение ширины и высоты блока
               const parallaxWidth = window.innerWidth;
               const parallaxHeight = window.innerHeight;
               // Ноль по середине
               const coordX = e.clientX - parallaxWidth / 2;
               const coordY = e.clientY - parallaxHeight / 2;
               // Получаем проценты
               coordXprocent = coordX / parallaxWidth * 100;
               coordYprocent = coordY / parallaxHeight * 100;
            }
         });
      }
   });
}


