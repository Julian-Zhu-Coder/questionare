//获取本地数据

var storage = window.localStorage;
var i = window.location.href.split("=")[1];

var c = storage.getItem(i);
var d = JSON.parse(c);
let data = d;
console.log(d);
var c_number = 0;
var number = 1;


//问卷标题
var h2_title = document.getElementsByClassName("h2-title")[0];
h2_title.innerHTML = data.title;



//渲染单选题
function createRadio() {

    var data_show = document.getElementsByClassName("data-show")[0];

    var section = document.createElement('div'); section.setAttribute("class", "section clearfix radiO");
    var aside_left = document.createElement('div'); aside_left.setAttribute("class", "aside-left float-left");
    var question_number = document.createElement('div'); question_number.setAttribute("class", "question-number");
    var Q1 = document.createElement('span'); Q1.setAttribute("class", "Q1");
    var question_type = document.createElement('span'); question_type.setAttribute("class", "question-type");
    var question = document.createElement('div'); question.setAttribute("class", "question float-right");


    var aside_right = document.createElement('div'); aside_right.setAttribute("class", "aside-right float-right");
    var P1 = document.createElement('span'); P1.setAttribute("class", "P1");
    Q1.innerHTML = "Q" + number;
    question_type.innerHTML = data.questionList[number - 1].scription;
    P1.innerHTML = "数据占比";
    aside_right.appendChild(P1);
    //------
    var an_length = data.questionList[number - 1].answer.length;
    var sum = 0;
    for (var j = 0; j < an_length; j++) {
        sum = sum + data.questionList[number - 1].answer[j].total;
    }

    for (var i = 0; i < an_length; i++) {
        var span = document.createElement('span');
        span.innerHTML = data.questionList[number - 1].answer[i].text;
        question.appendChild(span);
        var percent_area = document.createElement('div'); percent_area.setAttribute("class", "percent-area");
        var percent_bar = document.createElement('div'); percent_bar.setAttribute("class", "percent-bar");
        var colorStuff = document.createElement('div'); colorStuff.setAttribute("class", "colorStuff");
        var percent_value = document.createElement('span'); percent_value.setAttribute("class", "percentValue");

        var temp;
        if (sum == 0) {
            temp = (1 / data.questionList[number - 1].answer.length) * 100;
        } else {
            temp = (data.questionList[number - 1].answer[i].total / sum) * 100;
        }

        colorStuff.style.cssText = "width:" + parseInt(temp) + "%";
        percent_value.innerHTML = parseInt(temp) + "%";

        percent_bar.appendChild(colorStuff);
        percent_area.appendChild(percent_bar);
        percent_area.appendChild(percent_value);
        aside_right.appendChild(percent_area);
    }

    //------

    question_number.appendChild(Q1); question_number.appendChild(question_type);
    aside_left.appendChild(question_number);
    aside_left.appendChild(question);

    section.appendChild(aside_left);
    section.appendChild(aside_right);
    data_show.appendChild(section);

    number++;

}

//渲染多选题
function createCheckBox() {
    var data_show = document.getElementsByClassName("data-show")[0];

    var section = document.createElement('div'); section.setAttribute("class", "section clearfix checkBox");
    var aside_left = document.createElement('div'); aside_left.setAttribute("class", "aside-left float-left");
    var question_number = document.createElement('div'); question_number.setAttribute("class", "question-number");
    var Q1 = document.createElement('span'); Q1.setAttribute("class", "Q1");
    var question_type = document.createElement('span'); question_type.setAttribute("class", "question-type");
    var question = document.createElement('div'); question.setAttribute("class", "question float-right");


    var aside_right = document.createElement('div'); aside_right.setAttribute("class", "aside-right float-right");
    var P1 = document.createElement('span'); P1.setAttribute("class", "P1");
    var pipe_chart = document.createElement('div');
    pipe_chart.setAttribute("class", "pipe-chart");
    // pipe_chart.setAttribute("id", "pipe-chart");
    pipe_chart.setAttribute("style", "width: 180px;height:120px;");


    Q1.innerHTML = "Q" + number;
    question_type.innerHTML = data.questionList[number - 1].scription;
    P1.innerHTML = "数据占比";

    //------
    var an_length = data.questionList[number - 1].answer.length;

    for (var i = 0; i < an_length; i++) {
        var span = document.createElement('span');
        span.innerHTML = data.questionList[number - 1].answer[i].text;
        question.appendChild(span);
    }
    //------

    question_number.appendChild(Q1); question_number.appendChild(question_type);
    aside_left.appendChild(question_number);
    aside_left.appendChild(question);

    aside_right.appendChild(P1); aside_right.appendChild(pipe_chart);

    section.appendChild(aside_left);
    section.appendChild(aside_right);
    data_show.appendChild(section);

    var result = [];
    for (var i = 0; i < an_length; i++) {
        result.push({
            value: data.questionList[number - 1].answer[i].total,
            name: data.questionList[number - 1].answer[i].text
        });
    }

    var myChart = echarts.init(document.getElementsByClassName('pipe-chart')[c_number]);

    myChart.setOption({
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: result,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                fontSize: 5
                            }
                        }
                    }
                }
            }
        ]
    })

    number++;
    c_number++;
}


//渲染文本题
function createText() {

    var data_show = document.getElementsByClassName("data-show")[0];

    var section = document.createElement('div'); section.setAttribute("class", "section clearfix TexT");
    var aside_left = document.createElement('div'); aside_left.setAttribute("class", "aside-left float-left");
    var question_number = document.createElement('div'); question_number.setAttribute("class", "question-number");
    var Q1 = document.createElement('span'); Q1.setAttribute("class", "Q1");
    var question_type = document.createElement('span'); question_type.setAttribute("class", "question-type");

    var aside_right = document.createElement('div'); aside_right.setAttribute("class", "aside-right float-right");
    var P1 = document.createElement('span'); P1.setAttribute("class", "P1");
    var percent_area = document.createElement('div'); percent_area.setAttribute("class", "percent-area");
    var percent_bar = document.createElement('div'); percent_bar.setAttribute("class", "percent-bar");
    var colorStuff = document.createElement('div'); colorStuff.setAttribute("class", "colorStuff");
    var percent_value = document.createElement('span'); percent_value.setAttribute("class", "percentValue");

    var an_length = data.questionList[number - 1].answer.length;
    var sum = 0;
    for (var j = 0; j < an_length; j++) {

        if (data.questionList[number - 1].answer.text != "") {
            sum = sum + 1;
        }
    }


    Q1.innerHTML = "Q" + number;
    question_type.innerHTML = data.questionList[number - 1].scription;
    P1.innerHTML = "回答有效占比";
    var temp1 = (sum / an_length) * 100;
    colorStuff.style.cssText = "width:" + temp1 + "%";
    percent_value.innerHTML = temp1 + "%";

    question_number.appendChild(Q1); question_number.appendChild(question_type);
    aside_left.appendChild(question_number);

    percent_bar.appendChild(colorStuff);
    percent_area.appendChild(percent_bar);
    percent_area.appendChild(percent_value);
    aside_right.appendChild(P1);
    aside_right.appendChild(percent_area);

    section.appendChild(aside_left);
    section.appendChild(aside_right);
    data_show.appendChild(section);
    number++;
}




//遍历所有题目
for (var x = 0; x < data.questionList.length; x++) {

    switch (data.questionList[x].type) {
        case "radio":
            createRadio();
            break;
        case "checkbox":
            createCheckBox();
            break;
        case "text":
            createText();
            break;
    }
}