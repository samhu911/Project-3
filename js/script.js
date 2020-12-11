jQuery(document).ready(function($){
    $('#loading-animation').toggleClass('d-none');
    const request = axios.get('http://csc225.mockable.io/consoles');
    request.then(function(response){
        const videoGames = response.data;
        const videoGamesHtml = videoGames.map(function(vg){
 
         const { id, name: videoGameName, image} = vg;
         $('#loading-animation').hide();
         return `
 
 
             <div data-id="${id}" class="media my-4 hover-background-gray cursor-ponter">
                  <img src="${image}" class="mr-3" alt="Photo of ${videoGameName}">
                  <div class="media-body">
                     <h5 class="mt-0">${videoGameName}</h5>
                    
                 </div>
             </div>
 
 
        `;
    }).join('');
    
    $('#videoGames').html(videoGamesHtml);

});

jQuery('#videoGames').on('click', '.media', function(){
    const id = $(this).attr('data-id');
    const videoGameUrl = `http://csc225.mockable.io/consoles/${id}`;
    $('#videoGame').html('');
    $('#loading-animation1').toggleClass('d-none');
    axios.get(videoGameUrl).then(function(response){
        const {id, name, price, country, releaseYear, image} = response.data;
        $('#loading-animation1').hide();
        $('#videoGame').html(`
        <div class="card" style="width: 18rem;">
        <img src="${image}" alt="Photo of ${name}">
        <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Price: ${price}</p>
        <p class="card-text">Country: ${country}</p>
        <p class="card-text">Release Year: ${releaseYear}</p>
        </div>
    </div>

    `);
    }).catch(function(error){
        alert('error!!!');
    });
});

});