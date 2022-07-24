import React, { Component } from 'react';
import { cssModules, deleteValueArray, deleteValueFromArray, getWindowWidth, removeDuplicatesFromArray } from '../../contants/generalFunctions';
import { FIELDS } from './FormGeneratorFields';
import styles from "./formgenerator.module.css"
import { TextField,Autocomplete } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { fontFamily2, fontFamily1, fontFamily3, fontFamily5, fontFamily4 } from '../../contants/uiConstants';
import FileUploader from './FileUploader';
import PopUpButton from '../../component_bag/PopUpButton';
let innitialData = {}
var dummyArray = [0,1,2,3]
let fieldStyles, outerStyle;
const mod = cssModules(styles);
let requiredFields = []
let regexPatterns = []
let followUps = {}
class FormGenerator extends Component {
    constructor(props){
        super(props)
        this.formRef = React.createRef();
        this.state = {
            data:{},
            allFields:{},
            regexErrors:[],
            emptyRequiredFields:[],
            fontSize:'19px',
            modular:true,
            color:"rgb(0,0,0,0.7)",
            fontFamily:'Helvetica Neue',
            buttonClicked:false,
            activeQuestion:'',
            confirmation:false,
            confirmed:false,
            
        }
    }
    resetForm = () => {
        this.formRef.current.reset();
    }
    actionCompleted = () => {
        this.setState({buttonClicked:false})
        // this.formRef.current.reset();
    }
    handleOnChange = async (e,fieldData) => {
       
         // Check if there are any emptyRequired already and take it off since  field is now empty
         let value = undefined
         if(e.target.selectedOptions === undefined){
            value = e.target.value
        }
        else{
            var selected = [];
            for (var option of e.target.selectedOptions)
            {
                if (option.selected) {
                    selected.push(option.value);
                }
            }
            value = selected.join('|')
            // value = sele
            console.log(value)

        }
         if(value !== "" ||value !== " " || value !== null || value.length !== 0 ||value !== undefined){
            let myArr = this.state.emptyRequiredFields;            
            let index = myArr.indexOf(fieldData.name);
            if (index > -1) {
                myArr.splice(index, 1);
                this.setState({emptyRequiredFields:myArr})
            }
         } 
            let myArr = this.state.regexErrors;            
            let index = myArr.indexOf(fieldData.name);
            if (index > -1) {
                myArr.splice(index, 1);
                this.setState({regexErrors:myArr})
            }                 
         // Check if there are any emptyRequired already and take it off since  field is now empty

        const { data } = this.state;
        // let val = e.target.value
        // let currentField =  fieldData.name
        this.setState({ data: { ...data, [fieldData.name]: e.target.value} });
        // console.log(data)
        return true
    }
    handleSelect = (e, field) => {
        let  listenForChangeComplete = async () => {
            await this.handleOnChange(e,field)
        }
        listenForChangeComplete()
        const {data,allFields,regexErrors} = this.state
        let dataCollectedSoFar = data
        let currentData = e.target.value
        let obtainedErrors = []
        let errorCounter = 0;
        let allfollowUps = Object.keys(followUps)
        let emptyRequiredFields = []

        if(allfollowUps.length!==0){
            allfollowUps.forEach(property => {
                if(followUps[property] === 0){
                    if(requiredFields.includes(property)){
                        let newArr = deleteValueFromArray(requiredFields,property)
                        requiredFields = newArr
                    }
                    if(data.hasOwnProperty(property)){
                        let myData = data           
                        delete myData[property]
                        this.setState({data:myData})
                    }
                }
            })
        }
        for (let property in data) {
            if(requiredFields.includes(property)){
                let value = data[property]
                if(value === "" ||value === " " || value === null || value.length === 0 ||value === undefined){
                    if(requiredFields.includes(property)){
                            obtainedErrors[errorCounter] = property
                            errorCounter++;
                    }
                }
            }
        }
        if(errorCounter!==0){
            emptyRequiredFields = obtainedErrors
        }
        this.props.handleOnSubmit(dataCollectedSoFar,currentData,field,allFields,emptyRequiredFields,regexErrors,this.resetForm,this.actionCompleted)
    }
    preFillWithEmptyString=(fieldName)=>{
        const {data} = this.state;
        this.setState({ data: { ...data, [fieldName]:"" } });
    }
    validateInput = (fieldName,value,pattern= undefined) => {
        // Check if string is empty, if empty add the name of the field to empty required fields array
        if(value === "" ||value === " " || value === null || value.length === 0 ||value === undefined){
            if(requiredFields.includes(fieldName)){
                this.setState({emptyRequiredFields:[...this.state.emptyRequiredFields,fieldName]})
                return 0
            }
        }
        else{
            //If we have gotten here then string is no longer empty so delete name of field from  empty required fields array
            let myArr = this.state.emptyRequiredFields;            
            let index = myArr.indexOf(fieldName);
            if (index > -1) {
                myArr.splice(index, 1);
                this.setState({emptyRequiredFields:myArr})
            }
        }
        // alert(pattern)
        if(pattern!==undefined){
            // regex checker function
            // alert(pattern)
            const checkRegex = (myString,pattern,fieldName)=>{
                if(pattern===null){
                  return undefined;
                }
                else{
                  let regex = new RegExp(pattern);
                  let regexState = regex.test(myString);
                  if(regexState){
                    return true
                  }
                  else{
                    return false
                  }
                }
                  
            }
            if(checkRegex(value,pattern)===false){
                this.setState({regexErrors:[...this.state.regexErrors,fieldName]})
            }
        }
        
    }
    // if(value === "" ||value === " " || value === null || value.length === 0 ||value === undefined){
    //     if(requiredFields.includes(fieldName)){
    //         this.setState({emptyRequiredFields:[...this.state.emptyRequiredFields,fieldName]})
    //         return 0
    //     }
    // }
   
