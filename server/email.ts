import sgMail from '@sendgrid/mail';

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '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';
const FROM_EMAIL = 'contato@lukaeventos.com.br';
const TO_EMAIL = 'contato@lukaeventos.com.br';

if (SENDGRID_API_KEY && SENDGRID_API_KEY !== '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') {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('✅ SendGrid configured with environment variable');
} else if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('✅ SendGrid configured with provided API key');
} else {
  console.warn('⚠️  SENDGRID_API_KEY not found. Email functionality will be disabled.');
}

interface ContactFormData {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  console.log('🔧 Attempting to send email via SendGrid...');
  
  if (!SENDGRID_API_KEY) {
    console.log('❌ SendGrid not configured, skipping email send');
    return false;
  }
  
  console.log('✅ SendGrid API key found, proceeding with email send');

  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ff6b35; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Nova Solicitação de Orçamento</h1>
          <p style="margin: 5px 0 0 0; font-size: 16px;">Luka Eventos - Website</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 20px;">Dados do Cliente:</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ff6b35;">Nome:</strong>
            <span style="color: #333; margin-left: 10px;">${data.nome}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ff6b35;">Empresa:</strong>
            <span style="color: #333; margin-left: 10px;">${data.empresa}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ff6b35;">E-mail:</strong>
            <span style="color: #333; margin-left: 10px;">
              <a href="mailto:${data.email}" style="color: #ff6b35; text-decoration: none;">${data.email}</a>
            </span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ff6b35;">Telefone:</strong>
            <span style="color: #333; margin-left: 10px;">
              <a href="tel:${data.telefone.replace(/\D/g, '')}" style="color: #ff6b35; text-decoration: none;">${data.telefone}</a>
            </span>
          </div>
          
          <div style="margin-top: 25px;">
            <strong style="color: #ff6b35; font-size: 16px;">Mensagem:</strong>
            <div style="background-color: #f8f8f8; padding: 15px; margin-top: 10px; border-radius: 5px; border-left: 4px solid #ff6b35;">
              <p style="margin: 0; color: #333; line-height: 1.6;">${data.mensagem.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Esta mensagem foi enviada através do formulário de contato do website da Luka Eventos
            </p>
            <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
              Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    `;

    const emailText = `
Nova Solicitação de Orçamento - Luka Eventos

Dados do Cliente:
Nome: ${data.nome}
Empresa: ${data.empresa}
E-mail: ${data.email}
Telefone: ${data.telefone}

Mensagem:
${data.mensagem}

---
Esta mensagem foi enviada através do formulário de contato do website da Luka Eventos
Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
    `;

    const msg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `Nova Solicitação de Orçamento - ${data.nome} (${data.empresa})`,
      text: emailText,
      html: emailHtml,
      replyTo: data.email,
    };

    await sgMail.send(msg);
    console.log(`✅ Email enviado com sucesso para ${TO_EMAIL}`);
    return true;
  } catch (error: any) {
    console.error('❌ Erro ao enviar email:', error);
    if (error.response) {
      console.error('SendGrid response:', error.response.body);
    }
    return false;
  }
}