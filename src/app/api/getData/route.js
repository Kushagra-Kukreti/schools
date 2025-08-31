import { connectDB } from "@/lib/db";
import { uploadOnCloudinary } from "@/utils/cloudinary";

export async function POST(request){
    try {
        const db = await connectDB();
        const formData = await request.formData()
        const name = formData.get("name")
        const address = formData.get("address")
        const city = formData.get("city")
        const state = formData.get("state")
        const contact = formData.get("contact")
        const email_id = formData.get("email_id")
        const image = formData.get("image")
        const bytes = await image.arrayBuffer()
        const buffer =  Buffer.from(bytes)
        //works on local but not on vercel 

        // const uploadDir = path.join(process.cwd(),"public","schoolImages")
        // if(!fs.existsSync(uploadDir))
        // fs.mkdirSync(uploadDir,{recursive:true})
        
        // const filePath  = path.join(uploadDir,image.name)
        // fs.writeFileSync(filePath,buffer)
        
        const imageUrl = await uploadOnCloudinary(buffer,image.name)
        
        const addedData = await db.execute(`
           insert into schools(name,address,city,state,contact,image,email_id)
           values (?,?,?,?,?,?,?)`,
           [name,address,city,state,contact,imageUrl?.url,email_id]
        ) 
        return Response.json(addedData)
    } catch (error) {
        return Response.json({message:"Error occured in backend",error})
    }
}