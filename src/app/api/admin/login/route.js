import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {

        const { username, password } = await request.json();

        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            const response = NextResponse.json({ message: "Login successful" });

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24,
                path: "/"
            })

            return response;
        } else {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            )
        }

    } catch (error) {
        console.error("Login error : ", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}