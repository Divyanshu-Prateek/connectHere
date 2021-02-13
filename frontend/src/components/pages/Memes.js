import React, { Component, Fragment } from 'react'
import MemesList from '../cards/MemesList'
import axios from 'axios';
import emptyPageGif from '../../static/images/LoadingWebPage.jpg';
import spinner from '../../static/images/spinner1.jpg';


let URL =`http://localhost:8081`;   // local sandbox
URL = `https://xmeme-prateek-divyanshu.herokuapp.com` // deployed version

class Memes extends Component {
  constructor(props){
    super(props);
  }
  state={
    loading:false,
    memes:[],
    meme:{},
    id:null,
    sortBy:'id',
    order:'desc',
    searchMeme:'',
    skip:0,
    take:5,
    currentPage:1
  }
  componentWillMount(){
    console.log('Memes Page here\n');
    this.getAllMemesByParams();
  }
 
   // Get all memes
   getAllMemesByParams = async() =>{
    this.setState({loading:true});
    const sortBy=this.state.sortBy;
    const order=this.state.order;
    const skip=this.state.skip;
    const take=this.state.take;
    let reqApi = URL+`/api/memes/display?sortBy=${sortBy}&order=${order}&skip=${skip}&take=${take}`;

    return axios.get(reqApi)
              .then((res)=>{console.log(res.data.data); this.setState({loading:false,memes:res.data.data})})
              .catch((err)=>{this.setState({loading:false});console.log(err.message)})
    // const res = await axios.get('http://localhost:8081/memes');
    // console.log(res);
    // this.setState({loading:false,memes:res.data.data});
  }
  onChange =(e) =>{
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit =(e) =>{
    e.preventDefault();
    this.getAllMemesByParams();
  }
   // del button press
   delButtonPress =(meme) =>{
    console.log('Delete Meme' +meme.id);
    this.setState({memes: [...this.state.memes.filter((memeData)=> memeData!=meme)]});
    if(this.props.memes.length==1){
      this.setState({loading:false})
    }
    this.props.delButtonPress(meme);
    // this.props.hotReload.bind(this);
  }

  render() {
  //const {memes,loading} = this.props;
    return (
      <Fragment>
        {/* <div>Meme Page</div> */}
        <section>
          <b>
            <Fragment >
              <section className='container'  style={{backgroundColor:'whitesmoke',border:'black 0.25rem dashed'}}>
              <div  style={{textAlign:'center',backgroundColor:'whitesmoke'}}><b><h2>Search Memes</h2></b></div>
              <form  style={formStyle} onSubmit={this.onSubmit}>
                <div style={labelDivStyle}>
                  <label htmlFor='searchMeme'><h4>Search: </h4></label>
                </div>
              <input type="text" name='searchMeme' placeholder='(available in next version)' style={inputStyle} onChange={this.onChange} disabled={true}/>
              <div style={labelDivStyle}>
                <label htmlFor='sorBy'><h4>Sort By: </h4></label>
              </div>
              <select name="sortBy" style={inputStyle} onChange={this.onChange}>
                <option value="id">Date Created</option>
                <option value="caption">Caption</option>
                <option value="name">Name</option>
              </select>
              <div style={labelDivStyle}>
                <label htmlFor='order'><h4>Order: </h4></label>
              </div>
              <select name="order" style={inputStyle} onChange={this.onChange}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
              <input type='submit' value='Submit' className='btn' style={submitStyle} disabled={this.props.memes.length==0}/>
              </form>
              </section>
            </Fragment>
            </b>
        </section>
        {this.state.loading==true ?
             (<div className='container' style={{display:'grid',gridTemplateColumns:'[first] 1fr [second] 0.75fr [third] 1fr [fourth]'}}><img src={spinner} alt='Loading....' style={{width:'20rem',height:'20rem',gridColumnStart:'second',gridColumnEnd:'third'}}></img></div>) :
             (  
      
        this.props.memes.length==0 ? 
           (<div style={{display:'grid',gridTemplateColumns:'[first] 1fr [second] 1.75fr [third] 1fr'}}>
           <p style={{textAlign:'center',gridColumnStart:'second',gridColumnEnd:'third'}}>
             No memes to show</p>
           <p style={{textAlign:'center',gridColumnStart:'second',gridColumnEnd:'third'}}>
             Click on the Add Meme button to upload memes
           </p>
           <img src={emptyPageGif} style={{padding:'2rem',width:'20rem',height:'20rem',maxWidth:'100%',gridColumnStart:'second',gridColumnEnd:'third'}}>
           </img>
         </div>)  :
         (
         <div className="container" style={{border:'0.25rem dashed #ccc',marginTop:'1rem'}}>
         <div style={{textAlign:'center'}}><h3>Filtered Memes</h3></div>
          {this.state.memes.length==0 && <div style={{textAlign:'center'}}>No, such memes present</div>}
           <MemesList memes={this.state.memes} loading={this.state.loading} 
           editButtonPress ={this.props.editButtonPress}
           delButtonPress ={this.delButtonPress}
           />
         </div>
         )
        
        )
        }
        
      </Fragment>
    )
  }
}

const submitStyle ={gridColumnStart:'third' ,gridColumnEnd:'fourth',padding:'5px',marginBottom:'1rem',backgroundColor:'slategray'}
const labelDivStyle ={gridColumnStart:'second' ,gridColumnEnd:'third',alignSelf:'center',textAlign:'center'}
const formStyle ={
  display:'grid',gridTemplateColumns:'[first] 1fr [second] 1fr [third] 1fr [fourth] 1fr [fifth]',gridTemplateRows:'[first] 1fr [second] 1fr [third] 1fr [fourth]',backgroundColor:'whitesmoke'
}
const inputStyle = {gridColumnStart:'third' ,gridColumnEnd:'fourth',padding:'5px',marginBottom:'1rem'}

export default Memes
