import Footer from "../components/Footer"
import './routeBase.sass'

export default function Help() {
    return (
        <>
            <main className="mx-auto">
                <h1>Como obter a senha de aplicativo do seu provedor de email?</h1>
                <p>Este guia contêm o passo a passo para obter a senha de aplicativo do seu provedor de email de forma gratuita.</p>
                <h2>O que é a senha de aplicativo?</h2>
                <p>A senha de aplicativo é uma senha gerada pelo seu provedor de email para que softwares possam acessar o seu servidor SMTP com a sua permissão e fazer envios de emails apartir do teu email de forma automatizada!</p>
                <p>Este guia é somente para os servidores de email suportados por esse sistema de automação de envios de emails, os servidores de email suportados são: Google Gmail Pessoal, Microsoft Outloook Modernos, Hotmail, Apple Icloud e Yahoo Mail.</p>
                <h3>1. Google GMAIL Pessoal</h3>
                <p>Acesse este link: <a href="https://support.google.com/accounts/answer/185833?hl=pt-br" rel="external" target="_blank">Suporte do Google</a></p>
                <h3>2. Microsoft Outlook Modernos</h3>
                <p>Acesse este link: <a href="https://support.microsoft.com/pt-br/account-billing/como-obter-e-utilizar-palavras-passe-de-aplica%C3%A7%C3%A3o-5896ed9b-4263-e681-128a-a6f2979a7944" rel="external" target="_blank">Suporte da Microsoft</a></p>
                <h3>3. Hotmail</h3>
                <p>Acesse este link: <a href="https://support.microsoft.com/pt-br/account-billing/como-obter-e-utilizar-palavras-passe-de-aplica%C3%A7%C3%A3o-5896ed9b-4263-e681-128a-a6f2979a7944" rel="external" target="_blank">Suporte da Microsoft</a></p>
                <h3>4. Apple Icloud</h3>
                <p>Acesse este link: <a href="https://support.apple.com/pt-br/102654" target="_blank" rel="external">Suporte da Apple</a></p>
                <h3>5. Yahoo Mail</h3>
                <p>Acesse este link: <a href="https://br.ajuda.yahoo.com/kb/Saiba-como-gerar-senhas-de-aplicativos-de-terceiros-sln15241.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAACRPY_tc_iZbr28KyQMKenHIFNEsI1aUfh_LETv9anmg6u7Y9RPJS8RXg9cloMsMRi5DTg3WNHkxB2YtVoE1VTRMG5q0S8N64wKWWRynKfgbT-0MmdYF9Q25s7lmGvOf5-YBhDbh0RsBnQqr6pOSMMCoFrWwSgfQYbCw-dVmuxzC" rel="external" target="_blank">Suporte da Yahoo</a></p>
            </main>
            <Footer />
        </>
    )
}
