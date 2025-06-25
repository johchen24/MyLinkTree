import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Account(req) {
    const session = await getServerSession(authOptions);
    console.log(req);
    return(
        <div>
            Account {session?.user?.name}
        </div>
    )
}