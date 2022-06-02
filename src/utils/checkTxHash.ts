export function checkTxHash(library, hash) {
  return new Promise((resolve, reject) => {
    let timeTake = 0;
    let timer = setInterval(() => {
      timeTake++;
      library
        .getTransactionReceipt(hash)
        .then((receipt: any) => {
          if (receipt) {
            console.log("success");
            clearInterval(timer);

            resolve(true);
          }
        })
        .catch((err: any) => {
          if (err) clearInterval(timer);
        });
      if (timeTake > 20) {
        console.log("timeout");
        clearInterval(timer);
        resolve(false);
      }
    }, 1000);
  });
}