    handleOnSubmit = (e) => {
        // alert('jj')
        const {data,emptyRequiredFields,regexErrors} = this.state;
        console.log(this.state.data)
        let obtainedErrors = []
        let errorCounter = 0;
        let allfollowUps = Object.keys(followUps)
        let myData = this.state.data
        if(allfollowUps.length){
            allfollowUps.forEach(property => {
                if(followUps[property] === 0){
                    if(requiredFields.includes(property)){
                        let newArr = deleteValueFromArray(requiredFields,property)
                        requiredFields = newArr
                    }
                    if(data.hasOwnProperty(property)){
                        let myData = data           
                        delete myData[property]
                        this.setState({data:myData})
                    }
                    // console.log(property)
                }
            })
        }

        for (let property in data) {
            if(requiredFields.includes(property)){
                let value = data[property]
                if(value === "" ||value === " " || value === null || value.length === 0 ||value === undefined){
                    if(requiredFields.includes(property)){
                            obtainedErrors[errorCounter] = property
                            errorCounter++;
                    }
                }
            }
        }
        if(errorCounter!==0){
            this.setState({emptyRequiredFields:obtainedErrors})
            console.log(emptyRequiredFields, errorCounter)
            // return
        }


        if(regexErrors.length!==0){
            // return 0
        }
        this.props.enableConfirmation?this.setState({confirmation:!this.state.confirmation}):console.log('')
        this.setState({buttonClicked:true})
        this.props.handleOnSubmit(data,this.resetForm,this.actionCompleted)
        requiredFields = []
    }
    showConfirmation = () => {
        this.setState({confirmation:!this.state.confirmation})
    }
    handleProcessedImages = (images) => {
        console.log(images)
    }

