let students = JSON.parse(localStorage.getItem("messData")) || [];

const rate = 42;

function saveData(){
localStorage.setItem("messData",JSON.stringify(students));
}

function addStudent(){

let name=document.getElementById("name").value;

if(name.trim()=="") return;

students.push({
name:name,
plates:0,
paid:0
});

saveData();
display();

document.getElementById("name").value="";
}

function addPlate(index){

students[index].plates++;

saveData();
display();

}

function resetPlate(index){

students[index].plates=0;

saveData();
display();

}

function deleteStudent(index){

if(confirm("Delete student?")){

students.splice(index,1);

saveData();
display();

}

}

function renameStudent(index){

let newName=prompt(
"Enter new student name",
students[index].name
);

if(newName && newName.trim()!=""){

students[index].name=newName;

saveData();
display();

}

}

function toggleMenu(index){

document.querySelectorAll(".menu")
.forEach(menu=>{
menu.style.display="none";
});

let menu=document.getElementById(
"menu"+index
);

menu.style.display=
menu.style.display==="block"
? "none"
: "block";

}

function display(){

let data="";

students.forEach((s,index)=>{

let total=s.plates*rate;
let due=total-s.paid;

data += `

<tr>

<td>

<div class="menu-box">

${s.name}

<button class="menu-btn"
onclick="toggleMenu(${index})">
&#8942;
</button>
<div class="menu" id="menu${index}">

<button onclick="renameStudent(${index})">
Rename
</button>

<button onclick="deleteStudent(${index})">
Delete
</button>

</div>

</div>

</td>

<td>

<input
type="number"
min="0"
class="plate-input"
value="${s.plates}"

onchange="
students[${index}].plates=
parseInt(this.value)||0;

saveData();
display();
">

<br><br>

<button onclick="addPlate(${index})">
+ Add Plate
</button>

<button onclick="resetPlate(${index})">
Reset
</button>

</td>

<td>
&#8377;${total}
</td>

<td>

<input
type="number"
value="${s.paid}"

onchange="
students[${index}].paid=
parseInt(this.value)||0;

saveData();
display();
">

</td>

<td>

&#8377;${due}

</td>

</tr>

`;

});

document.getElementById(
"studentList"
).innerHTML=data;

}

display();