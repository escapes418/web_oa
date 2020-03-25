class Edge {
    constructor(id,primaryKey, source, target, controlPoints, sourceAnchor, targetAnchor, shape,style,label,condition ){
        this.id = id
        this.primaryKey = primaryKey
        this.source = source
        this.target = target
        this.controlPoints = controlPoints
        this.sourceAnchor = sourceAnchor
        this.targetAnchor = targetAnchor  
        this.shape = shape 
        this.style = style
        this.label = label
        if(condition){
            this.condition = condition
        }else{
            this.condition = {
                name:"",
                type:"",
                id:"",
                detailId:"",
                detailIds:[]
            }
        }
    }
}