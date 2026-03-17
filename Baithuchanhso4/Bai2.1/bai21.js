const form=document.getElementById("registerForm")

const fullname=document.getElementById("fullname")
const email=document.getElementById("email")
const phone=document.getElementById("phone")
const password=document.getElementById("password")
const confirmPassword=document.getElementById("confirmPassword")
const terms=document.getElementById("terms")

const successMessage=document.getElementById("successMessage")

const regexName=/^[a-zA-ZÀ-ỹ\s]+$/
const regexEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const regexPhone=/^0[0-9]{9}$/
const regexPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function showError(input,message){

let error=document.getElementById(input.id+"Error")

error.innerText=message
error.style.display="block"

input.classList.add("invalid")
input.classList.remove("valid")

}

function clearError(input){

let error=document.getElementById(input.id+"Error")

error.innerText=""
error.style.display="none"

input.classList.remove("invalid")
input.classList.add("valid")

}

function validateFullname(){

let value=fullname.value.trim()

if(value===""){
showError(fullname,"Không được để trống")
return false
}

if(value.length<3){
showError(fullname,"Ít nhất 3 ký tự")
return false
}

if(!regexName.test(value)){
showError(fullname,"Chỉ được chứa chữ")
return false
}

clearError(fullname)
return true

}

function validateEmail(){

let value=email.value.trim()

if(value===""){
showError(email,"Không được để trống")
return false
}

if(!regexEmail.test(value)){
showError(email,"Email không hợp lệ")
return false
}

clearError(email)
return true

}

function validatePhone(){

let value=phone.value.trim()

if(value===""){
showError(phone,"Không được để trống")
return false
}

if(!regexPhone.test(value)){
showError(phone,"SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError(phone)
return true

}

function validatePassword(){

let value=password.value

if(value===""){
showError(password,"Không được để trống")
return false
}

if(!regexPassword.test(value)){
showError(password,"≥8 ký tự gồm chữ hoa, chữ thường và số")
return false
}

clearError(password)
return true

}

function validateConfirmPassword(){

if(confirmPassword.value!==password.value){
showError(confirmPassword,"Mật khẩu không khớp")
return false
}

clearError(confirmPassword)
return true

}

function validateGender(){

let genders=document.getElementsByName("gender")

for(let g of genders){
if(g.checked){
document.getElementById("genderError").style.display="none"
return true
}
}

document.getElementById("genderError").innerText="Chọn giới tính"
document.getElementById("genderError").style.display="block"
return false

}

function validateTerms(){

if(!terms.checked){
document.getElementById("termsError").innerText="Bạn phải đồng ý điều khoản"
document.getElementById("termsError").style.display="block"
return false
}

document.getElementById("termsError").style.display="none"
return true

}

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirmPassword)

fullname.addEventListener("input",()=>clearError(fullname))
email.addEventListener("input",()=>clearError(email))
phone.addEventListener("input",()=>clearError(phone))
password.addEventListener("input",()=>clearError(password))
confirmPassword.addEventListener("input",()=>clearError(confirmPassword))

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

successMessage.innerHTML=
"<p class='success'>Đăng ký thành công! 🎉<br>Xin chào "+fullname.value+"</p>"

}

})