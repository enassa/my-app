import React, { Component } from 'react'
import { Autorenew, Edit, Crop, CropFree, Delete, PhotoAlbum, Undo } from '@mui/icons-material';
import styles from "./formgenerator.module.css"
import { randomImages } from '../../dummydata/dummyData';
import { fontFamily3 } from '../../contants/uiConstants';
var imageNode;
var dropNode;
var inputNode;
var isMouseDown = false;
var offset = [0,0];
var uploaded_image;
export default class FileUploader extends Component {
    constructor(props){
        super(props)
        this.state={
            action:'move',
            files:this.props.images?this.props.images:[],
            editingImage:null
        }
        this.imageRef = React.createRef();
        this.dropZoneRef = React.createRef();
        this.inputRef = React.createRef();
    }

    editImage = (index) => {
        let {files} = this.state
        let imageToEdit = files[index]
        this.setState({editingImage:imageToEdit})
    }
    deleteImage = (index) => {
        this.state.files.splice(index,1)
        this.setState({files:[...this.state.files]})
        // console.log( this.state.files)
        // let imageToEdit = files[index]
    }
    showFilesToUser = () => {
        if(this.props.field.fieldType==='file'){
            return this.state.images.map((image,index) => {
                return  <div style={{width:180,minWidth:180,overflow:"hidden",display:"flex",flexFlow:"column", justifyContent:"flex-start", marginRight:10,marginLeft:10, height:180, backgroundColor:"grey",backgroundPosition:"center",backgroundSize:"cover", borderRadius:"20px", backgroundImage:`url(${randomImages})`}}>
                            <div style={{width:"100", height:"100%",display:"flex",flexFlow:"column", justifyContent:"flex-end", alignItems:"center", background: "rgb(25,25,25)",background: "linear-gradient(180deg, rgba(25,25,25,0) 68%, rgba(0,0,0,1) 100%)"}}>
                                <div style={{width:"100%", height:"40px", padding:"0px 5px",color:"#B9B9B6", display:"flex",flexFlow:"row", justifyContent:"space-around", alignItems:"center", }}>
                                    <Crop onClick={()=>this.editImage(index)} alt="Crop" className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                    <CropFree onClick={()=>this.editImage(index)} className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                    <Delete className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                    <Edit onClick={()=>this.editImage(index)} className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                </div>
                            </div>
                            <div style={{width:"100%",backgroundColor:"#0C6DFD", height:"5px"}}></div>
                        </div>
            })
    }
        else if(this.props.field.fieldType==='image') {
            return this.state.files.map((image,index) => {
                return  <div style={{width:180,minWidth:180,overflow:"hidden",display:"flex",flexFlow:"column", justifyContent:"flex-start", marginRight:10,marginLeft:10, height:180, backgroundColor:"grey",backgroundPosition:"center",backgroundSize:"cover", borderRadius:"20px", backgroundImage:`url(${URL.createObjectURL(image)})`}}>
                            <div style={{width:"100", height:"100%",display:"flex",flexFlow:"column", justifyContent:"flex-end", alignItems:"center", background: "rgb(25,25,25)",background: "linear-gradient(180deg, rgba(25,25,25,0) 68%, rgba(0,0,0,1) 100%)"}}>
                                <div style={{width:"100%", height:"40px", padding:"0px 5px",color:"#B9B9B6", display:"flex",flexFlow:"row", justifyContent:"space-around", alignItems:"center", }}>
                                    <Crop onClick={()=>this.editImage(index)} alt="Crop" className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                    <CropFree onClick={()=>this.editImage(index)} className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                    <Delete onClick={()=>this.deleteImage(index)} className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                    <Edit onClick={()=>this.editImage(index)} className={styles['edit-icons']} style={{cursor:"pointer"}}/>
                                </div>
                            </div>
                            <div style={{width:"100%",backgroundColor:"#0C6DFD", height:"5px"}}></div>
                        </div>
            })
        }  
    }
    moveImage = (e) => {
        imageNode = this.imageRef.current
        e.preventDefault();
        if (isMouseDown) {
            // console.log(e.clientX + offset[0], imageNode)
            // console.log(e.clientY)
             imageNode.style.left = (e.clientX + offset[0]) + 'px';
             imageNode.style.top  = (e.clientY + offset[1]) + 'px';
        }
    }

