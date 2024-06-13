import React from 'react'
import "./map.css"

export default function Map() {
  return (
    <div>
      {/*  */}
      {/*  */}
      {/*  */}
        <section class="map-head">
      <div class="contact">
           <h3 align="center">Наши контакты</h3>
            <p>Адрес: <b>ул.Лермонтова 93</b></p>
            <p>Номер телефона: <b>+7705457890</b></p>
            <p>E-mail: <b>gmail@gmail.com</b></p>
      </div>
            <div class="map-footer">
                <h3 align="center">Наше местоположение</h3>
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2440.398916151031!2d76.95639777659159!3d52.290613672001875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f9cad21e268405%3A0x49b5c755af203856!2z0YPQu9C40YbQsCDQm9C10YDQvNC-0L3RgtC-0LLQsCA5Mywg0J_QsNCy0LvQvtC00LDRgCAxNDAwMDA!5e0!3m2!1sru!2skz!4v1718186996419!5m2!1sru!2skz"
                // width="890"
                // height="380"
                className='map'
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
</iframe>

                </div>
        </section>
        {/*  */}
        {/*  */}
        {/*  */}
    </div>
  )
}
