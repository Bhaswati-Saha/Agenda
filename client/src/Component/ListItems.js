import React from 'react';
import './ListItems.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';
const List=({items1,deleteItem,setUpdate})=>{
	const listItems=items1.map(item=>
	{
		return <div className="list" key={item.key}>
		<p>
		<input type="text" id={item.key} value={item.text} onChange={(e)=>setUpdate(e.target.value,item.key)}/>
		
		<span>
		<FontAwesomeIcon className="faicons" icon="trash" onClick={()=>deleteItem(item.key)}/>
		</span>
		</p>


		</div>
	});
	return (
	<div>
	<FlipMove duration={300} easing="ease-in-out">
	{listItems}
	</FlipMove>
	</div>
	)

}
export default List;