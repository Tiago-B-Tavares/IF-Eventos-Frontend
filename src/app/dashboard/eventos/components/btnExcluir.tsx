import deleteEvent from "@/services/events/deleteEvent";
import {
  Button, AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody,
  AlertDialogFooter, useDisclosure, useToast
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export function BtnExcluir({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(id);

      if (response.status === 200) {
        toast({
          title: 'Sucesso',
          description: "Evento excluído com sucesso.",
          status: 'success',
          duration: 3000,
          isClosable: false,
          position: "top"
        });
        onClose();
      } else if (response.status === 400) {
        toast({
          title: 'Erro ao excluir evento',
          description: "Exclua todas as atividades do evento antes de excluí-lo.",
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: "top"
        });
        onClose();
      } else {
        toast({
          title: 'Erro ao excluir evento',
          description: response.message || "Tente novamente mais tarde.",
          status: 'error',
          duration: 3000,
          isClosable: false,
          position: "top"
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: "Tente novamente mais tarde.",
        status: 'error',
        duration: 3000,
        isClosable: false,
        position: "top"
      });
      onClose();
    }
  };

  return (
    <>
      <Button
        backgroundColor="#fca5a5"
        _hover={{ bg: '#f87171', color: 'white' }}
        color="red.700"
        onClick={onOpen}
        textAlign="left"
        w="100%"
        justifyContent="space-between"
      >
        <span className="mr-3">Excluir evento</span>
        <FaRegTrashAlt className="text-lg" />
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Excluir Evento</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={handleDeleteEvent} ml={3}>Excluir</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
