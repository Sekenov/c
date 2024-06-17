import React, { useEffect, useState, useCallback } from 'react'
import './Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Order() {
	const [userOrders, setUserOrders] = useState([])
	const [otherOrders, setOtherOrders] = useState([])
	const [role, setRole] = useState(null)
	const [username, setUsername] = useState(null)
	const [rejectReason, setRejectReason] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		const savedOrders = JSON.parse(localStorage.getItem('orders')) || []
		const storedUsername = localStorage.getItem('username')
		const storedRejectReasons =
			JSON.parse(localStorage.getItem('rejectReasons')) || {}

		setUsername(storedUsername)
		setRole(localStorage.getItem('role'))
		setRejectReason(storedRejectReasons)

		const userOrders = savedOrders.filter(
			order => order.username === storedUsername
		)
		const otherOrders = savedOrders.filter(
			order => order.username !== storedUsername
		)

		setUserOrders(userOrders.sort((a, b) => b.id - a.id))
		setOtherOrders(otherOrders.sort((a, b) => b.id - a.id))
	}, [])

	const updateOrders = useCallback((updatedUserOrders, updatedOtherOrders) => {
		const updatedOrders = [...updatedUserOrders, ...updatedOtherOrders]
		setUserOrders(updatedUserOrders)
		setOtherOrders(updatedOtherOrders)
		localStorage.setItem('orders', JSON.stringify(updatedOrders))
	}, [])

	const handleDeleteOrder = useCallback(
		orderId => {
			const updatedUserOrders = userOrders.filter(order => order.id !== orderId)
			const updatedOtherOrders = otherOrders.filter(
				order => order.id !== orderId
			)
			updateOrders(updatedUserOrders, updatedOtherOrders)

			const updatedRejectReasons = { ...rejectReason }
			delete updatedRejectReasons[orderId]
			setRejectReason(updatedRejectReasons)
			localStorage.setItem(
				'rejectReasons',
				JSON.stringify(updatedRejectReasons)
			)
		},
		[userOrders, otherOrders, updateOrders, rejectReason]
	)

	const handleConfirmOrder = useCallback(
		orderId => {
			const updateOrderStatus = order =>
				order.id === orderId ? { ...order, status: 'Подтверждено' } : order

			const updatedUserOrders = userOrders.map(updateOrderStatus)
			const updatedOtherOrders = otherOrders.map(updateOrderStatus)
			updateOrders(updatedUserOrders, updatedOtherOrders)
		},
		[userOrders, otherOrders, updateOrders]
	)

	const handleCancelOrder = useCallback(
		(orderId, reason) => {
			const updateOrderStatus = order =>
				order.id === orderId ? { ...order, status: 'Отклонено' } : order

			const updatedUserOrders = userOrders.map(updateOrderStatus)
			const updatedOtherOrders = otherOrders.map(updateOrderStatus)

			const updatedRejectReasons = { ...rejectReason, [orderId]: reason }
			setRejectReason(updatedRejectReasons)
			localStorage.setItem(
				'rejectReasons',
				JSON.stringify(updatedRejectReasons)
			)

			updateOrders(updatedUserOrders, updatedOtherOrders)
		},
		[userOrders, otherOrders, updateOrders, rejectReason]
	)

	const renderOrder = order => (
		<div key={order.id} className='order'>
			<h3>Заказ {order.id}</h3>
			<p>
				ФИО заказчика:{' '}
				{`${order.firstName} ${order.lastName} ${order.patronymic}`}
			</p>
			<p>
				Время заказа:{' '}
				{order.created_at ? new Date(order.created_at).toLocaleString() : ''}
			</p>
			<p>Статус: {order.status}</p>
			<p>
				Количество товаров:{' '}
				{order.items.reduce((acc, item) => acc + item.quantity, 0)}
			</p>
			{role === 'admin' &&
				order.status === 'Отклонено' &&
				rejectReason[order.id] && (
					<b className='reject-reason'>
						Причина отклонения: {rejectReason[order.id]}
					</b>
				)}
			<p>Общая стоимость: {order.total}$</p>
			{role === 'admin' && (
				<div className='buttonorder'>
					<button
						className='confirm-button'
						onClick={() => handleConfirmOrder(order.id)}
					>
						Подтвердить заказ
					</button>
					<button
						className='cancel-button'
						onClick={() => {
							const reason = prompt('Введите причину отклонения заказа:')
							if (reason) handleCancelOrder(order.id, reason)
						}}
					>
						Отклонить заказ
					</button>
					<button
						className='delete-button'
						onClick={() => handleDeleteOrder(order.id)}
					>
						Удалить заказ
					</button>
				</div>
			)}
		</div>
	)

	return (
		<div className='order-container'>
			<div className='back-button'>
				<FontAwesomeIcon
					icon={faChevronLeft}
					className='back'
					onClick={() => navigate('/catalog')}
				/>
			</div>
			<h1>Ваши заказы</h1>
			{userOrders.length === 0 ? (
				<p>У вас нет заказов.</p>
			) : (
				userOrders.map(renderOrder)
			)}
			{role === 'admin' && otherOrders.length > 0 && (
				<>
					<h2>Заказы других пользователей</h2>
					{otherOrders.map(renderOrder)}
				</>
			)}
		</div>
	)
}

export default Order
