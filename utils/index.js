import FileSaver from "file-saver";

export async function downloadImage(xata_id, photo) {
  FileSaver.saveAs(photo, `${xata_id}.jpg`);
}
