import React, { Component, useState } from 'react'
import PropTypes from 'prop-types';
import {Button,Modal,Container} from 'react-bootstrap';
import ImageNotAvailable from '../../static/images/imgNotAvailable.jpg';




export const MemesCard = ({meme,index,editButtonPress,delButtonPress,incCount,decCount,counter,len}) => {
  const [show,setShow]=useState(false);
  const [editMeme,setEditMeme] = useState(meme);
  const handleClose = () => {decCount();setShow(false)};
  const handleShow = () =>{if(counter==0){incCount();setShow(true)}};
  // Handling Faulty images
  const onImageError = (e) =>{
    console.log(e);
    if(e.target.src=={ImageNotAvailable}) return ;
    console.log('Image not available handled');
    e.target.onerror =null;
    e.target.src = 'https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg';
  }
  const onChangeEdit = (e) =>{
    console.log(e.target.value);
    console.log(editMeme[e.target.name]);
    const tmp = editMeme;
    tmp[e.target.name] =e.target.value;
    console.log(tmp);
    setEditMeme(tmp);
  }
  // Patch memes
  const onPatchMeme =(e) =>{
    console.log(`patching meeme to -> ${editMeme.name} +  ${editMeme.caption} + ${editMeme.url}`) 
    editButtonPress(editMeme);
  }
  return (
    // flex:'justify-content'
    <div style={{boxShadow:'3px 3px 5px 6px #ccc'}}>
    <div className="card" style={{padding:'1rem',display:'grid',gridTemplateColumns:'[first] 0.7fr [second] auto [third]', gridTemplateRows:'[first] auto [second] 1fr [third] 1fr [fourth]'}}>
      <h3 style={{gridColumnStart:'first',gridColumnEnd:'second'}}>
      <div style={{margin:'0.5rem'}}>Id: {meme.id}</div>
      <div style={{margin:'0.5rem'}}>Name: {meme.name}</div>
      <div style={{margin:'0.5rem'}}>Caption: {meme.caption}</div>
      <div style={{gridColumnStart:'first',gridColumnEnd:'second',margin:'0.5rem'}}>
      <Button variant="outline-dark" onClick={handleShow} style={{margin:'0.5rem'}}>
          Edit Me
      </Button>
    </div>
    <div style={{gridColumnStart:'first',gridColumnEnd:'second',margin:'0.7rem'}}>
      <Button variant="outline-danger" onClick={delButtonPress.bind(this,meme)} style={{margin:'0.5rem'}}>
        Delete
      </Button>
      
    </div>
      </h3>
      <div style={{gridColumnStart:'second',gridColumnEnd:'third',margin:'0.5rem'}}>
    <img src={meme.url} alt="Meme Image" style={imgStyle} onError={onImageError}/>
    {/* onerror="this.onerror=null;this.src='http://example.com/existent-image.jpg';" */}
    </div>
    
    {show && 
    <div className="container">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        meme={meme}
      >
        <Modal.Header >
          <Modal.Title>Edit Meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <label htmlFor="name">Name:</label>
            <input type="text" placeholder={meme.name} value={editMeme.name} disabled={true}/>
            <label htmlFor='caption'>Caption:</label>
            <input type="text" name="caption"placeholder={meme.caption} onChange={onChangeEdit}/>
            <label htmlFor="url" >URL:</label>
            <input type="text" name="url" placeholder={meme.url} onChange={onChangeEdit}/>
            <div style={{margin:'0.5rem'}}>
            <Button variant="primary" onClick={(e)=>{ console.log(e); handleClose();onPatchMeme();}}>Submit</Button>
            <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          
          
        </Modal.Footer>
      </Modal>
      </div>}
      
    {/* <button onClick={delButtonPress.bind(this,meme)}style={delBtnStyle}>X</button> */}
  </div>
  </div>
  )
}



/*
export class MemesCard extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {meme,index} = this.props;
    return (
      <div className="card">
      <h3>{meme.id}</h3>
      <h3>
        {meme.name}
      </h3>
      <h3>{meme.caption}</h3>
      <img src={meme.url} alt="Meme Image" style={imgStyle}/>
      <button onClick={this.props.editButtonPress.bind(this,meme.id)}>Edit Me</button>
      <button onClick={this.props.delButtonPress.bind(this,meme)}style={delBtnStyle}>X</button>
    </div>
    )
  }
}
*/

MemesCard.propTypes ={
  meme: PropTypes.object.isRequired
}
// #dc3545  rgb(231, 22, 22)
const delBtnStyle ={
  background: 'rgb(231, 22, 22)',
  color: '#fff',
  border:'none',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}
const imgStyle ={
  height:'15rem',
  width:'15rem'
}

export default MemesCard
