# ⛈️ PowerCastMobile 

Aplicativo móvel para registro, visualização, edição e exclusão de eventos de falta de energia. Desenvolvido em **React Native** com **TypeScript** e **styled-components**, utiliza **AsyncStorage** para persistência local e **React Navigation** para fluxo entre telas.

## 📌 Índice

### - Funcionalidades
### - Tecnologias e dependências
### - Estrutura do Projeto
### - Como executar o projeto
### - Integrantes


## 🛠️ Funcionalidades

### 1. Registrar novo evento de falta de energia
- Entrada de “**Local**” (bairro, CEP ou cidade)
- Entrada de “**Tempo de interrupção**” em horas (número decimal)
- Entrada de “**Prejuízos observados**” (texto livre, multiline)
- Após confirmação, gera novo registro com **ID** (timestamp) e data atual, salvando no AsyncStorage e retornando ao Panorama com o evento no topo da lista.

### 2. Listar eventos existents (Panorama)
- Exibe lista de cards, cada um mostrando:
    - Local afetado
    - Tempo (horas)
    - Data formatada em pt-BR
- Se não houver nenhum evento, exibe mensagem de “Ainda não há eventos cadastrados.”

### 3. Visualizar detalhes de um evento (EventDetail)
- Exibe **todas** as informações completas:
    - Local
    - Data original
    - Tempo (h)
    - Prejuízos
- Botões para:
    - **Editar** (leva para tela de edição)
    - **Excluir** (abre modal de confirmação; ao confirmar, remove o registro e retorna à lista)

### 4. Editar evento existente (EventEdit)
- Formulário pré-preenchido com os dados atuais (local, tempo, prejuízos)
- Validações:
    - Local não vazio
    - Tempo > 0 (ponto ou vírgula como separador decimal)
    - Prejuízos não vazios
- Ao salvar, atualiza o evento no AsyncStorage (mantendo mesmo ID e data) e retorna ao Panorama com o item atualizado no topo da lista.

### 5. Excluir evento
- Ao tocar “Excluir” em EventDetail, abre um modal customizado (`ConfirmModal`) pedindo confirmação.
- Se confirmado, remove do AsyncStorage e retorna ao Panorama.

### 6. Persistência local
- Usa AsyncStorage para armazenar um array de objetos `Event`.
- `saveEvent` insere ou atualiza um evento no topo da lista (sem duplicar IDs).
- `deleteEvent` remove por ID.
- `getEvents` recupera todos, exibindo em ordem decrescente (evento mais recente primeiro).

### 7. Estilização consistente
- Todos os estilos gerenciados via `styled-components/native`.
- Botões personalizados roxos (`PurpleButton`) para ações principais.
- Modal de confirmação (`ConfirmModal`) para exclusão.

### 8. Integração com API ViaCEP
- Ao criar um novo Evento, caso seja digitado um CEP válido, a API do ViaCEP será chamada e aparecerá o bairro no lugar do CEP ao salvar o evento.

## 🖥️ Tecnologias e dependências

- **React Native** (Expo ou CLI)
- **TypeScript**
- **@react-navigation/native** e **@react-navigation/native-stack**
- **@react-native-async-storage/async-storage**
- **styled-components/native**
- **Dependências auxiliares:**
    - `@types/styled-components-react-native`
    - `@types/react-native`
    - `react-native-safe-area-context` (incluso via React Navigation)
    - `react-native-screens` (incluso via React Navigation)

## 🏗️ Estrutura do Projeto

```sh
PowerCastMobile/
├─ src/
│  ├─ components/
│  │  ├─ PurpleButton.tsx
│  │  ├─ ConfirmModal.tsx
│  ├─ screens/
│  │  ├─ PanoramaScreen.tsx
│  │  ├─ LocationsScreen.tsx
│  │  ├─ DurationScreen.tsx
│  │  ├─ DamagesScreen.tsx
│  │  ├─ RecommendationsScreen.tsx
│  │  ├─ EventDetailScreen.tsx
│  │  ├─ EventEditScreen.tsx
│  ├─ services/
│  │  └─ cep.ts
│  │  └─ storage.ts
│  ├─ types/
│  │  ├─ navigation.ts
│  │  └─ index.ts       (definição de interface Event)
│  ├─ App.tsx
│  └─ ... (outros arquivos de configuração)
└─ README.md
```

- `components/`: botões e modais reutilizáveis.
- `screens/`: telas do fluxo CRUD e visualização de eventos.
- `services/storage.ts`: funções de acesso ao AsyncStorage (`getEvents`, `saveEvent`, `deleteEvent`).
- `types/`: definições de tipos TypeScript, especialmente `Event` e `RootStackParamList`.
- `App.tsx`: configurações do `NavigationContainer` e `Stack.Navigator`.


## 🚀 Como executar o projeto

### 1. Clonar o repositório
```sh
git clone https://github.com/Natan-TI/PowerCastMobile.git
cd PowerCastMobile
```
### 2. Instalar dependências
```sh
npm install
```

### 3. Rodar o app
```sh
npx expo start
```

## 🤝 Integrantes
<table>
  <tr>
    <td align="center">
        <sub>
          <b>João Pedro Marques Rodrigues - RM98307</b>
          <br>
        </sub>
        <sub>
          <b>Natan Eguchi dos Santos - RM98720</b>
          <br>
        </sub>
        <sub>
          <b>Kayky Paschoal Ribeiro - RM99929</b>
          <br>
        </sub>
    </td>
  </tr>
</table>
