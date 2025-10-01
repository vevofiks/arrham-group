import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Branch from "@/app/models/Branch";

export async function GET(request) {
    try {
        await connectDB();
        const branches = await Branch.find({});
        return NextResponse.json(branches);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch branches" });
    }
}


export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const branch = await Branch.create(body);
        return NextResponse.json(branch, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}