const express = require('express');
const router = express.Router();
let db = require('../database.js');
const { check, validationResult,param} = require('express-validator');



// functions:

// check if ID exists and return memeStored:
// This function checks if the id already exists in db and sends the response as memeStored or error response
//PARAMS: res, given_id
// RES: 200: Returns row of sql table
// RES: 400: Returns error message if there was error in fetching response from db
// RES: 404: Returns error if the given_id was not found in database
let checkIfIdExistsAndReturn = (res,given_id) =>{
  let sql = 'SELECT * from memes where id = ?';
  let params = [given_id];
  return db.get(sql,params,(err,row) =>{
    if(err){
      res.status(400).json({"error":err.message});
      return ;
    }
    if(!row){
      res.status(404).end()
      return ;
    }
    row.id=row.id.toString();
    res.status(200).json(row);
    return;
  })
}



// getAllMemes:
// This function returns all the memes present in the database
//PARAMS: None
// RES: 200: Returns an array of memes
// RES: 400: Returns error message if there was error in fetching response from db
let getAllMemes = (res) =>{
  /* limit 100 */
  var sql = "select * from memes"
  var params = []
  return db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        let data = [];
        if(rows.length==0){
          res.status(200).json(data);
          return;
        }
        rows =rows.reverse();
        
        let length = Math.min(rows.length,100);
        for(let i=0;i<length;i++){rows[i].id = rows[i].id.toString(); data.push(rows[i])};
        res.status(200).json(data);
  });
}



// postMeme:
// This function is used to post a  meme to the database
//PARAMS: res, data =>where data is an object which contains name ,url and caption from the request body
// RES: 200: Returns the 'id' of the meme which was created
// RES: 400: Returns error message if there was error in storing response to database
let postMeme = (res,data) =>{
  let sql = 'INSERT INTO memes (name,url,caption) VALUES(?,?,?)';
  let params =[data.name,data.url,data.caption];
  return db.run(sql,params,function (err,result){
    if(err){
      res.status(400).json({err});
      return;
    }
    res.status(200).json({id: this.lastID.toString()})
    return;
  })
}


// postIfDuplicateDoesNotExist:
// A helper function which checks if a duplicate meme exists in database or not
// PARAMS: req, res
// RES: 400 : Returns error message if there was error in fetching response from db
// RES: 409 : Returns error message saying the meme post already exists in database
// If no error postMeme is called from here
let postIfDuplicateDoesNotExist = (req,res) =>{
  let {name,url,caption} = req.body;
  //name = name.touppercase();
  let data = {name,url,caption};
  let sql = 'SELECT * from memes WHERE name=? AND url=? AND caption=?';
  let params = [data.name,data.url,data.caption];
  return db.get(sql,params, (err,row) =>{
    if(err){
      res.status(400).json({message:err.message});
    }
    if(!row){
      return postMeme(res,data);
    }
    res.status(409).json({message:'This meme post already exists'});
    return;
  })
}


// updateMeme:
// This function is used to update memes to the database
// PARAMS: res,name,url,caption,id
// RES: 400 : Error in updating response to the database
// RES: 200 : The meme post was successfully updated
let updateMeme = (res,name,url,caption,id) =>{
  const sql =`UPDATE memes set name = name , url = ? ,  caption = ? WHERE id = ?` ;
  const params = [url,caption,id];
  return db.run( sql,params,
  function (err) {
    if (err){
      res.status(400).json({message: err.message})
      return;
    }
    res.status(200).end();
    return;
  });
}

let patchIfDuplicateDoesNotExist = (res,data,newData) => {
  let sql = `SELECT * from memes 
                 WHERE name = ? 
                 AND url = ? 
                 AND caption = ?`;
    let {id,url,caption} = newData;
    let name = data.name;  // as name cannot be changed
    /* Check if the url or caption is undefined or empty */
    if(!url || url==='') url =data.url;
    if(!caption || caption==='') caption=data.caption;
    return updateMeme(res,name,url,caption,id);
    // Not required for the current Xmeme API specification can be other added features
    
    params = [name,url,caption];
    
    return db.get(sql,params,(err,row2) => {
       if(err){
          // do nothing
          res.status(500).json({message:err.message});
          return;
      }
      else{
       
        // (name, newUrll , newCaption) already exists in the db
       /*
        if(row2){
          res.status(409).json({message:'This meme already exists, cannot update'});
          return ;
        }
        */
        
        // function updateMeme(res,name,url,caption,id);
        
       }
      })
}

// deleteIdFrom Database:
// This helper function is used to delete a meme with given id from the database if it exists
// PARAMS: res,id
// RES : 400 : returns error message if there was some internal problem while deleting in database
// RES : 200 : returns an object with message deleted and changes= No. of deletions made, if changes==0 then the meme with given id did not exist in database 
let deleteIdFromDatabase = (res,id) =>{
  const sql = 'DELETE FROM memes WHERE id = ?'; 
  return db.run(
    sql,
    id,
    function (err, result) {
        if (err){
            res.status(400).json({message: res.message})
            return;
        }
        res.status(200).json({message:"deleted", changes: this.changes});
        return ;
    });
}


// Check if id exists and delete
let checkIfIdExistsAndDelete =(res,id) =>{
  let sql = 'SELECT * from memes where id = ?';
  let params = [id];
  return db.get(sql,params,(err,row) =>{
    if(err){
      res.status(400).json({message :err.message});
      return ;
    }
    if(!row){
      res.status(404).json({message:'Id does not Exist , cannot delete'})
      return ;
    }
      return deleteIdFromDatabase(res,id);
     
  })
}

// Routes

// router.get: /memes => returns an array of memes stored to the user
router.get('/',async (req,res)=>{
  // console.log("console log-- GET REQUEST")
  return getAllMemes(res);
})

// router.post: /memes => posts a meme with the body parameters if validation results in no error
router.post('/',[
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('URL cannot be empty'),
  check('caption')
    .not()
    .isEmpty()
    .withMessage('Caption cannot be empty')  
  ], async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  // console.log("console log-- POST REQUEST");
  const {name,url,caption} = req.body;
  const data = {name,url,caption};
  return postIfDuplicateDoesNotExist(req,res);
})

// router.patch: /memes/:id?url={url}&caption={caption} =>Updates a meme in database with given values
router.patch('/:id',async (req,res)=>{
  const id = req.params.id;
  const {url,caption} = req.body;
  let newData = {id,url,caption};
  if((!url && !caption)){
    res.status(400).json({message:"Please Enter a valid url and caption"});
    return;
  }
  
  let data;
  let sql = 'SELECT * from memes where id = ?';
  let params =[id];
   db.get(sql,params, (err,row) =>{
    if(err){
      res.status(400).json({message:'Client Error'});
      return ;
    }
    else{
      data = row;
      if(!row){
        res.status(404).end();
        return ;
      }
      return patchIfDuplicateDoesNotExist(res,data,newData);
    }
  })

})


// router.get: /memes/:id => returns the meme with given id if it is present in database
router.get('/:id',async (req,res)=>{
  // console.log('GET request single meme');
  const id = req.params.id;
  return checkIfIdExistsAndReturn(res,id);
})

// router.delete: /memes/:id => deletes the meme if meme with id is present in database
router.delete('/:id',async (req,res) => {
    const id = req.params.id;
    return checkIfIdExistsAndDelete(res,id);
})

module.exports = router;




