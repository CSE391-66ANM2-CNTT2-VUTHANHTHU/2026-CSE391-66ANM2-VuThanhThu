const steps=document.querySelectorAll(".step")
const progress=document.getElementById("progressBar")

let current=0

function showStep(i){

steps.forEach(step=>step.classList.remove("active"))

steps[i].classList.add("active")

progress.style.width=((i+1)/steps.length*100)+"%"

}

document.getElementById("next1").onclick=function(){

const name=document.getElementById("name").value
const birth=document.getElementById("birth").value
const gender=document.querySelector("input[name='gender']:checked")

if(name===""||birth===""||!gender){

alert("Nhập đầy đủ thông tin")

}else{

current=1
showStep(current)

}

}

document.getElementById("next2").onclick=function(){

const email=document.getElementById("email").value
const pass=document.getElementById("pass").value
const confirm=document.getElementById("confirm").value

if(email===""||pass===""||confirm!==pass){

alert("Thông tin tài khoản chưa đúng")

}else{

current=2

const summary=`
Tên: ${document.getElementById("name").value}<br>
Ngày sinh: ${document.getElementById("birth").value}<br>
Email: ${email}
`

document.getElementById("summary").innerHTML=summary

showStep(current)

}

}

document.getElementById("back1").onclick=function(){

current=0
showStep(current)

}

document.getElementById("back2").onclick=function(){

current=1
showStep(current)

}

document.getElementById("form").onsubmit=function(e){

e.preventDefault()

document.getElementById("form").style.display="none"

document.getElementById("done").textContent="Đăng ký hoàn tất 🎉"

}