"use client";

import { Role } from "@/enums/permissionRoles";
import ChangePermissions from "@/services/admin/changePermissions";
import getAllUsers from "@/services/user/getAllUsers";
import { User } from "@/types/interfaces";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";

export default function Permissoes() {
  const { data: session } = useSession();
  const btnRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(""); // Garantir que começa como string vazia
  const [role, setRole] = useState<Role>(Role.ACTIVITIES_ADMIN); // Definir role inicial como padrão

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const userList: User[] = await getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.log("Erro ao buscar usuários: ", error);
    }
  };

  // Função para alterar permissões
  const changePermission = async () => {
    try {
     
      await ChangePermissions({ id: selectedUser, role });
      onClose(); // Fecha o modal após a alteração bem-sucedida
    } catch (error) {
      console.error("Erro ao mudar permissões: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        flex="between"
        justifyContent="space-between"
        width={"100%"}
      >
        <span className=" mr-3 text-sm flex-wrap ">Alterar permissões de usuário </span>
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecione o Responsável</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              {users.map((user) => (
                <Box
                  key={user.id}
                  p={2}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  _hover={{ bg: "green.50" }}
                  onClick={() => setSelectedUser(user.id)} // Certifique-se de que o ID do usuário é atribuído aqui
                  bg={selectedUser === user.id ? "green.100" : ""}
                >
                  <p className="text-lg cursor-pointer">{user.nome}</p>
                </Box>
              ))}
            </div>
        
            <Select
              mt={4}
              onChange={(e) => setRole(e.target.value as Role)}
              value={role}
            >
              <option value={Role.ACTIVITIES_ADMIN}>Usuário</option>
              <option value={Role.SUPER_ADMIN}>Administrador</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              onClick={changePermission}
              isDisabled={!selectedUser || !role}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