     handleImagesDropped = () => {
       const readImage = (files) => {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
            uploaded_image = event.target.result;
            reader.readAsDataURL(files);
         })
        }
    }

    processFiles = (files) => {
        const filesList = [...files]
        console.log(filesList)
        this.setState({files:filesList})
    }
    setAction = () => {
        switch (this.state.action) {
            case 'move':
                 
                break;
            case 'crop':
                
                break;
            case 'resize':
                
                break;
        
            default:
                break;
        }

    }
    componentDidMount () {
        
        inputNode = this.inputRef.current
        dropNode = this.dropZoneRef.current
        
    }
    render() {
        const {field} = this.props
        const labelStyle = {
            width:"100%", 
            marginBottom:"10px",
            color:"grey",
            fontFamily:fontFamily3,
            fontWeight:300,
            ...field.labelStyles
        }
        const {images} = this.props
        const value = "dddd"
        return (
            <div onDrop={(e)=>this.handleImagesDropped(e)} style={{display:"flex", position:"relative", overflow:"hidden",  marginTop:40,flexFlow:"column", width:"100%", height:"auto", alignItems:"center", justifyContent:"center",}} >
            {/* Editer container */}
            {this.state.editingImage!==null
            ?<div style={{display:`flex`,justifyContent:"flex-start",flexFlow:"row",alignItems:"center",width:"100%",paddingBottom:"10px", paddingRight:"10px", position:"absolute", borderRadius:"20px", height:"100%", backgroundColor:"rgb(0,0,0,0.9)"}}>
                {/* Image info container */}
                <div style={{display:"flex",justifyContent:"flex-start",flexFlow:"row",alignItems:"center",width:"30%", height:"100%", backgroundColor:"#171717"}}>
                </div>
                {/*image editing workspace */}
                <div style={{display:"flex",justifyContent:"flex-start",flexFlow:"column",alignItems:"center",width:"70%",maxWidth:"70%", height:"100%", backgroundColor:""}}>
                    <div  style={{display:"flex",justifyContent:"flex-start",flexFlow:"column",alignItems:"center",width:"100%", height:"10%", backgroundColor:"black"}}></div>
                    <div  style={{display:"flex", backgroundColor:"white",position:"relative",overflow:"hidden",justifyContent:"center",flexFlow:"column",alignItems:"center",width:"100%", height:"85%",maxHeight:"85%",}}>
                        <img ref={this.imageRef} alt='' 
                                onMouseDown={(e)=>{
                                    isMouseDown=true
                                    //imageNode = this.imageRef.current
                                    offset = [
                                        imageNode.offsetLeft - e.clientX,
                                        imageNode.offsetTop - e.clientY
                                     ];
                                }} 
                                onMouseUp={(e)=>{
                                    isMouseDown=false
                                }}
                                onMouseMove={(e)=>{
                                    this.moveImage(e)
                                }}
                             src={URL.createObjectURL(this.state.editingImage)}  style={{backgroundColor:"white",position:"absolute",overflow:"hidden",alignItems:"center",width:"80%", height:"auto",cursor:"grab"}}>
                        </img>
                    </div>
                </div>
            </div>
            :null
            }
                <div style={labelStyle}>{field.label}</div>
                {/* Drop zone */}
                {!images?
                 <div ref={this.dropZoneRef} style={{display:"flex", flexFlow:"column", borderRadius:"20px", width:"100%", height:"200px", alignItems:"center", justifyContent:"center", border:"2px dashed #333"}} >
                     <input 
                         ref = {this.inputRef}
                         onChange = {(e)=>this.processFiles(e.target.files)}
                         style={{display:"none"}}
                         accept={`file_extension|${field.accepted?field.accepted:'.jpg, .png,.jpeg,.JPEG,.JPG'}`} 
                         type="file" id="files" name="files" 
                         required={field.required?field.required:false} 
                         multiple={field.multiple?field.multiple:false}
                     />
                     <PhotoAlbum style={{width:50, height:50, color:"#2B91FF"}}/>
                     <h4 style={{color:"grey"}}>Drop image to upload or <b style={{color:"#2B91FF", cursor:"pointer"}} onClick = {()=>inputNode.click()}>browse</b></h4>
                 </div>
                 :null
                }
                 {/* images display container  */}
                 {this.state.files.length
                    ?<div className={styles['uploader-images-container']} style={{display:"flex", overflowX:"auto", marginTop:40, padding:"10px 20px", borderRadius:"20px", maxWidth:"100%", height:"230px", justifyContent:"flex-start",alignItems:"center"}}>
                    {this.showFilesToUser()}
                 </div>
                 :null
                 }
                </div>
        )
    }
}
