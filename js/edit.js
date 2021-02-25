console.log("Logging: hello 01-3");
let storage = window.localStorage;
let list = JSON.parse(storage.getItem("list"));
let onlyNum = JSON.parse(storage.getItem("onlyNum"));
let storageID = 0;//传递参数
let data = {
    "id": "1", "state": "", "createtime": "", "deadline": "", "title": "",
    "questionList": [    ]
};//问卷存储的数据data

function initData() { //初始化问卷data
    console.log("initData");
    storageID = window.location.href.split("=")[1];
    if (storageID > 0) {
        data = JSON.parse(storage.getItem(storageID)); //将storage的json取出   转化为string放到data
    }else{
        data.title = "我的问卷" + onlyNum;
        var d = new Date(); //Tue Dec 08 2020 10:22:56 GMT+0800 (中国标准时间)
        data.deadline = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate()+1); //格式化日期 yyyy-mm-dd  天数加1
    }
    let inputTitle = document.getElementById("title");
    inputTitle.value = data.title;
    var deadline = document.getElementById("deadline");
    deadline.value = data.deadline;
}

function createButton() {  //创建添加问题的3个按钮
    console.log("createButton");
    if (document.querySelector('.option.close')) {
        let option = document.querySelector('.option.close');
        option.setAttribute('class', 'option open');
        option.innerHTML += "<button onclick=\"addSingleChoice()\">单选</button>" +
            "<button onclick=\"addMultipleChoice()\">多选</button>" +
            "<button onclick=\"addTextItem()\">文本题</button>";
    } else {

    }
}

function addSingleChoice() {  //添加单选题
    console.log('addSingleChoice');
    if (data.questionList.length > 9) {
        alert("问卷最多十个问题");
    } else {
        saveData();
        data.questionList.push(
            {
                "scription": "",
                "type": "radio", //单选题
                "answer": [
                    { //answer[0]
                        "text": "",
                        "total": 0,
                    },
                    { //answer[1]
                        "text": "",
                        "total": 0,
                    }
                ]
            });
        updateQuestionList();
    }
}

function addMultipleChoice() {  //添加多选题
    console.log('addSingleChoice');
    if (data.questionList.length > 9) {
        alert("问卷最多十个问题");
    } else {
        saveData();
        data.questionList.push(
            {
                "scription": "",
                "type": "checkbox", //多选题
                "answer": [
                    { "text": "", "total": 0 }, //answer[0]
                    { "text": "", "total": 0 }, //answer[1]
                ]
            });
        updateQuestionList();
    }
}

function addTextItem() {  //添加文本题
    console.log('addSingleChoice');
    if (data.questionList.length > 9) {
        alert("问卷最多十个问题");
    } else {
        saveData();
        data.questionList.push(
            {
                "scription": "",
                "type": "text", //文本题
                "answer": [
                    { "text": "" } //answer[0]
                ],
                "optional": 0//1必填  0选填
            });
        updateQuestionList();
    }
}

function upMoveItem(upi) {
    console.log('upMoveItem');
    saveData();
    if (upi > 0) {
        let item1 = data.questionList[upi];
        let item2 = data.questionList[upi - 1];
        data.questionList.splice(upi - 1, 2, item1, item2); //从上一个元素开始，替换2个元素，为item1，item2
        // console.log(data.questionList);
        updateQuestionList();
    }
}
function downMoveItem(downi) {
    console.log('downMoveItem');
    saveData();
    if (downi < data.questionList.length - 1) {
        let item1 = data.questionList[downi];
        let item2 = data.questionList[downi + 1];
        data.questionList.splice(downi, 2, item2, item1); //从当前元素开始，替换2个元素，为item2，item1
        updateQuestionList();
    }
}
function repeatItem(ri) {
    console.log('repeatItem');
    saveData();
    let questionListItem = {
        scription: data.questionList[ri].scription,
        type: data.questionList[ri].type, //多选题
        answer: []
    }
    for (ansi = 0; ansi < data.questionList[ri].answer.length; ansi++) {
        questionListItem.answer[ansi] = data.questionList[ri].answer[ansi];
    }
    data.questionList.splice(ri, 0, questionListItem);
    updateQuestionList();
}
function delItem(deli) {
    console.log('delItem');
    saveData();
    data.questionList.splice(deli, 1);
    updateQuestionList();
}


