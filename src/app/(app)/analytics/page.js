import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/pageSchema";
import { Event } from "@/models/eventSchema";
import SectionBox from "@/components/layout/SectionBox";
import ViewsChart from "@/components/charts/ViewsChart";

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    const session = await getServerSession(authOptions);
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ owner: session?.user?.email }).lean();

    // Aggregate daily view counts for this page
    const events = await Event.aggregate([
        { $match: { type: 'view', page: page?.uri } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'UTC' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    // Build labels and data arrays (format: YYYY-MM-DD)
    const labels = events.map(e => e._id);
    const dataPoints = events.map(e => e.count);

    return (
        <>
            <SectionBox>
                <h2 className="text-xl font-semibold mb-4">Views</h2>
                <div className="bg-white rounded-md p-2">
                    <ViewsChart labels={labels} dataPoints={dataPoints} />
                </div>
            </SectionBox>
        </>
    );
}