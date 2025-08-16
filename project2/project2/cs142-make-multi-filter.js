/* eslint-disable prefer-const */
'use strict';
function cs142MakeMultiFilter(originalArray) {

    let currentArray=[...originalArray];
    const arrayFilterer=(filterCriteria,callback)=> {
        if(typeof filterCriteria !== 'function')return currentArray;
        const res=[];
        const isFunction=(typeof callback === 'function');
        console.log("filterCriteria= "+filterCriteria+"\n callback="+callback+"\n currentArray="+currentArray+'\n');
        for(let i=0;i<currentArray.length;i++) {
            console.log(i+" "+currentArray[i]+" "+filterCriteria(currentArray[i])+"\n");
            if(filterCriteria(currentArray[i]) === true) {
                res.push(currentArray[i]);
            }
        }
        currentArray=[...res];
        // currentArray.filter(filterCriteria);
        if(isFunction){
            // res=callback.call(originalArray);
            callback=callback.bind(originalArray);
            callback(currentArray);
        }
        return arrayFilterer;
    }

    return arrayFilterer;
}
