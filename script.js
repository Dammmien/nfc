
function log(message) {
  const result = document.querySelector('#result');

  result.innerHTML += `
    > ${message}
  `;
}

function onClick() {
  try {
    const ndef = new NDEFReader();

    await ndef.scan();

    log('Scan started');

    ndef.addEventListener('reading', ({ message, serialNumber }) => {
      log(`Serial Number: ${serialNumber}`);
      log(`Records: (${message.records.length})`);
      for (const record of message.records) {
        log(`Record type: ${record.recordType}`);
        log(`MIME type: ${record.mediaType}`);
        log(`Record id: ${record.id}`);
      }
    });
  } catch (error) {
    log('Argh! ' + error);
  }
}

function main() {
  const button = document.querySelector('#button');
  button.addEventListener('click', onClick);
}

document.addEventListener('DOMContentLoaded', main, false);