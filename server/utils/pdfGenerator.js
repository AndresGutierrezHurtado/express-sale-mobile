import { Product, Category, Spec } from "../models/relations.js";
import PDFDocument from "pdfkit-table";

export const pdfGenerator = async (req, res) => {
    let whereClause = {};
    if (req.query.category_id) whereClause.category_id = req.query.category_id;
    try {
        const productos = await Product.findAll({
            include: [
                { model: Category, as: "category" },
                { model: Spec, as: "specs" },
            ],
            where: whereClause,
            distinct: true,
        });

        const doc = new PDFDocument();
        const outputFile = "Products.pdf";
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + outputFile
        );

        doc.pipe(res);

        doc.font("Helvetica-Bold")
            .fontSize(20)
            .fillColor("blue")
            .text("AC COMPUTERS", { align: "center" });
        doc.fontSize(18)
            .fillColor("black")
            .text("Lista de Productos", { align: "center" });
        doc.moveDown();

        if (productos.length === 0) {
            doc.fontSize(16)
                .fillColor("red")
                .text("No hay productos disponibles", { align: "center" });
        } else {
            const maxPerPage = 10;
            const pages = Math.ceil(productos.length / maxPerPage);

            for (let page = 0; page < pages; page++) {
                const table = {
                    headers: ["ID", "Nombre", "Descuento", "Precio"],
                    rows: productos
                        .slice(page * maxPerPage, (page + 1) * maxPerPage)
                        .map((producto) => [
                            producto.product_id.split("-")[1],
                            producto.product_name,
                            producto.product_discount + "%",
                            parseInt(producto.product_price).toLocaleString(
                                "es-CO"
                            ),
                        ]),
                };

                doc.table(table, {
                    prepareHeader: () => doc.fontSize(13),
                    prepareRow: (row, indexColumn, indexRow, rectRow) => {
                        doc.font("Helvetica").fontSize(11).fillColor("black");
                    },
                });

                if (page !== pages - 1) {
                    doc.addPage();
                }
            }
        }

        doc.end();
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        res.status(500).json({ message: "Error al generar el PDF" });
    }
};