function createItem(k, ql) {
    console.log('createItem');
    let questionList = document.getElementById("question-list");

    let question = document.createElement('div');
    question.setAttribute('class', 'question');
    let questionClear = document.createElement('div');
    questionClear.setAttribute('class', 'clearfix');

    let questionTitle = document.createElement('div');
    questionTitle.setAttribute('class', 'question-title');
    let d1 = document.createElement('font');
    if (ql.type === "radio") {
        d1.innerHTML = "Q" + (k + 1) + " 单选题：";
    } else if (ql.type === "checkbox") {
        d1.innerHTML = "Q" + (k + 1) + " 多选题：";
    } else if (ql.type === "text") {
        d1.innerHTML = "Q" + (k + 1) + " 文本题：";
    }
    questionTitle.appendChild(d1);
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'scription');
    titleInput.setAttribute('placeholder', '请输入问题');
    titleInput.value = ql.scription;
    questionTitle.appendChild(titleInput);

    let questionOption = document.createElement('div');
    questionOption.setAttribute('class', 'question-option');
    if (ql.type === "text") {
        let ul1 = document.createElement('ul');
        ul1.setAttribute("class", "text");
        let text1 = document.createElement('textarea');
        text1.setAttribute("cols", "50");
        text1.setAttribute("rows", "5");
        text1.setAttribute("name", "");
        text1.setAttribute("id", "");
        text1.setAttribute("value", "");
        text1.setAttribute("placeholder", "请在此回答，尝试一下");
        // text1.value = ql.answer[0].text;
        ul1.appendChild(text1);
        questionOption.appendChild(ul1);
    } else {
        let ul1 = document.createElement('ul');
        ul1.setAttribute("class", ql.type);
        let li2 = document.createElement('li');
        let liAdd = document.createElement('a');
        liAdd.innerHTML = "+";
        liAdd.setAttribute('onclick', "addAnswerItem(" + k + ")");

        liAdd.href = "javascript:void(0);";
        li2.appendChild(liAdd);
        ul1.appendChild(li2);

        for (i = 0; i < ql.answer.length; i++) {
            let li1 = document.createElement('li');
            let input1 = document.createElement('input');
            input1.type = ql.type;
            input1.name = "answer" + k;
            li1.appendChild(input1);

            let input2 = document.createElement('input');
            input2.type = "text";
            input2.value = ql.answer[i].text;
            input2.placeholder = "选项" + (i + 1);
            li1.appendChild(input2);
            let liDel = document.createElement('a');
            liDel.innerHTML = "-";
            liDel.setAttribute('onclick', "removeItem(this," + k + "," + i + ")");
            liDel.href = "javascript:void(0);";
            li1.appendChild(liDel);

            ul1.appendChild(li1);
        }
        questionOption.appendChild(ul1);
    }
    let questionEdit = document.createElement('div');
    questionEdit.setAttribute('class', 'edit-option float-right');
    if (k != 0) {
        let a1 = document.createElement('a');
        a1.innerHTML = "上移";
        a1.setAttribute('onclick', "upMoveItem(" + k + ")");
        questionEdit.appendChild(a1);
    }
    if (k < data.questionList.length - 1) {
        let a2 = document.createElement('a');
        a2.innerHTML = "下移";
        a2.setAttribute('onclick', "downMoveItem(" + k + ")")
        questionEdit.appendChild(a2);
    }
    let a3 = document.createElement('a');
    a3.innerHTML = "复用";
    a3.setAttribute('onclick', "repeatItem(" + k + ")");
    let a4 = document.createElement('a');
    a4.innerHTML = "删除";
    a4.setAttribute('onclick', "delItem(" + k + ")");
    questionEdit.appendChild(a3);
    questionEdit.appendChild(a4);

    questionClear.appendChild(questionTitle);
    questionClear.appendChild(questionOption);
    questionClear.appendChild(questionEdit);
    if (ql.type === "text") {
        let questionOptional = document.createElement('div');
        let QOinput1 = document.createElement('input');
        QOinput1.type = "checkbox";
        if (ql.optional == 0) {
            QOinput1.checked = "true";
        }
        let QOspan1 = document.createElement('span');
        QOspan1.innerText = "此题是否必填";
        questionOptional.appendChild(QOinput1);
        questionOptional.appendChild(QOspan1);
        questionOptional.style = "position: absolute;        right: 10px;        top: 0px;";
        questionClear.appendChild(questionOptional);
        questionClear.style = "position : relative;";
    }
    question.appendChild(questionClear);
    questionList.appendChild(question);

}

