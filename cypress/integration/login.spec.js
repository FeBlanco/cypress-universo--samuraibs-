import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {

    context('quando o usuário é muito bom', () => {

        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)

        });

    })

    context('quando o usuário é bom mas a senha está incorreta', () => {
        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }


        before(() => {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })
        })

        it('deve notificar erro de credenciais', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)


        })
    })

    context('quando o formato do email é inválido', () => {

        const emails = [
            'blanco.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'papito@',
            '111',
            '&*^&&*',
            'xpto123'
        ]

        before(() => {
            loginPage.go()
        });

        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, () => {
                const user = { email: email, password: 'pwd123' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')

            })
        })

    })

    context('quando não preencho nenhum dos campos', () => {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(() => {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert) {
            it('deve exibir ' + alert.toLowerCase(), () => {
                loginPage.alert.haveText(alert)
            })
        })
    })
})