/* eslint-disable prefer-const */
'use strict';
function Cs142TemplateProcessor(template){
    this.template=template;
}
Cs142TemplateProcessor.prototype.fillIn=function (dictionary) {
    let now=this.template;
    const match=this.template.match(/{{[^{]*}}/g);
    for(let property of match){
        console.log(property+"\n");
        const realProperty=property.replace("{{","").replace("}}","");
        console.log(realProperty+"\n");
        if(dictionary[realProperty] !== undefined){
            now=now.replace(property,dictionary[realProperty]);
        } else {
            now=now.replace(property,"");
        }
    }
    console.log("now = "+now+"\n");
    return now;
};
