import { RiMailSendFill } from "react-icons/ri"
import Footer from "../components/Footer"
import Modal from "../components/Modal"
import './home.sass'
import './routeBase.sass'

export default function Home() {
    function submitForm() {
        let senderEmail = document.querySelector('input#sender-email')
        let senderName = document.querySelector('input#sender-name')
        let senderServerEmail = document.querySelector('select#sender-server-email')
        let senderPasswordEmail = document.querySelector('input#sender-password-email')
        let recipientsEmails = document.querySelector('input#recipients-emails')
        let subject = document.querySelector('input#subject-message')
        let message = document.querySelector('textarea#message')
        const emailValidationReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailValidationReg.test(senderEmail.value)) {
            senderEmail.classList.add('is-invalid')
            senderEmail.scrollIntoView({ behavior: 'smooth' })
            throw new Error('Email do remetente inválido')
        } else {
            senderEmail.classList.remove('is-invalid')
        }

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(senderName.value)) {
            senderName.classList.add('is-invalid')
            senderName.scrollIntoView({ behavior: 'smooth' })
            throw new Error('Nome do remetente inválido')
        } else {
            senderName.classList.remove('is-invalid')
        }

        let recipientsEmailsList = recipientsEmails.value.split(';')
        for (let email of recipientsEmailsList) {
            if (!emailValidationReg.test(email)) {
                recipientsEmails.classList.add('is-invalid')
                recipientsEmails.scrollIntoView({ behavior: 'smooth' })
                throw new Error(`O email de destinatário: ${email} está inválido`)
            }  else {
                recipientsEmails.classList.remove('is-invalid')
            }    
        }

        senderEmail.classList.add('is-valid')
        senderName.classList.add('is-valid')
        senderServerEmail.classList.add('is-valid')
        senderPasswordEmail.classList.add('is-valid')
        recipientsEmails.classList.add('is-valid')
        subject.classList.add('is-valid')
        message.classList.add('is-valid')
        let form = {
            senderEmail: senderEmail.value,
            senderName: senderName.value,
            senderServerEmail: senderServerEmail.value,
            senderPasswordEmail: senderPasswordEmail.value,
            recipientsEmails: recipientsEmailsList,
            subject: subject.value,
            message: message.value
        }

        const sendForm = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/send-emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
                })

                if (!response.ok) {
                    window.alert('Houve um erro no envio dos emails tente novamente mais tarde! Certifique-se de que está conectado a internet e recarregue a página!')
                    throw new Error('Houve um erro no envio dos emails tente novamente mais tarde! Certifique-se de que está conectado a internet e recarregue a página!')
                }

                const emailsSent = await response.json()
                if (emailsSent.error) {
                    let modal_error = document.querySelector('div#modal-error-display')
                    modal_error.querySelector('div.modal-body').textContent = emailsSent.message
                    console.error(emailsSent.log_error)
                    document.querySelector('button#modal-error-btn').click()
                } else {
                    sessionStorage.setItem('submittedForm', true)
                    sessionStorage.setItem('emailsFailed', emailsSent.emailsFailed)
                    sessionStorage.setItem('username', senderName.value)
                    location.href = '/thanks'
                }
            } catch (error) {
              window.alert("Tente recarregar a página! Erro ao enviar formulário!")
              console.log(error)
            }
        }

        sendForm()
    }

    return (
        <>
            <main className="mx-auto">
                <header className="d-flex flex-column align-items-center p-3">
                    <RiMailSendFill />
                    <h1 className="text-body-secondary">AutoMails</h1>
                    <p className="text-center">Olá seja bem vindo, esta é uma pequena ferramenta de teste para automação de envio de emails com Python!</p>
                </header>
                <form className="p-3">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="sender-email">Email do remetente</label>
                        <input type="text" id="sender-email" placeholder="Seu email" className="form-control" required />
                        <div className="invalid-feedback">Digite um email válido! Verifique o email informado!</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="sender-name">Nome do remetente</label>
                        <input type="text" id="sender-name" placeholder="Seu nome" className="form-control" required />
                        <div className="invalid-feedback">Informe um nome que tenha apenas letras seja com ou sem acentos.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="sender-server-email">Serviço de email do remetente</label>
                        <select id="sender-server-email" className="form-select" required>
                            <option value="" disabled>Seu serviço de email</option>
                            <option value="google">Gmail</option>
                            <option value="yahoo">Yahoo</option>
                            <option value="hotmail">Hotmail</option>
                            <option value="outlook">Outlook</option>
                            <option value="icloud">Icloud</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="sender-password-email">Senha de aplicativo do remetente</label>
                        <input type="password" id="sender-password-email" placeholder="Sua senha de aplicativo" className="form-control" aria-describedby="sender-password-info" required />
                        <div id="sender-password-info" className="form-text">
                            <a href="/help">Como obter uma senha de aplicativo do meu provedor de email?</a>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="recipients-email">Emails dos destinatários</label>
                        <input type="email" id="recipients-emails" placeholder="Emails dos destinatários" className="form-control" required />
                        <div className="invalid-feedback">Verifique se todos os emails dos destinatários estão válidos!</div>
                        <div id="recipients-emails-info" className="form-text">
                            Você pode colocar vários emaills separando cada um com ponto e vírgula (;)
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="subject-message">Assunto do email</label>
                        <input type="text" id="subject-message" placeholder="Tema do email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="message">Mensagem do email</label>
                        <textarea id="message" placeholder="Mensagem do email" className="form-control" required></textarea>
                    </div>
                    <button type="button" id="send-form" className="btn btn-primary" onClick={ submitForm }>Submeter</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#modal-error-display" className="visually-hidden" id="modal-error-btn"></button>
                </form>
            </main>
            <Footer />
            <Modal />
        </>
    )
}
