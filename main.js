class Task{
    constructor(id, title, desc, timeBegin, timeEnd, status){
        this.__id = id;
        this.__title = title;
        this.__desc = desc;
        this.__timeBegin = timeBegin;
        this.__timeEnd = timeEnd;
        this.__status = status;
    }

    set id(value) { this.__id = value; }
    get id() { return this.__id; };

    set title(value) { this.__title = value; }
    get title() { return this.__title; };
    
    set desc(value) { this.__desc = value; }
    get desc() { return this.__desc; };
    
    set timeBegin(value) { this.__timeBegin = value; }
    get timeBegin() { return this.__timeBegin; };
    
    set timeEnd(value) { this.__timeEnd = value; }
    get timeEnd() { return this.__timeEnd; };
    
    set status(value) { this.__status = value; }
    get status() { return this.__status; };

}

/**
 * 
 * 
 */

taskList = Array();

function create() {
    btn = document.getElementById("btnAdd");
    btn.addEventListener('click', addTask);

    btn = document.getElementById("btnEdit");

    rootDom = document.getElementById('root');
    titleDom = document.getElementById('title');
    descDom = document.getElementById('desc');
    timeBeginDom = document.getElementById('timebegin');
    timeEndDom = document.getElementById('timeend');
    statusDom = document.getElementById('status');

    editDom = document.getElementById('edit');

    editTitleDom = document.getElementById('edit_title');
    editDescDom = document.getElementById('edit_desc');
    editTimeBeginDom = document.getElementById('edit_timebegin');
    editTimeEndDom = document.getElementById('edit_timeend');
    editStatusDom = document.getElementById('edit_status');

}

function render() {
    rootDom.innerHTML  = '';
    taskList.forEach(task => {
        rootDom.appendChild(createNodeTask(task));
    })
}

function createNodeTask(task) {
    nodeRow = document.createElement('div');
    nodeRow.setAttribute('class', 'row m-2');

    nodeId = document.createElement('div');
    nodeId.setAttribute('class', 'col-md-1');
    nodeId.innerHTML = task.id;
    nodeRow.appendChild(nodeId);

    nodeTitle = document.createElement('div');
    nodeTitle.setAttribute('class', 'col-md-2');
    nodeTitle.innerHTML = task.title;
    nodeRow.appendChild(nodeTitle);

    nodeDesc = document.createElement('div');
    nodeDesc.setAttribute('class', 'col-md-2');
    nodeDesc.innerHTML = task.desc;
    nodeRow.appendChild(nodeDesc);

    nodeTimeBegin = document.createElement('div');
    nodeTimeBegin.setAttribute('class', 'col-md-2');
    nodeTimeBegin.innerHTML = task.timeBegin;
    nodeRow.appendChild(nodeTimeBegin);

    nodeTimeEnd = document.createElement('div');
    nodeTimeEnd.setAttribute('class', 'col-md-2');
    nodeTimeEnd.innerHTML = task.timeEnd;
    nodeRow.appendChild(nodeTimeEnd);

    nodeStatus = document.createElement('div');
    nodeStatus.setAttribute('class', 'col-md-2');
    nodeStatus.innerHTML = task.status;
    nodeRow.appendChild(nodeStatus);

    // Create button Edit
    nodeBtnWrap = document.createElement('div');
    nodeBtnWrap.setAttribute('class', 'col-md-1 d-flex');
    nodeRow.appendChild(nodeBtnWrap);
    
    nodeButtonEdit = document.createElement('button');
    nodeButtonEdit.setAttribute('class', 'btn btn-warning');
    nodeButtonEdit.innerHTML = 'Edit';
    nodeButtonEdit.addEventListener('click', function(){
        editTask(task.id);
    });

    nodeBtnDelete = document.createElement('button');
    nodeBtnDelete.setAttribute('class', 'btn btn-danger mx-2');
    nodeBtnDelete.innerHTML = 'Delete';
    nodeBtnDelete.addEventListener('click', function(){
        deteleTask(task.id);
    });
    
    nodeBtnWrap.appendChild(nodeButtonEdit);
    nodeBtnWrap.appendChild(nodeBtnDelete);

    
    nodeHr = document.createElement('hr');
    nodeHr.setAttribute('class', 'mt-3');
    nodeRow.appendChild(nodeHr);


    btn.addEventListener('click', function(){
        updateTask(task.id);
    });


    return nodeRow;
}

// create task
let id = 0;
function addTask() {
    id++;
    task = new Task(
        id,
        titleDom.value,
        descDom.value,
        timeBeginDom.value,
        timeEndDom.value,
        statusDom.value
    )
    taskList.push(task);
    render();
}

function deteleTask(id) {
    i = 0;
    for(; i < taskList.length; i++) {
        if(taskList[i].id == id)  taskList.splice(i, 1);
    }
    render();
}

function editTask(id) {
    taskList.forEach(task => {
        if(task.id == id) {
            editTitleDom.value = task.title;
            editDescDom.value = task.desc;
            editTimeBeginDom.value = task.timeBegin;
            editTimeEndDom.value = task.timeEnd;
            editStatusDom.value = task.status;
            editDom.style.display  = 'block';
        }
    })

}

function updateTask(id){
    taskList.forEach(function(task){
        if(task.id == id) {
            editDom.style.display  = 'none';
            task.title = editTitleDom.value;
            task.desc = editDescDom.value;
            task.timeBegin = editTimeBeginDom.value;
            task.timeEnd = editTimeEndDom.value;
            task.status = editStatusDom.value;
        }
    })
    render();
}

window.onload = function(e) {
    create();
    render();
}