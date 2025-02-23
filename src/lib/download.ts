export function gerarLinkDownload(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}