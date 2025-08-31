import { connectDB } from "@/lib/db";

export async function GET(){
    try {
        const db = await connectDB();
        const [rows] = await db.execute(`SELECT * FROM schools`)
        return Response.json(rows)
    } catch (error) {
        return Response.json({message:"Error occured in backend",error:error.message})
    }
}
