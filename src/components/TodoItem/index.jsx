import React from 'react'
import { Button, Checkbox } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { delete_todo, toggle_todo, edit_todo, ALL } from '../../store/actions'

const ItemContainer = ({ after, children }) => {
	return after ? <Item>{children}</Item> : <Item after>{children}</Item>
}

const Item = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	background-color: ${(props) => {
		return props.after ? 'pink ' : 'beige'
	}};
	padding: 8px;
	borderradius: 5px;
`

export const TodoItem = ({ todo, id }) => {
	const dispatch = useDispatch()

	const onDelete = () => {
		dispatch(delete_todo(id))
	}

	function onChange(e) {
		console.log(`checked = ${e.target.checked} `)
		dispatch(toggle_todo(id, e.target.checked))
	}

	const deadline = moment(todo.deadline).format('MMMM Do YYYY')
	const after = moment(todo.deadline).isAfter(moment())

	return (
		<ItemContainer after={after}>
			{/* <div
				style={{
					textDecoration: todo.checked ? 'line-through' : 'none',
				}}
				onChange={(e) => dispatch(edit_todo(id, e.currentTarget.textContent))}
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{todo.text}
			</div> */}

			<input
				// disabled={currentFilter !== 'ALL'}
				type='text'
				value={todo.text}
				style={{ border: 'none', background: 'none', textDecoration: todo.checked ? 'line-through' : 'none' }}
				onChange={(e) => {
					console.log(e.target.value)
					dispatch(edit_todo(id, e.target.value))
				}}
			/>

			<i
				style={{
					textDecoration: todo.checked ? 'line-through' : 'none',
				}}
			>
				{deadline}
			</i>

			<div>
				<Checkbox
					checked={todo.checked}
					style={{ marginRight: 10 }}
					onChange={onChange}
				></Checkbox>
				<Button onClick={onDelete} type='primary' danger>
					delete
				</Button>
			</div>
		</ItemContainer>
	)
}
