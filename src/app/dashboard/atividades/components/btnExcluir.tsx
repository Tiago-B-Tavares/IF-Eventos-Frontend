import deleteActivity from "@/app/dashboard/atividades/service/deleteActivity";
import { AtividadesProps } from "@/types/interfaces";
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";



export default function BtnExluir({ atividade }: { atividade: AtividadesProps }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);

 
    const handleDeleteActivity = async () => {
        if (atividade) {
            
            try {

                await deleteActivity(atividade.id);
               
                onClose();
              
               
            } catch (error) {
                
                console.error("Erro ao excluir a atividade:", error);
            }
        }
    };


    return (
        <>


            <Button
                backgroundColor="#fca5a5"
                _hover={{
                    bg: '#f87171',
                    color: 'white'
                }}
                color="red.700"
                onClick={onOpen}  
                textAlign="left"
                w="100%"
                justifyContent="space-between"
            >
                <span className="mr-3" >Excluir Atividade</span>
                <FaRegTrashAlt className="text-lg"/>
            </Button>


            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Excluir Atividade
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <div>
                                <p>Você tem certeza que deseja excluir a atividade "{atividade?.nome}"?</p>
                            </div>
                        </AlertDialogBody>
                        <AlertDialogFooter className="flex gap-3">
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteActivity} >
                                Excluir
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}


function fetchEvents() {
    throw new Error("Function not implemented.");
}

