import Footer from "../components/Footer"
import './routeBase.sass'

export default function Thanks() {
    if (sessionStorage.getItem('submittedForm') !== null) {
        let emailsFailedList = []
        try {
            emailsFailedList = JSON.parse(sessionStorage.getItem('emailsFailed'))
        } catch (error) {
            emailsFailedList = []
        }

        console.log(emailsFailedList)
        let emailsFailed = emailsFailedList.length > 0
        let username = sessionStorage.getItem('username')
        return (
            <>
                <main className="mx-auto">
                    <h1>Parabéns { username }, os seus emails foram enviados com sucesso!</h1>
                    <p>O nosso sistema já vai tentar fazer o envio dos emails mas tem alguns pontos importantes que devem ser deixados claros:</p>
                    <ol>
                        <li>Não vai ser possível o envio dos para os emails dos destinatários que não são existentes! (caso tenha informado emails inexistentes)</li>
                        <li>Alguns domínios corporativos podem bloquear emails de servidores desconhecidos ou não confiáveis.</li>
                        <li>Enviar muitos emails para destinatários inexistentes ou desconhecidos pode fazer com que o servidor SMTP limite ou bloqueie seus envios.</li>
                        <li>Emails com palavras relacionadas a spam, links suspeitos ou sem formatação adequada podem ser sinalizados como spam.</li>
                        <li>Alguns provedores podem restringir o envio para determinados domínios ou países devido a políticas de segurança ou spam.</li>
                    </ol>
                    <h2>O que fazer se o destinatário não receber?</h2>
                    <ol>
                        <li>Verifique o endereço: Certifique-se de que o email está correto e o domínio está ativo.</li>
                        <li>Cheque o Spam: O email pode ter sido filtrado como spam.</li>
                        <li>Evite SPAM: Certifique-se de que o conteúdo do email não tenha características de spam.</li>
                    </ol>
                    {emailsFailed && (
                        <>
                            <h2>Os seguintes destinatários de emails falharam!</h2>
                            <ul>
                                { emailsFailedList.map((email) => {
                                    <li key={email}>{email}</li>
                                }) }
                            </ul>
                        </>
                    )}
                </main>
                <Footer />
            </>
        )
    } else {
        location.href = '/'
    }
}
