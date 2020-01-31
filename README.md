<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack!</p>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.



### **Um pouco sobre as ferramentas**

- Express
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilizando PostgreSQL);
- jsonwebtoken + bcryptjs;
- Yup

### **Inicializar API**

- yarn dev
- yarn dev:debug (verificar pasta .vscode para configurações)

### **Funcionalidades**

Abaixo estão descritas as rotas do sistema.

  #### - Users (/users)
  
    - store
    - update
    
  #### - Repicients (/repicients)
  
    - index
    - show
    - store
    - update
    - delete
    
  #### - Sessions (/sessions)
  
    - store

### **Autenticação**

A autenticação foi realizada com o uso de jsonwebtoken (JWT). Esse processo tem início quando um usuário admin do sistema abre uma seção por meio da rota Session, após a validação de seus dados cadastrais o mesmo recebe da API um token com seu id.

Agora este usuário só tem de vincular esse token a suas próximas requisição por meio do protocolo Bearer. Neste sistema todas a ações a partir da abertura da seção irá pedir uma validação por meio do token.

### **Validação dos dados**

Nesta aplicação todas as requisições passam por processo de verificação de seu dados. Este procedimento é realizado por meio de lib Yup e verificações condizentes com as regras de negócios, por exemplo existência unica de um email. 

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Proposto com ♥ by Rocketseat :wave: [Entre na nossa comunidade!](https://discordapp.com/invite/gCRAFhc)
