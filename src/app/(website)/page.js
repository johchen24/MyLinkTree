import MainForm from "@/components/forms/MainForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return(
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            One link to<br></br> your everything
          </h1>
          <h2 className="text-xl text-gray-500 mt-6">
            Share your links, social profiles, contact info, then reach the world
          </h2>
        </div>
        <MainForm user={session?.user}/>
      </section>
    </main>
  )
}
