// /**
//  * Define variables
//  */
const infoButton = document.querySelector('.header-nav-info');
const catalogButton = document.querySelector('.header-nav-catalog');
const dropdownBlock = document.querySelector('.dropdown-block');
const tableElement = document.querySelector('.scheme-table');
const popupElements = document.querySelectorAll('.pop-up-js-window');

// Define functions
/**
 * Open/close info element
 *
 * @param {object} target
 */
function openInfoElement(target) {
  dropdownBlock.classList.toggle('is-show');
  target.lastElementChild.classList.toggle('is-rotate');
}

/**
 * Open/close catalog element
 *
 * @param {object} target
 */
function openCatalogElement(target) {
  target.lastElementChild.classList.toggle('is-rotate');
}

/**
 * Open/close pop-up
 *
 * @param {object} target
 */
function showPopup(target) {
  // If we in photo-icon element
  if (target.classList.contains('photo-icon')) {
    const popupWindow = target.parentElement.nextElementSibling;
    popupWindow.classList.toggle('is-show');
    // If we in photo-icon__inner element
  } else if (target.classList.contains('photo-icon__inner')) {
    const popupWindow = target.parentElement.parentElement.nextElementSibling;
    popupWindow.classList.toggle('is-show');
  }
}

/**
 * Open/close pop-up analogs
 *
 * @param {object} target
 */
function showPopupAnalog(target) {
  // If we in photo-icon element
  if (target.classList.contains('scheme-table__dropdown-link')) {
    target.nextElementSibling.classList.toggle('is-rotate');
  }
}

// DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  /**
   * Other scripts
   *
   */
  // Close pop-up if clicked other areas
  $(document).mouseup(function(e) { // Document click event
    const $popupElement = $('.pop-up-js'); // Element's class
    if (!$popupElement.is(e.target) && // Not our block
      $popupElement.has(e.target).length === 0) { // Not sons
      for (const elem of popupElements) {
        elem.classList.remove('is-show');
      }
    }
  });

  // Call open info element event
  infoButton.addEventListener('click', (event) => {
    openInfoElement(event.currentTarget);
  });

  // Call open catalog element event
  catalogButton.addEventListener('click', (event) => {
    openCatalogElement(event.currentTarget);
  });

  /**
   * Dilocation and call events in table
   */
  if (tableElement) {
    tableElement.addEventListener('click', (event) => {
      const target = event.target;

      TODO: // Refactoring with switch/case conditions; do/while
      showPopup(target);
      showPopupAnalog(target);

      if (target.classList.contains('scheme-table__dropdown-link')) {
        let analogTarget = target.parentElement.parentElement.parentElement;

        while (analogTarget) {
          analogTarget = analogTarget.nextElementSibling;
          console.log(analogTarget);
        }
      }
    });
  }

  /**
   * EasyZoom plugin init
   *
   */

  // Instantiate EasyZoom instances
  const $easyzoom = $('.easyzoom').easyZoom();

  // Setup thumbnails example
  const api = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');

  $('.product-block-img__thumbnails').on('click', 'a', function(e) {
    const $this = $(this);

    e.preventDefault();
    // Add forced checkbox event
    $this.parent().children('.product-block-img__input').prop('checked', true);

    // Use EasyZoom's `swap` method
    api.swap($this.data('standard'), $this.attr('href'));
  });

  /* eslint-disable */
  /**
   * Slider
   * 
   */
  'use strict';
  var slideShow = (function () {
    return function (selector, config) {
      var
        _slider = document.querySelector(selector), // основный элемент блока
        _sliderContainer = _slider.querySelector('.slider__items'), // контейнер для .slider-item
        _sliderItems = _slider.querySelectorAll('.slider__item'), // коллекция .slider-item
        _sliderControls = _slider.querySelectorAll('.slider__control'), // элементы управления
        _currentPosition = 0, // позиция левого активного элемента
        _transformValue = 0, // значение транфсофрмации .slider_wrapper
        _transformStep = 100, // величина шага (для трансформации)
        _itemsArray = [], // массив элементов
        _timerId,
        _indicatorItems,
        _indicatorIndex = 0,
        _indicatorIndexMax = _sliderItems.length - 1,
        _stepTouch = 50,
        _config = {
          isAutoplay: false, // автоматическая смена слайдов
          directionAutoplay: 'next', // направление смены слайдов
          delayAutoplay: 5000, // интервал между автоматической сменой слайдов
          isPauseOnHover: true // устанавливать ли паузу при поднесении курсора к слайдеру
        };

      // настройка конфигурации слайдера в зависимости от полученных ключей
      for (var key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      // наполнение массива _itemsArray
      for (var i = 0, length = _sliderItems.length; i < length; i++) {
        _itemsArray.push({
          item: _sliderItems[i],
          position: i,
          transform: 0
        });
      }

      // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
      var position = {
        getItemIndex: function (mode) {
          var index = 0;
          for (var i = 0, length = _itemsArray.length; i < length; i++) {
            if ((_itemsArray[i].position < _itemsArray[index].position && mode === 'min') || (_itemsArray[i].position > _itemsArray[index].position && mode === 'max')) {
              index = i;
            }
          }
          return index;
        },
        getItemPosition: function (mode) {
          return _itemsArray[position.getItemIndex(mode)].position;
        }
      };

      // функция, выполняющая смену слайда в указанном направлении
      var _move = function (direction) {
        var nextItem, currentIndicator = _indicatorIndex;;
        if (direction === 'next') {
          _currentPosition++;
          if (_currentPosition > position.getItemPosition('max')) {
            nextItem = position.getItemIndex('min');
            _itemsArray[nextItem].position = position.getItemPosition('max') + 1;
            _itemsArray[nextItem].transform += _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue -= _transformStep;
          _indicatorIndex = _indicatorIndex + 1;
          if (_indicatorIndex > _indicatorIndexMax) {
            _indicatorIndex = 0;
          }
        } else {
          _currentPosition--;
          if (_currentPosition < position.getItemPosition('min')) {
            nextItem = position.getItemIndex('max');
            _itemsArray[nextItem].position = position.getItemPosition('min') - 1;
            _itemsArray[nextItem].transform -= _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue += _transformStep;
          _indicatorIndex = _indicatorIndex - 1;
          if (_indicatorIndex < 0) {
            _indicatorIndex = _indicatorIndexMax;
          }
        }
        _sliderContainer.style.transform = 'translateX(' + _transformValue + '%)';
        _indicatorItems[currentIndicator].classList.remove('active');
        _indicatorItems[_indicatorIndex].classList.add('active');
      };

      // функция, осуществляющая переход к слайду по его порядковому номеру
      var _moveTo = function (index) {
        var i = 0,
          direction = (index > _indicatorIndex) ? 'next' : 'prev';
        while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
          _move(direction);
          i++;
        }
      };

      // функция для запуска автоматической смены слайдов через промежутки времени
      var _startAutoplay = function () {
        if (!_config.isAutoplay) {
          return;
        }
        _stopAutoplay();
        _timerId = setInterval(function () {
          _move(_config.directionAutoplay);
        }, _config.delayAutoplay);
      };

      // функция, отключающая автоматическую смену слайдов
      var _stopAutoplay = function () {
        clearInterval(_timerId);
      };

      // функция, добавляющая индикаторы к слайдеру
      var _addIndicators = function () {
        var indicatorsContainer = document.createElement('ol');
        indicatorsContainer.classList.add('slider__indicators');
        for (var i = 0, length = _sliderItems.length; i < length; i++) {
          var sliderIndicatorsItem = document.createElement('li');
          if (i === 0) {
            sliderIndicatorsItem.classList.add('active');
          }
          sliderIndicatorsItem.setAttribute("data-slide-to", i);
          indicatorsContainer.appendChild(sliderIndicatorsItem);
        }
        // Индикаторы
        // _slider.appendChild(indicatorsContainer);
        // _indicatorItems = _slider.querySelectorAll('.slider__indicators > li')
      };

      var _isTouchDevice = function () {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
      };

      // функция, осуществляющая установку обработчиков для событий 
      var _setUpListeners = function () {
        var _startX = 0;
        if (_isTouchDevice()) {
          _slider.addEventListener('touchstart', function (e) {
            _startX = e.changedTouches[0].clientX;
            _startAutoplay();
          });
          _slider.addEventListener('touchend', function (e) {
            var
              _endX = e.changedTouches[0].clientX,
              _deltaX = _endX - _startX;
            if (_deltaX > _stepTouch) {
              _move('prev');
            } else if (_deltaX < -_stepTouch) {
              _move('next');
            }
            _startAutoplay();
          });
        } else {
          for (var i = 0, length = _sliderControls.length; i < length; i++) {
            _sliderControls[i].classList.add('slider__control_show');
          }
        }
        _slider.addEventListener('click', function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            _move(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
            _startAutoplay();
          } else if (e.target.getAttribute('data-slide-to')) {
            e.preventDefault();
            _moveTo(parseInt(e.target.getAttribute('data-slide-to')));
            _startAutoplay();
          }
        });
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === "hidden") {
            _stopAutoplay();
          } else {
            _startAutoplay();
          }
        }, false);
        if (_config.isPauseOnHover && _config.isAutoplay) {
          _slider.addEventListener('mouseenter', function () {
            _stopAutoplay();
          });
          _slider.addEventListener('mouseleave', function () {
            _startAutoplay();
          });
        }
      };

      // добавляем индикаторы к слайдеру
      _addIndicators();
      // установливаем обработчики для событий
      _setUpListeners();
      // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
      _startAutoplay();

      return {
        // метод слайдера для перехода к следующему слайду
        next: function () {
          _move('next');
        },
        // метод слайдера для перехода к предыдущему слайду          
        left: function () {
          _move('prev');
        },
        // метод отключающий автоматическую смену слайдов
        stop: function () {
          _config.isAutoplay = false;
          _stopAutoplay();
        },
        // метод запускающий автоматическую смену слайдов
        cycle: function () {
          _config.isAutoplay = true;
          _startAutoplay();
        }
      }
    }
  }());

  if (document.querySelector('.slider')) {
    slideShow('.slider', {
      isAutoplay: false
    });
  }

  /**
   * Fancybox options
   * 
   */
  $('[data-fancybox="gallery"]').fancybox({
    buttons: [
      "zoom",
      "share",
      "fullScreen",
      "download",
      "thumbs",
      "close"
    ],
  });
});