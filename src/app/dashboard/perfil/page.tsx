import { getServerSession } from "next-auth/next";


export default async function Profile() {
    const session = await getServerSession();

    if (session) {
        return (
            <div>
               
            </div>
        );
    }


}
