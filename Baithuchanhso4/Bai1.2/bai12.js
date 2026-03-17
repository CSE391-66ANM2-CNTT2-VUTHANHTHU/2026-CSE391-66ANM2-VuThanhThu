const nameInput=document.getElementById("name")
const scoreInput=document.getElementById("score")
const addBtn=document.getElementById("addBtn")

const search=document.getElementById("search")
const filter=document.getElementById("filter")

const tableBody=document.getElementById("tableBody")
const stats=document.getElementById("stats")
const noResult=document.getElementById("noResult")

const scoreHeader=document.getElementById("scoreHeader")

let students=[]
let filteredStudents=[]

let sortOrder=null

function getRank(score){

if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"

}

function applyFilters(){

const keyword=search.value.toLowerCase()
const rank=filter.value

filteredStudents=students.filter(function(sv){

const matchName=sv.name.toLowerCase().includes(keyword)
const matchRank=(rank==="all"||getRank(sv.score)===rank)

return matchName&&matchRank

})

if(sortOrder){

filteredStudents.sort(function(a,b){

return sortOrder==="asc"?a.score-b.score:b.score-a.score

})

}

renderTable()

}

function renderTable(){

tableBody.innerHTML=""

if(filteredStudents.length===0){

noResult.textContent="Không có kết quả"
stats.textContent=""
return

}

noResult.textContent=""

let total=0

filteredStudents.forEach(function(sv,index){

const tr=document.createElement("tr")

if(sv.score<5){
tr.classList.add("weak")
}

tr.innerHTML=`
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-name="${sv.name}">Xóa</button></td>
`

tableBody.appendChild(tr)

total+=sv.score

})

const avg=(total/filteredStudents.length).toFixed(2)

stats.textContent=
"Tổng SV: "+filteredStudents.length+" | Điểm TB: "+avg

}

addBtn.addEventListener("click",function(){

const name=nameInput.value.trim()
const score=parseFloat(scoreInput.value)

if(name===""){
alert("Nhập họ tên")
return
}

if(isNaN(score)||score<0||score>10){
alert("Điểm 0-10")
return
}

students.push({name,score})

nameInput.value=""
scoreInput.value=""
nameInput.focus()

applyFilters()

})

tableBody.addEventListener("click",function(e){

if(e.target.tagName==="BUTTON"){

const name=e.target.getAttribute("data-name")

students=students.filter(function(sv){
return sv.name!==name
})

applyFilters()

}

})

search.addEventListener("input",applyFilters)

filter.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",function(){

if(sortOrder==="asc"){
sortOrder="desc"
this.textContent="Điểm ▼"
}else{
sortOrder="asc"
this.textContent="Điểm ▲"
}

applyFilters()

})

scoreInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addBtn.click()
}

})