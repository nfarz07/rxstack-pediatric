```javascript
const drugs = {

PO:[

{
category:"analgesic",
name:"Paracetamol",
dose:15,
frequency:"QID",
strengths:[
{label:"120 mg/5 mL",mgml:24},
{label:"250 mg/5 mL",mgml:50}
]
},

{
category:"analgesic",
name:"Ibuprofen",
dose:10,
frequency:"TDS",
strengths:[
{label:"100 mg/5 mL",mgml:20}
]
},

{
category:"antibiotic",
name:"Amoxicillin",
dose:25,
frequency:"BD",
strengths:[
{label:"125 mg/5 mL",mgml:25},
{label:"250 mg/5 mL",mgml:50},
{label:"400 mg/5 mL",mgml:80}
]
},

{
category:"antibiotic",
name:"Co-amoxiclav",
dose:22.5,
frequency:"BD",
strengths:[
{label:"156.25 mg/5 mL",mgml:31.25},
{label:"312.5 mg/5 mL",mgml:62.5}
]
},

{
category:"antibiotic",
name:"Cefixime",
dose:4,
frequency:"BD",
strengths:[
{label:"50 mg/5 mL",mgml:10},
{label:"100 mg/5 mL",mgml:20}
]
},

{
category:"antibiotic",
name:"Cephalexin",
dose:25,
frequency:"BD",
strengths:[
{label:"125 mg/5 mL",mgml:25},
{label:"250 mg/5 mL",mgml:50}
]
},

{
category:"antibiotic",
name:"Azithromycin",
dose:10,
frequency:"OD",
strengths:[
{label:"200 mg/5 mL",mgml:40}
]
},

{
category:"antibiotic",
name:"Clarithromycin",
dose:7.5,
frequency:"BD",
strengths:[
{label:"125 mg/5 mL",mgml:25},
{label:"250 mg/5 mL",mgml:50}
]
},

{
category:"respiratory",
name:"Salbutamol Syrup",
dose:0.1,
frequency:"TDS",
strengths:[
{label:"2 mg/5 mL",mgml:0.4}
]
},

{
category:"gi",
name:"Ondansetron",
dose:0.15,
frequency:"TDS",
strengths:[
{label:"4 mg/5 mL",mgml:0.8}
]
}

],

IV:[

{
category:"antibiotic",
name:"Ceftriaxone",
dose:50,
frequency:"OD",
strengths:[
{label:"1 g in 10 mL",mgml:100}
]
},

{
category:"antibiotic",
name:"Ampicillin",
dose:50,
frequency:"QID",
strengths:[
{label:"500 mg in 5 mL",mgml:100}
]
},

{
category:"antibiotic",
name:"Cefotaxime",
dose:50,
frequency:"TDS",
strengths:[
{label:"1 g in 10 mL",mgml:100}
]
},

{
category:"antibiotic",
name:"Amikacin",
dose:15,
frequency:"OD",
strengths:[
{label:"100 mg/2 mL",mgml:50}
]
},

{
category:"antibiotic",
name:"Meropenem",
dose:20,
frequency:"TDS",
strengths:[
{label:"500 mg in 10 mL",mgml:50}
]
}

],

IM:[

{
category:"antibiotic",
name:"Gentamicin",
dose:7.5,
frequency:"OD",
strengths:[
{label:"40 mg/mL",mgml:40}
]
}

]

};

function getFilteredDrugs(){

const route =
document.getElementById("route").value;

const category =
document.getElementById("category").value;

const search =
document.getElementById("drugSearch")
.value
.toLowerCase();

return drugs[route].filter(drug => {

const categoryMatch =
category==="all" ||
drug.category===category;

const searchMatch =
drug.name
.toLowerCase()
.includes(search);

return categoryMatch &&
searchMatch;

});

}

function loadDrugs(){

const drugSelect =
document.getElementById("drug");

drugSelect.innerHTML="";

const filtered =
getFilteredDrugs();

filtered.forEach((drug,index)=>{

const option =
document.createElement("option");

option.value=index;
option.textContent=drug.name;

drugSelect.appendChild(option);

});

loadStrengths();

}

function loadStrengths(){

const strengthSelect =
document.getElementById("strength");

strengthSelect.innerHTML="";

const filtered =
getFilteredDrugs();

if(filtered.length===0){
return;
}

const drug =
filtered[
document.getElementById("drug").value
] || filtered[0];

drug.strengths.forEach((s,index)=>{

const option =
document.createElement("option");

option.value=index;
option.textContent=s.label;

strengthSelect.appendChild(option);

});

}

function calculateDose(){

const weight =
parseFloat(
document.getElementById("weight").value
);

if(!weight){

alert("Please enter weight");
return;

}

const filtered =
getFilteredDrugs();

const drug =
filtered[
document.getElementById("drug").value
];

const strength =
drug.strengths[
document.getElementById("strength").value
];

const totalMg =
weight * drug.dose;

const totalMl =
totalMg / strength.mgml;

document.getElementById("result")
.style.display="block";

document.getElementById("result")
.innerHTML = `

<h3>${drug.name}</h3>

<hr>

<p><b>Weight:</b> ${weight} kg</p>

<p><b>Dose:</b> ${drug.dose} mg/kg/dose</p>

<p><b>Strength:</b> ${strength.label}</p>

<p><b>Required:</b> ${totalMg.toFixed(1)} mg</p>

<p><b>Give:</b> ${totalMl.toFixed(1)} mL per dose</p>

<p><b>Frequency:</b> ${drug.frequency}</p>

<p style="color:red;">
Verify indication and maximum dose.
</p>

`;

}

document
.getElementById("route")
.addEventListener("change",loadDrugs);

document
.getElementById("category")
.addEventListener("change",loadDrugs);

document
.getElementById("drugSearch")
.addEventListener("keyup",loadDrugs);

document
.getElementById("drug")
.addEventListener("change",loadStrengths);

document
.getElementById("darkModeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

loadDrugs();

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker
.register("./sw.js");

});

}
```
