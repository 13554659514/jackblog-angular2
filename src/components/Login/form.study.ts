//ng2表单的最小单位, 一个Control代表着一个input字段
import { Control, ControlGroup } from 'angular2/common'


//Control
var nameControl = new Control("Nate")
var name = nameControl.value //Nate

nameControl.valid
nameControl.dirty
nameControl.errors	

//ControlGroup, 可以获得表单所有的值
var personInfo = new ControlGroup({
    firstName: new Control("Nate"),
    lastName: new Control("Murray"),
    zip: new Control("90210")
})

personInfo.value; 
// -> {
    //  firstName: "Nate",
    //  lastName: "Murray",
    //  zip: "90210"
    // }
personInfo.valid
personInfo.dirty
personInfo.errors	// -> StringMap<string, any> of errors