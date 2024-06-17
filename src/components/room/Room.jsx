import React from 'react'
import './room.css'
import a from '../../img/a.png'
import hoh from '../../img/hoh.jpg'

const Room = () => {
	return (
		<div>
			<section className='room-page'>
				<iframe
					src='https://vk.com/video_ext.php?oid=-200042852&id=456240588&hd=2'
					width='853'
					height='480'
					allow='autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
					frameborder='0'
					allowfullscreen
				></iframe>
				<br />
				<iframe
					src='https://open.spotify.com/embed/album/51YBNK1OrXlCwY2TEISAxW?utm_source=generator&theme=0'
					width='59%'
					height='352'
					frameBorder='0'
					allowfullscreen
					allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
					loading='lazy'
				></iframe>
			</section>
		</div>
	)
}
export default Room
