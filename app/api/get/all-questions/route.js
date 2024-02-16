import {NextResponse} from "next/server";
import Question from "@/models/Question";
import connect from "@/app/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const {searchParams} = await req.nextUrl;
        const limit = searchParams.get('limit');
        const table = searchParams.get('table');
        await connect()
        let questions = await Question.find().where({subject: table}).limit(limit);
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message, status: 500 });
    }
}

//http://localhost:3000/api/get/all-questions?table=ETI&limit=20