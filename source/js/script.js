// показываем и скрываем навигационное меню / меняем картинку бургера / меняем фон

// ищем целевой объект на который будем вешать обработчика событий
let headerMenuBtn = document.querySelector(".site-header__burger");

// вешаем обработчика событий на целевой объект который исполняет функцию при клике
headerMenuBtn.addEventListener("click", function() {
  // находим навигационное меню
  // если у навигационного меню есть класс ".visually-hidden", значит меню закрыто на данный момент. Удаляем этот класс и показываем элемент
  // если у навигационного меню нет класса ".visually-hidden", значит меню открыто на данный момент. Добавляем этот класс и показываем элемент
  let navMenu = document.querySelector(".header-navigation");
  if (navMenu.classList.contains("visually-hidden") === true) {
    navMenu.classList.toggle("visually-hidden");
  } else {
    navMenu.classList.toggle("visually-hidden");
  }

  // если меню закрыто (есть модификация "--close-menu"), то меняем модификацию на "--open-menu", которая меняет иконку на бургер
  // если меню открыто, то меняем модификацию на "--close-menu", которая меняет иконку на крестик
  if (headerMenuBtn.classList.contains("site-header__burger--close-menu") === true) {
    headerMenuBtn.classList.remove("site-header__burger--close-menu");
    headerMenuBtn.classList.add("site-header__burger--open-menu");
  } else {
    headerMenuBtn.classList.remove("site-header__burger--open-menu");
    headerMenuBtn.classList.add("site-header__burger--close-menu");
  }

  // находим целевой объект у которого будем менять фон при клике на бургер
  // если у целевого объекта нет модификатора "--menu-closed", то добавляем его (он меняет цвет хедера)
  // если у целевого объекта есть модификатор "--menu-closed", то удаляем его (возвращаем цвет к значениям по умолчанию)
  let navMenuBackground = document.querySelector(".site-header");
  if (navMenuBackground.classList.contains("site-header--menu-closed") === false) {
    navMenuBackground.classList.add("site-header--menu-closed");
  } else {
    navMenuBackground.classList.remove("site-header--menu-closed");
  }
})


// событие на window, будет доработано
/*
window.addEventListener("resize", checkViewportSize);

function checkViewportSize() {
  let navMenu = document.querySelector(".header-navigation");

  if (document.body.clientWidth >= 960 && navMenu.classList.contains("visually-hidden") === true) {
    navMenu.classList.remove("visually-hidden");
  }
}
*/
