import connectDB from "@/app/lib/mongodb";
import News from "@/app/models/News";

export const GET = async () => {
    try {
        await connectDB();
        const news = await News.find().sort({ createdAt: -1 })
        return Response.json(news)
    } catch (error) {
        return new Response("Error fetching news", { status: 500 });

    }

}


export const POST = async (request) => {
    try {
        await connectDB();
        const { title, content } = await request.json()
        const createNews = await News.create({ title, content })
        return Response.json(createNews);
    } catch (error) {
        return new Response("Error creating new news", { status: 500 });

    }
}