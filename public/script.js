function get() {

    let req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:3000/tasks');

    req.onreadystatechange = () => {
       
        if(req.readyState === 4){
            let arr = JSON.parse(req.response);

            let result = '';
            result += `<th>Name</th><th>Description</th><th>IsDone</th><th>Priority</th>
            <th>Edit</th><th>Delete</th>`

            for (const task of arr) {
                
                result +=
                `
                <tr>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.isDone}</td>
                <td>${task.priority}</td>
                <td><button onclick="put('${task.name}')" class="btn btn-dark">Edit priority</button></td>
                <td><button onclick="deleteTask('${task.name}')" class="btn btn-danger">Delete</button></td>
                </tr>
                `
            }
            document.getElementById('tasks').innerHTML = result;
        } 
    }
    req.send();
}

function post(){

    let tname = document.getElementById('tname').value;
    let tdescription = document.getElementById('tdescription').value;
    let tisDone = document.getElementById('tisDone').value;
    let tpriority = document.getElementById('tpriority').value;
    
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/tasks/add');

    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }

    req.setRequestHeader('Content-type', 'application/json');

    req.send(JSON.stringify({"name":tname, "description":tdescription, "isDone":tisDone, 
    "priority":tpriority }));
}

function put(TaskName){
    let input = prompt('Enter a new priority');

    let req = new XMLHttpRequest(); 
    req.open('PUT', `http://localhost:3000/tasks/update/${TaskName}`);
    
    req.onreadystatechange = () => {
        if(req.readyState === 4) get();
    }
    
    req.setRequestHeader('Content-type', 'application/json');

    req.send(JSON.stringify({"newpriority":input}));
}

function deleteTask(taskname){
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/tasks/delete/${taskname}`);
    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }
    req.send();
}