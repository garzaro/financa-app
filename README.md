# Sistema de Finanças Pessoais
***
## Descrição

Este é um sistema de finanças pessoais desenvolvido em React (Create React App)
que permite aos usuários gerenciar suas despesas e receitas de forma eficiente. O sistema oferece funcionalidades para criação de contas de usuário, login, visualização de saldo, cadastro e acompanhamento de lançamentos financeiros.

---

---
## Caso de uso

`Lançamentos`
- Formulario de cadastro de lançamentos
- Formulario de consulta de lançamentos 

`Filtros` 
- Por ano
- Por mes
- Por tipo de lançamento - RECEITA e DESPESA
- Por situação - PENDENTE, CANCELADO, EFETIVADO
- Por data de cadastro
- Por descrição
- 

## Funcionalidades 

`Telas`

- <font color="red" >**Criação de Usuário**</font>: Permite que novos usuários se cadastrem no sistema. 
- <font color="red">**Login**</font>: Autenticação de usuários existentes para acesso ao sistema.
- <font color="red">**Home (Saldo)**</font>: Exibe o saldo atual do usuário.
- **Cadastro de Lançamentos Financeiros**: Permite registrar novas RECEITAS e DESPESAS.
- **Visualização de Lançamentos**: Lista todos os lançamentos financeiros cadastrados, PENDENTE, CANCELADO, EFETIVADO.
- **Botões de Acesso Rápido**: Na tela Home, botões para facilitar o cadastro de novos lançamentos.
- **Validações**: Implementação de validações para cadastro de usuários e lançamentos financeiros, garantindo a integridade dos dados.

---

## Tecnologias Utilizadas

+ React (Create React App)
- MUI
- Primereact
+ Spring Boot
- Postgresql


---

## Como Rodar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA_DO_PROJETO>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   yarn start
   ```

   O aplicativo será aberto automaticamente no seu navegador padrão em `http://localhost:3000`.

---

## Uso

> - Ao iniciar o sistema, sera direcionado para tela inicial onde poderá fazer login. Caso não possua uma conta, poderá criar uma nova através da tela de cadastro de usuário. Após o login bem-sucedido, o usuário terá acesso à tela Home, onde poderá visualizar seu saldo atual e acessar as opções para cadastrar novos lançamentos financeiros (receitas ou despesas) e visualizar o histórico de todos os lançamentos.

---

## Validações

>> O sistema possui validações implementadas para garantir a integridade e consistência dos dados. Isso inclui:

- **Cadastro de Usuários**: Validações para campos como e-mail (formato único), senha (complexidade mínima) e outros dados obrigatórios.
- **Cadastro de Lançamentos Financeiros**: Validações para garantir que os valores sejam numéricos positivo, datas válidas e que os campos obrigatórios sejam preenchidos.

> DOC: <https://react.dev/learn>

## correções de erros
- rm -rf node_modules package-lock.json
+ rm -rf node_modules yarn.lock
- npm cache clean --force
+ yarn cache clean
- npm install
+ yarn install
- npm start
+ yarn start
 

 
 


