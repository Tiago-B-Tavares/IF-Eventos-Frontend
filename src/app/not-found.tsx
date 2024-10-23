import { Box, Image, Link } from "@chakra-ui/react";
import notFoundImage from "./assets/images/404.svg"; // Importe a imagem corretamente

const notFound = (notFoundImage as unknown as { src: string }).src;
export default function NotFoundPage() {
    return (
        <div className="w-full min-h-screen  flex flex-col justify-center items-center">
            <span className="text-3xl text-gray-500">Ops, Essa página não existe!</span>
            <span className="pt-4"> Retorne para a <Link className="bg-purple-200 rounded-lg p-1 no-underline" href="/dashboard">Página inicial</Link></span>
           
        <div>
            <Box maxW="sm" overflow="hidden">
                <Image src={notFound} alt="Imagem não encontrada" />
            </Box>
        </div>
    </div>
    

    );
}
