// переменная - корень шапки сайта
let siteHeader = document.querySelector(".site-header");

// переменная необходима для изменения бэкграунда в хедере при изменении состоянии оного
let siteHeaderWrapper = document.querySelector(".site-header__wrapper");

// ищем кнопку - burger в хедере
let burger = document.querySelector(".site-header__burger");

// ищем навигационное меню со списком ссылок
let navMenu = document.querySelector(".header-navigation");

// переменная в которой будет храниться 2 состояния для ширины вьюпорта - "больше 960" и "меньше 960"
let counter;

// ----------------------------------------------------------------------

// вешаем слушателя событий на window, при загрузке оного сработает функция
window.addEventListener("load", defaultHideNavigation);

// функция скрывает навигационное меню при загрузке сайта (состояние по умолчанию)
// функция изменяет состояние (т.е. иконку) burger на "закрыто" при загрузке страницы (состояние по умолчанию)
function defaultHideNavigation() {
  // если элемент navMenu не имеет в своём класслисте класс visually-hidden и ширина вьюпорта меньше 960px, то заходим в условие и добавляем этот класс, иначе удаляем класс visually-hidden из navMenu
  if (navMenu.classList.contains("visually-hidden") === false && document.body.clientWidth < 960) {
    navMenu.classList.add("visually-hidden");
  } else {
    navMenu.classList.remove("visually-hidden");
  }

  // если элемент navMenu имеет в своем класслисте класс visually-hidden и burger не имеет в своём класслисте класс site-header__burger--open-menu, то заходим в условие и добавляем burgerу этот класс
  if (navMenu.classList.contains("visually-hidden") === true && burger.classList.contains("site-header__burger--open-menu") === false) {
    burger.classList.remove("site-header__burger--close-menu");
    burger.classList.add("site-header__burger--open-menu");
  }

  changeBackgroundHeader();
}

// ----------------------------------------------------------------------

// вешаем на window слушателя событий, который обращается к функции при изменении размера вьюпорта
window.addEventListener("resize", checkViewportSize);
// функция принудительно показывает нам navMenu при ширине вьюпорта от 960px, вне зависимости от того, скрыто ли меню на других разрешениях и сводит к значению по умолчанию бэкграунд у siteHeader и siteHeaderWrapper (в зависимости от ширины вьюпорта)
function checkViewportSize() {
  // если ширина вьюпорта от 960px включительно, и navMenu имеет класс "visually-hidden", то удаляем класс "visually-hidden" и присваиваем переменной counter значение "больше 960"
  if (document.body.clientWidth >= 960 && navMenu.classList.contains("visually-hidden") === true) {
    navMenu.classList.remove("visually-hidden");

    counter = "more 960";
  }

  // если переменная counter содержит "больше 960" и если ширина вьюпорта меньше 960, и navMenu не имеет класс "visually-hidden", то добавляем navMenu класс "visually-hidden" и присваиваем значение переменной "менее 960"
  if (counter === "more 960" && document.body.clientWidth < 960 && navMenu.classList.contains("visually-hidden") === false) {
    navMenu.classList.add("visually-hidden");

    counter = "less 960";
  }

  // если ширина вьюпорта меньше 660 (мобила) и навигационное меню закрыто и обертка в хедере не имеет класса site-header__wrapper--menu-closed, то добавляем его
  if (document.body.clientWidth < 660 && navMenu.classList.contains("visually-hidden") === true && siteHeaderWrapper.classList.contains("site-header__wrapper--menu-closed") === false) {
    siteHeaderWrapper.classList.add("site-header__wrapper--menu-closed");

    // и если у шапки есть класс site-header--menu-closed, то мы его удаляем
    if (siteHeader.classList.contains("site-header--menu-closed") === true) {
      siteHeader.classList.remove("site-header--menu-closed");
    }
  }

  // если ширина вьюпорта от 660, и навигационное меню скрыто, и у хедера нет класса site-header--menu-closed, то добавляем его
  if (document.body.clientWidth >= 660 && navMenu.classList.contains("visually-hidden") && siteHeader.classList.contains("site-header--menu-closed") === false) {
    siteHeader.classList.add("site-header--menu-closed");

    // и если в хедере у контента в боёртке есть класс site-header__wrapper--menu-closed, то удаляем его
    if (siteHeaderWrapper.classList.contains("site-header__wrapper--menu-closed") === true) {
      siteHeaderWrapper.classList.remove("site-header__wrapper--menu-closed");
    }
  }
}

