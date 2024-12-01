 export let urlBackend 


async function recibeData(){ 

    let response= await fetch("/variables") 
    let data=await response.json() 
    urlBackend=data.urlBack

} 

recibeData()