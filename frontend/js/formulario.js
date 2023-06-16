const urlBase = 'http://localhost:3031/api/movies/';
const $ = (id) => document.getElementById(id);

window.onload = async () => {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');


    try {
        
        let response = await fetch(urlBase + id)
        let pelicula = await response.json()

        let {title,rating, awards, length:duracion, release_date,genre_id} = pelicula.data;

        let releaseDateFormatted = moment(release_date).format('YYYY-MM-DD')
        

        $('title').value = title;
        $('rating').value = rating;
        $('awards').value = awards;
        $('length').value = duracion;
        $('release_date').value = releaseDateFormatted;
        $('genre_id').value = genre_id;
        
     
    } catch (error) {
        console.log(error);
    }


    $('btn-editar').addEventListener('click', async (e) => {
        e.preventDefault();
    try {
        
            response= await fetch(urlBase + 'update/' + id,{
                method:'PUT',
                body: JSON.stringify({
                    title:$('title').value,
                    rating:$('rating').value,
                    awards:$('awards').value,
                    length:$('length').value,
                    release_date:$('release_date').value,
                    genre_id:$('genre_id').value,
                    
                }),
                headers:{'Content-Type':'application/json'}

            })
            
        }catch (error) {
        console.log(error);
    }
            
    })

    $('btn-crear').addEventListener('click', async (e) => {
        e.preventDefault();
    try {
        
        response= await fetch(urlBase + 'create/' ,{
            method:'POST',
            body: JSON.stringify({
                title:$('title').value,
                rating:$('rating').value,
                awards:$('awards').value,
                length:$('length').value,
                release_date:$('release_date').value,
                genre_id:$('genre_id').value,
                
            }),
            headers:{'Content-Type':'application/json'}

        })
            
        }catch (error) {
        console.log(error);
    }
            
    })
     
    $('btn-eliminar').addEventListener('click', async (e) => {
        e.preventDefault();
    try {
        
        response= await fetch(urlBase + 'delete/' + id,{
            method:'DELETE',
           
            headers:{'Content-Type':'application/json'}

        })
            
        }catch (error) {
        console.log(error);
    }
            
    })
            

      
          


}