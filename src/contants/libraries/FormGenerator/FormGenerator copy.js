import React, { Component } from 'react';
import { cssModules } from '../../contants/generalFunctions';
import { FIELDS } from './FormGeneratorFields';
import styles from "./formgenerator.module.css"
import { TextField,Autocomplete } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { fontFamily2, fontFamily1, fontFamily3, fontFamily5 } from '../../contants/uiConstants';
import FileUploader from './FileUploader';
var as = [0,1,2,3]
let fieldStyles, outerStyle;
const mod = cssModules(styles);
class FormGenerator extends Component {
    constructor(props){
        super(props)
        this.formRef = React.createRef();
        this.state = {
            data:{},
            errors:[],
            fontSize:'19px',
            modular:true,
            color:"rgb(0,0,0,0.7)",
            fontFamily:'Helvetica Neue',
            buttonClicked:false,
        }
    }
    static handleSubmit = {
            // handleSubmit()
            // console.log(this.state.data)
            // this.resetForm();
    }
    resetForm = () => {
        this.formRef.current.reset();
    }
    actionCompleted = () => {
        this.setState({buttonClicked:false})
        // this.formRef.current.reset();
    }
    handleOnChange = (e,fieldData) => {
        const { data } = this.state;
        this.setState({ data: { ...data, [fieldData.name]: e.target.value } });
        // console.log(e.target.value)
        // console.log(fieldData.name)
    }
    handleSelect = (e, field) => {
        this.props.handleOnSubmit(e.target.value,field,this.resetForm,this.actionCompleted,)
    }
    preFillWithEmptyString=(fieldName)=>{
        const {data} = this.state;
        this.setState({ data: { ...data, [fieldName]:"" } });
    }
    validateInput = () => {
        const {data, errors} = this.state;
        const {fields} = this.props;
        // console.log(fields)
        // for(let i=0; i<fields.length; i++){
        //   if(fields[i].groups===true){
        //       let groupItem = fields[i].groupItems
        //       for(let j=0;j<groupItem.length;j++){
        //           let currentItem = groupItem[j];
        //           if(currentItem.required===true
        //             &&(data[currentItem.name===""]||data[currentItem.name]===undefined||data[currentItem.name]===null)){
        //                async await this.setState({errors: {...errors, [currentItem.name]:"This field is required"}})
        //           }
        //       }
             

        //   }
        // }
        // console.log(errors)
        return 1
    }
  
