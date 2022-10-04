<h1 align="center">
Universo <img align="center"  height="120" width="120" src="https://raw.githubusercontent.com/cypress-io/cypress-icons/e61b554695b28267a1387a839f816c73e7a7e95e/src/logo/cypress-io-logo.svg"> - QAcademy
</h1>

**Projeto feito no curso**

Este projeto foi criado com o intuito de estudar um pouco mais sobre cypress, através do curso oferecido pelo Bootcamp da [QAcademy](https://br.qacademy.io/ "QAcademy") com a mentoria do Fernando Papito.

Nele automatizamos o sistema do Samurai Barbeshop feito exclusivamente para o curso, sendo um sistema de gerenciamento de barbearias, onde barbeiros e pessoas interessadas em seus serviços se conectam.

![signup_spec_js_AdobeExpress](https://user-images.githubusercontent.com/43914674/193880338-081cb913-8384-4c94-83ba-6a5de5826ec0.gif)

### Instalação e Execução

Para rodar o projeto, você  precisará do 
[NodeJS -Vesion 16](https://nodejs.org/en/download/ "NodeJS - Vesion 16") e do [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "npm") e/ou [yarn](https://yarnpkg.com/package/npm "yarn") instalados.

O  projeto da aplicação que está sendo testada no curso foi hospedada por mim na heroku, e a url base portanto não deve ser alterada,  a não ser que você tenha subido o projeto localmente ou na sua instância da heroku. Neste caso, você deve trocar a url base para a sua url base.

Após ter alguma instância do Samurai Barbershop de pé, entre na pasta do projeto de automação e rode o comando: 
    
`npm install` ou `yarn install` e dessa forma todas as dependências serão instaladas.


Para rodar os testes, após ter instalado o cypress com o comando acima, navegue para a pasta raiz do projeto e execute:

  `npm test`
ou 
  `npx cypress run`

### Conceitos aplicados:
 - Visitando url's
 - Preenchendo campos do tipo texto
 - Validando Textos
 - Preenchendo campos do tipo checkbox
 - Preenchendo campos do tipo radiobutton
 - Realizando asserts
 - Criando comandos personalizados
 - Utilizando Page Objects
 - Rodando os tests no CI `githubaction`
 - Relatorio de testes no cypress dashboard.
