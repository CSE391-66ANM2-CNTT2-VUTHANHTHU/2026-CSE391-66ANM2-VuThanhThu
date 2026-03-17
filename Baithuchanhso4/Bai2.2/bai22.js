const form=document.getElementById("orderForm")

const product=document.getElementById("product")
const quantity=document.getElementById("quantity")
const deliveryDate=document.getElementById("deliveryDate")
const address=document.getElementById("address")
const note=document.getElementById("note")

const totalEl=document.getElementById("total")
const noteCount=document.getElementById("noteCount")
const summary=document.getElementById("summary")

const prices={
"Áo":150000,
"Quần":200000,
"Giày":500000
}

function showError(id,message){

const error=document.getElementById(id+"Error")

error.innerText=message
error.style.display="block"

document.getElementById(id).classList.add("invalid")

}

function clearError(id){

const error=document.getElementById(id+"Error")

error.style.display="none"

document.getElementById(id).classList.remove("invalid")
document.getElementById(id).classList.add("valid")

}

function validateProduct(){

if(product.value===""){
showError("product","Hãy chọn sản phẩm")
return false
}

clearError("product")
return true

}

function validateQuantity(){

const q=Number(quantity.value)

if(!Number.isInteger(q) || q<1 || q>99){
showError("quantity","Số lượng từ 1 đến 99")
return false
}

clearError("quantity")
return true

}

function validateDate(){

const date=new Date(deliveryDate.value)
const today=new Date()

today.setHours(0,0,0,0)

const maxDate=new Date()
maxDate.setDate(today.getDate()+30)

if(!deliveryDate.value){
showError("date","Chọn ngày giao")
return false
}

if(date<today){
showError("date","Không chọn ngày quá khứ")
return false
}

if(date>maxDate){
showError("date","Không quá 30 ngày")
return false
}

clearError("date")
return true

}

function validateAddress(){

const val=address.value.trim()

if(val.length<10){
showError("address","Địa chỉ ≥ 10 ký tự")
return false
}

clearError("address")
return true

}

function validateNote(){

if(note.value.length>200){
showError("note","Tối đa 200 ký tự")
return false
}

document.getElementById("noteError").style.display="none"
return true

}

function validatePayment(){

const radios=document.getElementsByName("payment")

for(let r of radios){
if(r.checked){
document.getElementById("paymentError").style.display="none"
return true
}
}

document.getElementById("paymentError").innerText="Chọn phương thức thanh toán"
document.getElementById("paymentError").style.display="block"

return false

}

function updateTotal(){

const p=prices[product.value] || 0
const q=Number(quantity.value) || 0

const total=p*q

totalEl.innerText=total.toLocaleString("vi-VN")

}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",function(){

const len=note.value.length

noteCount.innerText=len+"/200"

if(len>200){
noteCount.style.color="red"
}else{
noteCount.style.color="black"
}

})

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
deliveryDate.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment()

if(valid){

const p=product.value
const q=quantity.value
const total=totalEl.innerText
const date=deliveryDate.value

summary.style.display="block"

summary.innerHTML=`
<h3>Xác nhận đơn hàng</h3>
<p>Sản phẩm: ${p}</p>
<p>Số lượng: ${q}</p>
<p>Tổng tiền: ${total} VND</p>
<p>Ngày giao: ${date}</p>

<button id="confirmBtn">Xác nhận</button>
<button id="cancelBtn">Hủy</button>
`

document.getElementById("confirmBtn").onclick=function(){

form.style.display="none"

summary.innerHTML="<h3>Đặt hàng thành công 🎉</h3>"

}

document.getElementById("cancelBtn").onclick=function(){

summary.style.display="none"

}

}

})