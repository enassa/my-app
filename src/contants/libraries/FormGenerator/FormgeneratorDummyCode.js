let getSubQuestions = (questionSet = []) => {
    return questionSet.map((formField, index) => {
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
            case FIELDS.followUp:
                return this.getFollowUp(formField,index)
            default:
                return "Input field type  not supprted";
        }

    })
}


getFollowUp = (field,index) => {
    const {emptyRequiredFields,regexErrors} = this.state
    let activeQuestionSet = []
    let getAnswers = (answers) => {
        console.log(answers)
        return answers.map((item,index)=>{
            let myItem = {
                name:field.name
            }
            return <label  style={fieldStyles.radioGroupItemsStyles} key={index} className={mod("pure-material-radio")}>
                <input
                     type={'radio'}
                     value={item}
                     name={field.name}
                    // defaultValue={item.defaulValue?itsem.defaultValue:""} 
                    onChange = {(e)=>{this.handleOnChange(e,myItem)}}
                />
                <span style={{color:this.state.fontFamily,fontFamily:`${fontFamily3}`,fontWeight:300}}>{item}</span>
        </label>
        })
            
    }
        // this.preFillWithEmptyString(field.groupItems.name)
        let getMainQuestion = () => {
            const value = field.name
            return <div key={index} 
            style={{display:"flex", width:"100%", flexFlow:"column", borderRadius:20, borderLeft:`${this.state.activeQuestion===value?'5px solid blue':""}`}} 
            className='nate-white-bg  margin-t-40  margin-b-40 padding-20 elevated-blend'
            onClick = {() => this.setState({activeQuestion:field.name})}
            >
            <div 
                style={{color:this.state.fontFamily,marginTop:20,fontFamily: this.state.fontFamily,width:"100%",fontSize:this.state.fontSize, fontWeight:300}}>{field.question.question}
            </div>
            {getAnswers(field.question.answers)}
            {<span style={{color:"red",marginTop:10}}>{emptyRequiredFields.includes(value)?`This field is required`:null}</span>}
            </div>
        }
     
        return <div className='width-100-cent height-auto'> 
                {getMainQuestion()}
                {getSubQuestions()}
        </div>
}


{
    fieldType: FIELDS.followUp,
    name:"relationship",
    required:true,
    question:{
        question:'Are you a wife, husband or single?',
        answers:['Wife', 'Huband', 'Single'],
        questionSets:[
            [
                {
                    fieldType: FIELDS.radioQuestion,
                    question:'Who is you wife?',
                    answers:['Margaret','Esi Kuma','Janet Apem'],
                    name:"wife",
                    required:true
                },
                {
                    fieldType: FIELDS.radioQuestion,
                    question:'Who is you female friend?',
                    answers:['Margaret','Esi Kuma','Janet Apem'],
                    name:"femaleFriend",
                    required:true
                },
            ],
            [
                {
                    fieldType: FIELDS.radioQuestion,
                    question:'Who is you husband?',
                    answers:['Nathaniel', 'Kesse', 'Assan'],
                    name:"husband",
                    required:true
                },
                {
                    fieldType: FIELDS.radioQuestion,
                    question:'Who is your male friend?',
                    answers:['Nathan','Selase','Richard'],
                    name:"maleFriend",
                    required:true
                },
            ],
            [
                {
                    fieldType: FIELDS.radioQuestion,
                    question:'Why are you single?',
                    answers:['Hmm' ,'Asem oo', 'Eny3 easy oo'],
                    name:"grabbingStatus",
                    required:true
                },
                {
                    fieldType: FIELDS.radioQuestion,
                    question:'Will you like to date',
                    answers:['Yes', 'Maybe', 'Anaa'],
                    name:"date",
                    required:true
                },
            ],
        ]
    },
},