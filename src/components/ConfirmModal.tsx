// src/components/ConfirmModal.tsx
import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

type ConfirmModalProps = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Overlay>
        <ModalContainer>
          <MessageText>{message}</MessageText>
          <ButtonsRow>
            <Button cancel onPress={onCancel}>
              <ButtonTextCancel>Cancelar</ButtonTextCancel>
            </Button>
            <Button onPress={onConfirm}>
              <ButtonTextConfirm>OK</ButtonTextConfirm>
            </Button>
          </ButtonsRow>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// ========================= styled-components =========================

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  elevation: 5;        /* sombra Android */
  shadow-color: #000;  /* sombra iOS */
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const MessageText = styled.Text`
  font-size: 16px;
  color: #333333;
  margin-bottom: 24px;
  text-align: center;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
`;

/**
 * Aqui usamos destructuring, mas anotamos explicitamente o tipo de `cancel`
 */
const Button = styled.TouchableOpacity<{ cancel?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: ${({ cancel }: { cancel?: boolean }) =>
    cancel ? '#cccccc' : '#6c63ff'};
`;

const ButtonTextCancel = styled.Text`
  color: #333333;
  font-size: 16px;
  font-weight: 500;
`;

const ButtonTextConfirm = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`;
