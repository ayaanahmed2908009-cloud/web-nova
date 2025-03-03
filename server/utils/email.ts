import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface QuoteFormData {
  websiteType: string;
  pageCount: string;
  domainSetup: string;
  ecommerce: string;
  specialFeatures: string[];
  designStatus: string;
  otherFeatures?: string;
  websiteName: string;
}

export async function sendQuoteEmail(formData: QuoteFormData): Promise<boolean> {
  const htmlContent = `
    <h2>New Quote Request from ${formData.websiteName}</h2>
    <h3>Website Details:</h3>
    <ul>
      <li>Website Type: ${formData.websiteType}</li>
      <li>Number of Pages: ${formData.pageCount}</li>
      <li>Domain Setup Needed: ${formData.domainSetup}</li>
      <li>E-commerce Requirements: ${formData.ecommerce}</li>
      <li>Special Features: ${formData.specialFeatures.join(', ')}</li>
      <li>Design Status: ${formData.designStatus}</li>
      ${formData.otherFeatures ? `<li>Other Features: ${formData.otherFeatures}</li>` : ''}
    </ul>
  `;

  try {
    await mailService.send({
      to: 'ayaan2908009@gmail.com',
      from: 'noreply@novawebsolutions.com', // This needs to be a verified sender
      subject: `New Quote Request - ${formData.websiteName}`,
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
