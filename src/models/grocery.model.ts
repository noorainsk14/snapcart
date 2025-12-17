import mongoose, { Mongoose } from "mongoose";

interface IGrocery{
    _id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    price:string,
    unit:string,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}

const grocerySchema = new mongoose.Schema<IGrocery>({
    name:{
        type:String,
        required: [true, "Grocery name is required"],
        trim:true
    },
    category: {
  type: String,
  enum: [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Rice, Atta & Grains",
    "Snacks & Biscuits",
    "Spices & Masalas",
    "Beverages & Drinks",
    "Personal Care",
    "Household Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care",
    "Bakery & Breads",
    "Cooking Oils & Ghee",
    "Dry Fruits & Nuts",
    "Sweets & Chocolates",
    "Frozen Foods",
    "Ready to Cook",
    "Health & Wellness",
    "Organic Products",
    "Cleaning Supplies",
    "Kitchen Essentials"
  ]
},
 price: {
      type: String,
      required: [true, "Price is required"],

    },
unit:{
    type:String,
    required:[true, "Unit is requied"],
     enum: ["kg", "g", "ltr", "ml", "pcs", "pack"]
},
image:{
    type:String,
    required:[true, "Image is requied"]
},

},{timestamps:true})

const Grocery = mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);

export default Grocery