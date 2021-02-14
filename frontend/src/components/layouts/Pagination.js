import React from 'react'

export const Pagination = ({isHome,currentPage,memes,onPageLoad,totalPages}) => {

  if(!isHome) 
  return(
   <div>
     <button name='first' disabled={currentPage<=1} id='first' onClick={onPageLoad.bind(this)}>{'<<'}</button>
     <button name='prev' disabled={currentPage<=1} id='false' onClick={onPageLoad.bind(this)}>{'<'}</button>
     <button name='current' disabled={true}>{currentPage}/{totalPages}</button>
     <button name='next' disabled={currentPage>=totalPages} id='true' onClick={onPageLoad.bind(this)}>{'>'}</button>
     <button name='last' disabled={currentPage>=totalPages} id='last' onClick={onPageLoad.bind(this)}>{'>>'}</button>
   </div>
  )
   else return null;
}

export default Pagination;

// (currentPage)<=1?true:false
// (currentPage*5>=memes.length)