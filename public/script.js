const API_KEY = "AIzaSyD1OCPoOG0tEmPqlkauPWstNwpMY_b93Ac"

const player = document.getElementById("player")
const videos = document.getElementById("videos")

async function loadLocal(){

const res = await fetch("/videos")
const data = await res.json()

videos.innerHTML=""

data.forEach(v=>{

const div = document.createElement("div")

div.className="video"
div.innerHTML = v

div.onclick=()=>{
player.innerHTML=`
<video controls width="800">
<source src="/videos/${v}">
</video>
`
}

videos.appendChild(div)

})

}

loadLocal()

async function searchYT(){

const query = document.getElementById("search").value

const url =
`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=8&key=${API_KEY}`

const res = await fetch(url)

const data = await res.json()

const yt = document.getElementById("ytresults")

yt.innerHTML=""

data.items.forEach(v=>{

const id = v.id.videoId
const title = v.snippet.title
const thumb = v.snippet.thumbnails.medium.url

const div = document.createElement("div")

div.className="video"

div.innerHTML=`
<img src="${thumb}">
<p>${title}</p>
`

div.onclick=()=>{
player.innerHTML=`
<iframe width="800" height="450"
src="https://www.youtube.com/embed/${id}"
allowfullscreen></iframe>
`
}

yt.appendChild(div)

})

}

document.getElementById("uploadForm").onsubmit=async(e)=>{

e.preventDefault()

const form = new FormData(e.target)

await fetch("/upload",{
method:"POST",
body:form
})

alert("Upload xong")

loadLocal()

}