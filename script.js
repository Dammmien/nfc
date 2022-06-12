function log(message) {
  const result = document.querySelector('#result');

  result.innerHTML += `
    > ${message}
  `;
}

async function write() {
  const ndef = new NDEFReader();

  await ndef.write({
    records: [{ recordType: "url", data: "https://w3c.github.io/web-nfc/" }]
  });

  log('Message written');
}

async function scan() {
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
  const scanButton = document.querySelector('#scan');
  scanButton.addEventListener('click', scan);

  const writeButton = document.querySelector('#write');
  writeButton.addEventListener('click', write);
}

document.addEventListener('DOMContentLoaded', main, false);