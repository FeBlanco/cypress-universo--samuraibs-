import signupPage from '../support/pages/signup'

describe('Signup', () => {

    context('quando o usuário é novato', () => {
        //definindo a massa de testes
        const user = {
            name: 'Felipe Blanco',
            email: 'blanco@samuraibs.com', //faker.internet.email()
            password: 'pwd123'
        }

        before(() => {
            //removendo o usuário para que a massa seja sempre válida
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuário', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o email já existe', () => {

        const user = {
            name: 'Fernanda Blanco',
            email: 'blanco01@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }
        before(() => {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })
        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', () => {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.samuraibs.com',
            password: 'pwd123',
        }
        it('deve exibir a menssagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        });
    })

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']


        beforeEach(() => {
            signupPage.go()
        })

        passwords.forEach(function (p) {

            it('não deve cadastrar com a senha: ' + p, () => {

                const user = {
                    name: 'Jason friday',
                    email: 'jason@samuraibs.com',
                    password: p
                }
                signupPage.form(user)
                signupPage.submit()
            })
        })
        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        });
    })

    context('quando não preencho nenhum dos campos', () => {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(() => {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert) {
            it('deve exibir ' + alert.toLowerCase(), () => {
                signupPage.alertHaveText(alert)
            })
        })
    });
});