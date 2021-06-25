import React from 'react';
const search=({searchfield,searchChange})=>{
	return( 
		<div className="ph5">
		<input type="search" placeholder="Search Items" onChange={searchChange} />
		</div>
		);
};
export default search;