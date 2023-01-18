const url='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=&page=1'
const imageUrl='https://image.tmdb.org/t/p/w1280'
const searchApi='https://api.themoviedb.org/3/search/movie?&api_key=&query='

const movie_box=document.querySelector('.movie-box')
const inputEl=document.querySelector('#search-input')
const searchButton=document.querySelector('#search-btn')


searchButton.addEventListener('click',()=>{
    if(inputEl.value){
        getMovies(searchApi+inputEl.value)
    } else{
        getMovies(url)
    }
})


const getMovies= async (url)=>{
    let res = await fetch(url);
    let data = await res.json()
    console.log(data.results)
    // div.appendChild(img)
// body.appendChild(div)
    displayMovie(data)
}
getMovies(url)



const displayMovie=(data)=>{
    movie_box.innerHTML=''
    data.results.map((el)=>{
        const imgPath=el.backdrop_path==null ? "./27002.jpg" : imageUrl+el.backdrop_path;
        const box=document.createElement('div')
        box.classList.add('box')
        box.innerHTML=`
            <img src="${imgPath}" alt="" />
            <h2>${el.original_title}</h2>
            <p>Original Language : ${el.original_language}</p>
            <h3>Overview :</h2>
            <p>${el.overview.slice(0,100)}...</p>
            <div class="rating">
                <span class="rating-img"><img class="icon" src="./star.png" /> ${el.vote_average}/${el.vote_count}</span>
            </div>
        `
        movie_box.appendChild(box)
    })
}


