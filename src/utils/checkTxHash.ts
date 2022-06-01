export function checkTxHash(library, hash) {
  return new Promise((resolve, reject) => {
    let timeTake = 0;
    let timer = setInterval(() => {
      timeTake++;
      library
        .getTransactionReceipt(hash)
        .then((receipt: any) => {
          if (receipt) {
            console.log("交易成功");
            clearInterval(timer);

            resolve(true);
          }
        })
        .catch((err: any) => {
          if (err) clearInterval(timer);
        });
      if (timeTake > 20) {
        console.log("轮训hash超时");
        clearInterval(timer);
        resolve(false);
      }
    }, 1000);
  });
}
