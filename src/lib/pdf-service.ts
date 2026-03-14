import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessType: string;
  items: string[];
  subtotal: number;
  uniqueCode: number;
  total: number;
  lang: string;
  status: 'PENDING' | 'PAID';
}

export async function generateInvoicePDF(data: InvoiceData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const brandColor = rgb(1, 0, 0.31); // #FF0050
  const darkColor = rgb(0.1, 0.1, 0.1);
  const grayColor = rgb(0.4, 0.4, 0.4);
  const lightGrayColor = rgb(0.95, 0.95, 0.95);
  const blueColor = rgb(0, 0.47, 0.85); // Professional blue for unique code
  const headerBgColor = rgb(0.07, 0.08, 0.09); // #121516

  let y = height - 50;

  // Header Background - Dark for contrast with white logo
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: headerBgColor,
  });

  // Try to embed Logo
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const dims = logoImage.scale(0.4);
      page.drawImage(logoImage, {
        x: 50,
        y: height - 85,
        width: dims.width,
        height: dims.height,
      });
    } else {
        // Fallback to text if logo not found (white on dark background)
        page.drawText('KADAI POS', { 
            x: 50, 
            y: height - 70, 
            size: 24, 
            font: fontBold, 
            color: rgb(1, 1, 1) // White
        });
    }
  } catch (e) {
    console.error('Error embedding logo:', e);
  }

  const isId = data.lang === 'id';
  const title = data.status === 'PAID' 
    ? (isId ? 'INVOICE LUNAS' : 'RECEIPT / PAID INVOICE')
    : (isId ? 'INVOICE PEMBAYARAN' : 'PAYMENT INVOICE');

  // Title on dark background - use white text
  page.drawText(title, { 
    x: width - 65 - fontBold.widthOfTextAtSize(title, 20), 
    y: height - 70, 
    size: 20, 
    font: fontBold,
    color: rgb(1, 1, 1) // White text on dark background
  });

  y = height - 150;

  // Invoice & Brand Info Header
  // Left side: Brand Info
  page.drawText('PT Kadai Teknologi Anak Bangsa', { x: 50, y, size: 10, font: fontBold });
  y -= 15;
  page.drawText('Depok, Indonesia', { x: 50, y, size: 9, font: fontRegular, color: grayColor });
  y -= 12;
  page.drawText('mamak@kadaipos.id', { x: 50, y, size: 9, font: fontRegular, color: grayColor });
  y -= 12;
  page.drawText('www.kadai.id', { x: 50, y, size: 9, font: fontRegular, color: brandColor });

  // Right side: Invoice Meta
  let rightY = height - 150;
  const metaValueX = width - 65;

  const invoiceNoLabel = isId ? 'No. Invoice' : 'Invoice No';
  page.drawText(invoiceNoLabel, { x: width - 200, y: rightY, size: 9, font: fontBold });
  page.drawText(data.invoiceNumber, { x: metaValueX - fontRegular.widthOfTextAtSize(data.invoiceNumber, 9), y: rightY, size: 9, font: fontRegular });
  rightY -= 15;

  const dateLabel = isId ? 'Tanggal' : 'Date';
  page.drawText(dateLabel, { x: width - 200, y: rightY, size: 9, font: fontBold });
  page.drawText(data.date, { x: metaValueX - fontRegular.widthOfTextAtSize(data.date, 9), y: rightY, size: 9, font: fontRegular });
  rightY -= 15;

  const statusLabel = isId ? 'Status' : 'Status';
  page.drawText(statusLabel, { x: width - 200, y: rightY, size: 9, font: fontBold });
  const statusColor = data.status === 'PAID' ? rgb(0.06, 0.72, 0.5) : blueColor;
  page.drawText(data.status, { 
    x: metaValueX - fontBold.widthOfTextAtSize(data.status, 9), 
    y: rightY, 
    size: 9, 
    font: fontBold, 
    color: statusColor 
  });

  y -= 40;
  page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
  y -= 30;

  // Bill To
  page.drawText(isId ? 'DITAGIHKAN KEPADA:' : 'BILL TO:', { x: 50, y, size: 8, font: fontBold, color: grayColor });
  y -= 18;
  page.drawText(data.customerName, { x: 50, y, size: 12, font: fontBold, color: darkColor });
  y -= 15;
  page.drawText(data.customerEmail, { x: 50, y, size: 10, font: fontRegular, color: grayColor });
  y -= 14;
  page.drawText(data.customerPhone, { x: 50, y, size: 10, font: fontRegular, color: grayColor });

  y -= 40;

  // Table Header - 3 Columns: Pesanan, Paket Langganan, Total
  page.drawRectangle({ x: 50, y: y - 5, width: width - 100, height: 25, color: lightGrayColor });
  page.drawText(isId ? 'PESANAN' : 'ORDER', { x: 65, y: y + 5, size: 8, font: fontBold, color: grayColor });
  page.drawText(isId ? 'PAKET LANGGANAN' : 'SUBSCRIPTION PLAN', { x: 220, y: y + 5, size: 8, font: fontBold, color: grayColor });
  
  const totalHeading = isId ? 'TOTAL' : 'TOTAL';
  page.drawText(totalHeading, { 
    x: width - 65 - fontBold.widthOfTextAtSize(totalHeading, 8), 
    y: y + 5, 
    size: 8, 
    font: fontBold, 
    color: grayColor 
  });
  y -= 30;

  // Items
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  for (const item of data.items) {
    // Expected format: "Item Description - Subscription Plan - Total Price"
    const parts = item.split(' - ');
    const pesanan = parts[0] || '';
    const paket = parts[1] || '';
    const total = parts[2] || '';

    page.drawText(pesanan.toUpperCase(), { x: 65, y, size: 9, font: fontBold, color: darkColor });
    page.drawText(paket, { x: 220, y, size: 9, font: fontRegular, color: grayColor });
    
    if (total) {
        page.drawText(total, { 
            x: width - 65 - fontBold.widthOfTextAtSize(total, 9), 
            y, 
            size: 9, 
            font: fontBold, 
            color: darkColor 
        });
    }
    
    y -= 25;
  }

  y -= 10;
  page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
  y -= 25;

  // Summary and Totals
  const summaryX = width - 250;
  
  const subtotalLabel = isId ? 'Subtotal' : 'Subtotal';
  const subtotalVal = formatCurrency(data.subtotal);
  page.drawText(subtotalLabel, { x: summaryX, y, size: 10, font: fontRegular, color: grayColor });
  page.drawText(subtotalVal, { 
    x: width - 65 - fontBold.widthOfTextAtSize(subtotalVal, 10), 
    y, 
    size: 10, 
    font: fontBold, 
    color: darkColor 
  });
  y -= 20;

  const uniqueCodeLabel = isId ? 'Kode Unik' : 'Unique Code';
  const uniqueCodeVal = `+${data.uniqueCode}`;
  page.drawText(uniqueCodeLabel, { x: summaryX, y, size: 10, font: fontRegular, color: grayColor });
  page.drawText(uniqueCodeVal, { 
    x: width - 65 - fontBold.widthOfTextAtSize(uniqueCodeVal, 10), 
    y, 
    size: 10, 
    font: fontBold, 
    color: blueColor 
  });
  y -= 30;

  // Final Total Box
  const totalLabel = isId ? 'TOTAL BAYAR' : 'TOTAL AMOUNT';
  const totalVal = formatCurrency(data.total);
  
  page.drawRectangle({ 
    x: summaryX - 10, 
    y: y - 10, 
    width: width - 65 - (summaryX - 10), 
    height: 35, 
    color: data.status === 'PAID' ? rgb(0.95, 1, 0.97) : rgb(1, 0.95, 0.96) 
  });
  
  page.drawText(totalLabel, { x: summaryX, y, size: 11, font: fontBold, color: darkColor });
  page.drawText(totalVal, { 
    x: width - 65 - fontBold.widthOfTextAtSize(totalVal, 14), 
    y, 
    size: 14, 
    font: fontBold, 
    color: data.status === 'PAID' ? rgb(0.06, 0.72, 0.5) : darkColor 
  });

  if (data.status === 'PAID') {
    // Large "PAID" Stamp-like text
    page.drawText('LUNAS / PAID', {
        x: 50,
        y: y - 10,
        size: 32,
        font: fontBold,
        color: rgb(0.06, 0.72, 0.5),
        opacity: 0.1,
        rotate: degrees(15),
    });
  }

  y -= 80;

  // Payment Instructions or Footer
  if (data.status !== 'PAID') {
    // Instruction Container
    page.drawRectangle({
        x: 50,
        y: y - 85,
        width: width - 100,
        height: 100,
        color: rgb(0.98, 0.98, 1),
        borderColor: rgb(0.9, 0.9, 1),
        borderWidth: 1,
    });

    const instructionY = y;
    page.drawText(isId ? 'INSTRUKSI PEMBAYARAN:' : 'PAYMENT INSTRUCTIONS:', { x: 60, y: instructionY - 5, size: 9, font: fontBold, color: blueColor });
    y -= 25;
    page.drawText('Transfer Bank BCA', { x: 60, y, size: 10, font: fontRegular });
    y -= 15;
    page.drawText(isId ? 'No. Rekening: 8690868653' : 'Account No: 8690868653', { x: 60, y, size: 10, font: fontBold, color: darkColor });
    y -= 15;
    page.drawText(isId ? 'Atas Nama: Gemmy Adyendra' : 'Account Name: Gemmy Adyendra', { x: 60, y, size: 10, font: fontRegular });
    y -= 20;
    page.drawText(isId ? '* Mohon transfer tepat sampai 3 digit terakhir untuk verifikasi otomatis.' : '* Please transfer the exact amount including the unique code.', { x: 60, y, size: 8, font: fontRegular, color: grayColor });
  } else {
    page.drawText(isId ? 'Terima kasih atas pembayaran Anda!' : 'Thank you for your payment!', { x: 50, y, size: 12, font: fontBold, color: rgb(0.06, 0.72, 0.5) });
    y -= 20;
    page.drawText(isId ? 'Layanan Anda telah diaktifkan secara otomatis.' : 'Your service has been activated automatically.', { x: 50, y, size: 10, font: fontRegular, color: grayColor });
  }

  // Footer
  const footerText = `(c) 2026 PT Kadai Teknologi Anak Bangsa - Generated on ${new Date().toLocaleString()}`;
  page.drawText(footerText, {
    x: width / 2 - fontRegular.widthOfTextAtSize(footerText, 8) / 2,
    y: 30,
    size: 8,
    font: fontRegular,
    color: rgb(0.7, 0.7, 0.7)
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
