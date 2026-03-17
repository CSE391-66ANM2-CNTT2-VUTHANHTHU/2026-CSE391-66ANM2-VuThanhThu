const nameInput=document.getElementById("name")
const scoreInput=document.getElementById("score")
const addBtn=document.getElementById("addBtn")
const tableBody=document.getElementById("tableBody")
const stats=document.getElementById("stats")

let students=[]

function getRank(score){

if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"

}

function renderTable(){

tableBody.innerHTML=""

let total=0

students.forEach(function(sv,index){

const tr=document.createElement("tr")

if(sv.score<5){
tr.classList.add("weak")
}

tr.innerHTML=`
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-index="${index}">Xóa</button></td>
`

tableBody.appendChild(tr)

total+=sv.score

})

const avg=students.length? (total/students.length).toFixed(2):0

stats.textContent=
"Tổng sinh viên: "+students.length+" | Điểm TB: "+avg

}

addBtn.addEventListener("click",function(){

const name=nameInput.value.trim()
const score=parseFloat(scoreInput.value)

if(name===""){
alert("Họ tên không được để trống")
return
}

if(isNaN(score)||score<0||score>10){
alert("Điểm phải từ 0 đến 10")
return
}

students.push({name,score})

renderTable()

nameInput.value=""
scoreInput.value=""
nameInput.focus()

})

scoreInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addBtn.click()
}

})

tableBody.addEventListener("click",function(e){

if(e.target.tagName==="BUTTON"){

const index=e.target.getAttribute("data-index")

students.splice(index,1)

renderTable()

}

})