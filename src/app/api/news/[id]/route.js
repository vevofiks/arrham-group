import connectDB from '@/app/lib/mongodb';
import News from '@/app/models/News';


export const GET = async (req, { params }) => {
    try {

        await connectDB();
        const { id } = await params;
        const news = await News.findById(id);
        if (!news) return new Response("Not found", { status: 404 });
        return Response.json(news)
    } catch (error) {
        return new Response("Error fetching news", { status: 500 });

    }
}


export const PUT = async (req, { params }) => {
    try {

        await connectDB();
        const { title, content } = await req.json();
        const { id } = await params;
        const updatedNews = await News.findByIdAndUpdate(
            id, { title, content }, { new: true }
        )
        return Response.json(updatedNews)
    } catch (error) {
        return new Response("Error updating news", { status: 500 });

    }
}


export const DELETE = async (req, { params }) => {
    try {

        await connectDB();
        const { id } = await params;

        const deletedNews = await News.findByIdAndDelete(id);
        if (!deletedNews) {
            return new Response("Not found", { status: 404 });
        }
        return new Response("Deleted", { status: 204 })
    } catch (error) {
        return new Response("Error deleting news", { status: 500 });

    }
}