import React, { Component, Fragment,useState} from 'react'
import MemesCard from './MemesCard'
import PropTypes from 'prop-types'

let arr =[1,2,3,4,5];

const MemesList = ({memes,loading,editButtonPress,delButtonPress}) => {
  const [counter,setCount] =useState(0);
  const incCount =()=>setCount(counter+1);
  const decCount=()=>setCount(counter-1);
  if(loading==false){

  return<div > {memes.map((meme,index)=> <MemesCard key={meme.id} meme={meme} index={index}
    len={memes.length}
    editButtonPress={editButtonPress}
    delButtonPress ={delButtonPress}
    incCount={incCount}
    decCount={decCount}
    counter={counter}
  />
  )
  }
  </div>
  }
  else{
    return null;
  }
}

// export default MemesList

// export class MemesList extends Component {
//   constructor(props){
//     super(props);
//   }
  
//   render() {
//     const {memes,loading} = this.props;
//     if(loading==false){

//       return memes.map((meme,index)=> <MemesCard key={meme.id} meme={meme} index={index} editButtonPress={this.props.editButtonPress}
//       delButtonPress ={this.props.delButtonPress}
//       />)
//     }
//     else return null;
//   }
// }

MemesList.propTypes = {
  memes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default MemesList