    handleOnSubmit = (e) => {
        this.setState({buttonClicked:true})
        if(this.validateInput()){
            e.preventDefault();
            const {data} = this.state;
            this.props.handleOnSubmit(data,this.resetForm,this.actionCompleted)
            // console.log(this.state.data)
            // this.resetForm();
        }
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
        const {errors} = this.state
        if(field.groups===true){
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
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
        // this.preFillWithEmptyString(field.name)
       return <div key={index} className={mod("form__group")} style={{}}>
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
                    />
                    <label htmlFor={field.name} className={mod("form__label")}>{field.label}</label>
                    {<span>{errors.hasOwnProperty(field.name)?this.state.errors[field.name]:null}</span>}
              </div>
        }
    }
    getInputQuestion = (field, index) => {
        const {errors} = this.state
        if(field.groups===true){
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
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
                            />
                            <label style={{fontFamily:`${this.props.fontFamily?this.props.fontFamily:'Helvetica Neue'}`, fontWeight:300,color:this.state.color,}} htmlFor={field.name} className={mod("form__label")}>{item.label}</label>
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
                                this.props.removeButton?this.handleSelect(e,field):this.handleOnChange(e,field)
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
        if(field.groups===true){
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} style={{display:"flex", width:"100%", flexFlow:"column",}}>
                <div style={{color:this.state.fontFamily, marginTop:20,fontFamily: this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question}</div>
                {
                field.groupItems.map((item,index)=>{
                    return <label  style={{marginTop:20}} key={index} className={mod("pure-material-radio")}>
                        <input
                            type={'radio'}
                            value={item.name}
                            name={item.name}
                            // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                            onChange = {(e)=>{this.handleOnChange(e,item)}}
                        />
                        <span style={{color:"#9b9b9b",fontFamily:`${fontFamily3}`,fontWeight:300, fontSize:this.state.fontSize}}>
                           <span>{item.label}</span>
                        </span>
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
                    <span style={{fontSize:20}}>{field.label}</span>
              </label>
        }    
    }
    getRadioQuestion = (field, index) => {
        if(field.groups===true){
            // this.preFillWithEmptyString(field.groupItems.name)
            return <div key={index} style={{display:"flex", width:"100%", flexFlow:"column"}}>
                <div style={{color:this.state.fontFamily,marginTop:20,fontFamily: this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question}</div>
                {
                field.groupItems.map((item,index)=>{
                    return <label  style={fieldStyles.radioGroupItemsStyles} key={index} className={mod("pure-material-radio")}>
                        <input
                            type={'radio'}
                            value={item.name}
                            name={item.name}
                            // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                            onChange = {(e)=>{this.handleOnChange(e,item)}}
                        />
                        <span style={{color:this.state.fontFamily,fontFamily:`${fontFamily3}`,fontWeight:300}}>{item.label}</span>
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
    getImageBanner = (field, index) => {
            return <div 
                        key={index} 
                        style={{display:"flex",position:"relative", borderRadius:"10px" ,backgroundPosition:"center",
                                backgroundSize:"cover", height:"200px", width:"100%", flexFlow:"column",
                                justifyContent:"center",alignItems:"center", 
                                fontSize:"50px",
                                fontFamily:fontFamily5,
                                overflow:"hidden",
                                color:"white",
                                backgroundImage:`url(${field.image})`, ...field.style}}
                    >
                        <div style={{width:"100%", height:"100%",position:"absolute" ,backgroundColor:"rgb(0,0,0,0.5)",}} ></div>
                        <div style={{width:"100%", height:"100%",zIndex:1,display:"flex", justifyContent:"center",flexFlow:"column", alignItems:"center"}}>
                            <span style={{fontSize:"80%"}}>{field.title}</span>
                            <div style={{fontSize:"30%"}}>{field.subtitle}</div>
                        </div>
                       
            </div>
    }
    getCheckBox = () => {}
    getTextField = () => {}
    getImageFilds = () => {}
    getImageFilds = () => {}
  
    getSelectFields = (fields,index) => {
        return <div className='width-100-cent margin-t-20 margin-b-20 padding-b-5' style={{borderBottom:"1px solid #F7F7F7"}}>
                <div style={{    color:this.state.color, marginTop: 20,fontFamily: "Helvetica Neue",fontSize: this.state.fontSize, fontWeight: 300}} className='width-100-cent  '>
                    {fields.label}
                </div>
                <select name={fields.name} style={{    color: "rgb(155, 155, 155)", marginTop: 20,fontFamily: "Helvetica Neue",fontSize: this.state.fontSize, fontWeight: 300}} className='width-100-cent border-0 outline-none'>
                <option style={{color:this.state.color}} value="" disabled selected>Nothing selected</option>
                   {
                       fields.dropDownList.map((item,index) => {
                           return <option>{item.name}</option>
                       })
                   }
                </select>
        </div>
    }
    
    spitFields = (fields) => {
        if (this.props.fields) {
            return this.props.fields.map((formField, index) => {
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
                    case FIELDS.imageBanner:
                        return this.getImageBanner(formField,index)
                    case FIELDS.radioEmoji:
                        return this.getRadioEmoji(formField,index)
                    case FIELDS.select:
                        return this.getSelectFields(formField,index)
                    default:
                        return "Input field type  not supprted";
                }

            })
        }

    }
    componentDidMount(){

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
                <form ref={this.formRef} id={mod("form-element")}>
                    {this.spitFields()}
                    {
                    !this.props.removeButton
                    ?<div id={mod(`button-container`)} style={fieldStyles.buttonContainer}>
                       <span style={buttonType==="rounded"?fieldStyles.buttonOuterStyles:null}> 
                        <button  disable={`${!this.state.buttonClicked}`} className='ro' onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.handleOnSubmit(e)
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