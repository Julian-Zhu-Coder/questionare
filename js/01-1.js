console.log("Logging: hello 01-1");
let storage = window.localStorage;
let list = JSON.parse(storage.getItem("list"));
let onlyNum = JSON.parse(storage.getItem("onlyNum"));
/**
 * 往页面更新问卷列表
 */
function freshQuestionareList() {
    console.log("freshQuestionList");
    let questionareListObj = document.getElementById("questionareList");
    while(questionareListObj.firstChild){
        questionareListObj.removeChild(questionareListObj.firstChild);
    }
    if (list == null || list.length <= 0){
        list = [];
        storage.setItem("list",JSON.stringify(list));
    }
    if (onlyNum == null || onlyNum == ""){
        onlyNum = 1;
        storage.setItem("onlyNum",JSON.stringify(onlyNum));
    }
    if (list != null && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            let j = list[i].id;//j为取得value问卷的唯一key
            let data = storage.getItem(j);
            if (data != null || data != "") {
                let questionare = JSON.parse(data);
                freshQuestionare(j, questionare);
            }
        }
    }else {
        alert("列表无问卷，请先新建问卷");
        console.log("localstorage无list[]");
    }
}

/**
 * 往页面更新单个问卷
 * @param j localstorage.key
 * @param questionare localstorage.value
 */
function freshQuestionare(j,questionare) {
    console.log("freshQuestionare");
    let questionareListObj = document.getElementById("questionareList");
    let questionareObj = document.createElement("div");
    questionareObj.setAttribute("class","questionare");
    questionareObj.onmouseover = function () {
        questionareObj.className = "over";
    }
    questionareObj.onmouseout = function () {
        questionareObj.className = "out";
    }
    for (i = 1; i <= 5; i++){
        let divObj = document.createElement("div");
        if (i == 1){
            divObj.setAttribute("class","checkbox");
            let inputObj = document.createElement("input");
            inputObj.setAttribute("type","checkbox");
            inputObj.setAttribute("name","cb");
            inputObj.setAttribute("onclick","isCheckAll()");
            inputObj.setAttribute("value",j);
            divObj.appendChild(inputObj);
        }else if (i == 2){
            divObj.setAttribute("class","title");
            let pObj = document.createElement("p");
            // pObj.setAttribute("value",questionare.title);
            divObj.appendChild(pObj);
            pObj.innerHTML += questionare.title;
        }else if (i == 3){
            divObj.setAttribute("class","time");
            let pObj = document.createElement("p");
            // pObj.setAttribute("value",questionare.deadline);
            divObj.appendChild(pObj);
            pObj.innerHTML += questionare.deadline;
        }else if (i == 4){
            divObj.setAttribute("class","state");
            let pObj = document.createElement("p");
            // pObj.setAttribute("value",questionare.state);
            if (questionare.state === "发布中"){
                divObj.setAttribute("class","stateGreen");
            }
            if (questionare.state === "已结束"){
                divObj.setAttribute("class","stateRed");
            }
            divObj.appendChild(pObj);
            pObj.innerHTML += questionare.state;
        }else if (i == 5){
            divObj.setAttribute("class","operation");
            let btnFullin = document.createElement("button");//填写问卷
            let btnEdit = document.createElement("button");//编辑问卷
            let btnDelete = document.createElement("button");//删除问卷
            let btnView = document.createElement("button");//查看数据
            btnFullin.setAttribute("onclick","fillinQuestionare("+j+")");
            btnDelete.setAttribute("onclick","deleteQuestionare(this)");
            btnEdit.setAttribute("onclick","editQuestionare("+j+")");
            btnView.setAttribute("onclick","viewQuestionareData("+j+")");
            divObj.appendChild(btnFullin);
            divObj.appendChild(btnEdit);
            divObj.appendChild(btnDelete);
            divObj.appendChild(btnView);
            btnFullin.innerHTML += "填写";
            btnEdit.innerHTML += "编辑";
            btnDelete.innerHTML += "删除";
            btnView.innerHTML += "查看数据";
        }
        questionareObj.appendChild(divObj);
    }
    // questionareObj.setAttribute()
    questionareListObj.appendChild(questionareObj);
}

/**
 * 新建问卷
 */
function newFile() {
    //跳转页面
    window.location.href = "./03-2.html?id="+0+"";
}

/**
 * 填写问卷
 * @param i
 */
function fillinQuestionare(i) {
    // alert("即将跳转页面");
    var state = JSON.parse(storage.getItem(i)).state;
    if (state === "发布中"){
        window.location.href = "./form.html?id="+i+"";
    }else if (state === "未发布"){
        alert("问卷未发布");
    }else if (state === "已结束"){
        alert("问卷已结束");
    }
}

/**
 * 编辑问卷
 * @param i
 */
function editQuestionare(i) {
    // alert("即将跳转页面");
    window.location.href = "./03-2.html?id="+i+"";
}
/**
 * 查看问卷数据
 * @param i
 */
function viewQuestionareData(i) {
    // alert("即将跳转页面");
    window.location.href = "./01-3.html?id="+i+"";
}


/**
 * 删除问卷
 * @param i
 */
function deleteQuestionare(obj) {
    var i = obj.parentNode.parentNode.firstChild.firstChild.value;
    // storage.removeItem(i);
    // if (list != null) {
    //     for (var j = 0; j < list.length; j++) {
    //         if (list[j].id == i) {
    //             list.splice(j, 1);
    //             storage.setItem("list",JSON.stringify(list));
    //             break;
    //         }
    //     }
    // }
    removeData(i);
    freshQuestionareList();
}

/**
 * 移除localStorage的list[i]和等于i的key
 * @param i
 */
function removeData(i) {

    storage.removeItem(i);
    if (list != null) {
        for (var j = 0; j < list.length; j++) {
            if (list[j].id == i) {
                list.splice(j, 1);
                storage.setItem("list",JSON.stringify(list));
                break;
            }
        }
    }
}

/**
 * 选择所有问卷
 */
function selectAll() {
    var cbs = document.getElementsByName("cb");
    var cbAll = document.getElementById("selectAll");
    if (cbAll.checked){
        for (var i = 0; i < cbs.length; i++){
            cbs[i].checked = true;
        }
    }else {
        for (var i = 0; i < cbs.length; i++){
            cbs[i].checked = false;
        }
    }
}

/**
 * 检测是否全选，更改全选框状态
 */
function isCheckAll(){
    var isSelectAll = true;
    var cbs = document.getElementsByName("cb");
    for (var i = 0; i < cbs.length; i++){
        var cb = cbs[i];
        var isSelect = cb.checked;
        if (!isSelect){
            isSelectAll = false;
        }
    }
    var cbAll = document.getElementById("selectAll");
    cbAll.checked = isSelectAll;
}

/**
 * 删除选中
 */
function deleteSelected() {
    var cbsObj = document.getElementsByName("cb");
    var cbAllObj = document.getElementById("selectAll");
    // alert(cbs[1].checked);
    for (var i = 0; i < cbsObj.length; i++){
        var cbObj = cbsObj[i];
        if (cbObj.checked){
            // deleteQuestionare(cbObj);
            removeData(cbObj.value);
        }
    }
    freshQuestionareList();
    cbAllObj.checked = false;
}