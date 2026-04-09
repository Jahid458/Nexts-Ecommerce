import { connectDB } from "@/lib/database";
import { zSchema } from "@/lib/zodSchema";


export async function POST(request) {
    try {
     await connectDB()
        // validation Schema 
     const validateSchema = zSchema.pick({
        name: true, email:true , password: true 
     })

     const payload = await request.json()



     
    } catch (error) {
        
    }
}