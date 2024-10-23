// import RegisterEvent from "@/services/events/registerNewEvent";
// import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
// import { useSession } from "next-auth/react";
// import { ChangeEvent, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import Form from "../Forms/genericForm";

// export default function FormRegisterEvent() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { data } = useSession();
//   const [image, setImage] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   function handleFile(e: ChangeEvent<HTMLInputElement>) {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError(null);

//     const formData = new FormData(e.currentTarget); // Cria o FormData com os dados do formulário

//     // Adiciona o arquivo de imagem ao FormData
//     if (image) {
//       formData.append("banner", image);
//     }

//     // Adiciona o ID do organizador
//     if (data?.user.id) {
//       formData.append("organizador_id", data.user.id);
//     }

//     // Verifica se todos os campos obrigatórios foram preenchidos
//     if (!formData.get("nome") || !formData.get("dataInicio") || !formData.get("dataFim") || !formData.get("horario") || !formData.get("local") || !formData.get("descricao") || !formData.get("banner") || !formData.get("organizador_id")) {
//       setError("Por favor, preencha todos os campos.");
//       return;
//     }

//     try {
//       await RegisterEvent(formData); // Passa o FormData para o serviço
//       onClose(); // Fecha o modal ao concluir
//     } catch (err) {
//       console.error("Failed to register event", err);
//       setError("Erro ao registrar evento. Tente novamente.");
//     }
//   }

//   return (
//     <>
//       <Button onClick={onOpen}>Novo evento</Button>

//       <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
//             <ModalHeader>Cadastrar novo evento</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody className="flex flex-col gap-3" pb={6}>
//               {error && <p className="text-red-500">{error}</p>}
//               <Form label="Nome:" type="text" name="nome" />
//               <Form label="Horário:" type="text" name="horario" />
//               <Form label="Local:" type="text" name="local" />
//               <Form label="Descrição:" type="textarea" name="descricao" />
//               <Form label="Início:" type="date" name="dataInicio" />
//               <Form label="Término:" type="date" name="dataFim" />
//               <label className="bg-red-300 w-32">
//                 Selecionar imagem
//                 <input
//                   type="file"
//                   accept="image/png, image/jpeg"
//                   required
//                   onChange={handleFile}
//                   className="hidden"
//                 />
//               </label>
//             </ModalBody>

//             <ModalFooter>
//               <Button onClick={onClose}>
//                 Cancelar
//               </Button>
//               <Button
//                 backgroundColor="#7e22ce"
//                 borderColor="#7e22ce"
//                 variant="outline"
//                 _hover={{ bg: "white", color: "#7e22ce" }}
//                 color="white"
//                 type="submit"
//                 mr={3}
//               >
//                 <FaCheckCircle className="mr-3" /> Confirmar
//               </Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
