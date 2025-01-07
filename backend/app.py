import smtplib
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
app.secret_key = 'dbc226ffe88fd0f0b08be03f5fadf9bcf91984d276253ad791b50c8382eda85a'
CORS(app)

def send_email(sender_email, sender_name, sender_server_email, sender_password_email, recipients_emails, subject, message):
    smtp_server  = 'smtp.gmail.com'
    email_domain = sender_email.split('@')[-1]

    if email_domain == 'gmail.com' and sender_server_email == 'google':
        smtp_server = 'smtp.gmail.com'

    elif (sender_server_email == 'outlook' or sender_server_email == 'hotmail') and (email_domain == 'outlook.com' or email_domain == 'hotmail.com' or email_domain == 'live.com' or email_domain == 'msn.com'):
        smtp_server = 'smtp.office365.com'

    elif sender_server_email == 'yahoo' and (email_domain == 'yahoo.com' or email_domain == 'yahoo.co.uk'):
        smtp_server = 'smtp.mail.yahoo.com'

    elif sender_server_email == 'icloud' and (email_domain == 'icloud.com' or email_domain == 'me.com' or email_domain == 'mac.com'):
        smtp_server = 'smtp.mail.me.com	'

    else:
        return {'error': True, 'message': 'Não foi possível identificar seu email, você inseriu um email personalizado não identificado, do Google ou da Microsoft em que na qual nós não temos suporte por enquanto!\nVerifique os campos do Email de remetente e de serviço de email do remetente!', 'logError': None}

    smtp_port = 587
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password_email)

    except smtplib.SMTPAuthenticationError:
        return {'error': True, 'message': "Houve um erro na autenticação do usuário verifique se o email informado está correto e se a senha de aplicativo do email está correta.", 'logError': 'Erro de autenticação de usuário'}

    except Exception as e:
        return {'error': True, 'message': f'Ocorreu um erro não identificado ao tentar fazer login na sua conta, recarregue a página e tente novamente mais tarde!', 'logError': e}

    session['emailsFailed'] = []
    for email in recipients_emails:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = email
        msg['Subject'] = subject
        base_message = """
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
            <h1>Olá eu sou SENDER_NAME, estou testando essa ferramenta de email marketing para vender mais no meu negócio!</h1>
            <p>SENDER_MESSAGE</p>
            <p>Copyright &copy; 2025 - Manassés Ndombele - Programador Pleno</p>
        </body>
        </html>
        """
        msg.attach(MIMEText(base_message.replace('SENDER_NAME', sender_name).replace('SENDER_MESSAGE', message), 'html'))

        try:
            server.sendmail(sender_email, email, msg.as_string())

        except Exception as e:
            session['emailsFailed'].append({'recipient': email, 'message': f'Ocorreu um erro não identificado ao enviar email para: {email}'})

    server.quit()
    return {'error': False, 'message': None, 'logError': None, 'emailsFailed': session['emailsFailed']}

@app.route('/api/send-emails', methods=['POST'])
def receive_emails():
    if not request.is_json:
        return jsonify({"erro": "Os dados enviados devem estar no formato JSON"}), 400

    datas = request.get_json()
    try:
        sender_email = datas["senderEmail"]
        sender_name = datas["senderName"]
        sender_server_email = datas["senderServerEmail"]
        sender_password_email = datas["senderPasswordEmail"]
        recipients_emails = datas["recipientsEmails"]
        subject = datas["subject"]
        message = datas["message"]
        emails_sent = send_email(sender_email, sender_name, sender_server_email, sender_password_email, recipients_emails, subject, message)
        return jsonify(emails_sent), 200

    except KeyError as e:
        return jsonify({"erro": f"Chave ausente: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True)