// ----------------------------------------------------------------------

// вешаем обработчика событий на целевой объект который исполняет функцию при клике на burger
burger.addEventListener("click", function () {
  showOrHideNavMenu();
  changeBurgerStatus();
  changeBackgroundHeader();
})

// функция проверяет наличие класса visually-hidden у navMenu, и в зависимости от состояния - меняем класс на противоположный
function showOrHideNavMenu() {
  // если у навигационного меню есть класс ".visually-hidden", значит меню закрыто на данный момент. Удаляем этот класс и показываем меню по клику
  // если у навигационного меню нет класса ".visually-hidden", значит меню открыто на данный момент. Добавляем этот класс и скрываем меню
  if (navMenu.classList.contains("visually-hidden") === true) {
    navMenu.classList.remove("visually-hidden");
  } else {
    navMenu.classList.add("visually-hidden");
  }
}

// функция при вызове проверяет и меняет статус кнопки-burger на "крестик" или "burger"
function changeBurgerStatus() {
  // если меню закрыто (т.е. есть модификация "--close-menu"), то меняем модификацию на "--open-menu", которая меняет иконку на burger
  // если меню открыто, то меняем модификацию на "--close-menu", которая меняет иконку на крестик
  if (burger.classList.contains("site-header__burger--close-menu") === true) {
    burger.classList.remove("site-header__burger--close-menu");
    burger.classList.add("site-header__burger--open-menu");
  } else {
    burger.classList.remove("site-header__burger--open-menu");
    burger.classList.add("site-header__burger--close-menu");
  }
}


function changeBackgroundHeader() {
  // если ширина вьюпорта меньше 660 не включая (мобила)
  // если ширина вьюпорта от 660 включительно до 960 не включая (планшет)
  if (document.body.clientWidth < 660) {
    // если навигационное меню скрыто
    // если навигационное меню открыто
    if (navMenu.classList.contains("visually-hidden") === true) {
      // если обёртка контента хедера при этом не имеет класса site-header__wrapper--menu-closed, то добавляем его
      if (siteHeaderWrapper.classList.contains("site-header__wrapper--menu-closed") === false) {
        siteHeaderWrapper.classList.add("site-header__wrapper--menu-closed");
      }

      // если хедер имеет класс site-header--menu-open, то удаляем его
      if (siteHeader.classList.contains("site-header--menu-open") === true) {
        siteHeader.classList.remove("site-header--menu-open");
      }
    } else {
      // если хедер не имеет класса site-header--menu-open, то добавляем его
      if (siteHeader.classList.contains("site-header--menu-open") === false) {
        siteHeader.classList.add("site-header--menu-open");
      }

      // если обёртка контента хедера имеет класс site-header__wrapper--menu-closed, то удаляем его
      if (siteHeaderWrapper.classList.contains("site-header__wrapper--menu-closed") === true) {
        siteHeaderWrapper.classList.remove("site-header__wrapper--menu-closed");
      }
    }
  } else if (document.body.clientWidth >= 660 && document.body.clientWidth < 960) {
    // если навигационное меню скрыто
    // если навигационное меню открыто
    if (navMenu.classList.contains("visually-hidden") === true) {
      // если хедер не имеет класса site-header--menu-closed, то добавляем его
      if (siteHeader.classList.contains("site-header--menu-closed") === false) {
        siteHeader.classList.add("site-header--menu-closed");
      }

      // если обертка контента в хедере имеет класс site-header__wrapper--menu-closed, то удаляем его
      if (siteHeaderWrapper.classList.contains("site-header__wrapper--menu-closed") === true) {
        siteHeaderWrapper.classList.remove("site-header__wrapper--menu-closed");
      }

      // если хедер имеет класс site-header--menu-open, то удаляем его
      if (siteHeader.classList.contains("site-header--menu-open") === true) {
        siteHeader.classList.remove("site-header--menu-open");
      }
    } else {
      // если хедер не имеет класса site-header--menu-open, то добавляем его
      if (siteHeader.classList.contains("site-header--menu-open") === false) {
        siteHeader.classList.add("site-header--menu-open");
      }

      // если хедер имеет класс site-header--menu-closed, то удаляем его
      if (siteHeader.classList.contains("site-header--menu-closed") === true) {
        siteHeader.classList.remove("site-header--menu-closed");
      }
    }
  } else {
    // десктоп
  }
}
