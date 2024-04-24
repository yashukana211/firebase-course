import {useEffect,useState } from 'react';
import {Auth} from "./components/auth.jsx";
import { db,auth,storage} from "./config/firebase.jsx";
import './App.css'
import {getDocs,collection,addDoc,deleteDoc, doc,
updateDoc} from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid'

import { ref, uploadBytes } from "firebase/storage";

function App() {
 
  const moviesCollectionRef=collection(db,"movies");
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

   // Update Title State
   const [updatedTitle, setUpdatedTitle] = useState("");

    // File Upload State
  const [fileUpload, setFileUpload] = useState(null);


  //getMovie
    const getMovieList=async()=>
    {
      try{
        const data=await getDocs(moviesCollectionRef);
       const filterData=data.docs.map((doc)=>(
        {...doc.data(),
        id:doc.id,}
       ));
       setMovieList(filterData);
      } catch(err)
      {
        console.error(err);
      }
    };
    useEffect(() => {
      getMovieList();
    }, []);

//submit movie
    const onSubmitMovie = async () => {
      try {
        await addDoc(moviesCollectionRef, {
          title: newMovieTitle,
          releaseDate: newReleaseDate,
          receivedAnOscar: isNewMovieOscar,
          userId: auth?.currentUser?.uid,
        });
      
          getMovieList();
     
      } catch (err) {
        console.error(err);
      }
    };


    //delete movie
    const deleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    };
   
    //upload movie
    const updateMovieTitle = async (id) => {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
    };


    //upload file
    const uploadFile=async()=>
    {
      if(!fileUpload) return;
      const filesfolderRef=ref(storage,`projectFiles/${fileUpload.name
      }`);

      try{
        await uploadBytes(filesfolderRef,fileUpload);
      }
      catch(err)
      {
        console.error (err);
      }
    };



  

  return (
    <div className="App">
     <Auth />
      
     <div>

        <input placeholder="movie title..."
         onChange={(e)=>setNewMovieTitle(e.target.value)}/>

         <input placeholder="Release Date.." type="number"
         onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>

         <input
          type="checkbox"
         
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
         />
          <label> Received an Oscar</label>
          <button onClick={onSubmitMovie}> Submit Movie</button>
     </div>


      <div>
        {movieList.map((movie)=>
        (
        <div key={movie.id}>
          <h1 style={{color:movie.receivedAnOscar?"green":"red"}}>{movie.title}</h1>

          <p>Date:{movie.releaseDate}</p>


          <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>


          <input
           placeholder="new title..."

           onChange={((e)=>setUpdatedTitle(e.target.value))}
          />


          <button onClick={()=> updateMovieTitle(movie.id)}>
            {" "}
            Update Title
          </button>

        </div>
       ))}
      </div>
           <div>
            <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])} />

            <button onClick={uploadFile}>Upload File</button>
           </div>

     </div>  
   
  );
}

export default App

