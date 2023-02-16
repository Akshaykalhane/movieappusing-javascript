const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a66b00ba4c9ce449bb3a8e37e28ec29c&page=1'
const imageUrl = 'https://image.tmdb.org/t/p/w1280'
const searchApi = 'https://api.themoviedb.org/3/search/movie?&api_key=a66b00ba4c9ce449bb3a8e37e28ec29c&query='
const genresAPI_LINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a66b00ba4c9ce449bb3a8e37e28ec29c&page=1&with_genres=27'

const movie_box = document.querySelector('.movie-box')
const inputEl = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const buttonDiv = document.querySelector('.button-box')

const genres = [
    {
        id: 28,
        name: "Action"
    },
    {
        id: 12,
        name: "Adventure"
    },
    {
        id: 16,
        name: "Animation"
    },
    {
        id: 35,
        name: "Comedy"
    },
    {
        id: 80,
        name: "Crime"
    },
    {
        id: 99,
        name: "Documentary"
    },
    {
        id: 18,
        name: "Drama"
    },
    {
        id: 10751,
        name: "Family"
    },
    {
        id: 14,
        name: "Fantasy"
    },
    {
        id: 36,
        name: "History"
    },
    {
        id: 27,
        name: "Horror"
    },
    {
        id: 10402,
        name: "Music"
    },
    {
        id: 9648,
        name: "Mystery"
    },
    {
        id: 10749,
        name: "Romance"
    },
    {
        id: 878,
        name: "Science Fiction"
    },
    {
        id: 10770,
        name: "TV Movie"
    },
    {
        id: 53,
        name: "Thriller"
    },
    {
        id: 10752,
        name: "War"
    },
    {
        id: 37,
        name: "Western"
    }
]

searchButton.addEventListener('click', () => {
    if (inputEl.value) {
        getMovies(searchApi + inputEl.value)
    } else {
        getMovies(url)
    }
})



const getMovies = async (url) => {
    let res = await fetch(url).catch(() => noConnection())
    let data = await res.json()

    // div.appendChild(img)
    // body.appendChild(div)
    displayMovie(data)
    function noConnection() {
        movie_box.innerHTML = `<h2 class="not-found">No Internet Connection</h2>`
    }
}
getMovies(url)


// console.log(url+'&with_genres' +encodeURI('action'))

const displayMovie = (data) => {
    movie_box.innerHTML = ''
    if (data.results.length <= 0) {
        notFound();
    } else {
        // console.log('found',data)
        data.results.map((el) => {
            const imgPath = el.backdrop_path == null ? "./27002.jpg" : imageUrl + el.backdrop_path;
            const box = document.createElement('div')
            box.classList.add('box')
            movie_box.innerHTML += `
            <div class="box">
                <img src="${imgPath}" alt="" />
                <h2>${el.original_title}</h2>
                <p>Original Language : ${el.original_language}</p>
                <h3>Overview :</h2>
                <p>${el.overview.slice(0, 100)}...</p>
                <div class="rating">
                    <span class="rating-img"><img class="icon" src="./star.png" /> ${el.vote_average}/${el.vote_count}</span>
                </div>
            </div>
        `
            // movie_box.appendChild(box)
        })
    }
}



function notFound() {
    movie_box.innerHTML = `<h2 class="not-found">Movie Not Found</h2>`
    console.log('not found')
}


const selectGenre = [];

function setFilterButton() {
    genres.forEach((el, i) => {
        let { name, id } = el;
        buttonDiv.innerHTML += `<button class="gbtn" id=${id}>${name}</button>`
    })
    let buttons = document.querySelectorAll('.gbtn')
    buttons.forEach((btn) => {
        // console.log(btn)
        btn.addEventListener('click', () => addGenre(btn))
    })
    // console.log(buttons)
    function addGenre(data) {
        // data.classList.add('highlight')
        // console.log(data.classList)

        if (selectGenre.length == 0) {
            selectGenre.push(data.id)
        } else {
            if (selectGenre.includes(data.id)) {
                // console.log('includes')
                selectGenre.forEach((el, id) => {
                    if (el == data.id) {
                        selectGenre.splice(id, 1)
                    }
                })
            } else {
                // console.log('not include')
                selectGenre.push(data.id)
            }
        }

        displayFilterData(url + '&with_genres=' + encodeURI(selectGenre.join(',')))
    }
}
setFilterButton();

function displayFilterData(data) {
    fetch(data).then(res => res.json()).then((data) => displayResult(data))
}

function displayResult(data) {
    console.log(data, 'filterdata')
    movie_box.innerHTML = ''
    if (data.results.length <= 0) {
        notFound();
    } else {
        // console.log('found',data)
        data.results.map((el) => {
            const imgPath = el.backdrop_path == null ? "./27002.jpg" : imageUrl + el.backdrop_path;
            const box = document.createElement('div')
            box.classList.add('box')
            movie_box.innerHTML += `
            <div class="box">
                <img src="${imgPath}" alt="" />
                <h2>${el.original_title}</h2>
                <p>Original Language : ${el.original_language}</p>
                <h3>Overview :</h2>
                <p>${el.overview.slice(0, 100)}...</p>
                <div class="rating">
                    <span class="rating-img"><img class="icon" src="./star.png" /> ${el.vote_average}/${el.vote_count}</span>
                </div>
            </div>
        `
            // movie_box.appendChild(box)
        })
    }

}


function highlight() {

}