function addAnswerItem(k) {
    console.log('addAnswerItem');
    saveData();
    data.questionList[k].answer.push({ "text": "", "total": 0 });
    updateQuestionList();
}

function removeItem(obj, k, ansi) {
    console.log('removeItem');
    saveData();
    var ul = obj.parentNode.parentNode;
    var li = obj.parentNode;
    ul.removeChild(li);
    data.questionList[k].answer.splice(ansi, 1);
    updateQuestionList();
}


// str = JSON.stringify(jsondata);// string -> json
// JSON.parse(str) //json -> string
function updateQuestionList() { //更新questionList
    console.log('updateQuestionList');
    let questionList = document.getElementById("question-list");
    while (questionList.firstChild) {
        questionList.removeChild(questionList.firstChild);
    }
    for (datai = 0; datai < data.questionList.length; datai++) {
        createItem(datai, data.questionList[datai]);
    }
}

function saveData() { //保存问卷标题和截止时间和选项到data
    console.log("saveData");
    data.title = document.getElementById("title").value;
    data.deadline = document.getElementById("deadline").value;

    var questionDiv = document.getElementById("question-list").children; //获取id=questionList的孩子数组questionDiv
    for (i = 0; i < questionDiv.length; i++) {  //data.questionList数组与questionDiv数组下标一一对应
        var questionObj = questionDiv[i]; //根据下标获取questionDiv数组对应数据
        var question = data.questionList[i]; //根据下标获取data.questionList数组对应数据
        question.scription = questionObj.firstChild.firstChild.lastChild.value.toString(); //保存选项的标题

        var ulObj = questionObj.firstChild.children[1].firstChild; //获取<ul>
        var lisObj = ulObj.children;//li[] 获取选项<li>数组
        var answer = question.answer;//获取data选项数组
        if (ulObj.getAttribute("class") === "text") { //通过<ul>的class属性判断是文本题
            if (questionObj.firstChild.lastChild.firstChild.checked) {  //此题是否必填 是否选中
                question.optional = 0;
            } else {
                question.optional = 1;
            }
        } else if (ulObj.getAttribute("class") === "radio"
            || ulObj.getAttribute("class") === "checkbox") {//通过<ul>的class属性判断是单选题，或多选题
            for (j = 1; j < lisObj.length; j++) {  //遍历<li>数组，从下标1开始
                var liObj = lisObj[j];
                var inputsObj = liObj.childNodes;//inputs
                var inputObj = inputsObj[1];
                var item = {
                    "text": inputObj.value.toString(),
                    "total": 0
                }
                answer[j - 1] = item;
            }
        }
    }
}

