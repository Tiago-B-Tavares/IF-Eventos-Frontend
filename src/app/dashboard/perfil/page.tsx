import { getServerSession } from "next-auth/next";


export default async function Profile() {
    const session = await getServerSession();

    if (session) {
        return (
            <div>
                <h1>Perfil do Usuário</h1>
                <p>Nome: {session.user.name}</p>
                <p>Email: {session.user.email}</p>
                {/* Adicione outros dados do usuário conforme necessário */}
            </div>
        );
    }


}
