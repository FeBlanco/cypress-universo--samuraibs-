import signupPage from '../support/pages/signup'

describe('Signup', function () {
    before(function() {
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
        
    })

    context('quando o usuário é novato', function () {
        //definindo a massa de testes remodelada para camada de fixture
        // const user = {
        //     name: 'Felipe Blanco',
        //     email: 'blanco@samuraibs.com', //faker.internet.email()
        //     password: 'pwd123'
        // }

        before(function() {
            //removendo o usuário para que a massa seja sempre válida
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuário', function () {
            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o email já existe', function () {

        // const user = {
        //     name: 'Fernanda Blanco',
        //     email: 'blanco01@samuraibs.com',
        //     password: 'pwd123',
        //     is_provider: true
        // }
        before( function () {
            cy.postUser(this.email_dup) //commands
        })
        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', function() {
        // const user = {
        //     name: 'Elizabeth Olsen',
        //     email: 'liza.samuraibs.com',
        //     password: 'pwd123',
        // }
        it('deve exibir a menssagem de alerta', function() {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')

        })
    })

    context('quando a senha é muito curta', function ()  {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {
                // const user = {
                //     name: 'Jason friday',
                //     email: 'jason@samuraibs.com',
                //     password: p
                // }

                this.short_password.password = p //chamada 

                signupPage.go()
                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })
        afterEach(function() {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', function() {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function()  {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert) {
            it('deve exibir ' + alert.toLowerCase(), function() {
                signupPage.alert.haveText(alert)
            })
        })
    })
});