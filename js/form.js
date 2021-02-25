console.log("Logging: hello form")
let data = {};//问卷存储的数据data
let storage = window.localStorage;
let storageID = 1;//第几个问卷对应storage的下标，

function initData() { //初始化问卷data
    console.log("initData");
    // let tmpData = {
    //     "id": "001",
    //     "state": "发布中",
    //     "createtime": "2016-04-12 20:46:52",
    //     "deadline": "2016-04-12",
    //     "title": "这里是标题",
    //     "questionList": [
    //         {
    //             "scription": "你是大学生吗？",
    //             "type": "radio",
    //             "answer": [
    //                 { "text": "是", "total": 0 },
    //                 { "text": "否", "total": 0 },
    //             ],
    //         },
    //         {
    //             "scription": "你从哪里知道这个问卷？",
    //             "type": "checkbox",
    //             "answer": [
    //                 { "text": "宿舍", "total": 0 },
    //                 { "text": "厕所", "total": 0 },
    //             ],
    //         },
    //         {
    //             "scription": "请留下您的建议",
    //             "type": "text",
    //             "answer": [{ "text": "五星好评" }],
    //             "optional":1//1必填  0选填
    //         }
    //     ],
    // };//测试数据
    storageID = window.location.href.split("=")[1];
    data = JSON.parse(storage.getItem(storageID)); //将storage的json取出   转化为string放到data
    // console.log(data);
    
}

function showQuestion() {
    console.log('showQuestion');
    let Title = document.getElementById("title");
    Title.innerHTML += data.title;
    let questionList = document.getElementById("question-list");
    while (questionList.firstChild) {
        questionList.removeChild(questionList.firstChild);
    }
    for (datai = 0; datai < data.questionList.length; datai++) {
        showQuestionItem(datai, data.questionList[datai]);
    }
}

function showQuestionItem(k, ql){
    console.log('showQuestionItem');
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
    d1.innerHTML += ql.scription;
    
    if (ql.type === "text") {
        if(ql.optional == 0){
            d1.innerHTML += " (必填)";
        }else if (ql.optional == 1){
            d1.innerHTML += " (选填)";
        }
    }
    questionTitle.appendChild(d1);

    let questionOption = document.createElement('div');
    questionOption.setAttribute('class', 'question-option');
    if (ql.type === "text") {
        let ul1 = document.createElement('ul');
        ul1.setAttribute("class", "text");
        let text1 = document.createElement('textarea');
        text1.setAttribute("cols", "50");
        text1.setAttribute("rows", "5");
        text1.setAttribute("name", "textarea");//文本题
        // text1.setAttribute("id", "");
        // text1.setAttribute("value", "");
        text1.setAttribute("optional",ql.optional);//保存是否必填optional
        if (ql.optional == 0){
            text1.setAttribute("onblur","checkOptional()");
        }
        // text1.value = ql.answer[0].text;
        let spanObj = document.createElement("span");
        spanObj.setAttribute("class","error");
        ul1.appendChild(text1);
        ul1.appendChild(spanObj);
        questionOption.appendChild(ul1);
    } else {
        let ul1 = document.createElement('ul');
        ul1.setAttribute("class", ql.type);
        for (i = 0; i < ql.answer.length; i++) {
            let li1 = document.createElement('li');
            let input1 = document.createElement('input');
            // if (ql.type === 1) {
            //     input1.type = "radio";
            // } else if (ql.type === 2) {
            //     input1.type = "checkbox";
            // }
            input1.type = ql.type;
            input1.name = "answer" + k;
            li1.appendChild(input1);
            let p1 = document.createElement('span');
            p1.innerHTML += ql.answer[i].text;
            li1.appendChild(p1);

            ul1.appendChild(li1);
        }
        //默认单选题第一个选项为选中状态
        if (ql.type === "radio"){
            ul1.children[0].firstChild.checked = true;
        }
        questionOption.appendChild(ul1);
    }

    questionClear.appendChild(questionTitle);
    questionClear.appendChild(questionOption);
    question.appendChild(questionClear);
    questionList.appendChild(question);

}


function saveAnswer() {
    console.log("saveAnswer");
    if (checkOptional()) {
        var questionDiv = document.getElementById("question-list").children; //获取id=questionList的孩子数组questionDiv
        // var questionList = data.questionList;
        for (i = 0; i < questionDiv.length; i++) {  //data.questionList数组与questionDiv数组下标一一对应
            var questionObj = questionDiv[i]; //根据下标获取questionDiv数组对应数据
            var question = data.questionList[i]; //根据下标获取data.questionList数组对应数据

            var ulObj = questionObj.firstChild.children[1].firstChild; //获取<ul>
            var lisObj = ulObj.children;//li[] 获取选项<li>数组
            var answer = question.answer;//获取data选项数组
            // console.log(ulObj.getAttribute("class"));
            if (ulObj.getAttribute("class") === "text") { //通过<ul>的class属性判断是文本题
                console.log(lisObj[0].value);
                let Texttmp = {
                    "text": lisObj[0].value
                }
                answer.push(Texttmp);
            } else if (ulObj.getAttribute("class") === "radio"
                || ulObj.getAttribute("class") === "checkbox") {//通过<ul>的class属性判断是单选题，或多选题
                for (j = 0; j < lisObj.length; j++) {  //遍历<li>数组
                    var liObj = lisObj[j];
                    console.log(liObj);
                    var inputsObj = liObj.children;//inputs
                    console.log(inputsObj);
                    console.log(inputsObj[0].checked);
                    console.log(inputsObj[1].value);
                    if (inputsObj[0].checked) {
                        answer[j].total++;
                    }
                }
            }
            //     question.answer = answer;
            //     questionList[i-1] = question;
        }
        saveAnswerToTtorage();
    }
}

function saveAnswerToTtorage() { //保存问卷data到storage
    console.log("saveAnswerToTtorage");
    
    var json = JSON.stringify(data);
    storage.setItem(storageID, json);
    alert("提交成功");
    window.location.href = "../main.html";
}

function checkOptional() {
    var flag = true;

    var textareasObj = document.getElementsByName("textarea");
    for (var i = 0; i < textareasObj.length; i++){
        var textareaObj = textareasObj[i];
        if (textareaObj.getAttribute("optional") == 1){
            //可选
        }else {//必选
            var parent = textareaObj.parentNode;
            var spanObj = parent.lastChild;
            if (textareaObj.value != null && textareaObj.value != ""){
                spanObj.innerHTML = "";
            }else {
                spanObj.innerHTML = "<img width='35' height='25' src='../img/no.png'/>";;
                flag = false;
            }
        }
    }

    return flag;
}