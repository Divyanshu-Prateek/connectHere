import React, { Component ,Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import About from './components/pages/About';
import Memes from './components/pages/Memes';
import Error404 from './components/pages/Error404';
import AddMeme from './components/pages/AddMeme';
import 'bootstrap/dist/css/bootstrap.min.css'

let URL =`http://localhost:8081`;   // local sandbox
URL = `https://xmeme-prateek-divyanshu.herokuapp.com` // deployed version




class App extends Component {
  state ={
    memes:[
    ],
    meme:{},
    id:null,
    edit:false,
    sortParams:[],
    loading:false,
    alert: null,
    reload:false,
  }

  // fake authentication Promise For Preloader
  // for this see - https://stackoverflow.com/questions/40987309/react-display-loading-screen-while-dom-is-rendering
  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
  }

  componentDidMount(){
    console.log('THis happens first')
    this.getAllMemes();
    
    this.authenticate().then(() => {
      const ele = document.getElementById('ipl-progress-indicator')
      if(ele){
        // fade out
        ele.classList.add('available')
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = ''
        }, 2000)
      }
    })
  }

  // // componentWillUnmount() {
  // //   this._isMounted = false;
  // // }
  // componentDidMount(){
    
  // }

  // Get all memes
  getAllMemes = async() =>{
    this.setState({loading:true});
    return axios.get(URL+`/memes`)
              .then((res)=>{console.log(res); this.setState({loading:false,memes:res.data})})
              .catch((err)=>console.log(err.message))
    // const res = await axios.get('http://localhost:8081/memes');
    // console.log(res);
    // this.setState({loading:false,memes:res.data.data});
  }

  // Get meme by id
  getMemeById = async (id)=>{
    this.setState({loading:true,id:id});
    const res = await axios.get(URL+`/memes/${id}`);
    console.log(res);
    this.setState({loading:false,meme:res});
  }

  //Post meme 
  postMeme = async (name,caption,url) =>{
    this.setState({id:null});
    const data ={name,caption,url};
    const headers = {
      'Content-Type': 'application/json'
    }
    
    return axios.post(URL+'/memes',data,{headers})
              .then((res)=>{console.log(res); this.setState({id:res.id}); this.setAlert('Your Meme has been Successfully added to our database','success')})
              .catch((err)=>{console.log(err);this.setAlert(err.response.data.message,'danger');})
    // console.log(res);
    // this.setState({id:res.data.id});
  }

  // Patch a meme
  patchMeme = async (id,caption,url) =>{
   const data = {url,caption};
   const headers = {'Content-Type': 'application/json'};
   return axios.patch(URL+`/memes/${id}`,data,{headers})
              .then((res)=>console.log('Patched\n',res))
              .catch((err)=>{this.setState({loading:false}); this.setAlert('Server Error','danger')})
   
  }
  // edit button press
  editButtonPress =(editMeme)=>{
    //console.log('Edit meme with id: ',editMeme.id);
    this.setState({loading:true});
    this.patchMeme(editMeme.id,editMeme.caption,editMeme.url)
          .then(()=>{ this.setState({loading:false});this.setAlert('Meme Edited','success');this.getAllMemes();})
  }
  // del button press
  delButtonPress =async (meme) =>{
    console.log('Delete Meme' +meme.id);
    this.setState({loading:true});
    return axios.delete(URL+`/memes/${meme.id}`)
              .then(
                (res)=>{ 
                  console.log(res); 
                  this.setState({loading:false,memes: [...this.state.memes.filter((memeData)=> memeData!=meme)]});
                  this.setAlert('Meme Deleted successfully','success');
                } 
              )
  }
 // Post MEME on submit
 postMemeOnSubmit = async(name,caption,url) =>{
  console.log(name+'\n'+caption+'\n'+url+'\n Submitted');
   /* what to change: First post the meme and then get the meme to load into the state*/
            this.postMeme(name,caption,url)
            .then(()=>{
              this.getAllMemes()
              // .then((res)=>console.log(res))
              // .catch((err)=>console.log(err.message))
            })
            .catch(err=>console.log(err))
 }

 // ALERTS

 closeAlert(){
   this.setState({alert: null});
   console.log('Alert Closed');
 }

 setAlert(message,color){
   console.log(message+color+' ALERT\n');
   this.setState({alert: `${message}/${color}`})
   console.log(this.state.alert.split('/')[1]);
   console.log(this.state.alert.split('/')[0]);
   setTimeout(this.closeAlert.bind(this),5000);
 }

 
  render() {
    return (
      <Router>
      <Fragment>
        <div className="app">
          <Navbar getAllMemes={this.getAllMemes}/>
          {this.state.alert!=null && <Alert variant={this.state.alert.split('/')[1]}>{this.state.alert.split('/')[0]}</Alert>}
          <Switch>
            <Route exact path ='/' render = {( props) =>(
              <AddMeme {...props}
                postMemeOnSubmit={this.postMemeOnSubmit}
                getAllMemes={this.getAllMemes} 
                memes={this.state.memes} 
                loading={this.state.loading}
                editButtonPress={this.editButtonPress}
                delButtonPress ={this.delButtonPress}
                alert={this.state.alert}
              />
            )}
            />
            <Route exact path ='/about' render ={About}/>
            <Route exact path ='/memes' render ={(props)=>(<Memes {...props}
              getAllMemes={this.getAllMemes} memes={this.state.memes} loading={this.state.loading}
              editButtonPress={this.editButtonPress}
              delButtonPress ={this.delButtonPress}
              alert={this.state.alert}
              // hotReload={this.hotReload}
            />)}  />
            <Route render ={Error404}/>
          </Switch>
          <Footer />
        </div>
        
      </Fragment>
      </Router>
    )
  }
}


export default App;
