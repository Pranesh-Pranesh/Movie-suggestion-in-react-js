import { Movie } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 


const MovieCollection = () => {
    let[search,setSearch]=useState("")
    let[data,setData]=useState([])
    let apidata=  axios.get(`http://www.omdbapi.com/?s=${search}&apikey=a8070919`)
let handleChange=(e)=>{
    e.preventDefault()
    setSearch(e.target.value)
    console.log(e.target.value)
     apidata=  axios.get(`http://www.omdbapi.com/?s=${search}&apikey=a8070919`)
}

useEffect(()=>{
    axios.get(`http://www.omdbapi.com/?s=${search}&apikey=a8070919`)
    .then((res)=>{
      console.log(res)
      if(res.data.Response=="False")
      {
        console.log(res.data.Error)
      }
      else{
        console.log(res.data.Response)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
},[search])
  

const Images = [
  {
      name: 'Avatar',
      imageUrl: "Avatar2.jpg",
      year:2015
  },
  {
      name: 'TopGun',
      imageUrl: 'TopGun.jpg',
      year:2022
  },
  {
      name: 'Varisu',
      imageUrl: "Varisu.jpg",
      year:2022
  }
  // Add more image objects as needed
];




let handleSubmit=(e)=>{
e.preventDefault()
apidata.then((res)=>{
  if(res.data.Response=="False")
  {
    console.log(res.data.Error)
   
    toast.error(res.data.Error, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000 // 3 seconds
  });
  }
  else{
    console.log(res.data.Response)
    setData(res.data.Search)
  }
  
    // console.log(res.data)
   })
}
  
  return (
//     <div>
// <form action="" onSubmit={handleSubmit}>
// <input type="text"  placeholder='Enter the Movie Name' onChange={handleChange} value={search} />

//       <button type='submit'>Search</button>
      
// </form>

//     <div className='layout'>
//     {data.map((movie)=>{
//         return(
//             <>
           
            
//                 <div className='card'>
//                     <div >
//                     <img src={movie.Poster} alt="" />
//                     </div>
//                     <div>
//                     <h1>Title:{movie.Title}</h1>
//                     <h2>Year:{movie.Year}</h2>
//                     </div>
//                 </div>
                
         
         
//             </>
//         )
//     })}
//     </div>
//     </div>




<div className='Container'>
  <div className="top-nav">
      <div className="navbar">
        <div className="logo">    Prime Video</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
         
          {/* Add more menu items */}
        </ul>
        <div className="search-box">
        <form action="" onSubmit={handleSubmit}>
<input type="text"  placeholder='Search' onChange={handleChange} value={search} />

    
<button style={{marginLeft:10}}>Search</button>
</form>

<ul className="nav-links">
<li style={{color:"skyblue"}}><AccountCircleIcon style={{height:40,marginTop:10,width:40}}/></li>

</ul>
        </div>
        <div className="user-menu">
          {/* Add user-related menu items */}
        </div>
      </div>
    </div>

    <ToastContainer />
<div className='card-container-carousel'>


{data.length == 0 && (
        <div className='carousel-container'>
          <Carousel autoPlay={true} showThumbs={false  }>
            {Images.map((movie) => (
              <div  className='carousel-card'>
                <img src={movie.imageUrl}  />
                <div className='card-content'>
                  <h1 className='.carousel-card h1'>{movie.name}</h1>
                  <h2 className='.carousel-card h2'>{movie.year}</h2>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      
{data.map((movie)=>{
       return(
                        
             <div className='card-container'>
                  <div className='card'>
                   <div >
                   <img src={movie.Poster} alt="" />
                   </div>
                   <div>
                   <h1>Title:{movie.Title}</h1>
                   <h2>Year:{movie.Year}</h2>
                   </div>
               </div>     
             </div>             
           
       )
   })}

</div>

   
</div>
  )
}

export default MovieCollection
