import React, { useRef } from 'react'
import './about.css'
import Slider from 'react-slick' // Импортируем компонент Slider из react-slick
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import a from '../../img/a.png'
import hoh from '../../img/hoh.jpg'
import sea from '../../img/sea.jpg'
import purple from '../../img/purple.jpg'
import guts from '../../img/guts.jpg'

const sliderImages = ['path_to_image1.jpg']

const slogans = [
	'Ваши покупки — наша забота',
	'Шопинг без границ',
	'Лучшие товары в одном клике',
	'Покупайте легко, живите лучше',
	'Онлайн-шопинг, созданный для вас',
	'Качество и комфорт в каждой покупке',
	'Ваш персональный интернет-бутик',
	'Экономьте время, наслаждайтесь жизнью',
	'Всё, что нужно, в одном месте',
	'Лучшая цена — без компромиссов',
]

const getRandomSlogan = () =>
	slogans[Math.floor(Math.random() * slogans.length)]

const About = () => {
	const sliderRef = useRef(null)
	const randomSlogan = getRandomSlogan()

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	}

	return (
		<div className='about-page'>
			<header className='about-header'>
				<img src={a} alt='Logo' className='about-logo' />
				<h1>О нас</h1>
			</header>
			<section className='about-content'>
				<p>{randomSlogan}</p>
			</section>
			<section className='about-slider'>
				<h2>Наши новинки</h2>
				<Slider ref={sliderRef} {...settings}>
					{sliderImages.map((image, index) => (
						<div key={index}>
							<img src={guts} alt={`Новинка ${index + 1}`} />
						</div>
					))}
					{sliderImages.map((image, index) => (
						<div key={index}>
							<img src={purple} alt={`Новинка ${index + 1}`} />
						</div>
					))}
					{sliderImages.map((image, index) => (
						<div key={index}>
							<img src={sea} alt={`Новинка ${index + 1}`} />
						</div>
					))}
				</Slider>
				<div className='slider-buttons'>
					<button
						onClick={() => sliderRef.current.slickPrev()}
						className='button prev-button'
					>
						<div className='button-left'>
							<span className='button-elem'>
								<svg viewBox='0 0 46 40' xmlns='http://www.w3.org/2000/svg'>
									<path d='M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z'></path>
								</svg>
							</span>
						</div>
					</button>
					<button
						onClick={() => sliderRef.current.slickNext()}
						className='button next-button'
					>
						<div className='button-right'>
							<span className='button-mool'>
								<svg viewBox='0 0 46 40' xmlns='http://www.w3.org/2000/svg'>
									<path d='M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z'></path>
								</svg>
							</span>
						</div>
					</button>
				</div>
			</section>
		</div>
	)
}

export default About
