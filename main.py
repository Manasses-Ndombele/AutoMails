import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from validate_email import validate_email
from time import sleep

print("***************************************************************")
print("<-----------------   SEJA BEM AO AUTOMAILS   ----------------->")
print("***************************************************************")
print("Informe-nos alguns dados para que o programa possa enviar um email automaticamente para si.\nOBS: Esse teste só funciona com servidores de Email da Google.")

def send_mail(recipient, subject, message):
    # Configurações do servidor de e-mail
    smtp_server  = 'smtp.gmail.com'
    smtp_port = 587
    sender = 'magalhaes.fernandes45@gmail.com'
    password = 'ltei ucbu mmwn rqws'
    print(f'Configurando servidor de email...')
    sleep(2)

    # Criação de mensagem
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'html'))
    print('Construindo a mensagem...')
    sleep(2)

    try:
        # Conecta com o servidor SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender, password)
        print('Conectando ao servidor SMTP...')
        sleep(2)

        # Envio do email
        server.sendmail(sender, recipient, msg.as_string())
        print("Email enviado com sucesso. Verifique na sua caixa de entrada ou na caixa de Spam.")
        sleep(30)

    except Exception as e:
        print(f"Erro ao enviar o email, fecha o programa e tente novamente se continuar a falhar tente mudar o destinatário para outro email!\n{e}")
        sleep(30)

    finally:
        server.quit()

html_msg = """
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        * { font-family: Arial, Helvetica, sans-serif; }

        h1 {
            background-image: linear-gradient(to right, rgb(77, 164, 223), rgb(25, 25, 187));
            padding: 20px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: #fff;
            text-shadow: 1px 1px 3px#000
        }

        p {
            font-size: 1.3rem;
            font-variant-caps: small-caps;
        }
    </style>
</head>
<body>
    <h1>Olá RECIPIENT_NAME, muito obrigado por testar a minha automação com Python!</h1>
    <p>Eu me chamo <strong>Manassés Ndombele sou desenvolvedor freelancer pleno</strong> o meu foco está na criação de sites e no desenvolvimento de automações que realizam tarefas repetitivas.</p>
    <p><i>Vamos avançar com o seu projeto e um sistema de envio de emails melhor que esse poderá ser seu!</i></p>
    <p>Copyright &copy; 2025 - Manassés Ndombele - Programador Pleno</p>
</body>
</html>
"""

while True:
    recipient_name = str(input('Qual é o seu nome? '))
    recipient_gmail = str(input('Digite um Gmail válido, onde enviaremos um email: '))
    email_is_valid = validate_email(recipient_gmail)
    print('Validando o email informado...')
    sleep(2)
    if email_is_valid:
        break

    else:
        print(f'O Gmail informado: {recipient_gmail} não é válido. Verifique como digitou e tente novamente!')
        sleep(2)

sleep(2)
send_mail(recipient_gmail, 'Teste de automação de emails', html_msg.replace('RECIPIENT_NAME', recipient_name))
