import mongoose , {Schema} from "mongoose";
import { ProductCollection, ProductStatus , ProductSize, ProductVolume} from "../libs/enums/product.enum";
const productSchema = new Schema ({
productStatus:{
    type:String,
    enum:ProductStatus,
    default:ProductStatus.PAUSE,
},
productCollection:{
    type:String,
    enum:ProductCollection,
    required:true,

},productName:{
    type:String,
    required:true,
    
},productPrice:{
    type:String,
    required:true,
    
},productLeftCount:{
    type:Number,
    required:true,
    
},productSize:{
    type:String,
    enum:ProductSize,
    default:ProductSize.NORMAL,  
},productVolume:{
    type:Number,
    enum:ProductVolume,
    default:ProductVolume.ONE,  
},productDesc:{
    type:String,
    
},productImage:{
    type:[String],
    default:[],    
},productViews:{
    type:Number,
    default:0,
}

}
,{timestamps:true}//updated at and created at
);
productSchema.index(
    {productName: 1, ProductSize: 1 , ProductVolume: 1},
    {unique:true}
);

export default mongoose.model('Product', productSchema);
