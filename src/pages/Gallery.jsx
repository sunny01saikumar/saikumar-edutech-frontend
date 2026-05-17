import {useEffect,useState} from "react";
import API from "../api/axios";

function Gallery(){

const [images,setImages]=
useState([]);

useEffect(()=>{

fetchImages();

},[]);


const fetchImages=async()=>{

try{

const response=
await API.get("/images");

setImages(response.data);

}
catch(error){

console.log(error);

}

};

return(

<div className="gallery-grid">

{

images.map(img=>(

<div
key={img.id}
className="gallery-card"
>

<img
src={img.image}
alt=""
className="gallery-image"
/>

<h4>

{img.uploadedBy}

</h4>

<p>

{img.description}

</p>

</div>

))

}

</div>

);

}

export default Gallery;