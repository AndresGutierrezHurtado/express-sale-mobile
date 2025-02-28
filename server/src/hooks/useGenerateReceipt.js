import fs from "fs";
import path from "path";
import { Buffer } from "buffer";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import nodemailer from "nodemailer";

// Templates
import { orderTemplate } from "../templates/emailTemplates.js";

export const sendReceipt = (order, userSession) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const doc = new jsPDF();
    doc.page = 1;

    // Cargar imágenes en base64
    const logoPath = path.resolve("./public/logo.png");
    const firmaPath = path.resolve("./public/firma.png");

    const logoBase64 = fs.existsSync(logoPath)
        ? Buffer.from(fs.readFileSync(logoPath)).toString("base64")
        : null;

    const firmaBase64 = fs.existsSync(firmaPath)
        ? Buffer.from(fs.readFileSync(firmaPath)).toString("base64")
        : null;

    // Logo y título
    doc.addImage(logoBase64, "PNG", 150, 10, 40, 30);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("Factura Express Sale", 10, 30);

    // Información del usuario
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Información del usuario:", 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text(
        `Nombre: ${userSession.user_name.split(" ")[0]} ${userSession.user_lastname.split(" ")[0]}`,
        10,
        55,
        { maxWidth: 60 }
    );
    doc.text(`Teléfono: ${userSession.user_phone || "Sin teléfono"}`, 10, 60, {
        maxWidth: 60,
    });
    doc.text(`Correo: ${userSession.user_email}`, 10, 65, { maxWidth: 60 });

    // Información del pagador
    doc.setFont("helvetica", "bold");
    doc.text("Información del Pagador:", 75, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${order.paymentDetails.buyer_name}`, 75, 55, {
        maxWidth: 60,
    });
    doc.text(
        `Documento: ${order.paymentDetails.buyer_document_type} ${order.paymentDetails.buyer_document_number}`,
        75,
        60,
        { maxWidth: 60 }
    );
    doc.text(`Teléfono: ${order.paymentDetails.buyer_phone}`, 75, 65, {
        maxWidth: 60,
    });
    doc.text(`Correo: ${order.paymentDetails.buyer_email}`, 75, 70, {
        maxWidth: 60,
    });

    // Información del pedido
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Información del pedido:", 140, 50, { maxWidth: 60 });
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date(order.order_date).toLocaleDateString("es-CO")}`, 140, 55, {
        maxWidth: 60,
    });
    doc.text(
        `Total: ${parseInt(order.paymentDetails.payment_amount).toLocaleString("es-CO")} COP`,
        140,
        60,
        { maxWidth: 60 }
    );
    doc.text(`N° de pedido: ${order.order_id.split("-")[1]}`, 140, 65, {
        maxWidth: 60,
    });
    doc.text(`Método de pago: ${order.paymentDetails.payment_method}`, 140, 70, { maxWidth: 60 });
    doc.text(`Direccion: ${order.shippingDetails.shipping_address}`, 140, 75, {
        maxWidth: 60,
    });

    // Tabla de productos
    const items = order.orderProducts.map((item) => ({
        Producto: item.product.product_name,
        Cantidad: item.product_quantity.toString(),
        Precio: `${parseInt(item.product_price).toLocaleString("es-CO")} COP`,
        Total: `${(parseInt(item.product_price) * item.product_quantity).toLocaleString(
            "es-CO"
        )} COP`,
    }));

    // Configuración de la tabla de productos
    doc.setFont("helvetica", "bold");
    doc.text("Lista de Productos:", 10, 100);
    doc.line(10, 90, 200, 90);
    doc.autoTable({
        startY: 105,
        head: [["Producto", "Cantidad", "Precio Unitario", "Total"]],
        body: items.map((item) => [item.Producto, item.Cantidad, item.Precio, item.Total]),
        theme: "plain",
    });

    // Precio total
    const totalPrice = parseInt(order.paymentDetails.payment_amount).toLocaleString("es-CO");
    doc.setFont("helvetica", "bold");
    doc.text(`Precio Total: ${totalPrice} COP`, 140, doc.lastAutoTable.finalY + 20, {
        maxWidth: 60,
    });

    // Firma
    doc.setFont("helvetica", "normal");
    doc.text("Firma:", 140, doc.lastAutoTable.finalY + 40);
    doc.addImage(firmaBase64, "PNG", 155, doc.lastAutoTable.finalY + 25, 45, 25);
    doc.line(140, doc.lastAutoTable.finalY + 50, 200, doc.lastAutoTable.finalY + 50);

    // footer
    function footer() {
        doc.text(180, 285, "Página " + doc.page);
        doc.page++;
    }

    footer();

    transporter.sendMail({
        from: "expresssale.exsl@gmail.com",
        to: order.paymentDetails.buyer_email,
        subject: "Pago exitoso | Express Sale",
        html: orderTemplate(order),
        attachments: [
            {
                filename: "factura.pdf",
                contentType: "application/pdf",
                content: Buffer.from(doc.output("arraybuffer")),
            },
        ],
    });
};

