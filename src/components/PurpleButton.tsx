import React from 'react';
import styled from 'styled-components/native';

type PurpleButtonProps = {
  title: string;
  onPress: () => void;
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: #6c63ff;   /* roxo */
  padding: 12px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  margin-vertical: 8px;        /* espaço vertical opcional */
`;

const ButtonText = styled.Text`
  color: #ffffff;              /* texto branco */
  font-size: 16px;
  font-weight: 500;
`;

export default function PurpleButton({ title, onPress }: PurpleButtonProps) {
  return (
    <ButtonContainer activeOpacity={0.8} onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}
