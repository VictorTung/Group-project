////test
console.log("testt")



////test

////////////////////// create an array and other variable//////////////////////////////////////////////////////////////////
////////////////////// for saving GET data to create a nonrepeated id for POST
let dataArray = [];
////////////////////// inside POST function for getting id of element in dataArray and sorting
let idArray = [];

////////////////////// all 4 RESTFUL method function //////////////////////////////////////////////////////////////////////

// create Get function for the fisrt execute to add data to dataArray////////////////////////////////////////////////////
const getExecute = async (e) => {
  const data = await fetch('http://localhost:8080/todolist')
  const jsonResponse = await data.json()
  jsonResponse.forEach(data => dataArray.push(data))
  displayData(jsonResponse);
}

const displayData = (inputDataArray) => {
  let displayhtml =  `
  <tbody id="tableBody">
  </tbody>`;
  for (let i of inputDataArray){
      displayhtml = displayhtml +
      `
      <tr >
          <td class="id">${i.id}</td>
          <td class="name">${i.name}</td>
          <td class="description">${i.description}</td>
          <td class="assignedto">${i.assignedto}</td>
          <td class="duedate">${i.duedate}</td>
          <td class="status">${i.status}</td>
          <td class="edition d-flex justify-content-around">
          <button type="button"  class="btn btn-primary edit  "  onclick="prePutExecution(${i.id})" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-pen"></i></button>
          <button type="button"  class="btn btn-danger  delete"  onclick="delExecute(${i.id})"   ><i class="fas fa-trash-alt"></i></button>
          </td>
      </tr>
      `
  }
  document.querySelector('#showToDoList').innerHTML = displayhtml;

  /////////////// summary bar show number
  let toDoCount = 0;
  let inProgressCount = 0;
  let reviewCount = 0;
  let doneCount = 0;

  dataArray.forEach(element => {
    switch (element.status) {
    case 'To Do':
      toDoCount++;
      break;
    case 'In Progress':
      inProgressCount++;
      break;
    case 'Review':
      reviewCount++;
      break;
    default:
      doneCount++;
      break;
    }
  })
  document.querySelector('#toDo').innerHTML = toDoCount;
  document.querySelector('#inProgress').innerHTML = inProgressCount;
  document.querySelector('#review').innerHTML = reviewCount;
  document.querySelector('#done').innerHTML = doneCount;
}

// create Post function ////////////////////////////////////////////////////
const postExecute = async (event) => {
  event.preventDefault();
  /////////////////////// checking empty blank field
  if(document.querySelector('#name').value &&
     document.querySelector('#description').value &&
     document.querySelector('#assignedto').value &&
     document.querySelector('#duedate').value &&
     document.querySelector('#status').value)
     {

    ///////////////////////create variable
    const formObject = {};
    let idToPost;

    ///////////////////////create non-repeated id
    idArray = [];
    dataArray.map(element => {
      idArray.push(element.id)
    })
    idArray.sort()
    for(let i = 0; i < idArray.length; i++) {
      if (i !== Number(idArray[i])) {
        idToPost = i;
        break;
      } else {
        idToPost = i + 1;
      }
    }
    formObject['id'] = `${idToPost}`;
    formObject['name'] = document.querySelector('#name').value;
    formObject['description'] = document.querySelector('#description').value;
    formObject['assignedto'] = document.querySelector('#assignedto').value;
    formObject['duedate'] = document.querySelector('#duedate').value;
    formObject['status'] = document.querySelector('#status').value;
    dataArray.push(formObject)
    const response = await fetch('http://localhost:8080/todolist', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formObject),
    })
    let jsonResponse = await response.json();
    getExecute();
    document.querySelector('#name').value = "";
    document.querySelector('#description').value = "";
    document.querySelector('#assignedto').value = "";
    document.querySelector('#duedate').value = "";
    document.querySelector('#status').value = "";
    $('.exampleModal').toggleClass('is-visible'); // or location.reload()
    dataArray = [];
  } else {
    alert('please fill all the blank')
  }
}

// create Put function ////////////////////////////////////////////////////
const putExecute = async (event) => {
  const id = event.target.id;
  const formObject = {};
  formObject['name'] = document.querySelector('#name').value;
  formObject['description'] = document.querySelector('#description').value;
  formObject['assignedto'] = document.querySelector('#assignedto').value;
  formObject['duedate'] = document.querySelector('#duedate').value;
  formObject['status'] = document.querySelector('#status').value;

  const response = await fetch(`http://localhost:8080/todolist/` + id, {
      method: 'PUT',
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formObject),
  })
  let jsonResponse = await response.json();
  location.reload();
}

  // create Delete function ////////////////////////////////////////////////////
  const delExecute = async (id) => {
    dataArray.splice(0, dataArray.length)
    const response = await fetch(`http://localhost:8080/todolist/` + id, {
        method: 'DELETE',
    })
    let jsonResponse = await response.json();
    getExecute();
  }

////////////////////////// 4 method execution //////////////////////////////////////////////////////////////////////////////

////////////////////////// GET execution
window.addEventListener('load', getExecute)

////////////////////////// POST execution
const postButton = document.querySelector('#submitForm');
postButton.addEventListener('click', postExecute)