    getImage = (field, index) => {
       return field.images
       ?<FileUploader images = {field.images} processedImages = {()=>{this.handleProcessedImages()}} index={index} field={field}/>
       :<FileUploader processedImages = {()=>{this.handleProcessedImages()}} index={index} field={field}/>
    } 
    getDropDown = (field,index) => {
        const defaultProps = {
            options:field.dropDownList,
            getOptionLabel: (option) => option[field.property],
          };
        const {errors} = this.state
        const style = {
            textField:this.props.removeButton
            ?{
                height:20,
                color:"blue"
            }
            :{}
        }
        return   <Autocomplete 
                    // style={style.textField}
                    key = {index}
                    {...defaultProps}
                    id={field.name}
                    debug
                    renderInput={(params) => <TextField style={{fontFamily:`${this.props.fontFamily?this.props.fontFamily:fontFamily3}`,fontWeight:300}}  placeholder={field.placeholder} variant={field.type?field.type:'standard'} {...params} htmlFor={field.label} margin="normal" 
                    />}
                    style={{width:"100%",fontFamily:`${this.props.fontFamily?this.props.fontFamily:this.state.fontFamily}`,fontWeight:300}}
                    onChange = {(value)=>{
                        let e = {
                            target:{
                                value:value.target.innerHTML
                            }
                        }
                        this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                    }}
                />
    }
    getTextArea = (field,index) => {
        return <div key={index} className={mod("text-area-container")}>
                {/* <label style={{fontFamily:`${this.props.fontFamily?this.props.fontFamily:'Lato'}`,width:"100%",backgroundColor:"red", fontWeight:300}} htmlFor={field.name} className={mod("")}>{field.label}</label> */}
                <textarea className={mod("text-area")} key={index}
                    type={field.fieldType}
                    name={field.name}
                    defaultValue={field.defaulValue?field.defaultValue:""}                        
                    placeholder={field.placeholder}
                    onChange = {(e)=>{
                        this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                        // this.handleOnChange(e,field)
                    }}
                    required={true}
                ></textarea>
            </div>
    }
    getDate = (field,index) => {
        return <div key={index} 
                className={mod("form__group")}    
                style={{width:"100%",display:"flex",alignItems:"center", height:"80px"}}>
                {/* <label style={{fontFamily:`${this.props.fontFamily?this.props.fontFamily:'Lato'}`,width:"100%",backgroundColor:"red", fontWeight:300}} htmlFor={field.name} className={mod("")}>{field.label}</label> */}
                <input key={index}
                        style={{fontFamily:this.state.fontFamily, fontSize:this.state.fontSize, width:"100%"}}
                        name={field.name}
                        //defaultValue={field.defaulValue?field.defaultValue:""}                        
                        className={mod("form__field")}                        
                        placeholder={field.placeholder}
                        //value="2018-07-22"
                        min={field.startDate} 
                        max={field.endDate}
                        type={field.fieldType}
                        // defaultValue={field.defaulValue?field.defaultValue:""}                        
                        // placeholder={field.placeholder}
                        onChange = {(e)=>{
                            this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                            // this.handleOnChange(e,field)
                        }}
                        required={true}
                        // onChange = {(e)=>{this.handleOnChange(e,field)}}
                    />
                    <label htmlFor={field.name} className={mod("form__label")}>{field.label}</label>
                    {/* {<span>{errors.hasOwnProperty(field.name)?this.state.errors[field.name]:null}</span>} */}
            </div>
    }
    getInputFied = (field, index) => {
        const {emptyRequiredFields,regexErrors} = this.state
        if(field.groups===true){
            const value = "field.groupItems[0].name"
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} 
                        style={{display:"none", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                        className='nate-white-bg d-none margin-t-40  margin-b-40 padding-20 elevated-blend'
                        onClick = {() => this.setState({activeQuestion:value})}
                    >
                        {field.groupItems.map((item,index)=>{
                        return <div key={index} style={fieldStyles.inputGroupItemStyles} className={mod("form__group")}>
                                    <input key={index}
                                type={field.fieldType}
                                name={field.name}
                                defaultValue={field.defaulValue?field.defaultValue:""}                        
                                className={mod("form__field")} 
                                // placeholder={item.placeholder}
                                onChange = {(e)=>{
                                    this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                                }}
                                required={true}
                            />
                            <label style={{fontFamily:`${this.props.fontFamily?this.props.fontFamily:this.state.fontFamily}`, fontWeight:300, color:this.state.color}} htmlFor={field.name} className={mod("form__label")}>{item.label}</label>
                                </div>
                            })
                        }
                 </div>
        }
        else {
            const value = field.name
        // this.preFillWithEmptyStrig(field.name)
       return <div
                    style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                    className='nate-white-bg d-none margin-t-40  margin-b-20 padding-20 elevated-blend'
                    onClick = {() => this.setState({activeQuestion:value})}
                >  
                <div key={index} className={mod("form__group")} style={{}}>
                    <input key={index}
                        style={{fontFamily:'Helvetica Neue', fontSize:this.state.fontSize}}
                        type={field.fieldType}
                        name={field.name}
                        defaultValue={field.defaulValue?field.defaultValue:""}                        
                        className={mod("form__field")} 
                        placeholder={field.placeholder}
                        onChange = {(e)=>{
                            this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                            // this.handleOnChange(e,field)
                        }}
                        onBlur = {(e)=>{this.validateInput(field.name, e.target.value, field.regexPattern)}}
                    />
                    <label htmlFor={field.name} className={mod("form__label")}>{field.label}</label>
                    {<span style={{color:"red"}}>{emptyRequiredFields.includes(field.name)?`The ${field.name} field is required`:null}</span>}
                    {<span style={{color:"red"}}>{regexErrors.includes(field.name)?`Invalid ${field.name} input`:null}</span>}
              </div>
            </div>
        }
    }
    getInputQuestion = (field, index) => {
        const {emptyRequiredFields,regexErrors} = this.state

        const {errors} = this.state
        if(field.groups===true){
            const value = field.groupItems[0].name        
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} 
                        // style={{display:"flex", width:"100%", justifyContent:"space-between"}}
                        style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                        className='nate-white-bg  margin-t-40  margin-b-40 padding-20 elevated-blend'
                        onClick = {() => this.setState({activeQuestion:value})}
                        >
                        <div style={{color:this.state.color,marginTop:20,fontFamily:this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question}</div>
                        {field.groupItems.map((item,index)=>{
                        return <div key={index} style={fieldStyles.inputGroupItemStyles} className={mod("form__group")}>
                                    <input key={index}
                                type={field.fieldType}
                                name={field.name}
                                defaultValue={field.defaulValue?field.defaultValue:""}                        
                                className={mod("form__field")} 
                                // placeholder={item.placeholder}
                                onChange = {(e)=>{
                                    this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                                }}
                                required={true}
                                onBlur = {(e)=>{this.validateInput(field.name, e.target.value, field.regexPattern)}}
                            />
                                <label style={{fontFamily:`${this.props.fontFamily?this.props.fontFamily:'Helvetica Neue'}`, fontWeight:300,color:this.state.color,}} htmlFor={field.name} className={mod("form__label")}>{item.label}</label>
                                {<span style={{color:"red"}}>{emptyRequiredFields.includes(field.name)?`The ${field.name} field is required`:null}</span>}
                                {<span style={{color:"red"}}>{regexErrors.includes(field.name)?`Invalid ${field.name} input`:null}</span>}
                                </div>
                            })
                        }
                 </div>
        }
        else {
        // this.preFillWithEmptyString(field.name)
       return <div key={index} className={mod("form__group")} style={{}}>
                    <input key={index}
                        style={{fontFamily:this.state.fontFamily, fontSize:this.state.fontSize}}
                        type={field.fieldType}
                        name={field.name}
                        defaultValue={field.defaulValue?field.defaultValue:""}                        
                        className={mod("form__field")} 
                        placeholder={field.placeholder}
                        onChange = {(e)=>{
                            this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
                            // this.handleOnChange(e,field)
                        }}
                    />
                    <label htmlFor={field.name} className={mod("form__label")}>{field.label}</label>
                    {<span>{errors.hasOwnProperty(field.name)?this.state.errors[field.name]:null}</span>}
              </div>
        }
    }

    getRadioButton = (field, index) => {
        if(field.groups===true){
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} style={{display:"flex", width:"100%"}}>
                {
                field.groupItems.map((item,index)=>{
                    return <label  style={fieldStyles.radioGroupItemsStyles} key={index} className={mod("pure-material-radio")}>
                        <input
                            type={field.fieldType}
                            value={item.name}
                            name={item.name}
                            // defaultValue={item.defaulValue?item.defaultValue:""} 
                            onChange = {(e)=>{
                                this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,item)
                            }}
                        />
                        <span style={{color:this.state.color,fontFamily:`${this.props.fontFamily?this.props.fontFamily:this.state.fontFamily}`,fontWeight:300}}>{item.label}</span>
                </label>
                
                })
            }
            </div>
        }
        else {
            this.preFillWithEmptyString(field.name)
            return <label key={index} className={mod("pure-material-radio")}>
                    <input
                        type={field.fieldType}
                        name={field.name}
                        value={field.defaulValue?field.defaultValue:""} 
                        onChange = {(e)=>{this.handleOnChange(e,field)}}
                    />
                    <span>{field.label}</span>
              </label>
        }
            
    }
    getRadioEmoji = (field, index) => {
        const {emptyRequiredFields,regexErrors} = this.state
        if(field.groups===true){
            const value = field.groupItems[0].name
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div 
                        key={index} 
                        style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                        className='nate-white-bg  margin-t-40  margin-b-40 padding-20 elevated-blend'
                        onClick = {() => this.setState({activeQuestion:value})}
                    >
                <div style={{color:this.state.fontFamily, marginTop:20,fontFamily: this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question}</div>
                {!field.vertical
                    ?<div className='d-flex j-start'>
                        {field.groupItems.map((item,index)=>{
                            return <div className='cursor-pointer a-center j-start margin-r-30 margin-b-10'>
                            <input  type='radio' 
                                    style={{border: "0px", transform: "scale(1.5)",marginRight:10, }} id={item.name+index} 
                                    className='cursor-pointer'  value={item.label} name={item.name} 
                                    onChange = {(e)=>{this.handleOnChange(e,item)}}
                            />
                            <label style={{position:"static",fontSize:"46px"}} className='cursor-pointer a-end padding-0' htmlFor={item.name+index}>{item.label}</label><br/>
                        </div>
                        })}
                    </div>
                    :field.groupItems.map((item,index)=>{
                           return <div className='cursor-pointer a-center j-start margin-r-10 margin-b-10'>
                                            <input type='radio' 
                                                    style={{border: "0px", transform: "scale(1.5)",marginRight:10, }} id={item.name+index} 
                                                    className='cursor-pointer'  
                                                    value={item.label} name={item.name} 
                                                    onChange = {(e)=>{this.handleOnChange(e,item)}}
                                                    />
                                            <label  style={{position:"static",fontSize:"26px"}} 
                                                    className='cursor-pointer a-end padding-0' htmlFor={item.name+index}>
                                                    {item.label}
                                            </label><br/>
                                        </div>
                                        })
                        }
            {/* </div> */}

                {<span style={{color:"red",marginTop:10}}>{emptyRequiredFields.includes(value)?`This field is required`:null}</span>}
            </div>
        }
    }
    getRadioQuestion = (field, index) => {
        if(field.groups===true){
        const {emptyRequiredFields,regexErrors} = this.state
           const value = field.groupItems[0].name
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} 
                        style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                        className='nate-white-bg  margin-t-40  margin-b-40 padding-20 elevated-blend'
                        onClick = {() => this.setState({activeQuestion:field.groupItems[0].name})}
                   >
                <div 
                    style={{color:this.state.fontFamily,marginTop:20,fontFamily: this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question}
                </div>
                {!field.vertical
                    ?<div className='d-flex j-start'>
                        {field.groupItems.map((item,index)=>{
                            return <label  style={{marginTop:20}} key={index} className={mod("pure-material-radio margin-r-20")}>
                            <input
                                type={'radio'}
                                value={item.label}
                                name={item.name}
                                // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                                onChange = {(e)=>{this.props.removeButton?this.handleSelect(e,item):this.handleOnChange(e,item)}}
                            />
                            <span style={{color:"#9b9b9b",fontFamily:`${fontFamily3}`,fontWeight:300, fontSize:this.state.fontSize}}>
                            <span>{item.label}</span>
                            </span>
                    </label>
                        })}
                    </div>
                    :<div>
                        {field.groupItems.map((item,index)=>{
                            return <label  style={{marginTop:20}} key={index} className={mod("pure-material-radio")}>
                                            <input
                                                type={'radio'}
                                                value={item.label}
                                                name={item.name}
                                                // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                                                onChange = {(e)=>{this.props.removeButton?this.handleSelect(e,item):this.handleOnChange(e,item)}}
                                            />
                                            <span style={{color:"#9b9b9b",fontFamily:`${fontFamily3}`,fontWeight:300, fontSize:this.state.fontSize}}>
                                            <span>{item.label}</span>
                                            </span>
                                    </label>
                        })}
                    </div> }
            {<span style={{color:"red",marginTop:10}}>{emptyRequiredFields.includes(value)?`This field is required`:null}</span>}
            </div>
        }
        else {
            this.preFillWithEmptyString(field.name)
            return <label key={index} className={mod("pure-material-radio")}>
                    <input
                        type={field.fieldType}
                        name={field.name}
                        value={field.defaulValue?field.defaultValue:""} 
                        onChange = {(e)=>{this.handleOnChange(e,field)}}
                    />
                    <span>{field.label}</span>
              </label>
        }
    }
    getCheckBoxQuestion = (field, index) => {
        if(field.groups===true){
        const {emptyRequiredFields,regexErrors} = this.state
           const value = field.groupItems[0].name
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} 
                        style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                        className='nate-white-bg  margin-t-40  margin-b-40 padding-20 elevated-blend'
                        onClick = {() => this.setState({activeQuestion:field.groupItems[0].name})}
                   >
                <div 
                    style={{color:this.state.fontFamily,marginTop:20,fontFamily: this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question}
                </div>
                {!field.vertical
                    ?<div className='d-flex j-start'>
                        {field.groupItems.map((item,index)=>{
                            return <label  style={{marginTop:20}} key={index} className={mod("pure-material-radio margin-r-20")}>
                            <input
                                type={'checkbox'}
                                value={item.label}
                                name={item.name}
                                // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                                onChange = {(e)=>{this.props.removeButton?this.handleSelect(e,item):this.handleOnChange(e,item)}}
                            />
                            <span style={{color:"#9b9b9b",fontFamily:`${fontFamily3}`,fontWeight:300, fontSize:this.state.fontSize}}>
                            <span>{item.label}</span>
                            </span>
                    </label>
                        })}
                    </div>
                    :<div>
                        {field.groupItems.map((item,index)=>{
                            return <label  style={{marginTop:20}} key={index} className={mod("pure-material-radio")}>
                                            <input
                                                type={'checkbox'}
                                                value={item.label}
                                                name={item.name}
                                                // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                                                onChange = {(e)=>{this.props.removeButton?this.handleSelect(e,item):this.handleOnChange(e,item)}}
                                            />
                                            <span style={{color:"#9b9b9b",fontFamily:`${fontFamily3}`,fontWeight:300, fontSize:this.state.fontSize}}>
                                            <span>{item.label}</span>
                                            </span>
                                    </label>
                        })}
                    </div> }
            {<span style={{color:"red",marginTop:10}}>{emptyRequiredFields.includes(value)?`This field is required`:null}</span>}
            </div>
        }
        else {
            this.preFillWithEmptyString(field.name)
            return <label key={index} className={mod("pure-material-radio")}>
                    <input
                        type={field.fieldType}
                        name={field.name}
                        value={field.defaulValue?field.defaultValue:""} 
                        onChange = {(e)=>{this.handleOnChange(e,field)}}
                    />
                    <span>{field.label}</span>
              </label>
        }
    }
    getImageBanner = (field, index) => {
        let innerWidth = getWindowWidth();
            return <div 
                        key={index} 
                        style={{display:"flex",position:"relative", borderRadius:`${innerWidth<800?'0px':'10px'}` ,backgroundPosition:"center",
                                backgroundSize:"cover", height:`${innerWidth<900?innerWidth<700?'120px':'200px':'200px'}`, width:"100%", flexFlow:"column",
                                justifyContent:"center",alignItems:"center", 
                                fontSize:`${innerWidth<900?innerWidth<600?'25px':'30px':'50px'}`,
                                fontFamily:fontFamily5,
                                overflow:"hidden",
                                color:"white",
                                backgroundImage:`url(${field.image})`, ...field.style}}
                    >
                        <div style={{width:"100%", height:"100%",position:"absolute" ,backgroundColor:"rgb(0,0,0,0.5)",}} ></div>
                        <div style={{width:"100%", height:"100%",zIndex:1,display:"flex", justifyContent:`${innerWidth<700?'center':'center'}`,flexFlow:"column", alignItems:"center"}}>
                            <span style={{fontSize:"70%"}}>{field.title}</span>
                            <div style={{fontSize:"40%"}}>{field.subtitle}</div>
                        </div>
                       
            </div>
    }
    getTextField = () => {}
    getImageFilds = () => {}
    getImageFilds = () => {}
    getSelectFields = (fields,index) => {
        let innerWidth = getWindowWidth();

        const {emptyRequiredFields,regexErrors} = this.state
        const value = fields.name
        return <div 
                    style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
                    className='nate-white-bg  margin-t-40  margin-b-50 padding-20 elevated-blend'
                    onClick = {() => this.setState({activeQuestion:fields.name})}
                >
                <div style={{color:this.state.color, marginTop: 20,fontFamily: "Helvetica Neue",fontSize: this.state.fontSize, fontWeight: 300}} 
                     className='width-100-cent  '>
                    {fields.label}
                </div>
                <select multiple={fields.multiple?fields.multiple:false} name={fields.name} style={{    color: "rgb(155, 155, 155)", marginTop: 20,fontFamily: "Helvetica Neue",fontSize: this.state.fontSize, fontWeight: 300}} className='width-100-cent border-0 outline-none'
                            onChange = {(e)=>{this.props.removeButton?this.handleSelect(e,fields):this.handleOnChange(e,fields)}}

                >
                <option style={{color:this.state.color, fontFamily:fontFamily3, fontWeight:300}} value="" disabled selected>Nothing selected</option>
                   {
                       fields.dropDownList.map((item,index) => {
                           return <option>{item[fields.property]}</option>
                       })
                   }
                </select>
                {fields.multiple === true && innerWidth  > 800
                ?<span style={{color:"indigo",marginTop:10}}>Hold Control (Ctrl) or Command to select multiple</span>
                :null
                }
                {<span style={{color:"red",marginTop:10}}>{emptyRequiredFields.includes(value)?`This field is required`:null}</span>}
        </div>
    }
    
    
    spitFields = () => {
        const isFollowUpAndTrue = (field) => {
            
            if(field.followUp === undefined) return true
            else {
                let fieldName = undefined
                let allAnswers = this.state.data
                let followUpQuestion = field.followUp.followUpQuestion
                let followUpAnswer = field.followUp.followUpAnswer
                let property = `${followUpQuestion}${followUpAnswer}`
                // console.log(allAnswers[followUpQuestion],followUpQuestion,followUpAnswer)
                if(field.groups) {
                    fieldName = field.groupItems[0].name
                }
                else{
                    fieldName = field.name
                }
                if(allAnswers.hasOwnProperty(followUpQuestion)){
                    if(allAnswers[followUpQuestion]===followUpAnswer){
                    followUps[fieldName] = 1;
                    return true
                    }
                    else{
                        followUps[fieldName] = 0;
                    }
                }
            }
        }
        const {fields} = this.props
        if (this.props.fields) {
            // set all fields as innitial empty so that we can loop through and alert errors for required fields if user submits form without filling at all or without filling some fiedls because the erros are only collected onblur
            // console.log('required fields',requiredFields)        
            // console.log('regexPattern',regexPatterns)        
            return this.props.fields.map((formField, index) => {
                if(isFollowUpAndTrue(formField)){
                    if (formField.fieldType === undefined || formField.fieldType == null) 
                        return `error: field type cannot be empty `
                    switch (formField.fieldType) {
                        case FIELDS.input:
                            return this.getInputFied(formField,index)
                        case FIELDS.dropDown:
                            return this.getDropDown(formField,index)
                        case FIELDS.password:
                            return this.getInputFied(formField,index)
                        case FIELDS.radio:
                            return this.getRadioButton(formField,index)
                        case FIELDS.image:
                            return this.getImage(formField,index)
                        case FIELDS.textArea:
                            return this.getTextArea(formField,index)
                        case FIELDS.date:
                            return this.getDate(formField,index)
                        case FIELDS.radioQuestion:
                            return this.getRadioQuestion(formField,index)
                        case FIELDS.checkBoxQuestion:
                            return this.getCheckBoxQuestion(formField,index)
                        case FIELDS.imageBanner:
                            return this.getImageBanner(formField,index)
                        case FIELDS.radioEmoji:
                            return this.getRadioEmoji(formField,index)
                        case FIELDS.select:
                            return this.getSelectFields(formField,index)
                        default:
                            return "Input field type  not supprted";
                    }
                }
            })
        }
    }
    componentDidMount(){
        const {fields} = this.props;
        let nameOfField = undefined;
        for(let i=0;i<fields.length; i++) {
            console.log(i,this.state.data)
            let index = i;
            if(fields[index].groups===true){
                for(let j=0; j<fields[index].groupItems.length;j++){
                    nameOfField = fields[index].groupItems[j].name
                      // Create an object with all fields innitialy empty so that we will set it as the innitial state of all fieds
                      innitialData[nameOfField] = '';
                    if(fields[index].groupItems[j].required){
                        requiredFields.includes(nameOfField)?console.log(''):requiredFields.push(nameOfField);
                    }
                    if(fields[index].groupItems[j].regexPattern){
                        let myObj = {}
                        myObj[nameOfField] = fields[index].groupItems[j].regexPattern
                        regexPatterns.includes(myObj)?console.log(''):regexPatterns.push(myObj);
                    }
                    if(fields[index].groupItems[j].followUp !== undefined){
                        followUps[nameOfField] = 0
                    }
                }
            }
            else{
            nameOfField = fields[index].name;
            // Create an object with all fields innitialy empty so that we will set it as the innitial state of all fieds
            // Prevent banner field from adding to form data
            if(nameOfField !== "banner"){ 
                innitialData[nameOfField] = '';  
            }
            if(fields[index].required){
                requiredFields.push(nameOfField);
            }
            if(fields[index].regexPattern){
                let myObj = {}
                myObj[nameOfField] = fields[index].regexPattern
                regexPatterns.push(myObj)
            }
            }
            if(fields[index].followUp!==undefined){
                followUps[nameOfField] = 0
            }
        }
        this.setState({data:innitialData,allFields:innitialData})
    }
    render() {
        outerStyle={
            ...this.props.style
        }
        fieldStyles = {
            buttonOuterStyles:{
                borderRadius:"100%",
                boxShadow:"0 1px 0 0 transparent, 0 2px 10px 0 rgb(0 0 0 / 10%)",
                ...this.props.buttonOuterStyles
            },
            roundButtonStyles:{
                outline: "none",
                border:" 0px",
                color: "white",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontWeight: "500",
                cursor:"pointer",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor:"#00008B",
                width:50,
                display:"flex",
                justifyContent:"center",
                padding:"0px 0px", 
                alignItems:"center", 
                height:50,
                borderRadius:"100%",
                margin:"2.5px",
            },
            button:{
                display:"flex",
                justifyContent:"flex-start",
                padding: "12px 27px",
                outline: "none",
                border:" 0px",
                color: "white",
                backgroundColor: "#0C6EFD",
                borderRadius: "50px",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontWeight: "500",
                cursor:"pointer",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                ...this.props.buttonStyles
            },
            buttonContainer:{
                ...this.props.buttonContainer
            },
            radioGroupItemsStyles:{
                marginRight:20,
                marginTop:30,
                ...this.groupItemsStyles
            },
            inputGroupItemStyles:{
                width:"48%",
                ...this.groupItemsStyles,
                marginTop:20
            },
            redirectTextStyles:{
                display:"flex",
                width:"100%",
                color:"18A0FB",
                ...this.props.redirectLinkStyles
            },
            redirectLinkStyles:{
                color:"18A0FB",
                textDecoration:"none",
                fontWeight:"bolder",
                // marginLeft:"2px",
                ...this.props.redirectLinkStyles
            },
        
    }
    const {buttonType} = this .props;
        return (
            <div id={mod("main-form-container")} style={outerStyle}>
                 {this.state.confirmation
                    ?<div  onClick = {() => {
                                this.setState({confirmation:!this.state.confirmation})
                            }} 
                            className='width-100-cent a-center top-0 right-0 j-center height-100-cent nate-black-partial-bg position-fixed above-all'
                    >
                        {/* <div className='position-fixed fill-entire-page nate-blue-bg'>j</div> */}
                    <div className='slide-up nate-blue-text max-width-400 width-80-cent position-relative a-center f-column j-center height-200 curved-corners nate-white-bg'>
                        <span style={{fontFamily:fontFamily4, fontSize:20}}>Confirm form submission?</span>
                        <span className=' width-100-cent bottom-0 right-0 j-end position-absolute padding-r-20 padding-b-20'>
                            {/* <PopUpButton buttonText = "confirm"/> */}
                            <span 
                                onClick = {() => {
                                    this.setState({confirmation:!this.state.confirmation})
                                }}
                                className='nate-pink-text margin-r-20 cursor-pointer'
                            >
                                    Cancel
                            </span>
                            <span 
                                onClick = {(e) => {
                                    this.handleOnSubmit(e)
                                }}
                                style={{color:""}} 
                                className='cursor-pointer'>
                                    Submit
                            </span>
                    </span>
            </div>
        </div>
        :null
            }
                <form ref={this.formRef} id={mod("form-element")}>
                    {this.spitFields()}
                    {
                    !this.props.removeButton
                    ?<div id={mod(`button-container`)} style={fieldStyles.buttonContainer}>
                       <span style={buttonType==="rounded"?fieldStyles.buttonOuterStyles:null}> 
                        <button  disable={`${!this.state.buttonClicked}`} className='ro' onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.props.enableConfirmation?this.showConfirmation(e):this.handleOnSubmit(e)
                        }} style={buttonType==="rounded"?fieldStyles.roundButtonStyles:fieldStyles.button}>
                            {!this.state.buttonClicked
                            ?<span style={{mxHeight:20}}>
                                {this.props.buttonText
                                ?this.props.buttonText
                                :this.props.buttonIcon
                                ?this.props.buttonIcon:"Submit"
                            }
                            </span>
                            :<span style={{minWidth:27}}  className='rotate'>
                                <AutorenewIcon style={{width:16,height:16}}/>
                             </span>
                            }
                        </button>
                        </span>
                        
                    </div>
                    :null
                    }
                </form>
            </div>
        );
    }
}
export default FormGenerator;