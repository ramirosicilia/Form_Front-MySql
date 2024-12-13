import dotenv from "dotenv" 


dotenv.config() 

 const urlBack=process.env.URL_BACKEND 

 const urlFront=process.env.URL_FRONT 
 console.log(`se esucha el back ${urlBack}`) 
 console.log(urlFront)

 export const obtenerFormulario=async(req,res)=>{ 

    try{ 
        res.render('index',{url:urlFront ,urlBack:urlBack})
    
     } 
     catch(err){
        console.log('a ocurrido un error',err)
     }
    


 } 

 export const obtenerVariablesEntorno=async(req,res)=>{ 

 try{ 
    res.json({urlBack:urlBack})

 } 
 catch(err){
    console.log('a ocurrido un error',err)
 }


 } 

 export const obtenerINFO=async(req,res)=>{ 

   const response= await fetch(`${urlBack}/obtener-info`)  
   let data=await response.json()
 
   res.render('pages',{users:data.usuarios})

 }  


 export const obtenerLogin=async(req,res)=>{ 

   
    
    res.render('login',{urlFront:urlFront,urlBack:urlBack})
 
  } 

  export const obtenerContraseñas=async(req,res)=>{ 

   
    
    res.render('contrasena',{Back:urlBack})
 
  } 

  export const obtenerEliminacion=async(req,res)=>{ 

   
    
    res.render('eliminar',{urlBack:urlBack})
 
  } 