////////////////////////// PUT preparation function
const prePutExecution = async (btnId) => {
  ////// get the right array position
  let id;
  idArray = [];
  dataArray.map(element => {
    idArray.push(element.id)
  })
  id = idArray.indexOf(`${btnId}`);
  ///// pre-write the value to the modal
  document.querySelector('#name').value = dataArray[id].name;
  document.querySelector('#description').value = dataArray[id].description;
  document.querySelector('#assignedto').value = dataArray[id].assignedto;
  document.querySelector('#duedate').value = dataArray[id].duedate;
  // document.querySelector('#status').options.value = dataArray[id].status;  // can't show the value
  document.querySelector('.updateBtn').id = btnId;
  document.querySelector('#submitForm').style.display = "none";
  document.querySelector('.updateBtn').style.display = "block";
}

////////////////////////// PUT preparation function execute
document.querySelectorAll('.edit').forEach(item => {
  item.addEventListener('click', () => {
    prePutExecution;
  })})

////////////////////////// PUT execution
const putButton = document.querySelector('.updateBtn');
putButton.addEventListener('click', putExecute)


////////////////////////// DELETE execution
document.querySelectorAll('.delete').forEach(item => {
  item.addEventListener('click', delExecute)
})

////////////////////////// sidebar function: show and hide////////////////////////////////////////////////////
const showAndHideButton = () => {
  let x = document.getElementById('layoutSidenav_nav')
  if(x.style.transform === 'translateX(-225px)') {
      x.style.transform = 'translateX(0px)';
  } else {
    x.style.transform = 'translateX(-225px)';
  }
}

////////////////////////// sidebar function execution ///////////////////////////////////////////////////////////
document.getElementById('sidebarToggle').addEventListener('click', showAndHideButton)

////////////////////////// taskAddButton function and execution ////////////////////////////////////////////////////
const taskAddButton = document.querySelector('#taskAddButton' && '#taskAddButton2')
taskAddButton.addEventListener('click', () => {
  document.querySelector('#name').value = ""
  document.querySelector('#description').value = ""
  document.querySelector('#assignedto').value = ""
  document.querySelector('#duedate').value = ""
  document.querySelector('#status').value = ""

  document.querySelector('#submitForm').style.display = "block";
  document.querySelector('.updateBtn').style.display = "none";
}
)





//////////////////////////// show progress bar function: when in progress is selected//////////////////////////////////////
function progressBarShow(divId, element) {
  document.getElementById(divId).style.display = element.value == "In Progress" ? 'block' : 'none';

}

//////////////////////////// filter function //////////////////////////////////////
// //Table---Filter ////
// $("input:checkbox:not(:checked)").each(function() {
//   var column = "tr ." + $(this).attr("name");
//   $(column).hide();
// });

// $("input:checkbox").click(function(){
//   var column = "tr ." + $(this).attr("name");
//   $(column).toggle();
// });

////////////////////////// seraching
const charactersList = document.getElementById('showToDoList');
const searchBar = document.querySelectorAll('.searchBar');
// const searchBarTwo = document.getElementById('searchBar2');

// const filter = (e) => {
//   const searchString = e.target.value.toLowerCase();
//   const infoArray = ["id", "name", "description", "assignedto", "duedate", "status"]
//   const storageArray = [];

//   // searchBar.length

//   for (let i = 0; i < 3; i++) {
//     let input = searchBar[i].value.toLowerCase();
//     let info = infoArray[i]

//     if (storageArray.length == 0) {
//       const filteredData = dataArray.filter(data => {
//         data[info].toLowerCase().includes(input)
//       })
//       filteredData.forEach(element => {
//         if (storageArray.includes(element)){
//         } else {
//           storageArray.push(element)
//         }
//       })
//     } else {

//     }
//     };
//     displayData(storageArray)

//     if (storageArray == []) {
//       displayData(dataArray)
//     } else {
//       displayData(storageArray);
//     }
// }

// const filter1 = (e) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredData = dataArray.filter((data) => {
//         return (
//             data.id.toLowerCase().includes(searchString)
//         );
//     });
//     displayData(filteredData);
// };

// const filter2 = (e) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredData = dataArray.filter((data) => {
//         return (
//             data.name.toLowerCase().includes(searchString)
//         );
//     });
//     displayData(filteredData);
// };

const filter3 = (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredData = dataArray.filter((data) => {
        return (
            data.id.toLowerCase().includes(searchString) ||
            data.name.toLowerCase().includes(searchString) ||
            data.description.toLowerCase().includes(searchString) ||
            data.assignedto.toLowerCase().includes(searchString) ||
            data.duedate.toLowerCase().includes(searchString) ||
            data.status.toLowerCase().includes(searchString)
        );
    });
    displayData(filteredData);
};

// for (let i = 0; i < searchBar.length; i++) {
//   searchBar[i].addEventListener("keyup", filter);
//   };

for (let i = 0; i < searchBar.length; i++) {
  searchBar[i].addEventListener("keyup", filter3);
  };

if (searchBar.value = "") {
  getExecute();
}

// https://www.cssscript.com/minimal-table-filtering/     //filter function
//https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/   // multiple element with same event