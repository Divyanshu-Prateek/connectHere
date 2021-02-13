import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Button,Modal,Container} from 'react-bootstrap';
import ImageNotAvailable from '../../static/images/imgNotAvailable.jpg';

export const MemePreview = ({name,caption,url,showMemePreview}) => {
  const [meP,setmeP] = useState(false);
  useEffect(()=>{
    if(!showMemePreview && (name || caption || url)) setMEPState();
  })
  const setMEPState= () =>{
    console.log(name,caption,url)
    setmeP(true);
  }
   // Handling Faulty images
   const onImageError = (e) =>{
    console.log(e);
    if(e.target.src=={ImageNotAvailable}) return ;
    console.log('Image not available handled');
    e.target.onerror =null;
    e.target.src = 'https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg';
  }

    return (
      <Fragment>
        {meP && <Fragment>
          <div style={{textAlign:'center'}}><h3>Meme Preview</h3></div>
          <div style={{boxShadow:'3px 3px 5px 6px #ccc'}}>
          
        <div className="card" style={{padding:'1rem',display:'grid',gridTemplateColumns:'[first] 0.7fr [second] auto [third]', gridTemplateRows:'[first] auto [second] 1fr [third] 1fr [fourth]'}}>
          <h3 style={{gridColumnStart:'first',gridColumnEnd:'second'}}>
          <div style={{margin:'0.5rem'}}>Id: </div>
          <div style={{margin:'0.5rem'}}>Name: {name}</div>
          <div style={{margin:'0.5rem'}}>Caption: {caption}</div>
          <div style={{gridColumnStart:'first',gridColumnEnd:'second',margin:'0.5rem'}}>
          <Button variant="outline-dark"  style={{margin:'0.5rem'}} disabled={true}>
              Edit Me
          </Button>
        </div>
        <div style={{gridColumnStart:'first',gridColumnEnd:'second',margin:'0.7rem'}}>
          <Button variant="outline-danger"  style={{margin:'0.5rem'}} disabled={true}>
            Delete
          </Button>
          
        </div>
          </h3>
          <div style={{gridColumnStart:'second',gridColumnEnd:'third',margin:'0.5rem'}}>
        <img src={url} alt="Meme Image" style={imgStyle} onError={onImageError}/>
        </div>
        </div>
      </div>
      </Fragment>
      }
      </Fragment>
    )
}

const imgStyle ={
  height:'15rem',
  width:'15rem'
}

export default MemePreview;