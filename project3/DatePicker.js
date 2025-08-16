'use strict';
// let globalDatePicker;
window.datePickerInstances = {};
class DatePicker {
    constructor(id,callback) {
        this.id=id;
        this.date=new Date();
        this.callback=callback;
        window.datePickerInstances[id]=this;
    }

    getCube(nowDay,targetDate){
        const id=this.id;
        const td=document.createElement('td');
        const res=document.createElement('p');
        //html tr 下边必须是td
        /*
        <tr>
            <td>
                <p> likethis </p>
            </td>
        </tr>
         */
        res.setAttribute('onmouseover','cubeMouseOver(event);');
        res.setAttribute('onmouseout','cubeMouseOut(event);');
        res.addEventListener('click',function (event){canBeAccess(event,id,res,nowDay);});
        res.textContent=nowDay.getDate();
        // console.log("nowDay="+nowDay+" targetDate="+targetDate+"\n");
        if(nowDay.getMonth()===targetDate.getMonth()){
            res.setAttribute('class','canBeAccessCube');
        } else {
            res.setAttribute('class','canNotBeAccessCube');
        }
        td.appendChild(res);
        return td;
    }

    getNextDate(nowDay){
        const res=new Date(nowDay.getTime());
        res.setDate(nowDay.getDate()+1);
        return res;
    }

    getPrevDate(nowDay){
        const res=new Date(nowDay.getTime());
        res.setDate(nowDay.getDate()-1);
        return res;
    }

    render(targetDate) {

        const id=this.id;
        // console.log("this.id="+this.id+" this.callback="+this.callback+"\n");
        //nowDate 是 render 的目标，即我们在这一页应该显示的某一个日期
        const root=document.getElementById(this.id);
        root.innerHTML='';
        const table=document.createElement('table');

        // console.log("targetDate="+targetDate+"\n");
        //root->table->若干raw->若干cube
        const title=document.createElement('tr');

        const leftButton=document.createElement('button');
        const rightButton=document.createElement('button');

        leftButton.addEventListener('click',function (event){clickLeftButton(event,targetDate,id);});
        leftButton.textContent="<";

        rightButton.addEventListener('click', function (event){clickRightButton(event,targetDate,id);});
        rightButton.textContent=">";

        const titleText=document.createElement('span');
        const message=(String) (targetDate.getFullYear()+" "+(targetDate.getMonth()+1));

        titleText.textContent=message;

        title.appendChild(leftButton);
        title.appendChild(titleText);
        title.appendChild(rightButton);

        title.setAttribute('class','datepicker-header');

        table.appendChild(title);
        table.setAttribute('class','datepicker-table');

        const words=['Sun','Mon',"Tue","Wed","Thur","Fri","Sat"];

        const week=document.createElement('tr');

        for(let i=0;i<7;i++){
            const now=this.getCube(targetDate,targetDate);
            now.textContent=words[i];
            now.setAttribute('class','canNotBeAccessCube');
            week.appendChild(now);
        }

        week.setAttribute('class','weekdays');
        table.appendChild(week);

        const firstRow=document.createElement('tr');
        table.appendChild(firstRow);
        let firstDay=new Date(targetDate.getFullYear(),targetDate.getMonth(),1);
        // console.log("begin_firstDay="+firstDay+"\n");
        let bias=firstDay.getDay();
        for(let i=1;i<=bias;i++){
            firstDay=this.getPrevDate(firstDay);
        }
        // console.log("firstDay="+firstDay+"\n");
        let nowDay=new Date(firstDay.getFullYear(),firstDay.getMonth(),firstDay.getDate());
        for(let i=0;i<7;i++){
            const now=this.getCube(nowDay,targetDate);//now 是这一个格子的对象。nowDay 是其日期。
            nowDay=this.getNextDate(nowDay);
            firstRow.appendChild(now);
        }


        table.appendChild(firstRow);


        while(nowDay.getMonth()===targetDate.getMonth()) {
            const row=document.createElement('tr');
            for(let i=0;i<7;i++){
                const now = this.getCube(nowDay,targetDate);
                nowDay=this.getNextDate(nowDay);
                row.appendChild(now);
            }
            table.appendChild(row);
        }
        //last row;
        // const lastrow=document.createElement('tr');
        // for(let i=0;i<7;i++){
        //     const now=this.getCube(nowDay,targetDate);//now 是这一个格子的对象。nowDay 是其日期。
        //     nowDay=this.getNextDate(nowDay);
        //     lastrow.appendChild(now);
        // }
        // table.appendChild(lastrow);
        root.appendChild(table);

    }

}

function cubeMouseOver(event){
    event.target.setAttribute('id', "CubeHighlight");
}

function cubeMouseOut(event){
    event.target.removeAttribute('id');
}
function myDate(yy,mm,dd){
    this.year=yy;
    this.month=mm;
    this.day=dd;
    // return this;
}

function canBeAccess(event,id,now,date) {
    const className=now.className;
    // console.log(id,now,date,className);
    if(className==='canBeAccessCube'){
        // console.log(date);
        window.datePickerInstances[id].callback(id,new myDate(date.getFullYear(),date.getMonth()+1,now.textContent));
    }
}

function clickLeftButton(event,targetDate,id){
    let nowDate=new Date(targetDate);
    while(nowDate.getMonth()===targetDate.getMonth()) {
        nowDate=window.datePickerInstances[id].getPrevDate(nowDate);
    }
    window.datePickerInstances[id].render(nowDate);
}

function clickRightButton(event,targetDate,id){
    let nowDate=new Date(targetDate);
    while(nowDate.getMonth()===targetDate.getMonth()) {
        nowDate=window.datePickerInstances[id].getNextDate(nowDate);
    }
    window.datePickerInstances[id].render(nowDate);
}
