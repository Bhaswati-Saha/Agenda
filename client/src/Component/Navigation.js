import React from 'react';
import './Todo.css';
const Navigation=({onRouteChange,isSignedIn})=>{
	
	if(isSignedIn)
	{
	return(	
	<nav style={{display:'flex',justifyContent:'flex-end'}}>
	   <button id="navigation"  onClick={()=>onRouteChange("signout")}>Sign Out</button>
	</nav>
	);
    }
    else{
    	return(
	<nav></nav>
	);
    }

	
}
export default Navigation;