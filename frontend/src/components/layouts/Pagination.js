import React from 'react'

export const Pagination = ({isHome,currentPage,memes,getNextMemes,setShowMemes}) => {
  const onPrevClickH =()=>{
    console.log(currentPage);
    setShowMemes(currentPage-1);
  }
  const onNextClickH =()=>{
    console.log(currentPage+1);
    setShowMemes(currentPage);
  }
  if(isHome) 
  return(
   <div>
     <button name='prev' disabled={(currentPage)<=1?true:false} onClick={onPrevClickH}>{'<'}</button>
     <button name='current' disabled={true}>{currentPage}/{Number((memes.length/5).toFixed()) +1}</button>
     <button name='next' disabled={((currentPage*5>=memes.length))} onClick={onNextClickH}>{'>'}</button>
   </div>
  )
   else return null;
}

export default Pagination;