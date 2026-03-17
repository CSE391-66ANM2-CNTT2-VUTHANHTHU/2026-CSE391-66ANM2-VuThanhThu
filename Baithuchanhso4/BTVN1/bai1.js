const form=document.getElementById("form")

const fullname=document.getElementById("fullname")
const email=document.getElementById("email")
const password=document.getElementById("password")
const confirm=document.getElementById("confirm")

const nameCount=document.getElementById("nameCount")
const strengthLevel=document.getElementById("strengthLevel")

const togglePass=document.getElementById("togglePass")

const nameError=document.getElementById("nameError")
const emailError=document.getElementById("emailError")
const passError=document.getElementById("passError")
const confirmError=document.getElementById("confirmError")

const success=document.getElementById("success")

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function validateName(){

const name=fullname.value.trim()

if(name.length<3){
nameError.textContent="Tên tối thiểu 3 ký tự"
return false
}

nameError.textContent=""
return true

}

function validateEmail(){

if(!emailRegex.test(email.value)){
emailError.textContent="Email không hợp lệ"
return false
}

emailError.textContent=""
return true

}

function validatePassword(){

if(!passRegex.test(password.value)){
passError.textContent="Mật khẩu yếu"
return false
}

passError.textContent=""
return true

}

function validateConfirm(){

if(confirm.value!==password.value){
confirmError.textContent="Mật khẩu không khớp"
return false
}

confirmError.textContent=""
return true

}

fullname.addEventListener("input",function(){

nameCount.textContent=fullname.value.length+"/50"
nameError.textContent=""

})

password.addEventListener("input",function(){

const value=password.value

let strength=0

if(value.length>=8) strength++
if(/[A-Z]/.test(value)) strength++
if(/[0-9]/.test(value)) strength++
if(/[!@#$%^&*]/.test(value)) strength++

if(strength<=1){

strengthLevel.style.width="33%"
strengthLevel.style.background="red"

}else if(strength<=3){

strengthLevel.style.width="66%"
strengthLevel.style.background="orange"

}else{

strengthLevel.style.width="100%"
strengthLevel.style.background="green"

}

})

togglePass.addEventListener("click",function(){

if(password.type==="password"){
password.type="text"
}else{
password.type="password"
}

})

form.addEventListener("submit",function(e){

e.preventDefault()

const valid=
validateName() &
validateEmail() &
validatePassword() &
validateConfirm()

if(valid){

form.style.display="none"
success.textContent="Đăng ký thành công 🎉 "+fullname.value

}

})