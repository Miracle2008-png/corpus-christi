import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function sendNewsletterEmail(to: string, readingData: any) {
  const { date, gospel } = readingData;
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a2744; line-height: 1.6;">
      <div style="text-align: center; border-bottom: 2px solid #c9a84c; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #c9a84c; margin-bottom: 5px;">Corpus Christi</h1>
        <h3 style="margin-top: 0; color: #666; font-weight: normal;">Daily Reading & Reflection</h3>
      </div>
      
      <p style="font-size: 1.1rem; color: #555;">Here is your reading for <strong>${date}</strong>:</p>
      
      <div style="background: #f8f8f6; padding: 20px; border-radius: 8px; border-left: 4px solid #1a2744; margin: 25px 0;">
        <h2 style="font-size: 1.3rem; margin-top: 0;">Gospel: ${gospel.reference}</h2>
        <p style="font-style: italic; font-size: 1.05rem;">"${gospel.text}"</p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="https://corpus-christi.vercel.app/readings" style="background: #1a2744; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-family: Inter, sans-serif;">Read Full Liturgy</a>
      </div>
      
      <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; font-size: 0.8rem; color: #999; font-family: Inter, sans-serif;">
        <p>You are receiving this because you subscribed to Corpus Christi Daily Readings.</p>
        <p><a href="https://corpus-christi.vercel.app" style="color: #c9a84c;">Unsubscribe</a></p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: "Corpus Christi <noreply@corpus-christi.vercel.app>", // Requires domain verification on Resend later, or use testing email
    to,
    subject: `Daily Gospel Reading - ${date}`,
    html,
  });
}
