import { createElement } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function IncentroPrintToScreen( props ) {

    
    const exportPDF = () => {
        const newDate = new Date().getTime();
        const newDateString = newDate.toString();
        const input = document.getElementsByClassName(props.className)[0];
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
            const imgWid = 208;
            const pageHeight = 295;
            const imgHei = (canvas.height * imgWid) / canvas.width;
            const imgData = canvas.toDataURL("img/png");
            let heightLeft = imgHei;
            let position = 0;
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 0, position, imgWid, imgHei);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHei;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWid, imgHei);
                heightLeft -= pageHeight;
              }
            pdf.save(props.preFix + "-" + newDateString + ".pdf");
        });
    };
    return (
        <div>
            <button type="button" class="btn btn-default btn-sm" onClick={() => exportPDF()}>
                <span class="glyphicon glyphicon-camera"></span>
            </button>
        </div>
    );
}
