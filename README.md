# To-Do List com Boilerplate e Typescript

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"      title="React"     alt="React"     width="5%" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meteor/meteor-original.svg"             title="Meteor"    alt="Meteor"    width="5%" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"  title="Mongo"     alt="Mongo"     width="5%" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg"     title="Material"  alt="Material"  width="5%" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"     title="TS"        alt="TS"        width="5%" height="40" />&nbsp;
</div>

<br/>

Esse projeto foi desenvolvido como terceira etapa de treinamento da empresa Synergia, da UFMG, com o intuito de habituar o desenvolvedor ao Boilerplate desenvolvido pela empresa e utilizado nos projetos, conhecendo suas particularidades e arquitetura, bem como de aprimorar as habilidades do desenvolvedor em ReactJS, MeteorJS e TypeScript.

## Funcionalidades
O projeto consiste em uma aplicação web de lista de tarefas, com as seguintes funcionalidades:
- Autenticação de usuário, com formulários de login e cadastro
  - O acesso dos usuários a funcionalidades é controlado através de permissões e de papéis (`Roles`)
- CRUD  de tarefas (`tasks`), sendo possível criar, editar e remover tarefas, bem como alterar seu status entre `"Não concluída"` e `"Concluída"`
  - A alteração de status é feita de forma visual na aplicação, através de um botão de check

## Como executar o projeto na sua máquina

1. Instale o Meteor na sua máquina:
     - Linux/macOS: 
     <br/>
     ```bash
     curl https://install.meteor.com/ | sh
     ```
     - Windows: baixe o instalador em https://docs.meteor.com/about/install.html

2. Acesse o diretório local em que você armazenará o projeto e clone este repositório ou copie o projeto:
     ```bash
      cd [CAMINHO_DO_DIRETÓRIO]
      ```
      ```bash
      git clone https://github.com/rhuancborges/to-do-list-boilerplate 
      cd to-do-list-boilerplate
      ```

3. Instale dependências:
     ```bash
     meteor npm install
     ```

4. Execute a aplicação:
     ```bash
     meteor run
     ```

5. Abra no navegador através da URL `http://localhost:3000`

Se precisar reiniciar o banco de dados local, use:
```bash
meteor reset
```

## Aprendizados da jornada de desenvolvimento: um relato pessoal do desenvolvedor

Quando tive o primeiro contato com o Boilerplate, eu tive consciência do grande desafio que me esperava pela frente. Passei 24 horas (ou seja, 3 dias de trabalho de 8h cada) apenas analisando os códigos e lendo documentações do Boilerplate a fim de compreender a arquitetura e a interligação dos arquivos, além de me habituar um pouco ao Typescript.

Entendi que uma aplicação construída com tal Boilerplate funcionava a partir da criação de módulos, com seus próprios componentes, APIs e rotas. A partir dessa compreensão inicial, parti para o desenvolvimento.

O desenvolvimento foi uma jornada marcada pelo aprendizado ativo. Diante de dúvidas e incompreensões de código ou desconhecimento da origem de erros na aplicação, eu recorria ou ao meu superior imediato da empresa ou à IA. No entanto, grande parte das vezes o que fixou meus conhecimentos foi uma análise crítica e minuciosa dos códigos em ordem de exeução (o que é comumente conhecido como **debugar o código**). Recorri ao debug pois a IA não me trazia resultados tão satisfatórios segundo minha visão crítica de suas respostas.

Portanto, o maior aprendizado que obtive com o desenvolvimento desse projeto, além da habilidade de programar em Typescript, com suas tipagens rígidas, e do uso do Boilerplate, foi desenvolver uma postura ativa para a resolução dos problemas tanto de execução quanto de implementação, sem ficar dependente da IA. 

Isso foi muito valioso profissionalmente para mim, tendo em vista que muitas vezes sou acometido pela síndrome do impostor e passo a duvidar das minhas habilidades técnicas. 

