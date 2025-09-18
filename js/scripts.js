document.addEventListener("DOMContentLoaded", function() {

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//tooltip
	tippy('[data-title]', {
			content(reference) {
			const dataTitle = reference.getAttribute('data-title');
			return dataTitle
		},
		allowHTML: true
	});


	//breadcrumbs header position
	const breadcrumbsBox = document.querySelector('.breadcrumbs-box');
	const mainTopBox = document.querySelector('.main-top-box');
	const header = document.querySelector('.header');
	if (breadcrumbsBox && mainTopBox && header) {
		if (mainTopBox.nextElementSibling === breadcrumbsBox) {
			const headerHeight = header.getBoundingClientRect().height;
			breadcrumbsBox.style.top = `${headerHeight}px`;
		}
	}


	//datepicker
	flatpickr(".frm-field-input.js-datepicker input", {
		firstDayOfWeek: 0,
		minDate: "today",
		dateFormat: "Y-m-d",
		locale: "ru",
		disable: [
			function(date) {
				// disable every multiple of 8
				//return !(date.getDate() % 8);
			}
		]
	});
	flatpickr(".frm-field-input.js-datepicker-period input", {
		firstDayOfWeek: 0,
		mode: "range",
		minDate: "today",
		dateFormat: "Y-m-d",
		locale: "ru",
		disable: [
			function(date) {
				// disable every multiple of 8
				//return !(date.getDate() % 8);
			}
		]
	});


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});

	//mobile menu
	const menuButton = document.querySelectorAll('.popup-menu-wrap li a:has(+.menu)');
	for (i = 0;i < menuButton.length;i++) {
		menuButton[i].addEventListener('click', function(e) {
			if (innerWidth < 1024) {
				this.parentElement.classList.toggle('open')
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		//document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			//popupsList[i].classList.remove("active");
		}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
		element.addEventListener("click", function (event) {
			const currentPopup = this.closest('.popup-outer-box');
			currentPopup.classList.remove('active');
			const activePopups = document.querySelectorAll('.popup-outer-box.active');
			if (activePopups.length === 0) {
				document.body.classList.remove("popup-open");
				document.body.classList.remove("popup-open-scroll");
			}
			
			event.preventDefault();
			event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (popup) {
		popup.addEventListener("click", function (event) {
			if (!event.target.closest(".popup-box")) {
				this.classList.remove('active');
				const hasActivePopup = document.querySelector('.popup-outer-box.active') !== null;
				if (!hasActivePopup) {
					document.body.classList.remove("popup-open");
				}
				
				return false;
			}
		});
	});


	//slider get
	const slidersget = document.querySelectorAll(".slider-get");
	
	slidersget.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-get-pagination");
		const nextEl = container.querySelector(".button-slider-get-next");
		const prevEl = container.querySelector(".button-slider-get-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider reviews
	const slidersreviews = document.querySelectorAll(".slider-reviews");
	
	slidersreviews.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-reviews-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerView: 'auto',
			slidesPerGroup: 2,
			centeredSlides: true,
			initialSlide: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			freeMode: true,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: false,
			breakpoints: {
				1024: { initialSlide: 5, },
			},
		});
	});

	//slider gallery
	const slidersgallery = document.querySelectorAll(".slider-gallery");
	
	slidersgallery.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-gallery-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerView: 'auto',
			slidesPerGroup: 2,
			initialSlide: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			freeMode: true,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: false,
			breakpoints: {
				1024: { initialSlide: 5, },
			},
		});
	});


	//slider main
	const slidersmain = document.querySelectorAll(".slider-main");
	
	slidersmain.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-main-pagination");
		const nextEl = container.querySelector(".button-slider-main-next");
		const prevEl = container.querySelector(".button-slider-main-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider card
	const sliderscard = document.querySelectorAll(".slider-card");
	
	sliderscard.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-card-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: false,
		});
	});


	if (window.innerWidth < 1024) {

		//slider
		const sliderstiles = document.querySelectorAll(".slider-tiles");
		sliderstiles.forEach((container) => {
			const swiperEl = container.querySelector(".swiper");
			const paginationEl = container.querySelector(".slider-tiles-pagination");
		
			if (!swiperEl) return;
		
			new Swiper(swiperEl, {
				loop: false,
				slidesPerGroup: 1,
				slidesPerView: 'auto',
				spaceBetween: 0,
				autoHeight: false,
				freeMode: true,
				speed: 400,
				pagination: {
					el: paginationEl,
					clickable: true,
				},
				autoplay: false,
				navigation: false,
			});
		});
	}


	//slider tiles photo
	const sliderstilesphoto = document.querySelectorAll(".tile-slider-tilesphoto");
	
	sliderstilesphoto.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".tile-slider-tilesphoto-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: false,
		});
	});


	//slider tiles items
	const sliderstilesitems = document.querySelectorAll(".slider-tilesitems");
	
	sliderstilesitems.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tilesitems-pagination");
		const nextEl = container.querySelector(".button-slider-tilesitems-next");
		const prevEl = container.querySelector(".button-slider-tilesitems-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 2,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			initialSlide: 1,
			freeMode: true,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: false,
			breakpoints: {
				1024: { initialSlide: 5, },
			},
		});
	});
	


})