function saveQuestionare() { //保存问卷data到storage
    console.log("saveDate");
    saveData();
    if (data.questionList.length < 1) {
        alert("问卷最少一个问题");
    } else {
        if (!isNotNullData()) {
            alert("问卷不允许出现空值");
        } else {
            data.state = "未发布";
            if (storageID == 0) {
                var d = new Date();//Tue Dec 08 2020 10:22:56 GMT+0800 (中国标准时间)
                data.createtime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();//格式化日期 yyyy-mm-dd
                list.push({ "id": onlyNum });
                storage.setItem("list", JSON.stringify(list));
                storage.setItem(onlyNum, JSON.stringify(data));
                onlyNum++;
                storage.setItem("onlyNum", JSON.stringify(onlyNum));
                alert("新建保存成功");
            } else {
                storage.setItem(storageID, JSON.stringify(data));
                alert("更改保存成功");
            }
            window.location.href = "../main.html";
        }
    }
}

/**
 * 发布问卷
 */
function releaseQuestionare() {
    console.log("releaseQuestionare");
    saveData();
    if (!isNotNullData()) {
        alert("问卷不允许出现空值");
    } else {
        if (!isPublishable()) {
            alert("截止日期不能早于今天");
        } else {
            data.state = "发布中";
            if (storageID == 0) {
                var d = new Date();//Tue Dec 08 2020 10:22:56 GMT+0800 (中国标准时间)
                data.createtime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();//格式化日期 yyyy-mm-dd
                list.push({ "id": onlyNum });
                storage.setItem("list", JSON.stringify(list));
                storage.setItem(onlyNum, JSON.stringify(data));
                onlyNum++;
                storage.setItem("onlyNum", JSON.stringify(onlyNum));
                alert("新建发布成功");
            } else {
                storage.setItem(storageID, JSON.stringify(data));
                alert("更改发布成功");
            }
            window.location.href = "../main.html";
        }
    }
}

/**
 * 截止日期判断
 * @returns {boolean}
 */
function isPublishable() {
    var flag = true;
    var deadline = document.getElementById("deadline").value;
    var date1 = new Date(Date.parse(deadline));
    var date2 = Date();
    var d1 = Date.parse(date1);
    var d2 = Date.parse(date2);
    if(d1<=d2) flag = false;
    return flag;
}

function isNotNullData() {
    saveData();
    let flag = true
    if (document.getElementById("title").value.toString() == "" || document.getElementById("deadline").value.toString() == "") {
        flag = false;
    }
    var questionDiv = document.getElementById("question-list").children; //获取id=questionList的孩子数组questionDiv
    for (i = 0; i < questionDiv.length; i++) {  //data.questionList数组与questionDiv数组下标一一对应
        var questionObj = questionDiv[i]; //根据下标获取questionDiv数组对应数据
        if (questionObj.firstChild.firstChild.lastChild.value.toString() == "") {//scription
            flag = false;
        }
        var ulObj = questionObj.firstChild.children[1].firstChild; //获取<ul>
        var lisObj = ulObj.children;//li[] 获取选项<li>数组
        if (ulObj.getAttribute("class") === "radio"
            || ulObj.getAttribute("class") === "checkbox") {//通过<ul>的class属性判断是单选题，或多选题
            for (j = 1; j < lisObj.length; j++) {  //遍历<li>数组，从下标1开始
                var liObj = lisObj[j];
                var inputsObj = liObj.childNodes;//inputs
                var inputObj = inputsObj[1];
                if (inputObj.value.toString() == "") {
                    flag = false;
                }
            }
        }
    }
    return flag;
}

//悬浮页js开始
var pubquestionnaire = document.getElementsByClassName("pubquestionnaire")[0];
var suspend_bg = document.getElementsByClassName("suspend-bg")[0];
pubquestionnaire.onclick = function () {
    suspend_bg.style.cssText = "display: block;";
    var suspend_deadline = document.getElementById("suspend-deadline");
    suspend_deadline.innerHTML = document.getElementById("deadline").value;
}
var cancel_btn = document.getElementsByClassName("cancel-btn");
cancel_btn[0].onclick = function () {
    suspend_bg.style.cssText = "display: none;";
}
cancel_btn[1].onclick = function () {
    suspend_bg.style.cssText = "display: none;";
}

//悬浮页js结束